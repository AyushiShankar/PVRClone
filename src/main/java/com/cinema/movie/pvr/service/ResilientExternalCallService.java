package com.cinema.movie.pvr.service;

import io.github.resilience4j.circuitbreaker.CallNotPermittedException;
import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry;
import io.github.resilience4j.retry.Retry;
import io.github.resilience4j.retry.RetryRegistry;
import io.github.resilience4j.timelimiter.TimeLimiter;
import io.github.resilience4j.timelimiter.TimeLimiterRegistry;
import java.util.concurrent.Callable;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.TimeoutException;
import java.util.function.Supplier;
import org.springframework.stereotype.Service;

@Service
public class ResilientExternalCallService {

	private final CircuitBreakerRegistry circuitBreakerRegistry;
	private final RetryRegistry retryRegistry;
	private final TimeLimiterRegistry timeLimiterRegistry;
	private final ExecutorService resilienceExecutorService;

	public ResilientExternalCallService(
			CircuitBreakerRegistry circuitBreakerRegistry,
			RetryRegistry retryRegistry,
			TimeLimiterRegistry timeLimiterRegistry,
			ExecutorService resilienceExecutorService
	) {
		this.circuitBreakerRegistry = circuitBreakerRegistry;
		this.retryRegistry = retryRegistry;
		this.timeLimiterRegistry = timeLimiterRegistry;
		this.resilienceExecutorService = resilienceExecutorService;
	}

	public <T> T execute(String backendName, Supplier<T> supplier) {
		TimeLimiter timeLimiter = timeLimiterRegistry.timeLimiter(backendName);
		CircuitBreaker circuitBreaker = circuitBreakerRegistry.circuitBreaker(backendName);
		Retry retry = retryRegistry.retry(backendName);

		Callable<T> timeLimitedCall = TimeLimiter.decorateFutureSupplier(
				timeLimiter,
				() -> CompletableFuture.supplyAsync(supplier, resilienceExecutorService)
		);
		Callable<T> circuitBreakerCall = CircuitBreaker.decorateCallable(circuitBreaker, timeLimitedCall);
		Callable<T> retryingCall = Retry.decorateCallable(retry, circuitBreakerCall);

		try {
			return retryingCall.call();
		} catch (CallNotPermittedException exception) {
			throw new ExternalServiceException("External service is temporarily unavailable", exception);
		} catch (TimeoutException exception) {
			throw new ExternalServiceException("External service request timed out", exception);
		} catch (CompletionException exception) {
			throw mapFailure(exception.getCause());
		} catch (Exception exception) {
			throw mapFailure(exception);
		}
	}

	private ExternalServiceException mapFailure(Throwable failure) {
		if (failure instanceof ExternalServiceException externalServiceException) {
			return externalServiceException;
		}
		return new ExternalServiceException("External service request failed", failure);
	}
}

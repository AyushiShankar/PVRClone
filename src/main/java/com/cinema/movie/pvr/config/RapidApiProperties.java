package com.cinema.movie.pvr.config;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "rapidapi")
public record RapidApiProperties(
		String key,
		String host,
		String baseUrl,
		String titlesPath,
		Duration connectTimeout,
		Duration readTimeout
) {
	public RapidApiProperties {
		if (connectTimeout == null) {
			connectTimeout = Duration.ofSeconds(2);
		}
		if (readTimeout == null) {
			readTimeout = Duration.ofSeconds(5);
		}
	}
}

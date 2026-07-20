package com.cinema.movie.pvr.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

	@Bean
	RestClient rapidApiRestClient(RapidApiProperties properties) {
		return RestClient.builder()
				.baseUrl(properties.baseUrl())
				.defaultHeader("Content-Type", "application/json")
				.defaultHeader("x-rapidapi-host", properties.host())
				.defaultHeader("x-rapidapi-key", properties.key())
				.build();
	}
}

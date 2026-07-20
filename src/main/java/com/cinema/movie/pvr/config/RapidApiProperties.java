package com.cinema.movie.pvr.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "rapidapi")
public record RapidApiProperties(
		String key,
		String host,
		String baseUrl,
		String titlesPath
) {
}

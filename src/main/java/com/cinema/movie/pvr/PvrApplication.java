package com.cinema.movie.pvr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class PvrApplication {

	public static void main(String[] args) {
		SpringApplication.run(PvrApplication.class, args);
	}

}

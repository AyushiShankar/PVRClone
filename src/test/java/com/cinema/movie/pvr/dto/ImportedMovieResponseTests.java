package com.cinema.movie.pvr.dto;

import com.cinema.movie.pvr.entity.ImportedMovie;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ImportedMovieResponseTests {

	@Test
	void fromConvertsStoredJsonArraysToJsonValues() {
		ImportedMovie movie = movieWithJsonFields(
				"[\"Drama\",\"Action\"]",
				"[\"en\"]",
				"[{\"name\":\"Jane Director\"}]"
		);

		ImportedMovieResponse response = ImportedMovieResponse.from(movie);

		assertThat(response.genres()).isEqualTo(List.of("Drama", "Action"));
		assertThat(response.spokenLanguages()).isEqualTo(List.of("en"));
		assertThat(response.directors()).isEqualTo(List.of(Map.of("name", "Jane Director")));
	}

	@Test
	void fromKeepsInvalidJsonAsOriginalText() {
		ImportedMovie movie = movieWithJsonFields(
				"Drama",
				"English",
				"Jane Director"
		);

		ImportedMovieResponse response = ImportedMovieResponse.from(movie);

		assertThat(response.genres()).isEqualTo("Drama");
		assertThat(response.spokenLanguages()).isEqualTo("English");
		assertThat(response.directors()).isEqualTo("Jane Director");
	}

	private ImportedMovie movieWithJsonFields(String genres, String spokenLanguages, String directors) {
		return new ImportedMovie(
				"test-source",
				"tt-test",
				null,
				"Test Movie",
				null,
				"movie",
				null,
				null,
				null,
				null,
				null,
				genres,
				false,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				spokenLanguages,
				null,
				null,
				null,
				null,
				null,
				directors,
				null,
				null,
				null,
				null,
				"{}"
		);
	}
}

package com.cinema.movie.pvr.dto;

import com.cinema.movie.pvr.entity.ImportedMovie;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Instant;
import java.time.LocalDate;

public record ImportedMovieResponse(
		Long id,
		String source,
		String externalId,
		String url,
		String primaryTitle,
		String originalTitle,
		String type,
		String description,
		String primaryImage,
		Object thumbnails,
		Object trailer,
		String contentRating,
		Object genres,
		Boolean isAdult,
		LocalDate releaseDate,
		Integer startYear,
		Integer endYear,
		Integer runtimeMinutes,
		Double averageRating,
		Integer numVotes,
		Object interests,
		Object countriesOfOrigin,
		Object externalLinks,
		Object spokenLanguages,
		Object filmingLocations,
		Object productionCompanies,
		Long budget,
		Long grossWorldwide,
		Integer metascore,
		Object directors,
		Object writers,
		Integer totalSeasons,
		Integer totalEpisodes,
		Object episodes,
		Instant importedAt
) {
	private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
	private static final TypeReference<Object> JSON_VALUE = new TypeReference<>() {
	};

	public static ImportedMovieResponse from(ImportedMovie movie) {
		return new ImportedMovieResponse(
				movie.getId(),
				movie.getSource(),
				movie.getExternalId(),
				movie.getUrl(),
				movie.getPrimaryTitle(),
				movie.getOriginalTitle(),
				movie.getType(),
				movie.getDescription(),
				movie.getPrimaryImage(),
				jsonValue(movie.getThumbnails()),
				jsonValue(movie.getTrailer()),
				movie.getContentRating(),
				jsonValue(movie.getGenres()),
				movie.getAdult(),
				movie.getReleaseDate(),
				movie.getStartYear(),
				movie.getEndYear(),
				movie.getRuntimeMinutes(),
				movie.getAverageRating(),
				movie.getNumVotes(),
				jsonValue(movie.getInterests()),
				jsonValue(movie.getCountriesOfOrigin()),
				jsonValue(movie.getExternalLinks()),
				jsonValue(movie.getSpokenLanguages()),
				jsonValue(movie.getFilmingLocations()),
				jsonValue(movie.getProductionCompanies()),
				movie.getBudget(),
				movie.getGrossWorldwide(),
				movie.getMetascore(),
				jsonValue(movie.getDirectors()),
				jsonValue(movie.getWriters()),
				movie.getTotalSeasons(),
				movie.getTotalEpisodes(),
				jsonValue(movie.getEpisodes()),
				movie.getImportedAt()
		);
	}

	private static Object jsonValue(String value) {
		if (value == null || value.isBlank()) {
			return null;
		}
		try {
			return OBJECT_MAPPER.readValue(value, JSON_VALUE);
		} catch (JsonProcessingException ignored) {
			return value;
		}
	}
}

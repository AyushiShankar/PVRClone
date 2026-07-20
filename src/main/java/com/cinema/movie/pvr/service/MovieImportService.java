package com.cinema.movie.pvr.service;

import com.cinema.movie.pvr.config.RapidApiProperties;
import com.cinema.movie.pvr.dto.ImportResult;
import com.cinema.movie.pvr.entity.ImportedMovie;
import com.cinema.movie.pvr.repository.ImportedMovieRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.HexFormat;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

@Service
public class MovieImportService {

	private static final String SOURCE = "rapidapi-imdb236";

	private final RestClient rapidApiRestClient;
	private final RapidApiProperties properties;
	private final ImportedMovieRepository repository;
	private final ObjectMapper objectMapper;

	public MovieImportService(
			RestClient rapidApiRestClient,
			RapidApiProperties properties,
			ImportedMovieRepository repository,
			ObjectMapper objectMapper
	) {
		this.rapidApiRestClient = rapidApiRestClient;
		this.properties = properties;
		this.repository = repository;
		this.objectMapper = objectMapper;
	}

	@Transactional
	public ImportResult importDefaultTitles() {
		String response = rapidApiRestClient.get()
				.uri(properties.titlesPath())
				.retrieve()
				.body(String.class);

		return saveTitles(response);
	}

	private ImportResult saveTitles(String response) {
		List<JsonNode> titles = extractTitles(response);
		int created = 0;
		int updated = 0;

		for (JsonNode titleNode : titles) {
			String rawPayload = toJson(titleNode);
			String externalId = text(titleNode, "id", "titleId", "tconst", "imdbId");
			if (externalId == null) {
				externalId = sha256(rawPayload);
			}

			String url = text(titleNode, "url");
			String primaryTitle = text(titleNode, "primaryTitle", "title", "name");
			String originalTitle = text(titleNode, "originalTitle");
			String type = text(titleNode, "type", "titleType", "category");
			String description = text(titleNode, "description");
			String primaryImage = text(titleNode, "primaryImage");
			String thumbnails = json(titleNode, "thumbnails");
			String trailer = json(titleNode, "trailer");
			String contentRating = text(titleNode, "contentRating");
			String genres = json(titleNode, "genres");
			Boolean adult = bool(titleNode, "isAdult");
			LocalDate releaseDate = date(titleNode, "releaseDate");
			Integer startYear = integer(titleNode, "startYear");
			Integer endYear = integer(titleNode, "endYear");
			Integer runtimeMinutes = integer(titleNode, "runtimeMinutes");
			Double averageRating = decimal(titleNode, "averageRating");
			Integer numVotes = integer(titleNode, "numVotes");
			String interests = json(titleNode, "interests");
			String countriesOfOrigin = json(titleNode, "countriesOfOrigin");
			String externalLinks = json(titleNode, "externalLinks");
			String spokenLanguages = json(titleNode, "spokenLanguages");
			String filmingLocations = json(titleNode, "filmingLocations");
			String productionCompanies = json(titleNode, "productionCompanies");
			Long budget = longValue(titleNode, "budget");
			Long grossWorldwide = longValue(titleNode, "grossWorldwide");
			Integer metascore = integer(titleNode, "metascore");
			String directors = json(titleNode, "directors");
			String writers = json(titleNode, "writers");
			Integer totalSeasons = integer(titleNode, "totalSeasons");
			Integer totalEpisodes = integer(titleNode, "totalEpisodes");
			String episodes = json(titleNode, "episodes");

			ImportedMovie movie = repository.findBySourceAndExternalId(SOURCE, externalId)
					.orElse(null);

			if (movie == null) {
				repository.save(new ImportedMovie(
						SOURCE,
						externalId,
						url,
						primaryTitle,
						originalTitle,
						type,
						description,
						primaryImage,
						thumbnails,
						trailer,
						contentRating,
						genres,
						adult,
						releaseDate,
						startYear,
						endYear,
						runtimeMinutes,
						averageRating,
						numVotes,
						interests,
						countriesOfOrigin,
						externalLinks,
						spokenLanguages,
						filmingLocations,
						productionCompanies,
						budget,
						grossWorldwide,
						metascore,
						directors,
						writers,
						totalSeasons,
						totalEpisodes,
						episodes,
						rawPayload
				));
				created++;
			} else {
				movie.updateFrom(
						url,
						primaryTitle,
						originalTitle,
						type,
						description,
						primaryImage,
						thumbnails,
						trailer,
						contentRating,
						genres,
						adult,
						releaseDate,
						startYear,
						endYear,
						runtimeMinutes,
						averageRating,
						numVotes,
						interests,
						countriesOfOrigin,
						externalLinks,
						spokenLanguages,
						filmingLocations,
						productionCompanies,
						budget,
						grossWorldwide,
						metascore,
						directors,
						writers,
						totalSeasons,
						totalEpisodes,
						episodes,
						rawPayload
				);
				updated++;
			}
		}

		return new ImportResult(titles.size(), created, updated);
	}

	private List<JsonNode> extractTitles(String response) {
		try {
			JsonNode root = objectMapper.readTree(response);
			JsonNode titles = root.isArray() ? root : root.path("titles");
			if (!titles.isArray()) {
				titles = root.path("data");
			}
			if (!titles.isArray()) {
				return List.of(root);
			}

			List<JsonNode> results = new ArrayList<>();
			titles.forEach(results::add);
			return results;
		} catch (JsonProcessingException exception) {
			throw new IllegalStateException("External API returned invalid JSON", exception);
		}
	}

	private String toJson(JsonNode node) {
		try {
			return objectMapper.writeValueAsString(node);
		} catch (JsonProcessingException exception) {
			throw new IllegalStateException("Unable to serialize imported movie payload", exception);
		}
	}

	private String text(JsonNode node, String... fields) {
		for (String field : fields) {
			JsonNode value = node.path(field);
			if (value.isTextual() && !value.asText().isBlank()) {
				return value.asText();
			}
		}
		return null;
	}

	private Integer integer(JsonNode node, String... fields) {
		for (String field : fields) {
			JsonNode value = node.path(field);
			if (value.isInt()) {
				return value.asInt();
			}
			if (value.isTextual()) {
				try {
					return Integer.valueOf(value.asText());
				} catch (NumberFormatException ignored) {
					// Try the next field.
				}
			}
		}
		return null;
	}

	private Double decimal(JsonNode node, String... fields) {
		for (String field : fields) {
			JsonNode value = node.path(field);
			if (value.isNumber()) {
				return value.asDouble();
			}
			if (value.isTextual()) {
				try {
					return Double.valueOf(value.asText());
				} catch (NumberFormatException ignored) {
					// Try the next field.
				}
			}
		}
		return null;
	}

	private Long longValue(JsonNode node, String... fields) {
		for (String field : fields) {
			JsonNode value = node.path(field);
			if (value.isIntegralNumber()) {
				return value.asLong();
			}
			if (value.isTextual()) {
				try {
					return Long.valueOf(value.asText());
				} catch (NumberFormatException ignored) {
					// Try the next field.
				}
			}
		}
		return null;
	}

	private LocalDate date(JsonNode node, String... fields) {
		for (String field : fields) {
			JsonNode value = node.path(field);
			if (value.isTextual() && !value.asText().isBlank()) {
				try {
					return LocalDate.parse(value.asText());
				} catch (DateTimeParseException ignored) {
					// Try the next field.
				}
			}
		}
		return null;
	}

	private Boolean bool(JsonNode node, String... fields) {
		for (String field : fields) {
			JsonNode value = node.path(field);
			if (value.isBoolean()) {
				return value.asBoolean();
			}
			if (value.isTextual()) {
				return Boolean.valueOf(value.asText());
			}
		}
		return null;
	}

	private String json(JsonNode node, String field) {
		JsonNode value = node.path(field);
		if (value.isMissingNode() || value.isNull()) {
			return null;
		}
		return toJson(value);
	}

	private String sha256(String value) {
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			return HexFormat.of().formatHex(digest.digest(value.getBytes(StandardCharsets.UTF_8)));
		} catch (NoSuchAlgorithmException exception) {
			throw new IllegalStateException("SHA-256 is not available", exception);
		}
	}
}

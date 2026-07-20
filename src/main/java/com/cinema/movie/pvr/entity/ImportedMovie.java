package com.cinema.movie.pvr.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(
		name = "imported_movies",
		uniqueConstraints = @UniqueConstraint(
				name = "uk_imported_movies_source_external_id",
				columnNames = {"source", "external_id"}
		)
)
public class ImportedMovie {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 64)
	private String source;

	@Column(name = "external_id", nullable = false, length = 128)
	private String externalId;

	@Column(length = 1024)
	private String url;

	@Column(name = "primary_title", length = 512)
	private String primaryTitle;

	@Column(name = "original_title", length = 512)
	private String originalTitle;

	@Column(name = "title_type", length = 128)
	private String type;

	@Column(columnDefinition = "text")
	private String description;

	@Column(name = "primary_image", length = 1024)
	private String primaryImage;

	@Column(columnDefinition = "text")
	private String thumbnails;

	@Column(columnDefinition = "text")
	private String trailer;

	@Column(name = "content_rating", length = 64)
	private String contentRating;

	@Column(columnDefinition = "text")
	private String genres;

	@Column(name = "is_adult")
	private Boolean adult;

	@Column(name = "release_date")
	private LocalDate releaseDate;

	@Column(name = "start_year")
	private Integer startYear;

	@Column(name = "end_year")
	private Integer endYear;

	@Column(name = "runtime_minutes")
	private Integer runtimeMinutes;

	@Column(name = "average_rating")
	private Double averageRating;

	@Column(name = "num_votes")
	private Integer numVotes;

	@Column(columnDefinition = "text")
	private String interests;

	@Column(name = "countries_of_origin", columnDefinition = "text")
	private String countriesOfOrigin;

	@Column(name = "external_links", columnDefinition = "text")
	private String externalLinks;

	@Column(name = "spoken_languages", columnDefinition = "text")
	private String spokenLanguages;

	@Column(name = "filming_locations", columnDefinition = "text")
	private String filmingLocations;

	@Column(name = "production_companies", columnDefinition = "text")
	private String productionCompanies;

	private Long budget;

	@Column(name = "gross_worldwide")
	private Long grossWorldwide;

	private Integer metascore;

	@Column(columnDefinition = "text")
	private String directors;

	@Column(columnDefinition = "text")
	private String writers;

	@Column(name = "total_seasons")
	private Integer totalSeasons;

	@Column(name = "total_episodes")
	private Integer totalEpisodes;

	@Column(columnDefinition = "text")
	private String episodes;

	@Lob
	@Column(name = "raw_payload", nullable = false)
	private String rawPayload;

	@Column(name = "imported_at", nullable = false)
	private Instant importedAt;

	protected ImportedMovie() {
	}

	public ImportedMovie(
			String source,
			String externalId,
			String url,
			String primaryTitle,
			String originalTitle,
			String type,
			String description,
			String primaryImage,
			String thumbnails,
			String trailer,
			String contentRating,
			String genres,
			Boolean adult,
			LocalDate releaseDate,
			Integer startYear,
			Integer endYear,
			Integer runtimeMinutes,
			Double averageRating,
			Integer numVotes,
			String interests,
			String countriesOfOrigin,
			String externalLinks,
			String spokenLanguages,
			String filmingLocations,
			String productionCompanies,
			Long budget,
			Long grossWorldwide,
			Integer metascore,
			String directors,
			String writers,
			Integer totalSeasons,
			Integer totalEpisodes,
			String episodes,
			String rawPayload
	) {
		this.source = source;
		this.externalId = externalId;
		this.url = url;
		this.primaryTitle = primaryTitle;
		this.originalTitle = originalTitle;
		this.type = type;
		this.description = description;
		this.primaryImage = primaryImage;
		this.thumbnails = thumbnails;
		this.trailer = trailer;
		this.contentRating = contentRating;
		this.genres = genres;
		this.adult = adult;
		this.releaseDate = releaseDate;
		this.startYear = startYear;
		this.endYear = endYear;
		this.runtimeMinutes = runtimeMinutes;
		this.averageRating = averageRating;
		this.numVotes = numVotes;
		this.interests = interests;
		this.countriesOfOrigin = countriesOfOrigin;
		this.externalLinks = externalLinks;
		this.spokenLanguages = spokenLanguages;
		this.filmingLocations = filmingLocations;
		this.productionCompanies = productionCompanies;
		this.budget = budget;
		this.grossWorldwide = grossWorldwide;
		this.metascore = metascore;
		this.directors = directors;
		this.writers = writers;
		this.totalSeasons = totalSeasons;
		this.totalEpisodes = totalEpisodes;
		this.episodes = episodes;
		this.rawPayload = rawPayload;
		this.importedAt = Instant.now();
	}

	public Long getId() {
		return id;
	}

	public String getSource() {
		return source;
	}

	public String getExternalId() {
		return externalId;
	}

	public String getUrl() {
		return url;
	}

	public String getPrimaryTitle() {
		return primaryTitle;
	}

	public String getOriginalTitle() {
		return originalTitle;
	}

	public String getType() {
		return type;
	}

	public String getDescription() {
		return description;
	}

	public String getPrimaryImage() {
		return primaryImage;
	}

	public String getThumbnails() {
		return thumbnails;
	}

	public String getTrailer() {
		return trailer;
	}

	public String getContentRating() {
		return contentRating;
	}

	public String getGenres() {
		return genres;
	}

	public Boolean getAdult() {
		return adult;
	}

	public LocalDate getReleaseDate() {
		return releaseDate;
	}

	public Integer getStartYear() {
		return startYear;
	}

	public Integer getEndYear() {
		return endYear;
	}

	public Integer getRuntimeMinutes() {
		return runtimeMinutes;
	}

	public Double getAverageRating() {
		return averageRating;
	}

	public Integer getNumVotes() {
		return numVotes;
	}

	public String getInterests() {
		return interests;
	}

	public String getCountriesOfOrigin() {
		return countriesOfOrigin;
	}

	public String getExternalLinks() {
		return externalLinks;
	}

	public String getSpokenLanguages() {
		return spokenLanguages;
	}

	public String getFilmingLocations() {
		return filmingLocations;
	}

	public String getProductionCompanies() {
		return productionCompanies;
	}

	public Long getBudget() {
		return budget;
	}

	public Long getGrossWorldwide() {
		return grossWorldwide;
	}

	public Integer getMetascore() {
		return metascore;
	}

	public String getDirectors() {
		return directors;
	}

	public String getWriters() {
		return writers;
	}

	public Integer getTotalSeasons() {
		return totalSeasons;
	}

	public Integer getTotalEpisodes() {
		return totalEpisodes;
	}

	public String getEpisodes() {
		return episodes;
	}

	public String getRawPayload() {
		return rawPayload;
	}

	public Instant getImportedAt() {
		return importedAt;
	}

	public void updateFrom(
			String url,
			String primaryTitle,
			String originalTitle,
			String type,
			String description,
			String primaryImage,
			String thumbnails,
			String trailer,
			String contentRating,
			String genres,
			Boolean adult,
			LocalDate releaseDate,
			Integer startYear,
			Integer endYear,
			Integer runtimeMinutes,
			Double averageRating,
			Integer numVotes,
			String interests,
			String countriesOfOrigin,
			String externalLinks,
			String spokenLanguages,
			String filmingLocations,
			String productionCompanies,
			Long budget,
			Long grossWorldwide,
			Integer metascore,
			String directors,
			String writers,
			Integer totalSeasons,
			Integer totalEpisodes,
			String episodes,
			String rawPayload
	) {
		this.url = url;
		this.primaryTitle = primaryTitle;
		this.originalTitle = originalTitle;
		this.type = type;
		this.description = description;
		this.primaryImage = primaryImage;
		this.thumbnails = thumbnails;
		this.trailer = trailer;
		this.contentRating = contentRating;
		this.genres = genres;
		this.adult = adult;
		this.releaseDate = releaseDate;
		this.startYear = startYear;
		this.endYear = endYear;
		this.runtimeMinutes = runtimeMinutes;
		this.averageRating = averageRating;
		this.numVotes = numVotes;
		this.interests = interests;
		this.countriesOfOrigin = countriesOfOrigin;
		this.externalLinks = externalLinks;
		this.spokenLanguages = spokenLanguages;
		this.filmingLocations = filmingLocations;
		this.productionCompanies = productionCompanies;
		this.budget = budget;
		this.grossWorldwide = grossWorldwide;
		this.metascore = metascore;
		this.directors = directors;
		this.writers = writers;
		this.totalSeasons = totalSeasons;
		this.totalEpisodes = totalEpisodes;
		this.episodes = episodes;
		this.rawPayload = rawPayload;
		this.importedAt = Instant.now();
	}
}

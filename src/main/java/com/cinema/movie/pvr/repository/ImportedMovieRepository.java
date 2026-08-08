package com.cinema.movie.pvr.repository;

import com.cinema.movie.pvr.entity.ImportedMovie;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ImportedMovieRepository extends JpaRepository<ImportedMovie, Long> {

	Optional<ImportedMovie> findBySourceAndExternalId(String source, String externalId);

	List<ImportedMovie> findByReleaseDateLessThanEqual(LocalDate releaseDate, Pageable pageable);

	List<ImportedMovie> findByReleaseDateGreaterThan(LocalDate releaseDate, Pageable pageable);

	@Query("""
			select movie
			from ImportedMovie movie
			where  movie.trailer is not null
				and trim(movie.trailer) <> ''
			""")
	List<ImportedMovie> findNewReleaseTrailers(LocalDate releaseDate, Pageable pageable);

	// List<String> getDistinctPlaces();

	// @Query("""
	// select
	// """;)
}

// @Query("""
// select movie
// from ImportedMovie movie
// where movie.releaseDate > :releaseDate
// and movie.trailer is not null
// and trim(movie.trailer) <> ''
// """)
// List<ImportedMovie> findUpcomingTrailers(LocalDate releaseDate, Pageable
// pageable);
// }

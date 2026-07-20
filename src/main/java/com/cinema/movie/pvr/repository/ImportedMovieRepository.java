package com.cinema.movie.pvr.repository;

import com.cinema.movie.pvr.entity.ImportedMovie;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImportedMovieRepository extends JpaRepository<ImportedMovie, Long> {

	Optional<ImportedMovie> findBySourceAndExternalId(String source, String externalId);
}

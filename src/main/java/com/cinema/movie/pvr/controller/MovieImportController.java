package com.cinema.movie.pvr.controller;

import com.cinema.movie.pvr.dto.ImportResult;
import com.cinema.movie.pvr.dto.ImportedMovieResponse;
import com.cinema.movie.pvr.dto.MovieSectionsResponse;
import com.cinema.movie.pvr.entity.ImportedMovie;
import com.cinema.movie.pvr.repository.ImportedMovieRepository;
import com.cinema.movie.pvr.service.MovieImportService;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/movies")
public class MovieImportController {

        private static final Sort RELEASE_DATE_DESC = Sort.by(Sort.Direction.DESC, "releaseDate");
        private static final Sort RELEASE_DATE_ASC = Sort.by(Sort.Direction.ASC, "releaseDate");

    private final MovieImportService movieImportService;
    private final ImportedMovieRepository importedMovieRepository;

    public MovieImportController(MovieImportService movieImportService, ImportedMovieRepository importedMovieRepository) {
        this.movieImportService = movieImportService;
        this.importedMovieRepository = importedMovieRepository;
    }

    @PostMapping("/import")
    public ImportResult importMovies() {
        return movieImportService.importDefaultTitles();
    }

    @GetMapping
    public List<ImportedMovieResponse> getImportedMovies(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
            return toResponse(importedMovieRepository.findAll(PageRequest.of(page, size, RELEASE_DATE_DESC)).toList());
    }

    @GetMapping("/sections")
    public MovieSectionsResponse getMovieSections(@RequestParam(defaultValue = "0") int page,
                    @RequestParam(defaultValue = "10") int size) {
            LocalDate currentDate = LocalDate.now();

            List<ImportedMovieResponse> newReleases = toResponse(importedMovieRepository.findByReleaseDateLessThanEqual(
                            currentDate,
                            PageRequest.of(page, size, RELEASE_DATE_DESC)));
            List<ImportedMovieResponse> upcoming = toResponse(importedMovieRepository.findByReleaseDateGreaterThan(
                            currentDate,
                            PageRequest.of(page, size, RELEASE_DATE_ASC)));
            List<ImportedMovieResponse> newReleaseTrailers = toResponse(importedMovieRepository.findNewReleaseTrailers(
                            currentDate,
                            PageRequest.of(page, size, RELEASE_DATE_DESC)));
            // List<ImportedMovieResponse> upcomingTrailers =
            // toResponse(importedMovieRepository.findUpcomingTrailers(
            // currentDate,
            // PageRequest.of(page, size, RELEASE_DATE_ASC)));

            // List<ImportedMovieResponse> newReleaseTrailersLimited =
            // newReleaseTrailers.stream().limit(5).toList();
            // List<ImportedMovieResponse> upcomingTrailersLimited =
            // upcomingTrailers.stream().limit(5).toList();

            return new MovieSectionsResponse(
                            newReleases,
                            upcoming,
                            newReleaseTrailers);
    }

    @GetMapping("/new-releases")
    public List<ImportedMovieResponse> getNewReleases(@RequestParam(defaultValue = "0") int page,
                    @RequestParam(defaultValue = "10") int size) {
            return toResponse(importedMovieRepository.findByReleaseDateLessThanEqual(
                            LocalDate.now(),
                            PageRequest.of(page, size, RELEASE_DATE_DESC)));
    }

    @GetMapping("/upcoming")
    public List<ImportedMovieResponse> getUpcoming(@RequestParam(defaultValue = "0") int page,
                    @RequestParam(defaultValue = "10") int size) {
            return toResponse(importedMovieRepository.findByReleaseDateGreaterThan(
                            LocalDate.now(),
                            PageRequest.of(page, size, RELEASE_DATE_ASC)));
    }

    @GetMapping("/trailers")
    public List<ImportedMovieResponse> getTrailers(@RequestParam(defaultValue = "0") int page,
                    @RequestParam(defaultValue = "10") int size) {
            return toResponse(importedMovieRepository.findNewReleaseTrailers(
                            LocalDate.now(),
                            PageRequest.of(page, size, RELEASE_DATE_DESC)));
    }

    // @GetMapping("/trailers/upcoming")
    // public List<ImportedMovieResponse>
    // getUpcomingTrailers(@RequestParam(defaultValue = "0") int page,
    // @RequestParam(defaultValue = "10") int size) {
    // return toResponse(importedMovieRepository.findUpcomingTrailers(
    // LocalDate.now(),
    // PageRequest.of(page, size, RELEASE_DATE_ASC)));
    // }

    private List<ImportedMovieResponse> toResponse(List<ImportedMovie> movies) {
            return movies.stream()
                .map(ImportedMovieResponse::from)
                .toList();
    }
}

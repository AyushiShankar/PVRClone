package com.cinema.movie.pvr.controller;

import com.cinema.movie.pvr.dto.ImportResult;
import com.cinema.movie.pvr.dto.ImportedMovieResponse;
import com.cinema.movie.pvr.repository.ImportedMovieRepository;
import com.cinema.movie.pvr.service.MovieImportService;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieImportController {

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
        return importedMovieRepository.findAll(PageRequest.of(page, size))
                .stream()
                .map(ImportedMovieResponse::from)
                .toList();
    }
}

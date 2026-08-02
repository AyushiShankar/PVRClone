package com.cinema.movie.pvr.dto;

import java.util.List;

public record MovieSectionsResponse(
		List<ImportedMovieResponse> newReleases,
		List<ImportedMovieResponse> upcoming,
		List<ImportedMovieResponse> newReleasesTrailers
) {

}

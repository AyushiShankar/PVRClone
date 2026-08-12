package com.cinema.movie.pvr.service;

public record GoogleUser(
        String googleId,
        String email,
        String name,
        String picture
) {
}

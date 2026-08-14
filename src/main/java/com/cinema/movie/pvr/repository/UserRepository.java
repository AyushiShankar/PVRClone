package com.cinema.movie.pvr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinema.movie.pvr.entity.User;
import com.google.common.base.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByGoogleId(String googleId);
    
}

package com.cinema.movie.pvr.service;

import org.springframework.stereotype.Service;

import com.cinema.movie.pvr.entity.Role;
import com.cinema.movie.pvr.entity.User;
import com.cinema.movie.pvr.repository.UserRepository;
import com.google.common.base.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findOrCreateGoogleUser(GoogleUser googleUser) {

        Optional<User> exisitingUser = userRepository.findByGoogleId(googleUser.googleId());

        if (exisitingUser.isPresent()) {
            return exisitingUser.get();
        }

        User user = new User(null, null, null, null, null, null);

        user.setEmail(googleUser.email());
        user.setGoogleId(googleUser.googleId());
        user.setName(googleUser.name());
        user.setProfileImage(googleUser.picture());
        user.setRole(Role.USER);

        return userRepository.save(user);

    }

}

package com.cinema.movie.pvr.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema.movie.pvr.dto.GoogleLoginRequest;
import com.cinema.movie.pvr.entity.User;
import com.cinema.movie.pvr.service.GoogleAuthService;
import com.cinema.movie.pvr.service.GoogleUser;
import com.cinema.movie.pvr.service.JWTService;
import com.cinema.movie.pvr.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {


    private final GoogleAuthService googleAuthService;
    private final UserService userService;
    private final JWTService jwtService;

    public AuthController(
            GoogleAuthService googleAuthService,
            UserService userService,
            JWTService jwtService) {

        this.googleAuthService = googleAuthService;
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(
            @RequestBody GoogleLoginRequest request) {

        try {
            GoogleUser googleUser = googleAuthService.verifyToken(request.getCredential());

            User user = userService.findOrCreateGoogleUser(googleUser);

            String token = jwtService.generateToken(user);
            System.out.println("token" + token);

            return ResponseEntity.ok(token.hashCode());
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity
                    .badRequest()
                    .body("Invalid Google credential: " + e.getMessage());
        }

    }
}

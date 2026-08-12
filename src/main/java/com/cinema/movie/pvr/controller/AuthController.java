package com.cinema.movie.pvr.controller;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema.movie.pvr.dto.GoogleLoginRequest;
import com.cinema.movie.pvr.service.GoogleAuthService;
import com.cinema.movie.pvr.service.GoogleUser;

import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // @GetMapping("/")
    // public Map<String, Object> currentUser(@AuthenticationPrincipal OAuth2User
    // user) {
    // if (user == null) {
    // return Map.of("authenticated", false);
    // }

    // return Map.of(
    // "authenticated", true,
    // "name", user.getAttribute("name"),
    // "email", user.getAttribute("email"),
    // "picture", user.getAttribute("picture")
    // );
    // }

    private final GoogleAuthService googleAuthService;

    public AuthController(GoogleAuthService googleAuthService) {
        this.googleAuthService = googleAuthService;
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(
            @RequestBody GoogleLoginRequest request) {

      System.out.println("Request is "+ request);
    System.out.println("Request getCredential( is "+ request.getCredential());

        try {
            GoogleUser googleUser = googleAuthService.verifyToken(request.getCredential());
            System.out.println("Google ID: " + googleUser.googleId());
            System.out.println("Email: " + googleUser.email());
            System.out.println("Name: " + googleUser.name());

            return ResponseEntity.ok(googleUser);
        } catch (Exception e) {
    e.printStackTrace();

    return ResponseEntity
            .badRequest()
            .body("Invalid Google credential: " + e.getMessage());
}

        //  @RequestBody Map<String, String> request) {

        // String credential = request.get("credential");

        // System.out.println("Google credential received: "
        //         + (credential != null));

        // if (credential == null || credential.isBlank()) {
        //     return ResponseEntity
        //             .badRequest()
        //             .body("Credential is missing");
        // }

        // return ResponseEntity.ok("Credential received");
    }
}

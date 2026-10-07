package com.cinema.movie.pvr.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class GoogleAuthService {

    private static final String GOOGLE_AUTH_BACKEND = "googleAuth";

    @Value("${google.client-id}")
    private String googleClientId;

    private final ResilientExternalCallService resilientExternalCallService;

    public GoogleAuthService(ResilientExternalCallService resilientExternalCallService) {
        this.resilientExternalCallService = resilientExternalCallService;
    }

    public GoogleUser verifyToken(String credential) throws Exception {

        System.out.println("googleClientId"+ googleClientId);

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(),
                GsonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(googleClientId))
                .build();

        GoogleIdToken token = resilientExternalCallService.execute(GOOGLE_AUTH_BACKEND, () -> {
            try {
                return verifier.verify(credential);
            } catch (Exception exception) {
                throw new ExternalServiceException("Google token verification failed", exception);
            }
        });
        if (token == null) {
            throw new RuntimeException("Invalid Google ID token");
        }

        GoogleIdToken.Payload payload = token.getPayload();
        String googleId = payload.getSubject();
        String email = payload.getEmail();
        String name = (String) payload.get("name");
        String picture = (String) payload.get("picture");

         return new GoogleUser(
                googleId,
                email,
                name,
                picture
        );
    }

}

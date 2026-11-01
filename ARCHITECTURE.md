# PVR backend services

The backend is split into three independently packaged Spring Boot applications. The browser uses the API gateway as its only backend URL.

| Component | Local port | Owns |
| --- | ---: | --- |
| `api-gateway` | 8080 | Browser entry point and HTTP routing |
| `auth-service` | 8081 | Google credential verification, user records, JWT creation |
| `movie-service` | 8082 | RapidAPI imports and movie catalog queries |

The gateway preserves the existing paths: `/api/auth/**` routes to auth and `/movies/**` routes to movie. Configure the frontend with `REACT_APP_API_BASE_URL=http://localhost:8080` when needed.

## Run locally

Start the stack with `docker compose up --build`. PostgreSQL creates `pvr_auth` and `pvr_movies` databases; the one-shot `database-init` container creates them idempotently, including when the existing `pvr-postgres-data` volume predates this split. The auth and movie services only connect to their own database.

The service split does not copy existing `users` or `imported_movies` rows into the new databases. Back up the current database and migrate those tables before switching a deployment that already has user or movie data; the Compose services will create fresh tables in their respective databases.

Set `GOOGLE_CLIENT_ID`, `JWT_SECRET`, and `RAPIDAPI_KEY` in the environment or a root `.env` file before starting the stack. The defaults allow the containers to start, but Google sign-in and movie importing need their respective credentials. For non-container local runs, start PostgreSQL and set `AUTH_DATABASE_URL` and `MOVIE_DATABASE_URL`; start each service from its Maven module, then the gateway.

## Maven modules

- `services/api-gateway`
- `services/auth-service`
- `services/movie-service`

Build an individual service and its Maven parent with `./mvnw -pl services/<module> -am package`.

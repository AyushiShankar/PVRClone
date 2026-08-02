import styles from "./MovieCard.module.scss";


export default function MovieCard({ movieList, handleLanguage }) {

  return (
    <div className={styles["movie-container"]}>
      { movieList?.map((movie) => (
          <div key={movie.id} className={styles["movie-card"]}>
            <img
              src={movie.primaryImage}
              alt={movie.originalTitle}
            />

            <div className={styles["movie-details"]}>
              <h3 className={styles["movie-title"]}>
                {movie.originalTitle}
              </h3>

              {Array.isArray(movie?.spokenLanguages) && (
                <p className={styles["movie-language"]}>
                  {movie.spokenLanguages
                    .map((language) => handleLanguage(language))
                    .join(", ")}
                </p>
              )}
              {Array.isArray(movie?.genres) && (
                <div className={styles["movie-genre"]}>
                  {movie.genres.map((genre, index) => (
                    <span
                      key={index}
                      className={styles["genre-item"]}
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

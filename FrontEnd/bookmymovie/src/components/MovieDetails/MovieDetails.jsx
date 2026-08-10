import styles from "../MovieDetails/MovieDetails.module.scss"

export default function MovieDetails({ movie, handleLanguage, variant }) {
  if (movie)
    return (
      <div className={`${styles["movie-details"]} ${styles[variant]}`}>
        <h3 className={styles["movie-title"]}>{movie.originalTitle}</h3>

        {handleLanguage && (
          <p className={styles["movie-language"]}>
            {movie.spokenLanguages
              ?.map((language) => handleLanguage(language))
              .join(", ")}
          </p>
        )}

        <div className={styles["movie-genre"]}>
          {movie.genres?.map((genre, index) => (
            <span key={index} className={styles["genre-item"]}>
              {genre}
            </span>
          ))}
        </div>
      </div>
    );
}

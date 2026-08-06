import styles from "../MovieDetails/MovieDetails.module.scss"

export default function MovieDefault({movie,handleLanguage}) {
  return (
    <div className={styles["movie-details"]}>
      <h3 className={styles["movie-title"]}>{movie.originalTitle}</h3>

      {handleLanguage && Array.isArray(movie?.spokenLanguages) && (
        <p className={styles["movie-language"]}>
          {movie.spokenLanguages
            .map((language) => handleLanguage(language))
            .join(", ")}
        </p>
      )}

      {Array.isArray(movie?.genres) && (
        <div className={styles["movie-genre"]}>
          {movie.genres.map((genre, index) => (
            <span key={index} className={styles["genre-item"]}>
              {genre}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

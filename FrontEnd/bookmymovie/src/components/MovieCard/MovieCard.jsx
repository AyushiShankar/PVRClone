import { useState } from "react";
import getYoutubeEmbedUrl from "../../helpers/home/iframe";
import styles from "./MovieCard.module.scss";
import Flag from "../TagFlag/Flag";
import Iframes from "../Iframes/Iframes";
import MovieDetails from "../MovieDetails/MovieDetails";

export default function MovieCard({ movieList, handleLanguage }) {
  const [playingMovieId, setPlayingMovieId] = useState(null);

  const getReleaseStatus = (releaseDate) => {
    const date = new Date(releaseDate);
    const today = new Date();

    const oneHundredEightyDaysAgo = new Date();
    oneHundredEightyDaysAgo.setDate(today.getDate() - 180);

    if (date >= oneHundredEightyDaysAgo && date <= today) {
      return "New Release";
    }

    return null;
  };

  return (
    <div className={styles["movie-container"]}>
      {movieList?.map((movie) => {
        const releaseStatus = getReleaseStatus(movie.releaseDate);
        const isPlaying = playingMovieId === movie.id;

        return (
          <div key={movie.id} className={styles["movie-card"]}>
            {releaseStatus && <Flag text={releaseStatus} />}

            <div className={styles["movie-card-image-wrapper"]}>
              <img
                src={movie.primaryImage}
                alt={movie.originalTitle}
                className={styles["movie-card-image"]}
              />

              <div className={styles["movie-card-hover"]}>
                {movie?.trailer && (
                  <button
                    type="button"
                    className={styles["play-button"]}
                    onClick={() => setPlayingMovieId(movie.id)}
                    aria-label={`Play trailer for ${movie.originalTitle}`}
                  >
                    <img src="/images/play-button.svg" alt="" />
                  </button>
                )}

                <button className={styles["book-button"]}>Book</button>
              </div>
            </div>

            <MovieDetails movie={movie} handleLanguage={handleLanguage} />

            {isPlaying && movie.trailer && (
              <Iframes
                onClick={() => setPlayingMovieId(null)}
                src={getYoutubeEmbedUrl(movie.trailer)}
                title={movie.originalTitle}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

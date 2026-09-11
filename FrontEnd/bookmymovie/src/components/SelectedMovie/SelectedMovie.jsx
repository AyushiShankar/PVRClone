import { getSelectedMovie } from "../../Redux/movieSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import getYoutubeEmbedUrl from "../../helpers/iframe";
import Iframes from "../../components/Iframes/Iframes";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import styles from "./SelectedMovie.module.scss";

export default function SelectedMovie() {
  const movie = useSelector(getSelectedMovie);

  const [isPlaying, setIsPlaying] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.thumbnail}>
        <img
          src={movie?.thumbnails?.[2]?.url}
          alt="movie_thumbnail"
          className={styles.image}
        />
      </div>
      <div className={styles.movieDetails}>
        <img
          src={movie?.thumbnails?.[2]?.url}
          alt="movie_thumbnail"
          className={styles.thumbnail}
        />
        {movie?.trailer && (
          <button
            type="button"
            className={styles["play-button"]}
            onClick={() => setIsPlaying(true)}
            aria-label={`Play trailer for ${movie.originalTitle}`}
          >
            <img src="/images/play-button.svg" alt="" />
          </button>
        )}

        {isPlaying && movie.trailer && (
          <Iframes
            onClick={() => setIsPlaying(null)}
            src={getYoutubeEmbedUrl(movie.trailer)}
            title={movie.originalTitle}
          />
        )}
        <div className={styles.details}>
          <MovieDetails movie={movie} />
          <p>{movie?.description}</p>
        </div>
      </div>
    </div>
  );
}

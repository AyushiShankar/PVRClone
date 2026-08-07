import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./TrailerSection.module.scss";
import Iframes from "../Iframes/Iframes";
import getYoutubeEmbedUrl from "../../helpers/home/iframe";
import MovieDetails from "../MovieDetails/MovieDetails";

export default function TrailersSection({ movieList }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const movieRefs = useRef([]);
  const movies = useMemo(
    () => (Array.isArray(movieList) ? movieList : []),
    [movieList]
  );

  const showPreviousTrailer = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + movies.length) % movies.length
    );
  };

  const showNextTrailer = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const trailerUrl = useMemo(
    () => getYoutubeEmbedUrl(movies[currentIndex]?.trailer),
    [currentIndex, movies]
  );

  useEffect(() => {
    movieRefs.current[currentIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [currentIndex]);

  useEffect(() => {
    setCurrentIndex(0);
    movieRefs.current = [];
  }, [movieList]);

  if (movies.length === 0) {
    return null;
  }

  const handleIFrame = (data) => {
    if (!data) return;
    setIsPlaying(true);
  };

  return (
    <div className={styles["trailer"]}>
      <div className={styles["trailers-section"]}>
        <img
          className={styles["trailer-thumbnail"]}
          src={movies[currentIndex]?.primaryImage}
          alt={movies[currentIndex]?.primaryTitle}
        />
        <ul className={styles["movie-list"]}>
          {movies.map((movie, index) => (
            <li
              key={movie.id || index}
              className={index === currentIndex ? styles["active"] : ""}
              ref={(element) => {
                movieRefs.current[index] = element;
              }}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={movie?.thumbnails?.[0]?.url || movie?.primaryImage}
                alt={movie?.originalTitle || "Movie trailer"}
              />
            </li>
          ))}
        </ul>
        {movies.length > 0 && (
          <>
            <span className={styles["movie-details"]}>
              <MovieDetails movie={movies[currentIndex]} variant="details" />
              <h4>
                {new Date(movies[currentIndex]?.releaseDate).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </h4>
            </span>
            <div className={styles["movie-trailer"]}>
              <button
                type="button"
                className={styles["play-button"]}
                onClick={() => handleIFrame(movies[currentIndex])}
                aria-label={`Play trailer for ${movies?.originalTitle}`}
              >
                <img
                  src="/images/play-button.svg"
                  alt="play_button"
                  className={styles["play-button"]}
                />
              </button>
            </div>
            <div className={styles["trailer-navigation"]}>
              <button
                className={styles["prev-button"]}
                onClick={showPreviousTrailer}
              >
                <img src="/images/back-button.svg" alt="Previous" />
              </button>
              <button
                className={styles["next-button"]}
                onClick={showNextTrailer}
              >
                <img src="/images/next-button.svg" alt="next" />
              </button>
            </div>
          </>
        )}
      </div>
      {isPlaying && (
        <Iframes
          onClick={() => setIsPlaying(false)}
          src={trailerUrl}
          title={movies[currentIndex]?.originalTitle}
        />
      )}
    </div>
  );
}

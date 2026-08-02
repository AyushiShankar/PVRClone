import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./TrailerSection.module.scss";

const getTrailerUrl = (trailer) => {
  if (!trailer) return null;
  if (typeof trailer === "string") return trailer;
  if (Array.isArray(trailer)) {
    return trailer.map(getTrailerUrl).find(Boolean) || null;
  }
  if (typeof trailer === "object") {
    return (
      trailer.url ||
      trailer.videoUrl ||
      trailer.embedUrl ||
      trailer.link ||
      trailer.href ||
      null
    );
  }
  return null;
};

const getYoutubeEmbedUrl = (trailer) => {
  const url = getTrailerUrl(trailer);
  if (!url) return null;
  try {
    const urlObject = new URL(url);
    if (
      urlObject.hostname === "www.youtube.com" ||
      urlObject.hostname === "youtube.com"
    ) {
      const videoId = urlObject.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    if (urlObject.hostname === "youtu.be") {
      const videoId = urlObject.pathname.slice(1);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    if (urlObject.pathname.startsWith("/embed/")) {
      return url;
    }
  } catch {
    return null;
  }
  return null;
};

export default function TrailersSection({ movieList }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const movieRefs = useRef([]);
  const movies = useMemo(
    () => (Array.isArray(movieList) ? movieList : []),
    [movieList]
  );

  const showPreviousTrailer = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + movies.length) % movies.length
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

  return (
    <div className={styles["trailers-section"]}>
      <iframe
        className={styles["trailer-video"]}
        src={trailerUrl}
        title={movies[currentIndex]?.originalTitle || "Movie Trailer"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
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
        <div>
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
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import styles from "./Movie.module.scss";
import { SECTIONS_CONSTANTS } from "../../config/SectionConfig";
import MovieCard from "../MovieCard/MovieCard";
import TrailersSection from "../TrailersSection/TrailersSection";

export default function Movie() {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const handleLanguage = (language) => {
    const langName = new Intl.DisplayNames(language, {
      type: "language",
    });

    return langName.of(language)?.toUpperCase() || language;
  };

  const handleMovie = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:8082/movies/sections?page=${page}&size=${size}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setMovies(data || {});
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleMovie();
  }, []);

  return (
    <div className={styles["movie-wrapper"]}>
      {Object.entries(movies).map(([sectionName, movieList]) => (
        <div key={sectionName} className={styles["movie-section"]}>
          <h2 className={styles["section-title"]}>
            {SECTIONS_CONSTANTS[sectionName]}
          </h2>
          {sectionName !== "newReleasesTrailers" ? (
            <MovieCard movieList={movieList} handleLanguage={handleLanguage} />
          ) : (
            <TrailersSection movieList={movieList} />
          )}
        </div>
      ))}
    </div>
  );
}
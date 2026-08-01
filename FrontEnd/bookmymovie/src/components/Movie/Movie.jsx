import { useEffect, useState } from "react";
import styles from "./Movie.module.scss";
// import Skeleton from "react-loading-skeleton/dist/skeleton.css";

export default function Movie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(1);
  const handleMovie = async () => {
    try {
      const response = await fetch(
        `http://localhost:8082/movies?page=${page}&size=${size}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log("Movies fetched:", movies);
  useEffect(() => {
    handleMovie();
  }, []);

  return (
    <div className={styles["movie-wrapper"]}>
      <h2>Now Showing</h2>
      <div className={styles["movie-container"]}>
        {movies?.map((movie) => (
          <div key={movie.id} className={styles["movie-card"]}>
            <img src={movie.primaryImage} alt={movie.title} />
            <span>
              <h3 className={styles["movie-title"]}>{movie.originalTitle}</h3>
              {movies?.spokenLanguages?.map((language, index) => (
                <span key={index} className={styles["movie-language"]}>
                  {language}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

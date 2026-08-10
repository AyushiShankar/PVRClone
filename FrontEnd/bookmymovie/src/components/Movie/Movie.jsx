import { useSelector } from "react-redux";
import styles from "./Movie.module.scss";
import { SECTIONS_CONSTANTS } from "../../config/SectionConfig";
import MovieCard from "../MovieCard/MovieCard";
import TrailersSection from "../TrailersSection/TrailersSection";
import { movieHalls } from "../../config/SectionConfig";
import {
  getMovieError,
  getMovieLoading,
  getMovieSections,
} from "../../Redux/movieSlice";

export default function Movie() {
  const movies = useSelector(getMovieSections);
  const loading = useSelector(getMovieLoading);
  const error = useSelector(getMovieError);

  const handleLanguage = (language) => {
    const langName = new Intl.DisplayNames(language, {
      type: "language",
    });

    return langName.of(language)?.toUpperCase() || language;
  };

  const handleSection = (sectionKey) => {
    const section = document.getElementById(sectionKey);
    if (!section) return;

    setTimeout(() => {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }, 300);
  };

  return (
    <div className={styles["movie-wrapper"]}>
      <div className={styles["navigationBar"]}>
        {Object.entries(SECTIONS_CONSTANTS).map((section, index) => (
          <nav
            key={index}
            onClick={() => handleSection(section[1])}
            className={styles["nav-name"]}
          >
            {section[1]}
          </nav>
        ))}
      </div>

      <div className={styles["movie-halls"]}>
        {Object.entries(movieHalls).map((hall) => (
          <img src={hall[1]} height="30" alt="IMAX" key={hall[0]} />
        ))}
      </div>

      {loading && <p className={styles["movie-status"]}>Loading movies...</p>}
      {error && <p className={styles["movie-error"]}>{error}</p>}

      {Object.entries(movies).map(([sectionName, movieList]) => (
        <div
          key={sectionName}
          id={SECTIONS_CONSTANTS[sectionName]}
          className={styles["movie-section"]}
        >
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

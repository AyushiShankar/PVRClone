import { movieSlides } from "../../config/SectionConfig";
import { useEffect, useState } from "react";
import styles from "./MovieCrousel.module.scss";

export default function MovieCrousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const length = movieSlides.length;

  useEffect(() => {
    if (length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, 2000);

    return () => clearInterval(timer);
  }, [length]);

  if (length === 0) {
    return null;
  }

  return (
    <div className={styles["movie-slider"]}>
      <div
        className={styles["movie-track"]}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {movieSlides.map((slide, index) => (
          <img
            key={slide}
            src={slide}
            className={styles.carousel}
            alt={`slider-${index + 1}`}
          />
        ))}
      </div>

      <ul className={styles["active-indexes"]}>
        {movieSlides.map((_, index) => (
          <li
            key={index}
            className={`${styles.index} ${
              currentIndex === index ? styles.active : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            {currentIndex === index && <span />}
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

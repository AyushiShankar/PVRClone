import { logo, headerIcons, headerNavBar } from "../../config/SectionConfig";
import styles from "./Header.module.scss";
import { useMemo, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { getMovieSections, getCon } from "../../Redux/movieSlice";
import MovieDetails from "../MovieDetails/MovieDetails";
import useDebounce from "../../utils/hooks/useDebouce";
import Login from "../Login/Login";

export default function Header() {
  const [text, setText] = useState("");
  const [loginModal, setLoginModal] = useState(false);
  const loginRef = useRef();
  const [search, setSearch] = useState(false);
  const [current, setCurrent] = useState(0);
  const movies = useSelector(getMovieSections);
  const newRelease = Object.entries(movies)[0][1];

  const debounceValue = useDebounce(text, 300);

  const filteredData = useMemo(() => {
    const query = debounceValue.trim().toLowerCase();
    if (!query) return [];
    return newRelease.filter((movie) => {
      return movie?.originalTitle?.toLowerCase()?.includes(query);
    });
  }, [debounceValue, newRelease]);

  const displayData = text.trim() ? filteredData : newRelease;

  const handleLanguage = (language) => {
    const langName = new Intl.DisplayNames(language, {
      type: "language",
    });

    return langName.of(language)?.toUpperCase() || language;
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles["logo-nav"]}>
          <img src={logo} alt="app_logo" className={styles["logo-image"]} />
          <ul className={styles.navOptions}>
            {headerNavBar.map((nav, index) => (
              <li
                className={`${styles.navigation} ${
                  index === current ? styles.active : ""
                }`}
                onClick={() => setCurrent(index)}
                key={index}
              >
                <img src={headerIcons?.[nav]} alt="home" key={index} />
                {nav}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.login}>
          <div className={styles.searchBox}>
            <img
              src={headerIcons?.Search}
              alt="search"
              className={styles.searchIcon}
            />

            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Search..."
              className={styles.searchBar}
              onClick={(e) => setSearch(true)}
            />
          </div>

          <button
            className={styles["login-button"]}
            onClick={() => setLoginModal(true)}
            disabled={loginModal}
          >
            <img
              src={headerIcons?.Login}
              alt=""
              style={{ width: "15px", height: "15px" }}
            />
            Login
          </button>
        </div>
        {search && (
          <div className={styles.search}>
            <img
              src="../images/cross-button.svg"
              alt="cross-icon"
              style={{
                width: "32px",
                height: "32px",
                margin: 0,
                position: "absolute",
                padding: 0,
                top: "10px",
                right: "30px",
                cursor: "pointer",
              }}
              onClick={() => setSearch(false)}
            />
            <div className={styles.content}>
              <h1
                style={{ fontSize: "24px", fontWeight: 700 }}
                className={styles.searchHeader}
              >
                Movies
              </h1>
              <div className={styles.list}>
                {displayData.map((movieList, index) => (
                  <div className={styles.movie} key={index}>
                    <img
                      src={movieList?.primaryImage}
                      alt="movieImage"
                      style={{ height: "95px", objectFit: "fill" }}
                      className={styles.movieImage}
                    />
                    <MovieDetails
                      movie={movieList}
                      variant=""
                      handleLanguage={handleLanguage}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
      {loginModal && <Login onClose={() => setLoginModal(false)} />}
    </>
  );
}

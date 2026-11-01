import styles from "./Search.module.scss";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedMovie } from "../../Redux/movieSlice";
import MovieDetails from "../MovieDetails/MovieDetails";

export default function Search({setSearch,setText,displayData,handleLanguage}){ 
const dispatch = useDispatch();
    return(
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
              onClick={() => (setSearch(false), setText(""))}
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
                    <NavLink
                      to={`/MovieSessions`}
                      className={styles.movieImageLink}
                      onClick={() => (
                        dispatch(setSelectedMovie(movieList)),
                        setSearch(false),
                        setText("")
                      )}
                    >
                      <img
                        src={movieList?.primaryImage}
                        alt="movieImage"
                        style={{ height: "95px", objectFit: "fill" }}
                        className={styles.movieImage}
                      />
                    </NavLink>
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
        );
}
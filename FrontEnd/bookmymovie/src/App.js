import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home/Home";
import {
  fetchMovieSections,
  getDefaultSectionsRequested,
  getPage,
  getSize,
  getIsAuthenticated,
  clearMovieState,
  logout,
} from "./Redux/movieSlice";

export default function App() {
  const dispatch = useDispatch();
  const page = useSelector(getPage);
  const size = useSelector(getSize);
  const defaultSectionsRequested = useSelector(getDefaultSectionsRequested);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const INACTIVITY_TIME = 15 * 60 * 1000;

  useEffect(() => {
    if (!defaultSectionsRequested) {
      dispatch(fetchMovieSections({ page, size }));
    }
  }, [defaultSectionsRequested, page, size]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    const resetTimer = () => {
      clearTimeout(timer);
    };
    let timer = setTimeout(() => {
      dispatch(logout());
      dispatch(clearMovieState());
    }, INACTIVITY_TIME);

    const actions = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];

    actions.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();
    return () => {
      clearTimeout(timer);

      actions.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [isAuthenticated]);

  return <Home />;
}

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home/Home";
import {
  fetchMovieSections,
  getDefaultSectionsRequested,
  getPage,
  getSize,
} from "./Redux/movieSlice";

export default function App() {
  const dispatch = useDispatch();
  const page = useSelector(getPage);
  const size = useSelector(getSize);
  const defaultSectionsRequested = useSelector(getDefaultSectionsRequested);

  useEffect(() => {
    if (!defaultSectionsRequested) {
      dispatch(fetchMovieSections({ page, size }));
    }
  }, [defaultSectionsRequested, dispatch, page, size]);

  return <Home />;
}

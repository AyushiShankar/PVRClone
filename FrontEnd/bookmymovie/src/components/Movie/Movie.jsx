import React, { useEffect, useState } from "react";
// import Skeleton from "react-loading-skeleton/dist/skeleton.css";

export default function Movie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const handleMovie = async () => {
    try {
      const response = await fetch(`http://localhost:8082/movies?page=${page}&size=${size}`);
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
    <div>
      {movies?.map((movie)=>
      <div key={movie.id}>
        <img src={movie.thumbnails} alt={movie.title} />
      </div>

      )}
    </div>
  );
}

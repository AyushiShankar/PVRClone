import MovieCrousel from "../../components/MovieCrousel/MovieCrousel";
import Movie from "../../components/Movie/Movie";
import Header from "../../components/Header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <MovieCrousel />
      <Movie />
    </>
  );
}
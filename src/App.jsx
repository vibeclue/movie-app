import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async (query = "") => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const endpoint = query
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
          : `${API_BASE_URL}/discover/movie?language=ru-RU&sort_by=popularity.desc`;

        const response = await fetch(endpoint, API_OPTIONS);

        if (!response.ok) {
          throw new Error("Ошибка получения данных");
        }

        const data = await response.json();

        if (data.response === "False") {
          setErrorMessage(data.error || "Ошибка загрузки данных.");
          setMovieList([]);
          return;
        }

        setMovieList(data.results || []);
      } catch (error) {
        console.log(`Error fetching movies: ${error}`);
        setErrorMessage("Ошибка получения фильмов. Попробуйте позже.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies(searchTerm);
  }, [searchTerm]); // запустится один раз на старте генерации страницы

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="hero.png" alt="hero banner" />
          <h1>
            Найди <span className="text-gradient">фильмы</span> для <br />
            посмотра без суеты
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className="mt-10">Все фильмы</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;

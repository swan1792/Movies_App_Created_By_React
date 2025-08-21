import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hero from "./assets/hero-img.png";
import Search from "./components/Search";

const API_BASE_URL = "https://api.themoviedb.org/3";
// const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDE4NTJlM2Q0ZmQ4MmFjMTA2MWMyZDA2ZTRjNzNjOCIsIm5iZiI6MTc1NTU3NDk4Ny45NzUwMDAxLCJzdWIiOiI2OGEzZjJjYjY4NGNhYjNlNWVjYTc2OWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Zh5e74YQZFcQHUrf_7tufO-G9j9cp0fXbdIjMm6S6ow"; // replace with your TMDb API key
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const GENRES = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 27, name: "Horror" },
  { id: 16, name: "Animation" },
  { id: 14, name: "Fantasy" },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [genreMovies, setGenreMovies] = useState({});
  const [loadingGenres, setLoadingGenres] = useState({});
  const [loadingSearch, setLoadingSearch] = useState(false);

  const fetchMoviesByGenre = async (genreId) => {
    setLoadingGenres((prev) => ({ ...prev, [genreId]: true }));
    try {
      const res = await fetch(
        `${API_BASE_URL}/discover/movie?with_genres=${genreId}&page=1`,
        API_OPTIONS
      );
      const data = await res.json();
      setGenreMovies((prev) => ({
        ...prev,
        [genreId]: data.results.slice(0, 6),
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingGenres((prev) => ({ ...prev, [genreId]: false }));
    }
  };

  useEffect(() => {
    GENRES.forEach((genre) => fetchMoviesByGenre(genre.id));
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoadingSearch(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
          searchTerm
        )}&page=1`,
        API_OPTIONS
      );
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSearch(false);
    }
  };

  return (
    <main className="wrapper">
      {/* Hero */}
      <header className="text-center mb-8">
        <img src={hero} alt="Hero" className="mx-auto mb-4" />
        <h1 className="text-3xl font-bold">
          Let Find Any <span className="text-gradient">Movie</span>, Enjoy without
          hassle
        </h1>
      </header>

      {/* Search */}
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />

      {/* Search Results */}
      {searchTerm && (
        <section className="my-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Search results for "{searchTerm}"
          </h2>

          {loadingSearch ? (
            <p className="text-white">Searching...</p>
          ) : searchResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-400 mt-10">
              <div className="animate-bounce mb-4 text-6xl">😢</div>
              <p className="text-lg">No movies found</p>
              <p className="text-sm mt-1">
                Try another keyword or check spelling
              </p>
            </div>
          ) : (
            <ul className="flex gap-4 overflow-x-auto hide-scrollbar">
              {searchResults.map((movie) => (
                <li key={movie.id} className="relative w-40 flex-shrink-0">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="block rounded-lg overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-105"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-60 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-center p-2 transition-opacity duration-300">
                      <p className="text-sm text-white font-semibold line-clamp-2">
                        {movie.title}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Genre Sections */}
      {GENRES.map((genre) => (
        <section key={genre.id} className="my-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">{genre.name}</h2>
            <Link
              to={`/genre/${genre.id}`}
              className="text-blue-500 hover:underline flex items-center"
            >
              More →
            </Link>
          </div>

          {loadingGenres[genre.id] ? (
            <div className="flex justify-center">
              <p className="text-white">Loading...</p>
            </div>
          ) : (
            <ul className="flex gap-4 overflow-x-auto hide-scrollbar">
              {genreMovies[genre.id]?.map((movie) => (
                <li key={movie.id} className="relative w-40 flex-shrink-0">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="block rounded-lg overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-105"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-60 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-center p-2 transition-opacity duration-300">
                      <p className="text-sm text-white font-semibold line-clamp-2">
                        {movie.title}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

    </main>
  );
};

export default App;





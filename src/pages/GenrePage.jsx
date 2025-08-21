import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinning from "../components/Spinning";
import MovieCard from "../components/MovieCard";

const API_BASE_URL = "https://api.themoviedb.org/3";
// const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDE4NTJlM2Q0ZmQ4MmFjMTA2MWMyZDA2ZTRjNzNjOCIsIm5iZiI6MTc1NTU3NDk4Ny45NzUwMDAxLCJzdWIiOiI2OGEzZjJjYjY4NGNhYjNlNWVjYTc2OWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Zh5e74YQZFcQHUrf_7tufO-G9j9cp0fXbdIjMm6S6ow";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: "GET",
  headers: { accept: "application/json", Authorization: `Bearer ${API_KEY}` },
};

const GenrePage = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/discover/movie?with_genres=${genreId}&page=${page}`, API_OPTIONS);
      const data = await res.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMovies(currentPage); }, [genreId, currentPage]);

  const getPageNumbers = () => {
    const totalToShow = 5;
    let start = Math.max(1, currentPage - Math.floor(totalToShow / 2));
    let end = Math.min(totalPages, start + totalToShow - 1);
    start = Math.max(1, end - totalToShow + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="wrapper">
      <h2 className="text-3xl font-bold text-white mb-6">Genre Movies</h2>

      {loading ? <Spinning /> :
        <>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          </ul>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 gap-2">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-3 py-1 bg-gray-300 rounded">Prev</button>
            {getPageNumbers().map(p => (
              <button key={p} onClick={() => setCurrentPage(p)} className={`px-3 py-1 rounded ${currentPage === p ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>{p}</button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-3 py-1 bg-gray-300 rounded">Next</button>
          </div>
        </>
      }
    </div>
  );
};

export default GenrePage;

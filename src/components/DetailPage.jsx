import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE_URL = "https://api.themoviedb.org/3";
// const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDE4NTJlM2Q0ZmQ4MmFjMTA2MWMyZDA2ZTRjNzNjOCIsIm5iZiI6MTc1NTU3NDk4Ny45NzUwMDAxLCJzdWIiOiI2OGEzZjJjYjY4NGNhYjNlNWVjYTc2OWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Zh5e74YQZFcQHUrf_7tufO-G9j9cp0fXbdIjMm6S6ow";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

const DetailPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMovieDetail = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);
            const data = await res.json();
            setMovie(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovieDetail();
    }, [id]);

    if (loading) return <p className="text-white">Loading...</p>;
    if (!movie) return <p className="text-red-500">Movie not found</p>;

    return (
        <main className="wrapper">
            <Link to="/" className="text-blue-400 mb-4 inline-block">
                ← Back
            </Link>

            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg w-full md:w-1/3"
                />
                <div className="text-white md:w-2/3">
                    <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                    <p className="text-gray-300 mb-4">{movie.tagline}</p>
                    <p className="mb-4">{movie.overview}</p>
                    <p>
                        <strong>Release Date:</strong> {movie.release_date}
                    </p>
                    <p>
                        <strong>Rating:</strong> {movie.vote_average} ({movie.vote_count} votes)
                    </p>
                    <p>
                        <strong>Genres:</strong> {movie.genres.map((g) => g.name).join(", ")}
                    </p>
                </div>
            </div>
        </main>
    );
};

export default DetailPage;

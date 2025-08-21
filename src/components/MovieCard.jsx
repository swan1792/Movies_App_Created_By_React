import React from 'react';
import { Link } from 'react-router-dom';
import star from '../assets/star.png';

const MovieCard = ({ movie }) => {
  const { id, title, vote_average, poster_path, release_date, original_language } = movie;

  return (
    <Link to={`/movie/${id}`} className="block">
      <div className="movie-card relative cursor-pointer group overflow-hidden rounded-lg shadow-lg">
        {/* Movie Poster */}
        <img
          src={poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : '/no-movie.png'}
          alt={title}
          className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-lg font-semibold">View Details</span>
        </div>

        {/* Movie Info */}
        <div className="mt-4">
          <h3 className="font-semibold">{title}</h3>

          <div className="content flex items-center gap-2 text-sm text-gray-600">
            <div className="rating flex items-center gap-1">
              <img src={star} alt="Star Icon" className="w-4 h-4" />
              <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            </div>

            <span>•</span>
            <p className="lang uppercase">{original_language}</p>

            <span>•</span>
            <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

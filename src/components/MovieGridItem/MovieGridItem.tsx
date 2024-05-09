import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types/MovieTypes';
import { Genre } from '../../types/Genre';
import './MovieGridItem.css'

interface MovieGridItemProps {
  movie: Movie;
}

const MovieGridItem: React.FC<MovieGridItemProps> = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <>
      <Link to={`/movie/${movie.id}`} className="movie-grid-item">
        <img src={posterUrl} alt={movie.title} />
        <h3>{movie.title}</h3>
        <p>Genres: {movie?.genres.map((genre: Genre) => genre.name).join(', ')}</p>
      </Link>
    </>
  );
};

export default MovieGridItem;

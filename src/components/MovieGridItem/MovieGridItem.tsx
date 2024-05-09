import React from 'react';
import { Movie } from '../../types/MovieTypes';
import './MovieGridItem.css'

interface MovieGridItemProps {
  movie: Movie;
}

const MovieGridItem: React.FC<MovieGridItemProps> = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-grid-item">
      <img src={posterUrl} alt={movie.title} onClick={()=>{console.log("Zanrovi ", movie.genres)}}/>
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieGridItem;

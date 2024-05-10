import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types/MovieTypes';
import { Genre } from '../../types/Genre';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './MovieGridItem.css';

interface MovieGridItemProps {
  movie: Movie;
}

const MovieGridItem: React.FC<MovieGridItemProps> = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <>
      <Link to={`/movie/${movie.id}`} className="movie-grid-item" style={{ textDecoration: 'none' }}>
        <img src={posterUrl} alt={movie.title} />
        <h3>{movie.title}</h3>
        <div className="genres-and-rating">
          <div className="vote-average">
            <FontAwesomeIcon icon={faStar} style={{color: "#FFD43B"}} />
            <p>{movie.vote_average}</p>
          </div>
          <div className="genres">
            {movie?.genres.map((genre: Genre, index: number) => (
              <p key={index}>{genre.name}</p>
            ))}
          </div>
        </div>
      </Link>
    </>
  );
};

export default MovieGridItem;

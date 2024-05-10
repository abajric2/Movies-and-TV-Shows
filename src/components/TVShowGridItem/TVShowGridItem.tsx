import React from 'react';
import { Link } from 'react-router-dom';
import { TvShow } from '../../types/TVShowTypes';
import { Genre } from '../../types/Genre';
import '../../styles/GridItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface TvShowGridItemProps {
  tvShow: TvShow;
}

const TvShowGridItem: React.FC<TvShowGridItemProps> = ({ tvShow }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`;

  return (
    <>
      <Link to={`/tvShow/${tvShow.id}`} className="grid-item" style={{ textDecoration: 'none' }}>
        <img src={posterUrl} alt={tvShow.name} />
        <h3>{tvShow.name}</h3>
        <div className="genres-and-rating">
          <div className="vote-average">
            <FontAwesomeIcon icon={faStar} style={{color: "#FFD43B"}} />
            <p>{tvShow.vote_average}</p>
          </div>
          <div className="genres">
            {tvShow?.genres.map((genre: Genre, index: number) => (
              <p key={index}>{genre.name}</p>
            ))}
          </div>
        </div>
      </Link>
    </>
  );
};

export default TvShowGridItem;

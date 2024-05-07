import React from 'react';
import { TvShow } from '../../types/TVShowTypes';
import './TVShowGridItem.css'

interface TvShowGridItemProps {
  tvShow: TvShow;
}

const TvShowGridItem: React.FC<TvShowGridItemProps> = ({ tvShow }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`;

  return (
    <div className="tv-show-grid-item">
      <img src={posterUrl} alt={tvShow.name} />
      <h3>{tvShow.name}</h3>
    </div>
  );
};

export default TvShowGridItem;

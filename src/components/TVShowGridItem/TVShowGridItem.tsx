import React from 'react';
import { Link } from 'react-router-dom';
import { TvShow } from '../../types/TVShowTypes';
import { Genre } from '../../types/Genre';
import './TVShowGridItem.css'

interface TvShowGridItemProps {
  tvShow: TvShow;
}

const TvShowGridItem: React.FC<TvShowGridItemProps> = ({ tvShow }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`;

  return (
    <Link to={`/tvShow/${tvShow.id}`} className="tv-show-grid-item">
      <img src={posterUrl} alt={tvShow.name} onClick={()=>{console.log(tvShow.genres)}}/>
      <h3>{tvShow.name}</h3>
      <p>Genres: {tvShow?.genres.map((genre: Genre) => genre.name).join(', ')}</p>
    </Link>
  );
};

export default TvShowGridItem;

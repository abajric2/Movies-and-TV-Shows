import React from 'react';
import { TvShow } from '../../types/TVShowTypes';
import TvShowGridItem from '../../components/TVShowGridItem/TVShowGridItem'
import './TVShowsPage.css'

interface TvShowsPageProps {
  tvShows: TvShow[]; 
}

const TVShowsPage: React.FC<TvShowsPageProps> = ({ tvShows }) => {
  return (
    <div className="tv-shows-grid">
      {tvShows.map((tvShow) => (
        <TvShowGridItem key={tvShow.id} tvShow={tvShow} />
      ))}
    </div>
  );
};

export default TVShowsPage;

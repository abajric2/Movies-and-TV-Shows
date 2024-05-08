import React, { useEffect, useState } from 'react';
import { TvShow } from '../../types/TVShowTypes';
import TvShowGridItem from '../../components/TVShowGridItem/TVShowGridItem';
import './TVShowsPage.css';
import { fetchTvShows } from '../../services/api';
import { useAppContext } from '../../context/AppContext';

interface TvShowsPageProps {
    tvShows: TvShow[];
}

const TVShowsPage: React.FC<TvShowsPageProps> = ({ tvShows }) => {
    const { activeTVShows, topTvShowsVisible } = useAppContext();
    const [loadedTvShows, setLoadedTvShows] = useState<TvShow[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedTvShows = await fetchTvShows();
                sessionStorage.setItem('tvShows', JSON.stringify(fetchedTvShows));
                setLoadedTvShows(fetchedTvShows);
            } catch (error) {
                console.error('Error fetching TV shows:', error);
            }
        };
        fetchData();
    }, [tvShows]);

    const tvShowsToDisplay = (topTvShowsVisible) ? (tvShows.length > 0 ? tvShows : loadedTvShows) : (activeTVShows);

    return (
        <div className="tv-shows-grid">
            {tvShowsToDisplay.map((tvShow) => (
                <TvShowGridItem key={tvShow.id} tvShow={tvShow} />
            ))}
        </div>
    );
};

export default TVShowsPage;

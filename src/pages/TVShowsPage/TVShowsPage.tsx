import React, { useEffect, useState } from 'react';
import { TvShow } from '../../types/TVShowTypes';
import TvShowGridItem from '../../components/TVShowGridItem/TVShowGridItem';
import './TVShowsPage.css';
import { fetchTvShows } from '../../services/api';

interface TvShowsPageProps {
    tvShows: TvShow[];
}

const TVShowsPage: React.FC<TvShowsPageProps> = ({ tvShows }) => {
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
        if (tvShows.length === 0) {
            const storedTvShows = sessionStorage.getItem('tvShows');
            if (storedTvShows) {
                const parsedTvShows = JSON.parse(storedTvShows) as TvShow[];
                setLoadedTvShows(parsedTvShows);
            } else {
                fetchData();
            }
        }
    }, [tvShows.length]);

    const tvShowsToDisplay = tvShows.length > 0 ? tvShows : loadedTvShows;

    return (
        <div className="tv-shows-grid">
            {tvShowsToDisplay.map((tvShow) => (
                <TvShowGridItem key={tvShow.id} tvShow={tvShow} />
            ))}
        </div>
    );
};

export default TVShowsPage;

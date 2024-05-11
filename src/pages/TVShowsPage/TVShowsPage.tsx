import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import GridItem from '../../components/GridItem/GridItem';
import { fetchTvShows } from '../../services/api';
import { TvShow } from '../../types/TVShow';
import '../../styles/Grid.css';

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
        <div className="grid">
            {tvShowsToDisplay.map((tvShow) => (
                <GridItem
                    key={tvShow.id}
                    media={tvShow}
                    path={`/tvShow/${tvShow.id}`}
                    title={tvShow.name}
                />
            ))}
        </div>
    );
};

export default TVShowsPage;

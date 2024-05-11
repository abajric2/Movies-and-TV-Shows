import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MediaDetails from '../../components/MediaDetails/MediaDetails';
import { fetchTVShowById } from '../../services/api';
import { TvShow } from '../../types/TVShow';

const TVShowDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [tvShow, setTvShow] = useState<TvShow | null>(null);
    const [showNotFound, setShowNotFound] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const tvShowData = await fetchTVShowById(Number(id));
                    setTvShow(tvShowData);
                }
            } catch (error) {
                console.error('Error fetching TV show details:', error);
                setTimeout(() => {
                    setShowNotFound(true);
                }, 1000);
            }
        };

        fetchData();
    }, [id]);

    return (
        <MediaDetails
            media={tvShow}
            title={tvShow ? tvShow.name : null}
            releaseDate={tvShow ? tvShow.first_air_date : null}
            notFound={showNotFound}
            mediaType='TV Show'
        />
    );
};

export default TVShowDetails;

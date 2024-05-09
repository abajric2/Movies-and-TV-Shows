import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTVShowById } from '../../services/api';
import { TvShow } from '../../types/TVShowTypes';
import { Genre } from '../../types/Genre';

const TVShowDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [tvShow, setTvShow] = useState<TvShow | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const tvShowData = await fetchTVShowById(Number(id));
                    setTvShow(tvShowData);
                }
            } catch (error) {
                console.error('Error fetching TV show details:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div>
            {tvShow && (
                <div className="tv-show-details">
                    <img src={tvShow.backdrop_path} alt={tvShow.name} />
                    <h2>{tvShow.name}</h2>
                    <p>
                        Genres: {tvShow?.genres.map((genre: Genre) => genre.name).join(', ')}
                    </p>
                    <p>{tvShow.overview}</p>
                    <p>Release Date: {tvShow.first_air_date}</p>
                    <p>Vote Average: {tvShow.vote_average}</p>
                </div>
            )}
        </div>
    );
};

export default TVShowDetails;

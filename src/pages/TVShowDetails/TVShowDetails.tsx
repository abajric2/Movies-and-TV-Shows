import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTVShowById } from '../../services/api';
import { TvShow } from '../../types/TVShowTypes';
import { Genre } from '../../types/Genre';
import './TVShowDetails.css'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const TVShowDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [tvShow, setTvShow] = useState<TvShow | null>(null);
    const backdropUrl = `https://image.tmdb.org/t/p/original${tvShow?.backdrop_path}`;
    const navigate = useNavigate();
    const { activeTab } = useAppContext(); 

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
                    <button onClick={() => {navigate(`/${activeTab}`)}}>Back</button>
                    <img className='tv-show-backdrop' src={backdropUrl} alt={tvShow.name} />
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

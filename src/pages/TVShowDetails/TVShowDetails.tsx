import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTVShowById } from '../../services/api';
import { TvShow } from '../../types/TVShowTypes';
import { Genre } from '../../types/Genre';
import '../../styles/MediaDetails.css'
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
        <div className="media-details-container">
            {tvShow && (
                <div>
                    <button className="back-button" onClick={() => { navigate(`/${activeTab}`) }}>Back</button>
                    <div className="media-container">
                        {tvShow.trailer ? (
                            <div className="video-wrapper">
                                <iframe
                                    width="900"
                                    height="400"
                                    src={`https://www.youtube.com/embed/${tvShow.trailer}`}
                                    title="YouTube video player"
                                    allowFullScreen
                                ></iframe>
                                <div className="media-title"><strong>{tvShow.name}</strong></div>
                            </div>
                        ) : (
                            <div className="image-wrapper">
                                <img src={backdropUrl} alt={tvShow?.name} className="media" />
                                <div className="media-title"><strong>{tvShow.name}</strong></div>
                            </div>
                        )}
                        <div className="basic-details">
                            <h2>{tvShow.name}</h2>
                            <p>
                                <strong>Genres:</strong> {tvShow?.genres.map((genre: Genre) => genre.name).join(', ')}
                            </p>
                            <p><strong>Release Date:</strong> {tvShow.first_air_date}</p>
                            <p><strong>Rating:</strong> {tvShow.vote_average}</p>
                        </div>
                    </div>
                    <div className="overview">
                        <h3>Overview</h3>
                        <p>{tvShow.overview}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TVShowDetails;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieById } from '../../services/api';
import { Movie } from '../../types/MovieTypes';
import { Genre } from '../../types/Genre';
import '../../styles/MediaDetails.css'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const MovieDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const backdropUrl = `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`;
    const navigate = useNavigate();
    const { activeTab } = useAppContext();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieData = await fetchMovieById(Number(id));
                setMovie(movieData);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className="media-details-container">
            {movie ? (
                <div>
                    <button className="back-button" onClick={() => { navigate(`/${activeTab}`) }}>Back</button>
                    <div className="media-container">
                        {movie.trailer ? (
                            <div className="video-wrapper">
                                <iframe
                                    width="900"
                                    height="400"
                                    src={`https://www.youtube.com/embed/${movie.trailer}`}
                                    title="YouTube video player"
                                    allowFullScreen
                                ></iframe>
                                <div className="media-title"><strong>{movie.title}</strong></div>
                            </div>
                        ) : (
                            <div className="image-wrapper">
                                <img src={backdropUrl} alt={movie?.title} className="media" />
                                <div className="media-title"><strong>{movie.title}</strong></div>
                            </div>
                        )}
                        <div className="basic-details">
                            <h2>{movie.title}</h2>
                            <p>
                                <strong>Genres:</strong> {movie?.genres.map((genre: Genre) => genre.name).join(', ')}
                            </p>
                            <p><strong>Release Date:</strong> {movie.release_date}</p>
                            <p><strong>Rating:</strong> {movie.vote_average}</p>
                        </div>
                    </div>
                    <div className="overview">
                        <h3>Overview</h3>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            ) : (
                <div className='not-found'>Movie not found</div>
            )}
        </div>
    );
};

export default MovieDetails;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieById } from '../../services/api';
import { Movie } from '../../types/MovieTypes';
import { Genre } from '../../types/Genre';

const MovieDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieData = await fetchMovieById(Number(id));
                console.log("Movie ", movieData)
                setMovie(movieData);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div>
            {movie && (<div className="movie-details">
                <img src={movie?.backdrop_path} alt={movie?.title} />
                <h2>{movie?.title}</h2>
                <p>
                    Genres: {movie?.genres.map((genre: Genre) => genre.name).join(', ')}
                </p>
                <p>{movie?.overview}</p>
                <p>Release Date: {movie?.release_date}</p>
                <p>Vote Average: {movie?.vote_average}</p>
            </div>)}
        </div>
    );
};

export default MovieDetails;

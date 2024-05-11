import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MediaDetails from '../../components/MediaDetails/MediaDetails';
import { fetchMovieById } from '../../services/api';
import { Movie } from '../../types/Movie';

const MovieDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [movieNotFound, setMovieNotFound] = useState<boolean>(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieData = await fetchMovieById(Number(id));
                setMovie(movieData);
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setTimeout(() => {
                    setMovieNotFound(true);
                }, 1000);
            }
        };

        fetchData();
    }, [id]);

    return (
        <MediaDetails
            media={movie}
            title={movie ? movie.title : null}
            releaseDate={movie ? movie.release_date : null}
            notFound={movieNotFound}
            mediaType='Movie'
        />
    );
};

export default MovieDetails;

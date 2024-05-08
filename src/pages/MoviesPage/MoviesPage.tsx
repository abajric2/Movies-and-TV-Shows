import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/MovieTypes';
import MovieGridItem from '../../components/MovieGridItem/MovieGridItem';
import './MoviesPage.css';
import { fetchMovies } from '../../services/api';

interface MoviesPageProps {
    movies: Movie[];
}

const MoviesPage: React.FC<MoviesPageProps> = ({ movies }) => {
    const [loadedMovies, setLoadedMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedMovies = await fetchMovies();
                sessionStorage.setItem('movies', JSON.stringify(fetchedMovies));
                setLoadedMovies(fetchedMovies);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchData();
    }, [movies.length]);

    const moviesToDisplay = movies.length > 0 ? movies : loadedMovies;

    return (
        <div className="movies-grid">
            {moviesToDisplay.map((movie) => (
                <MovieGridItem key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MoviesPage;

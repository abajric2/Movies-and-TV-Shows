import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import GridItem from '../../components/GridItem/GridItem';
import { fetchMovies } from '../../services/api';
import { Movie } from '../../types/Movie';
import '../../styles/Grid.css';

interface MoviesPageProps {
    movies: Movie[];
}

const MoviesPage: React.FC<MoviesPageProps> = ({ movies }) => {
    const { activeMovies, topMoviesVisible } = useAppContext();
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
    }, [movies]);

    const moviesToDisplay = (topMoviesVisible) ? (movies.length > 0 ? movies : loadedMovies) : (activeMovies);

    return (
        <div className="grid">
            {moviesToDisplay.map((movie) => (
                <GridItem
                    key={movie.id}
                    media={movie}
                    path={`/movie/${movie.id}`}
                    title={movie.title}
                />
            ))}
        </div>
    );
};

export default MoviesPage;

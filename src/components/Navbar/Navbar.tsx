import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTvShows, fetchMovies } from '../../services/api';
import { TvShow } from '../../types/TVShowTypes';
import { Movie } from '../../types/MovieTypes';

interface NavbarProps {
    activeTab: 'movies' | 'tvShows';
    setTvShows: React.Dispatch<React.SetStateAction<TvShow[]>>;
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setTvShows, setMovies }) => {
    const navigate = useNavigate();

    const handleTabClick = async (tab: 'movies' | 'tvShows') => {
        if (tab === 'tvShows') {
            const fetchedTvShows = await fetchTvShows();
            sessionStorage.setItem('tvShows', JSON.stringify(fetchedTvShows));
            setTvShows(fetchedTvShows);
        }  else {
            const fetchedMovies = await fetchMovies();
            sessionStorage.setItem('movies', JSON.stringify(fetchedMovies));
            setMovies(fetchedMovies);
        }
        navigate(`/${tab}`);
    };

    return (
        <div className="navbar">
            <button
                className={activeTab === 'movies' ? 'active' : ''}
                onClick={() => handleTabClick('movies')}
            >
                Movies
            </button>
            <button
                className={activeTab === 'tvShows' ? 'active' : ''}
                onClick={() => handleTabClick('tvShows')}
            >
                TV Shows
            </button>
        </div>
    );
};

export default Navbar;

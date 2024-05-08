import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTvShows, fetchMovies } from '../../services/api';
import { TvShow } from '../../types/TVShowTypes';
import { Movie } from '../../types/MovieTypes';
import { useAppContext } from '../../context/AppContext';
import './Navbar.css'

interface NavbarProps {
    setTvShows: React.Dispatch<React.SetStateAction<TvShow[]>>;
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const Navbar: React.FC<NavbarProps> = ({ setTvShows, setMovies }) => {
    const navigate = useNavigate();
    const { activeTab, setActiveTab } = useAppContext(); 

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
        setActiveTab(tab); 
        console.log("Aktivan ", activeTab)
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
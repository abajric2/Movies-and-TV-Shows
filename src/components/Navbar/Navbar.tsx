import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTvShows } from '../../services/api';
import { TvShow } from '../../types/TVShowTypes';

interface NavbarProps {
    activeTab: 'movies' | 'tvShows';
    setTvShows: React.Dispatch<React.SetStateAction<TvShow[]>>;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setTvShows }) => {
    const navigate = useNavigate();

    const handleTabClick = async (tab: 'movies' | 'tvShows') => {
        if (tab === 'tvShows') {
            const fetchedTvShows = await fetchTvShows();
            sessionStorage.setItem('tvShows', JSON.stringify(fetchedTvShows));
            setTvShows(fetchedTvShows);
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

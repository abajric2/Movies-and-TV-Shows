import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { searchMovies, searchTVShows } from '../../services/api';

const Search: React.FC = () => {
    const { activeTab, setActiveMovies, setActiveTVShows, setTopMoviesVisible, setTopTvShowsVisible } = useAppContext();
    const [searchTerm, setSearchTerm] = useState(sessionStorage.getItem('searchTerm') || ''); 

    useEffect(() => {
        sessionStorage.setItem('searchTerm', searchTerm);

        const handleInput = () => {
            if (searchTerm.length >= 3) {
                if (activeTab === 'movies') {
                    searchMovies(searchTerm)
                        .then((result) => {
                            setActiveMovies(result)
                            setTopMoviesVisible(false)
                        })
                        .catch((error) => {
                            console.error('Error searching movies:', error);
                        });
                } else if (activeTab === 'tvShows') {
                    searchTVShows(searchTerm)
                        .then((result) => {
                            setActiveTVShows(result)
                            setTopTvShowsVisible(false)
                        })
                        .catch((error) => {
                            console.error('Error searching TV shows:', error);
                        });
                }
            } else {
                if (activeTab === 'movies') {
                    setTopMoviesVisible(true)
                } else if (activeTab === 'tvShows') {
                    setTopTvShowsVisible(true)
                }
            }
        };

        const timeoutId = setTimeout(handleInput, 1000);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, activeTab, setActiveMovies, setActiveTVShows, setTopMoviesVisible, setTopTvShowsVisible]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <input type="text" value={searchTerm} onChange={handleInputChange} />
        </div>
    );
};

export default Search;

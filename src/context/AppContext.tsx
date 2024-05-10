import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppContextValue, AppContextProviderProps } from '../types/AppContext';
import { ActiveTab } from '../types/ActiveTab';
import { Movie } from '../types/Movie';
import { TvShow } from '../types/TVShow';

export const AppContext = createContext<AppContextValue>({
    activeTab: 'tvShows',
    setActiveTab: () => { },
    activeMovies: [],
    setActiveMovies: () => { },
    activeTVShows: [],
    setActiveTVShows: () => { },
    topMoviesVisible: true,
    setTopMoviesVisible: () => { },
    topTvShowsVisible: true,
    setTopTvShowsVisible: () => { }
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
        const storedActiveTab = sessionStorage.getItem('activeTab');
        return storedActiveTab ? (storedActiveTab as ActiveTab) : 'tvShows';
    });

    const [activeMovies, setActiveMovies] = useState<Movie[]>([]);
    const [activeTVShows, setActiveTVShows] = useState<TvShow[]>([]);
    const [topMoviesVisible, setTopMoviesVisible] = useState(true);
    const [topTvShowsVisible, setTopTvShowsVisible] = useState(true);

    useEffect(() => {
        sessionStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    return (
        <AppContext.Provider value={{
            activeTab,
            setActiveTab,
            activeMovies,
            setActiveMovies,
            activeTVShows,
            setActiveTVShows,
            topMoviesVisible,
            setTopMoviesVisible,
            topTvShowsVisible,
            setTopTvShowsVisible
        }}>
            {children}
        </AppContext.Provider>
    );
};
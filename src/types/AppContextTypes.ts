import { Dispatch, SetStateAction } from 'react';
import { Movie } from '../types/MovieTypes';
import { TvShow } from '../types/TVShowTypes';

export interface AppContextValue {
    activeTab: ActiveTab;
    setActiveTab: Dispatch<SetStateAction<ActiveTab>>;
    activeMovies: Movie[];
    setActiveMovies: Dispatch<SetStateAction<Movie[]>>;
    activeTVShows: TvShow[];
    setActiveTVShows: Dispatch<SetStateAction<TvShow[]>>;
    topMoviesVisible: boolean;
    setTopMoviesVisible: Dispatch<SetStateAction<boolean>>;
    topTvShowsVisible: boolean;
    setTopTvShowsVisible: Dispatch<SetStateAction<boolean>>;
}


export interface AppContextProviderProps {
    children: React.ReactNode;
}

export type ActiveTab = 'movies' | 'tvShows';

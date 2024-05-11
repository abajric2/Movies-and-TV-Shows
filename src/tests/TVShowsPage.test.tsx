import React from 'react';
import { render, screen } from '@testing-library/react';
import TVShowsPage from '../pages/TVShowsPage/TVShowsPage';
import { fetchTvShows } from '../services/api';
import { useAppContext } from '../context/AppContext';
import { TvShow } from '../types/TVShow';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../services/api', () => ({
    fetchTvShows: jest.fn(),
}));

jest.mock('../context/AppContext', () => ({
    useAppContext: jest.fn() as jest.Mock,
}));

const mockAppContext = {
    activeTab: 'tvShows',
    activeMovies: [],
    setActiveMovies: jest.fn(),
    activeTVShows: [{ id: 2, name: 'TV Show 2' } as TvShow],
    setActiveTVShows: jest.fn(),
    topMoviesVisible: true,
    setTopMoviesVisible: jest.fn(),
    topTvShowsVisible: true,
    setTopTvShowsVisible: jest.fn(),
};

const mockFetchedTVShows = [
    {
        id: 1,
        name: 'TV Show 1'
    }
]

/*
When the global variable topTvShowsVisible is true 
and the list sent to the component is empty, 
the tv shows fetched from the API are displayed.
*/
test('Display fetched TV Shows from API', async () => {
    (fetchTvShows as jest.Mock).mockResolvedValue(mockFetchedTVShows);

    (useAppContext as jest.Mock).mockReturnValue(mockAppContext);

    render(
        <Router>
            <TVShowsPage tvShows={[]} />
        </Router>
    );

    expect(await screen.findByText('TV Show 1')).toBeInTheDocument();
});

/*
When the global variable topTvShowsVisible is true 
and the list sent to the component is not empty, 
the tv shows from that list are displayed.
*/
test('Display TV shows from props', async () => {
    (fetchTvShows as jest.Mock).mockResolvedValue(mockFetchedTVShows);

    (useAppContext as jest.Mock).mockReturnValue(mockAppContext);

    render(
        <Router>
            <TVShowsPage tvShows={[{ id: 3, name: 'TV Show 3' } as TvShow]} />
        </Router>
    );

    expect(await screen.findByText('TV Show 3')).toBeInTheDocument();
});

/*
When the global variable topTvShowsVisible is false 
tv shows from global variable activeTVShows are displayed.
*/
test('Display active TV shows', async () => {
    (fetchTvShows as jest.Mock).mockResolvedValue(mockFetchedTVShows);

    const updatedContext = {
        ...mockAppContext,
        topTvShowsVisible: false,
    };

    (useAppContext as jest.Mock).mockReturnValue(updatedContext);

    render(
        <Router>
            <TVShowsPage tvShows={[{ id: 3, name: 'TV Shows 3' } as TvShow]} />
        </Router>
    );

    expect(await screen.findByText('TV Show 2')).toBeInTheDocument();
});

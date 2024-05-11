import React from 'react';
import { render, screen } from '@testing-library/react';
import MoviesPage from '../pages/MoviesPage/MoviesPage';
import { fetchMovies } from '../services/api';
import { useAppContext } from '../context/AppContext';
import { Movie } from '../types/Movie';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../services/api', () => ({
    fetchMovies: jest.fn(),
}));

jest.mock('../context/AppContext', () => ({
    useAppContext: jest.fn() as jest.Mock,
}));

const mockAppContext = {
    activeTab: 'movies',
    activeMovies: [{ id: 2, title: 'Movie 2' } as Movie],
    setActiveMovies: jest.fn(),
    activeTVShows: [],
    setActiveTVShows: jest.fn(),
    topMoviesVisible: true,
    setTopMoviesVisible: jest.fn(),
    topTvShowsVisible: true,
    setTopTvShowsVisible: jest.fn(),
};

const mockFetchedMovies = [
    {
        id: 1,
        title: 'Movie 1'
    }
]

/*
When the global variable topMoviesVisible is true 
and the list sent to the component is empty, 
the movies fetched from the API are displayed.
*/
test('Display fetched movies from API', async () => {
    (fetchMovies as jest.Mock).mockResolvedValue(mockFetchedMovies);

    (useAppContext as jest.Mock).mockReturnValue(mockAppContext);

    render(
        <Router>
            <MoviesPage movies={[]} />
        </Router>
    );

    expect(await screen.findByText('Movie 1')).toBeInTheDocument();
});

/*
When the global variable topMoviesVisible is true 
and the list sent to the component is not empty, 
the movies from that list are displayed.
*/
test('Display movies from props', async () => {
    (fetchMovies as jest.Mock).mockResolvedValue(mockFetchedMovies);

    (useAppContext as jest.Mock).mockReturnValue(mockAppContext);

    render(
        <Router>
            <MoviesPage movies={[{ id: 3, title: 'Movie 3' } as Movie]} />
        </Router>
    );

    expect(await screen.findByText('Movie 3')).toBeInTheDocument();
});

/*
When the global variable topMoviesVisible is false 
movies from global variable activeMovies are displayed.
*/
test('Display active movies', async () => {
    (fetchMovies as jest.Mock).mockResolvedValue(mockFetchedMovies);

    const updatedContext = {
        ...mockAppContext,
        topMoviesVisible: false,
    };

    (useAppContext as jest.Mock).mockReturnValue(updatedContext);

    render(
        <Router>
            <MoviesPage movies={[{ id: 3, title: 'Movie 3' } as Movie]} />
        </Router>
    );

    expect(await screen.findByText('Movie 2')).toBeInTheDocument();
});

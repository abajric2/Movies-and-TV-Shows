import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MovieDetails from '../pages/MovieDetails/MovieDetails';
import { useParams } from 'react-router-dom';
import { fetchMovieById } from '../services/api';
import { Movie } from '../types/Movie';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

jest.mock('../services/api', () => ({
    fetchMovieById: jest.fn(),
}));

const movieData: Movie | null = {
    id: 1,
    title: 'Movie Title',
    release_date: '2024-05-01',
    vote_average: 8.5,
    overview: 'This is a movie overview',
    genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Adventure' }],
    backdrop_path: '/backdrop.jpg',
    poster_path: '/poster.jpg',
    trailer: 'trailerId',
    genre_ids: []
};

test('renders movie details when movie exists', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (fetchMovieById as jest.Mock).mockResolvedValue(movieData);

    render(
        <Router>
            <MovieDetails />
        </Router>
    );
    expect(await screen.findByRole('heading', { name: 'Movie Title', level: 2 })).toBeInTheDocument();
    expect(await screen.findByText('2024-05-01')).toBeInTheDocument();
    expect(await screen.findByText('8.5')).toBeInTheDocument();
    expect(await screen.findByText('This is a movie overview')).toBeInTheDocument();
    expect(await screen.findByText('Action, Adventure')).toBeInTheDocument();
});

test('renders movie not found when movie does not exist', async () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (fetchMovieById as jest.Mock).mockRejectedValue(new Error('Invalid movie ID'));

    render(
        <Router>
            <MovieDetails />
        </Router>
    );

    await waitFor(() => {
        expect(screen.getByText('Movie not found')).toBeInTheDocument();
    }, { timeout: 2000 });

    console.error = originalConsoleError;
});


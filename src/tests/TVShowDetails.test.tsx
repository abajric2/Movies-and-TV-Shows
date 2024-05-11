import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TVShowDetails from '../pages/TVShowDetails/TVShowDetails';
import { useParams } from 'react-router-dom';
import { fetchTVShowById } from '../services/api';
import { TvShow } from '../types/TVShow';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

jest.mock('../services/api', () => ({
    fetchTVShowById: jest.fn(),
}));

const tvShowData: TvShow | null = {
    id: 1,
    name: 'TV Show Title',
    first_air_date: '2024-05-01',
    vote_average: 8.5,
    overview: 'This is a TV show overview',
    genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Adventure' }],
    backdrop_path: '/backdrop.jpg',
    poster_path: '/poster.jpg',
    trailer: 'trailerId',
    genre_ids: []
};

test('renders tv show details when tv show exists', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (fetchTVShowById as jest.Mock).mockResolvedValue(tvShowData);

    render(
        <Router>
            <TVShowDetails />
        </Router>
    );
    expect(await screen.findByRole('heading', { name: 'TV Show Title', level: 2 })).toBeInTheDocument();
    expect(await screen.findByText('2024-05-01')).toBeInTheDocument();
    expect(await screen.findByText('8.5')).toBeInTheDocument();
    expect(await screen.findByText('This is a TV show overview')).toBeInTheDocument();
    expect(await screen.findByText('Action, Adventure')).toBeInTheDocument();
});

test('renders tv show not found when tv show does not exist', async () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (fetchTVShowById as jest.Mock).mockRejectedValue(new Error('Invalid TV show ID'));

    render(
        <Router>
            <TVShowDetails />
        </Router>
    );

    await waitFor(() => {
        expect(screen.getByText('TV Show not found')).toBeInTheDocument();
    }, { timeout: 2000 });

    console.error = originalConsoleError;
});


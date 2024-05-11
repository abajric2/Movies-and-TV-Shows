import React from 'react';
import { render, screen } from '@testing-library/react';
import GridItem from '../components/GridItem/GridItem';
import { Movie } from '../types/Movie';
import { BrowserRouter as Router } from 'react-router-dom';

test('Display basic information of existing movie', async () => {
    const media: Movie = {
        id: 1,
        title: 'Movie 1',
        vote_average: 8.5,
        release_date: '',
        backdrop_path: '',
        poster_path: "",
        overview: "",
        genre_ids: [],
        genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Adventure' }]
    };
    const title = 'Movie 1';
    const path = '';

    render(
        <Router>
            <GridItem media={media} title={title} path={path} />
        </Router>
    );

    expect(await screen.findByText('Movie 1')).toBeInTheDocument();
    expect(await screen.findByText('8.5')).toBeInTheDocument();
    expect(await screen.findByText('Action')).toBeInTheDocument();
    expect(await screen.findByText('Adventure')).toBeInTheDocument();
});
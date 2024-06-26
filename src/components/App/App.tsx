import React, { useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';
import { AppProvider } from '../../context/AppContext';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import TvShowsPage from '../../pages/TVShowsPage/TVShowsPage';
import MovieDetails from '../../pages/MovieDetails/MovieDetails';
import TVShowDetails from '../../pages/TVShowDetails/TVShowDetails';
import { TvShow } from '../../types/TVShow';
import { Movie } from '../../types/Movie';

const App: React.FC = () => {
  const [tvShows, setTvShows] = useState<TvShow[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const location = useLocation();

  const showNavbarAndSearch = !location.pathname.startsWith('/movie/') && !location.pathname.startsWith('/tvShow/');

  return (
    <AppProvider>
      <div className="app">
        {showNavbarAndSearch && (
          <>
            <Navbar setTvShows={setTvShows} setMovies={setMovies} />
            <Search />
          </>
        )}
        <Routes>
          <Route path="/movies" element={<MoviesPage movies={movies} />} />
          <Route path="/tvShows" element={<TvShowsPage tvShows={tvShows} />} />
          <Route path="/" element={<Navigate to="/tvShows" />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tvShow/:id" element={<TVShowDetails />} />
        </Routes>
      </div>
    </AppProvider>
  );
};

export default App;

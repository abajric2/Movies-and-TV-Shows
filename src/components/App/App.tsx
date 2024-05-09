import React, { useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import TvShowsPage from '../../pages/TVShowsPage/TVShowsPage';
import { TvShow } from '../../types/TVShowTypes';
import { Movie } from '../../types/MovieTypes';
import { AppProvider } from '../../context/AppContext';
import Search from '../../components/Search/Search';
import MovieDetails from '../../pages/MovieDetails/MovieDetails';
import TVShowDetails from '../../pages/TVShowDetails/TVShowDetails';

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

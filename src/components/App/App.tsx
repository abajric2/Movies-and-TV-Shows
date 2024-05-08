import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import TvShowsPage from '../../pages/TVShowsPage/TVShowsPage';
import { TvShow } from '../../types/TVShowTypes';
import { Movie } from '../../types/MovieTypes';
import { AppProvider } from '../../context/AppContext';
import Search from '../../components//Search/Search'

const App: React.FC = () => {
  const [tvShows, setTvShows] = useState<TvShow[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Navbar setTvShows={setTvShows} setMovies={setMovies} />
          <Search/>
          <Routes>
            <Route path="/movies" element={<MoviesPage movies={movies} />} />
            <Route path="/tvShows" element={<TvShowsPage tvShows={tvShows} />} />
            <Route path="/" element={<Navigate to="/tvShows" />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;

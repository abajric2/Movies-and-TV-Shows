import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import Navbar from '../Navbar/Navbar';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import TvShowsPage from '../../pages/TVShowsPage/TVShowsPage';
import { TvShow } from '../../types/TVShowTypes';
import { Movie } from '../../types/MovieTypes';

const App: React.FC = () => {
  const [tvShows, setTvShows] = useState<TvShow[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  return (
    <Router>
      <div className="app">
        <Navbar activeTab={'movies'} setTvShows={setTvShows} setMovies={setMovies}/>
        <Routes> 
          <Route path="/movies" element={<MoviesPage movies={movies}/>} /> 
          <Route path="/tvShows" element={<TvShowsPage tvShows={tvShows} />} /> 
          <Route path="/" element={<Navigate to="/tvShows" />} />
        </Routes> 
      </div>
    </Router>
  );
};

export default App;

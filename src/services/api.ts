import axios, { AxiosRequestConfig } from 'axios';
import { TvShow, TvShowsResponse } from '../types/TVShowTypes';
import { Movie, MovieResponse } from '../types/MovieTypes'

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '18d8131ff2d912b3171edc9bd7f4c492';

const fetchData = async <T>(config: AxiosRequestConfig): Promise<T> => {
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const fetchTvShows = async (): Promise<TvShow[]> => {
    const url = `${API_BASE_URL}/tv/top_rated?language=en-US&page=1&api_key=${API_KEY}`;
    const config: AxiosRequestConfig = { url };
    const data = await fetchData<TvShowsResponse>(config);

    if (!data || !data.results) {
        throw new Error('Invalid data format received from API');
    }

    const tvShows = data.results.slice(0, 10);
    return tvShows;
};

export const fetchMovies = async (): Promise<Movie[]> => {
    const url = `${API_BASE_URL}/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`;
    const config: AxiosRequestConfig = { url };
    const data = await fetchData<MovieResponse>(config);

    if (!data || !data.results) {
        throw new Error('Invalid data format received from API');
    }

    const tvShows = data.results.slice(0, 10);
    return tvShows;
};

export default fetchData;

import axios, { AxiosRequestConfig } from 'axios';
import { TvShow, TvShowsResponse } from '../types/TVShowTypes';
import { Movie, MovieResponse } from '../types/MovieTypes';
import { Genre } from '../types/Genre';
import { Trailer } from '../types/Trailer';

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

const fetchGenres = async (mediaType: 'movie' | 'tv'): Promise<Genre[]> => {
    const url = `${API_BASE_URL}/genre/${mediaType}/list?language=en-US&api_key=${API_KEY}`;
    const config: AxiosRequestConfig = { url };
    const data = await fetchData<{ genres: Genre[] }>(config);

    if (!data || !data.genres) {
        throw new Error('Invalid data format received from API');
    }

    return data.genres;
};

const mapGenreIdsToStrings = async <T extends { id:number; genre_ids: number[] }>(
    mediaType: 'movie' | 'tv',
    items: T[]
): Promise<T[]> => {
    const genres = await fetchGenres(mediaType);
    return items.map(item => {
        const genreObjects = item.genre_ids.map(id => {
            const genre = genres.find(genre => genre.id === id);
            return genre ? { id: item.id, name: genre.name } : null;
        }).filter(genre => genre !== null) as Genre[]; 
        return { ...item, genres: genreObjects };
    });
};

export const fetchTvShows = async (): Promise<TvShow[]> => {
    const url = `${API_BASE_URL}/tv/top_rated?language=en-US&page=1&api_key=${API_KEY}`;
    const config: AxiosRequestConfig = { url };
    const data = await fetchData<TvShowsResponse>(config);

    if (!data || !data.results) {
        throw new Error('Invalid data format received from API');
    }

    const tvShows = await mapGenreIdsToStrings('tv', data.results.slice(0, 10));
    return tvShows;
};

export const fetchMovies = async (): Promise<Movie[]> => {
    const url = `${API_BASE_URL}/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`;
    const config: AxiosRequestConfig = { url };
    const data = await fetchData<MovieResponse>(config);

    if (!data || !data.results) {
        throw new Error('Invalid data format received from API');
    }

    const movies = await mapGenreIdsToStrings('movie', data.results.slice(0, 10));
    return movies;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
    const url = `${API_BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;
    const config: AxiosRequestConfig = { url };
    const data = await fetchData<MovieResponse>(config);

    if (!data || !data.results) {
        throw new Error('Invalid data format received from API');
    }

    const movies = await mapGenreIdsToStrings('movie', data.results);
    return movies;
};

export const searchTVShows = async (query: string): Promise<TvShow[]> => {
    const url = `${API_BASE_URL}/search/tv?query=${query}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;
    const config: AxiosRequestConfig = { url };
    const data = await fetchData<TvShowsResponse>(config);

    if (!data || !data.results) {
        throw new Error('Invalid data format received from API');
    }

    const tvShows = await mapGenreIdsToStrings('tv', data.results);
    return tvShows;
};

const fetchVideosById = async (id: number, mediaType: 'movie' | 'tv'): Promise<string | null> => {
    const url = `${API_BASE_URL}/${mediaType}/${id}/videos?language=en-US&api_key=${API_KEY}`;
    const config: AxiosRequestConfig = { url };
    const data = await fetchData<{ results: Trailer[] }>(config);

    if (data && data.results && data.results.length > 0) {
        const trailer = data.results.find(result => result.type === 'Trailer');
        if (trailer) {
            return `${trailer.key}`;
        }
    }
    return null;
};

export const fetchMovieById = async (id: number): Promise<Movie | null> => {
    const url = `${API_BASE_URL}/movie/${id}?language=en-US&api_key=${API_KEY}`;
    const config: AxiosRequestConfig = { url };
    const data = await fetchData<Movie>(config);

    if (!data) {
        return null;
    }

    // Fetching trailers for the movie
    const trailer = await fetchVideosById(id, 'movie');
    data.trailer = trailer;

    if (data.genres) {
        const genres: Genre[] = data.genres.map(genre => ({ id: genre.id, name: genre.name }));
        data.genres = genres;
    }

    return data;
};

export const fetchTVShowById = async (id: number): Promise<TvShow | null> => {
    const url = `${API_BASE_URL}/tv/${id}?language=en-US&api_key=${API_KEY}`;
    const config: AxiosRequestConfig = { url };
    const data = await fetchData<TvShow>(config);

    if (!data) {
        return null;
    }

    // Fetching trailers for the TV show
    const trailer = await fetchVideosById(id, 'tv');
    data.trailer = trailer;

    if (data.genres) {
        const genres: Genre[] = data.genres.map(genre => ({ id: genre.id, name: genre.name }));
        data.genres = genres;
    }

    return data;
};
// Funkcija za dohvaćanje trejlera na osnovu ID-a





export default fetchData;

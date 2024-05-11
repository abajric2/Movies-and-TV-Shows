import axios, { AxiosRequestConfig } from 'axios';
import { TvShow } from '../types/TVShow';
import { Movie } from '../types/Movie';
import { Media } from '../types/Media'
import { MediaResponse } from '../types/MediaResponse';
import { Genre } from '../types/Genre';
import { Trailer } from '../types/Trailer';
import { MediaType } from '../types/MediaType';

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

const fetchGenres = async (mediaType: MediaType): Promise<Genre[]> => {
    const url = `${API_BASE_URL}/genre/${mediaType}/list?language=en-US&api_key=${API_KEY}`;
    const config: AxiosRequestConfig = { url };
    const data = await fetchData<{ genres: Genre[] }>(config);

    if (!data || !data.genres) {
        throw new Error('Invalid data format received from API');
    }

    return data.genres;
};

const mapGenreIdsToStrings = async <T extends { id: number; genre_ids: number[] }>(mediaType: MediaType, items: T[]): Promise<T[]> => {
    const genres = await fetchGenres(mediaType);
    return items.map(item => {
        const genreObjects = item.genre_ids.map(id => {
            const genre = genres.find(genre => genre.id === id);
            return genre ? { id: item.id, name: genre.name } : null;
        }).filter(genre => genre !== null) as Genre[];
        return { ...item, genres: genreObjects };
    });
};

const fetchMedia = async <T extends Media>(mediaType: MediaType): Promise<T[]> => {
    const url = `${API_BASE_URL}/${mediaType}/top_rated?language=en-US&page=1&api_key=${API_KEY}`;
    const config: AxiosRequestConfig = { url };
    const data = await fetchData<MediaResponse<T>>(config);

    if (!data || !data.results) {
        throw new Error('Invalid data format received from API');
    }

    return data.results;
};

export const fetchTvShows = async (): Promise<TvShow[]> => {
    const results = await fetchMedia<TvShow>('tv') as TvShow[];
    const tvShows = await mapGenreIdsToStrings('tv', results.slice(0, 10));
    return tvShows;
};

export const fetchMovies = async (): Promise<Movie[]> => {
    const results = await fetchMedia<Movie>('movie') as Movie[];
    const movies = await mapGenreIdsToStrings('movie', results.slice(0, 10));
    return movies;
};

const searchMedia = async <T extends Media>(mediaType: MediaType, query: string): Promise<T[]> => {
    const url = `${API_BASE_URL}/search/${mediaType}?query=${query}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;
    const config: AxiosRequestConfig = { url };
    const data = await fetchData<MediaResponse<T>>(config);

    if (!data || !data.results) {
        throw new Error('Invalid data format received from API');
    }

    return data.results
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
    const results = await searchMedia<Movie>('movie', query) as Movie[]
    const movies = await mapGenreIdsToStrings('movie', results);
    return movies;
};

export const searchTVShows = async (query: string): Promise<TvShow[]> => {
    const results = await searchMedia<TvShow>('tv', query) as TvShow[]
    const tvShows = await mapGenreIdsToStrings('tv', results);
    return tvShows;
};

const fetchVideosById = async (id: number, mediaType: MediaType): Promise<string | null> => {
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

const fetchMediaById = async <T extends Media>(mediaType: MediaType, id: number): Promise<T | null> => {
    const url = `${API_BASE_URL}/${mediaType}/${id}?language=en-US&api_key=${API_KEY}`;
    const config: AxiosRequestConfig = { url };
    const data = await fetchData<T>(config);

    if (!data) {
        return null;
    }

    const trailer = await fetchVideosById(id, `${mediaType}`);
    data.trailer = trailer;

    if (data.genres) {
        const genres: Genre[] = data.genres.map(genre => ({ id: genre.id, name: genre.name }));
        data.genres = genres;
    }

    return data;
};

export const fetchMovieById = async (id: number | string): Promise<Movie | null> => {
    const movieId = typeof id === 'string' ? parseInt(id) : id;
    if (isNaN(movieId)) {
        throw new Error('Invalid movie ID');
    }
    const data = await fetchMediaById<Movie>('movie', movieId) as Movie | null;
    return data;
};

export const fetchTVShowById = async (id: number | string): Promise<TvShow | null> => {
    const tvShowId = typeof id === 'string' ? parseInt(id) : id;
    if (isNaN(tvShowId)) {
        throw new Error('Invalid TV show ID');
    }
    const data = await fetchMediaById<TvShow>('tv', tvShowId) as TvShow | null;
    return data;
};


export default fetchData;

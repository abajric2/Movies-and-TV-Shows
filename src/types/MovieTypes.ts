import {Genre} from './Genre'

export interface Movie {
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    poster_path: string;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    genres: Genre[];
}

export interface MovieResponse {
    page: number;
    results: Movie[];
    genres: Genre[];
}

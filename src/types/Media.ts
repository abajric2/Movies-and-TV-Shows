import { Genre } from './Genre';

export interface Media {
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    poster_path: string;
    overview: string;
    vote_average: number;
    genres: Genre[];
    trailer?: string | null;
}
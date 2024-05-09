export interface TvShow {
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    poster_path: string;
    name: string;
    overview: string;
    first_air_date: string;
    vote_average: number;
    genres: string[];
}

export interface TvShowsResponse {
    page: number;
    results: TvShow[];
}

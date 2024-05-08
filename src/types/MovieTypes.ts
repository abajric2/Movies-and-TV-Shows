export interface Movie {
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    poster_path: string;
    title: string;
}

export interface MovieResponse {
    page: number;
    results: Movie[];
}

export interface TvShow {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    poster_path: string;
    name: string;
  }
  
  export interface TvShowsResponse {
    page: number;
    results: TvShow[];
  }
  
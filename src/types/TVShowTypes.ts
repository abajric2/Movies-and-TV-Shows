import { Media } from './Media'
import { MediaResponse } from './MediaResponse';

export interface TvShow extends Media {
    name: string;
    first_air_date: string;
}

export type TvShowsResponse = MediaResponse<TvShow>;
import { MediaResponse } from './MediaResponse';
import {Media} from './Media'

export interface Movie extends Media {
    title: string;
    release_date: string;
}

export type MovieResponse = MediaResponse<Movie>;
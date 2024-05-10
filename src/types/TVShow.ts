import { Media } from './Media'

export interface TvShow extends Media {
    name: string;
    first_air_date: string;
}

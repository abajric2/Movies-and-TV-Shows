import { Media } from './Media'

export interface Movie extends Media {
    title: string;
    release_date: string;
}
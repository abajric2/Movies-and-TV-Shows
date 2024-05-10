import { Genre } from './Genre';

export interface MediaResponse<T> {
    page: number;
    results: T[];
    genres: Genre[];
}

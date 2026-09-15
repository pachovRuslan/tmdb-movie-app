export interface SortOption {
    value: string;
    label: string;
}

export const SORT_OPTIONS: SortOption[] = [
    { value: 'popularity.desc', label: 'Popularity (desc)' },
    { value: 'popularity.asc', label: 'Popularity (asc)' },
    { value: 'vote_average.desc', label: 'Rating (desc)' },
    { value: 'vote_average.asc', label: 'Rating (asc)' },
    { value: 'release_date.desc', label: 'Release date (desc)' },
    { value: 'release_date.asc', label: 'Release date (asc)' },
    { value: 'title.asc', label: 'Title (A-Z)' },
    { value: 'title.desc', label: 'Title (Z-A)' },
];

export const DEFAULT_SORT = 'popularity.desc';
export const DEFAULT_MIN_RATING = 0;
export const DEFAULT_MAX_RATING = 10;
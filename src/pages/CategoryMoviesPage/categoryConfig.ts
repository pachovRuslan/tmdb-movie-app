import {
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery,
    useGetNowPlayingMoviesQuery,
} from '../../api/movieApi';

export const CATEGORIES = ['popular', 'top_rated', 'upcoming', 'now_playing'] as const;

export type CategoryType = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<CategoryType, string> = {
    popular: 'Popular',
    top_rated: 'Top Rated',
    upcoming: 'Upcoming',
    now_playing: 'Now Playing',
};

export const CATEGORY_QUERY_HOOKS = {
    popular: useGetPopularMoviesQuery,
    top_rated: useGetTopRatedMoviesQuery,
    upcoming: useGetUpcomingMoviesQuery,
    now_playing: useGetNowPlayingMoviesQuery,
};
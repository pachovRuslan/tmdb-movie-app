import { baseApi } from './baseApi';
import type { MoviesResponse } from '../types/movie';
import type { GenresResponse } from '../types/genre';

export interface DiscoverParams {
    page: number;
    sortBy: string;
    voteAverageGte: number;
    voteAverageLte: number;
    genres: number[];
}

export const movieApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPopularMovies: builder.query<MoviesResponse, number>({
            query: (page = 1) => `/movie/popular?page=${page}`,
        }),
        getTopRatedMovies: builder.query<MoviesResponse, number>({
            query: (page = 1) => `/movie/top_rated?page=${page}`,
        }),
        getUpcomingMovies: builder.query<MoviesResponse, number>({
            query: (page = 1) => `/movie/upcoming?page=${page}`,
        }),
        getNowPlayingMovies: builder.query<MoviesResponse, number>({
            query: (page = 1) => `/movie/now_playing?page=${page}`,
        }),
        getGenres: builder.query<GenresResponse, void>({
            query: () => '/genre/movie/list',
        }),
        discoverMovies: builder.query<MoviesResponse, DiscoverParams>({
            query: ({ page, sortBy, voteAverageGte, voteAverageLte, genres }) => {
                const params = new URLSearchParams({
                    page: String(page),
                    sort_by: sortBy,
                    'vote_average.gte': String(voteAverageGte),
                    'vote_average.lte': String(voteAverageLte),
                });
                if (genres.length > 0) {
                    params.set('with_genres', genres.join(','));
                }
                return `/discover/movie?${params.toString()}`;
            },
        }),
    }),
});

export const {
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery,
    useGetNowPlayingMoviesQuery,
    useGetGenresQuery,
    useDiscoverMoviesQuery,
} = movieApi;
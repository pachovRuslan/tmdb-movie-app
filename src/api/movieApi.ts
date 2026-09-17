import { baseApi } from './baseApi';
import type { MovieDetails, MoviesResponse } from '../types/movie';
import type { GenresResponse } from '../types/genre';
import type { CreditsResponse } from './credits';
import { creditsResponseSchema, genresResponseSchema, movieDetailsSchema, moviesResponseSchema } from '../schemas/movieSchema';

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
            transformResponse: (response) => moviesResponseSchema.parse(response),
        }),
        getTopRatedMovies: builder.query<MoviesResponse, number>({
            query: (page = 1) => `/movie/top_rated?page=${page}`,
            transformResponse: (response) => moviesResponseSchema.parse(response),
        }),
        getUpcomingMovies: builder.query<MoviesResponse, number>({
            query: (page = 1) => `/movie/upcoming?page=${page}`,
            transformResponse: (response) => moviesResponseSchema.parse(response),
        }),
        getNowPlayingMovies: builder.query<MoviesResponse, number>({
            query: (page = 1) => `/movie/now_playing?page=${page}`,
            transformResponse: (response) => moviesResponseSchema.parse(response),
        }),
        getGenres: builder.query<GenresResponse, void>({
            query: () => '/genre/movie/list',
            transformResponse: (response) => genresResponseSchema.parse(response),
        }),
        discoverMovies: builder.query<MoviesResponse, DiscoverParams>({
            query: ({ page, sortBy, voteAverageGte, voteAverageLte, genres }) => {
                const params = new URLSearchParams({
                    page: String(page),
                    sort_by: sortBy,
                    'vote_average.gte': String(voteAverageGte),
                    'vote_average.lte': String(voteAverageLte),
                });
                if (genres.length > 0) params.set('with_genres', genres.join(','));
                return `/discover/movie?${params.toString()}`;
            },
            transformResponse: (response) => moviesResponseSchema.parse(response),
        }),
        searchMovies: builder.query<MoviesResponse, { query: string; page: number }>({
            query: ({ query, page }) => `/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
            transformResponse: (response) => moviesResponseSchema.parse(response),
        }),
        getMovieDetails: builder.query<MovieDetails, number>({
            query: (id) => `/movie/${id}`,
            transformResponse: (response) => movieDetailsSchema.parse(response),
        }),
        getMovieCredits: builder.query<CreditsResponse, number>({
            query: (id) => `/movie/${id}/credits`,
            transformResponse: (response) => creditsResponseSchema.parse(response),
        }),
        getSimilarMovies: builder.query<MoviesResponse, number>({
            query: (id) => `/movie/${id}/similar`,
            transformResponse: (response) => moviesResponseSchema.parse(response),
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
    useSearchMoviesQuery,
    useGetMovieDetailsQuery,
    useGetMovieCreditsQuery,
    useGetSimilarMoviesQuery,
} = movieApi;

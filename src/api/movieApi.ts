import { baseApi } from './baseApi';
import type { MoviesResponse } from '../types/movie';

export const movieApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MoviesResponse, number>({
      query: (page = 1) => `/movie/popular?page=${page}`,
    }),
  }),
});

export const { useGetPopularMoviesQuery } = movieApi;
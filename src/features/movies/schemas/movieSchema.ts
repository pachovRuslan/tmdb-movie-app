import { z } from "zod";

export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  vote_count: z.number(),
  release_date: z.string(),
  genre_ids: z.array(z.number()),
  popularity: z.number(),
  adult: z.boolean(),
});

export const moviesResponseSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const genresResponseSchema = z.object({
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
});

export const castMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string(),
  profile_path: z.string().nullable(),
});

export const creditsResponseSchema = z.object({
  id: z.number(),
  cast: z.array(castMemberSchema),
});
export const movieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  vote_count: z.number(),
  release_date: z.string(),
  popularity: z.number(),
  adult: z.boolean(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
  runtime: z.number().nullable(),
  tagline: z.string(),
});

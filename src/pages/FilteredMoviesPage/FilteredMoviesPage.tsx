import { useSearchParams } from "react-router";
import { useGetGenresQuery, useDiscoverMoviesQuery } from "@/api/movieApi";
import { useDebounce } from "@/hooks/useDebounce";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { SORT_OPTIONS, DEFAULT_SORT, DEFAULT_MIN_RATING, DEFAULT_MAX_RATING } from "./sortOptions";
import s from "./FilteredMoviesPage.module.css";
import type { Genre } from "@/types/genre.ts";
import { useApiErrorToast } from "@/hooks/useApiErrorToast.ts";
import { MovieCardSkeleton } from "@/components/MovieCardSkeleton/MovieCardSkeleton.tsx";

export const FilteredMoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort") ?? DEFAULT_SORT;
  const minRating = Number(searchParams.get("minRating")) || DEFAULT_MIN_RATING;
  const maxRating = Number(searchParams.get("maxRating")) || DEFAULT_MAX_RATING;
  const genresParam = searchParams.get("genres");
  const selectedGenres = genresParam ? genresParam.split(",").map(Number) : [];
  const page = Number(searchParams.get("page")) || 1;

  const debouncedMinRating = useDebounce(minRating, 200);
  const debouncedMaxRating = useDebounce(maxRating, 200);

  const { data: genresData, error: genresError } = useGetGenresQuery();
  const { data, isLoading, error } = useDiscoverMoviesQuery({
    page,
    sortBy,
    voteAverageGte: debouncedMinRating,
    voteAverageLte: debouncedMaxRating,
    genres: selectedGenres,
  });

  useApiErrorToast(genresError);
  useApiErrorToast(error);

  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (value === null) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    next.delete("page");
    setSearchParams(next);
  };

  const handleGenreToggle = (genreId: number) => {
    const next = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];
    updateParam("genres", next.length > 0 ? next.join(",") : null);
  };

  const handleReset = () => {
    setSearchParams({});
  };

  const handlePageChange = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
  };

  return (
    <div className={s.page}>
      <aside className={s.sidebar}>
        <div className={s.section}>
          <span className={s.sectionTitle}>Sort by</span>
          <select
            className={s.select}
            value={sortBy}
            onChange={(event) => updateParam("sort", event.target.value)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={s.section}>
          <span className={s.sectionTitle}>
            Rating: {minRating.toFixed(1)} — {maxRating.toFixed(1)}
          </span>
          <input
            type="range"
            min={0}
            max={10}
            step={0.1}
            value={minRating}
            onChange={(event) => updateParam("minRating", event.target.value)}
          />
          <input
            type="range"
            min={0}
            max={10}
            step={0.1}
            value={maxRating}
            onChange={(event) => updateParam("maxRating", event.target.value)}
          />
        </div>

        <div className={s.section}>
          <span className={s.sectionTitle}>Genres</span>
          <div className={s.genreList}>
            {genresData?.genres.map((genre: Genre) => (
              <button
                key={genre.id}
                className={
                  selectedGenres.includes(genre.id)
                    ? `${s.genreButton} ${s.genreButtonActive}`
                    : s.genreButton
                }
                onClick={() => handleGenreToggle(genre.id)}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        <button className={s.resetButton} onClick={handleReset}>
          Reset filters
        </button>
      </aside>

      <div>
        <div className={s.grid}>
          {isLoading
            ? Array.from({ length: 12 }).map((_, index) => <MovieCardSkeleton key={index} />)
            : data?.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
        <div className={s.grid}>
          {data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {data && (
          <div className={s.pagination}>
            <button disabled={page <= 1} onClick={() => handlePageChange(page - 1)}>
              Prev
            </button>
            <span>
              {page} / {Math.min(data.total_pages, 500)}
            </span>
            <button
              disabled={page >= Math.min(data.total_pages, 500)}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import { useState } from "react";
import { useSearchParams } from "react-router";
import { useSearchMoviesQuery } from "@/features/movies/api/movieApi";
import { MovieCard } from "@/common/components/MovieCard/MovieCard";
import s from "./SearchPage.module.css";
import { useApiErrorToast } from "@/common/hooks/useApiErrorToast";
import { MovieCardSkeleton } from "@/common/components/MovieCardSkeleton/MovieCardSkeleton";
import { EmptyState } from "@/common/components";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("query") ?? "";
  const page = Number(searchParams.get("page")) || 1;

  const [inputValue, setInputValue] = useState(urlQuery);

  const { data, isLoading, isFetching, error } = useSearchMoviesQuery(
    { query: urlQuery, page },
    { skip: urlQuery.trim().length === 0 },
  );
  useApiErrorToast(error);

  const handleSearch = () => {
    if (inputValue.trim()) {
      setSearchParams({ query: inputValue.trim() });
    }
  };

  const handleClear = () => {
    setInputValue("");
    setSearchParams({});
  };

  const handlePageChange = (nextPage: number) => {
    setSearchParams({ query: urlQuery, page: String(nextPage) });
  };

  const hasQuery = urlQuery.trim().length > 0;
  const hasResults = data && data.results.length > 0;
  const noResults = hasQuery && data && data.results.length === 0;

  return (
    <div className={s.page}>
      <div className={s.searchRow}>
        <input
          className={s.input}
          type="search"
          placeholder="Search for a movie..."
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
            if (event.target.value === "") {
              handleClear();
            }
          }}
          onKeyDown={(event) => event.key === "Enter" && handleSearch()}
        />
        <button className={s.searchButton} onClick={handleSearch} disabled={!inputValue.trim()}>
          Search
        </button>
      </div>

      {!hasQuery && <p className={s.message}>Enter a movie title to start searching</p>}

      {hasQuery && (isLoading || isFetching) && (
        <div className={s.grid}>
          {Array.from({ length: 12 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      )}

      {hasQuery && !isLoading && !isFetching && noResults && (
        <EmptyState
          title="No matches found"
          subtitle={`Try a different title than "${urlQuery}"`}
        />
      )}

      {hasQuery && !isLoading && !isFetching && hasResults && (
        <>
          <div className={s.grid}>
            {data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
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
        </>
      )}
    </div>
  );
};

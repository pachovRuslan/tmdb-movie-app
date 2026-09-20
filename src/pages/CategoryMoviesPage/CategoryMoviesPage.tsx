import { useNavigate, useParams, useSearchParams } from "react-router";
import {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
} from "@/api/movieApi";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { CATEGORIES, CATEGORY_LABELS, type CategoryType } from "./categoryConfig";
import s from "./CategoryMoviesPage.module.css";
import { useApiErrorToast } from "@/hooks/useApiErrorToast";
import { MovieCardSkeleton } from "@/components/MovieCardSkeleton/MovieCardSkeleton";

export const CategoryMoviesPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const activeCategory: CategoryType = CATEGORIES.includes(category as CategoryType)
    ? (category as CategoryType)
    : "popular";

  const popularResult = useGetPopularMoviesQuery(page, { skip: activeCategory !== "popular" });
  const topRatedResult = useGetTopRatedMoviesQuery(page, { skip: activeCategory !== "top_rated" });
  const upcomingResult = useGetUpcomingMoviesQuery(page, { skip: activeCategory !== "upcoming" });
  const nowPlayingResult = useGetNowPlayingMoviesQuery(page, {
    skip: activeCategory !== "now_playing",
  });

  const { data, isLoading, error } = (() => {
    switch (activeCategory) {
      case "top_rated":
        return topRatedResult;
      case "upcoming":
        return upcomingResult;
      case "now_playing":
        return nowPlayingResult;
      default:
        return popularResult;
    }
  })();

  useApiErrorToast(error);

  const handleCategoryChange = (nextCategory: CategoryType) => {
    navigate(`/category/${nextCategory}`);
  };

  const handlePageChange = (nextPage: number) => {
    setSearchParams({ page: String(nextPage) });
  };

  return (
    <div className={s.page}>
      <div className={s.tabs}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={cat === activeCategory ? `${s.tab} ${s.tabActive}` : s.tab}
            onClick={() => handleCategoryChange(cat)}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      <h1 className={s.title}>{CATEGORY_LABELS[activeCategory]} Movies</h1>

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
  );
};

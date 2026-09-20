import { useNavigate } from "react-router";
import type { Movie } from "@/common/types";
import s from "./MovieRow.module.css";
import { MovieCard } from "@/common/components/MovieCard/MovieCard"                      
import { MovieCardSkeleton } from "@/common/components/MovieCardSkeleton/MovieCardSkeleton"

type MovieRowProps = {
  title: string;
  movies: Movie[];
  category: string;
  isLoading?: boolean;
}

export const MovieRow = ({ title, movies, category, isLoading }: MovieRowProps) => {
  const navigate = useNavigate();

  return (
    <section className={s.row}>
      <div className={s.header}>
        <h2 className={s.title}>{title}</h2>
        <button className={s.viewMoreButton} onClick={() => navigate(`/category/${category}`)}>
          View More
        </button>
      </div>
      <div className={s.grid}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => <MovieCardSkeleton key={index} />)
          : movies.slice(0, 6).map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </section>
  );
};

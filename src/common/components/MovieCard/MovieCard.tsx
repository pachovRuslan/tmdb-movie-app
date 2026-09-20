import React from "react";
import { useNavigate } from "react-router";
import { toggleFavorite } from "@/features/favorites/model/favoritesSlice";
import { getImageUrl } from "@/common/utils/image";
import type { Movie } from "@/common/types";
import s from "./MovieCard.module.css";
import { useAppDispatch, useAppSelector } from "@/app/model/hooks";

type MovieCardProps = {
  movie: Movie;
}

const getRatingColor = (rating: number): string => {
  if (rating >= 7) return "#21d07a";
  if (rating >= 5) return "#d2d531";
  return "#db2360";
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === movie.id);

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(
      toggleFavorite({
        id: movie.id,
        title: movie.title,
        posterUrl: getImageUrl(movie.poster_path),
        voteAverage: movie.vote_average,
      }),
    );
  };

  return (
    <div className={s.card} onClick={() => navigate(`/movie/${movie.id}`)}>
      <button className={s.favoriteButton} onClick={handleFavoriteClick}>
        {isFavorite ? "❤️" : "🤍"}
      </button>
      <img className={s.poster} src={getImageUrl(movie.poster_path)} alt={movie.title} />
      <div className={s.info}>
        <p className={s.title}>{movie.title}</p>
        <span
          className={s.rating}
          style={{ backgroundColor: getRatingColor(movie.vote_average) }}
        >
          {movie.vote_average.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

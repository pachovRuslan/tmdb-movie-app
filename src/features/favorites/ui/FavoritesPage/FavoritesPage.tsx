import { useNavigate } from "react-router";
import { toggleFavorite } from "@/features/favorites/model/favoritesSlice";
import s from "./FavoritesPage.module.css";
import { useAppDispatch, useAppSelector } from "@/app/model/hooks";

const getRatingColor = (rating: number): string => {
  if (rating >= 7) return "#21d07a";
  if (rating >= 5) return "#d2d531";
  return "#db2360";
};

export const FavoritesPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);

  return (
    <div className={s.page}>
      <h1 className={s.title}>Favorites</h1>

      {favorites.length === 0 && (
        <p className={s.message}>You haven't added any favorites yet</p>
      )}

      <div className={s.grid}>
        {favorites.map((movie) => (
          <div
            key={movie.id}
            className={s.card}
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <button
              className={s.removeButton}
              onClick={(event) => {
                event.stopPropagation();
                dispatch(toggleFavorite(movie));
              }}
            >
              ❤️
            </button>
            <img className={s.poster} src={movie.posterUrl} alt={movie.title} />
            <div className={s.info}>
              <p className={s.movieTitle}>{movie.title}</p>
              <span
                className={s.rating}
                style={{ backgroundColor: getRatingColor(movie.voteAverage) }}
              >
                {movie.voteAverage.toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

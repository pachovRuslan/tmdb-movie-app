import { useNavigate, useParams } from "react-router";
import {
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMoviesQuery,
} from "@/features/movies/api/movieApi";
import { MovieCard } from "@/common/components/MovieCard/MovieCard";
import { getImageUrl } from "@/common/utils/image";
import s from "./MovieDetailsPage.module.css";
import { useApiErrorToast } from "@/common/hooks/useApiErrorToast";

const getRatingColor = (rating: number): string => {
  if (rating >= 7) return "#21d07a";
  if (rating >= 5) return "#d2d531";
  return "#db2360";
};

export const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = Number(id);

  const { data: movie, isLoading, error: movieError } = useGetMovieDetailsQuery(movieId);
  const { data: credits, error: creditsError } = useGetMovieCreditsQuery(movieId);
  const { data: similar, error: similarError } = useGetSimilarMoviesQuery(movieId);

  useApiErrorToast(movieError);
  useApiErrorToast(creditsError);
  useApiErrorToast(similarError);
  if (isLoading) return <p className={s.page}>Loading...</p>;
  if (!movie) return <p className={s.page}>Movie not found</p>;

  const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "—";
  const topCast = credits?.cast.slice(0, 6) ?? [];
  const similarMovies = similar?.results.slice(0, 6) ?? [];

  return (
    <div className={s.page}>
      <button className={s.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={s.infoBlock}>
        <img
          className={s.poster}
          src={getImageUrl(movie.poster_path, "w500")}
          alt={movie.title}
        />

        <div>
          <h1 className={s.title}>{movie.title}</h1>
          <div className={s.meta}>
            <span>{releaseYear}</span>
            <span
              className={s.rating}
              style={{ backgroundColor: getRatingColor(movie.vote_average) }}
            >
              {movie.vote_average.toFixed(1)}
            </span>
            {movie.runtime && <span>{movie.runtime} min</span>}
          </div>
          <div className={s.genres}>
            {movie.genres.map((genre) => (
              <span key={genre.id} className={s.genreTag}>
                {genre.name}
              </span>
            ))}
          </div>
          <p className={s.overview}>{movie.overview}</p>
        </div>
      </div>

      {topCast.length > 0 && (
        <section>
          <h2 className={s.sectionTitle}>Cast</h2>
          <div className={s.castGrid}>
            {topCast.map((member) => (
              <div key={member.id} className={s.castCard}>
                <img
                  className={s.castPhoto}
                  src={getImageUrl(member.profile_path, "w185")}
                  alt={member.name}
                />
                <p className={s.castName}>{member.name}</p>
                <p className={s.castCharacter}>{member.character}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {similarMovies.length > 0 && (
        <section>
          <h2 className={s.sectionTitle}>Similar Movies</h2>
          <div className={s.similarGrid}>
            {similarMovies.map((similarMovie) => (
              <MovieCard key={similarMovie.id} movie={similarMovie} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

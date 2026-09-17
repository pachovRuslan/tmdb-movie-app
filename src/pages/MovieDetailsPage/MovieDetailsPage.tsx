import { useNavigate, useParams } from 'react-router-dom';
import {
    useGetMovieDetailsQuery,
    useGetMovieCreditsQuery,
    useGetSimilarMoviesQuery,
} from '../../api/movieApi';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { getImageUrl } from '../../utils/image';
import styles from './MovieDetailsPage.module.css';
import { useApiErrorToast } from '../../hooks/useApiErrorToast';

const getRatingColor = (rating: number): string => {
    if (rating >= 7) return '#21d07a';
    if (rating >= 5) return '#d2d531';
    return '#db2360';
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
    if (isLoading) return <p className={styles.page}>Loading...</p>;
    if (!movie) return <p className={styles.page}>Movie not found</p>;

    const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : '—';
    const topCast = credits?.cast.slice(0, 6) ?? [];
    const similarMovies = similar?.results.slice(0, 6) ?? [];

    return (
        <div className={styles.page}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className={styles.infoBlock}>
                <img className={styles.poster} src={getImageUrl(movie.poster_path, 'w500')} alt={movie.title} />

                <div>
                    <h1 className={styles.title}>{movie.title}</h1>
                    <div className={styles.meta}>
                        <span>{releaseYear}</span>
                        <span
                            className={styles.rating}
                            style={{ backgroundColor: getRatingColor(movie.vote_average) }}
                        >
                            {movie.vote_average.toFixed(1)}
                        </span>
                        {movie.runtime && <span>{movie.runtime} min</span>}
                    </div>
                    <div className={styles.genres}>
                        {movie.genres.map((genre) => (
                            <span key={genre.id} className={styles.genreTag}>
                                {genre.name}
                            </span>
                        ))}
                    </div>
                    <p className={styles.overview}>{movie.overview}</p>
                </div>
            </div>

            {topCast.length > 0 && (
                <section>
                    <h2 className={styles.sectionTitle}>Cast</h2>
                    <div className={styles.castGrid}>
                        {topCast.map((member) => (
                            <div key={member.id} className={styles.castCard}>
                                <img
                                    className={styles.castPhoto}
                                    src={getImageUrl(member.profile_path, 'w185')}
                                    alt={member.name}
                                />
                                <p className={styles.castName}>{member.name}</p>
                                <p className={styles.castCharacter}>{member.character}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {similarMovies.length > 0 && (
                <section>
                    <h2 className={styles.sectionTitle}>Similar Movies</h2>
                    <div className={styles.similarGrid}>
                        {similarMovies.map((similarMovie) => (
                            <MovieCard key={similarMovie.id} movie={similarMovie} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleFavorite } from '../../features/favorites/favoritesSlice';
import styles from './FavoritesPage.module.css';

const getRatingColor = (rating: number): string => {
    if (rating >= 7) return '#21d07a';
    if (rating >= 5) return '#d2d531';
    return '#db2360';
};

export const FavoritesPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favorites.items);

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Favorites</h1>

            {favorites.length === 0 && <p className={styles.message}>You haven't added any favorites yet</p>}

            <div className={styles.grid}>
                {favorites.map((movie) => (
                    <div key={movie.id} className={styles.card} onClick={() => navigate(`/movie/${movie.id}`)}>
                        <button
                            className={styles.removeButton}
                            onClick={(event) => {
                                event.stopPropagation();
                                dispatch(toggleFavorite(movie));
                            }}
                        >
                            ❤️
                        </button>
                        <img className={styles.poster} src={movie.posterUrl} alt={movie.title} />
                        <div className={styles.info}>
                            <p className={styles.movieTitle}>{movie.title}</p>
                            <span
                                className={styles.rating}
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
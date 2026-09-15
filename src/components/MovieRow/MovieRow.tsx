import { useNavigate } from 'react-router-dom';
import { MovieCard } from '../MovieCard/MovieCard';
import type { Movie } from '../../types/movie';
import styles from './MovieRow.module.css';

interface MovieRowProps {
    title: string;
    movies: Movie[];
    category: string;
}

export const MovieRow = ({ title, movies, category }: MovieRowProps) => {
    const navigate = useNavigate();

    return (
        <section className={styles.row}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <button className={styles.viewMoreButton} onClick={() => navigate(`/category/${category}`)}>
                    View More
                </button>
            </div>
            <div className={styles.grid}>
                {movies.slice(0, 6).map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    );
};
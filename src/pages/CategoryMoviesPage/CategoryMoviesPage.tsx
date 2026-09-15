import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery,
    useGetNowPlayingMoviesQuery,
} from '../../api/movieApi';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { CATEGORIES, CATEGORY_LABELS, type CategoryType } from './categoryConfig';
import styles from './CategoryMoviesPage.module.css';

export const CategoryMoviesPage = () => {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;

    const activeCategory: CategoryType = CATEGORIES.includes(category as CategoryType)
        ? (category as CategoryType)
        : 'popular';

    const popularResult = useGetPopularMoviesQuery(page, { skip: activeCategory !== 'popular' });
    const topRatedResult = useGetTopRatedMoviesQuery(page, { skip: activeCategory !== 'top_rated' });
    const upcomingResult = useGetUpcomingMoviesQuery(page, { skip: activeCategory !== 'upcoming' });
    const nowPlayingResult = useGetNowPlayingMoviesQuery(page, { skip: activeCategory !== 'now_playing' });

    const { data, isLoading } = (() => {
        switch (activeCategory) {
            case 'top_rated':
                return topRatedResult;
            case 'upcoming':
                return upcomingResult;
            case 'now_playing':
                return nowPlayingResult;
            default:
                return popularResult;
        }
    })();

    const handleCategoryChange = (nextCategory: CategoryType) => {
        navigate(`/category/${nextCategory}`);
    };

    const handlePageChange = (nextPage: number) => {
        setSearchParams({ page: String(nextPage) });
    };

    return (
        <div className={styles.page}>
            <div className={styles.tabs}>
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        className={cat === activeCategory ? `${styles.tab} ${styles.tabActive}` : styles.tab}
                        onClick={() => handleCategoryChange(cat)}
                    >
                        {CATEGORY_LABELS[cat]}
                    </button>
                ))}
            </div>

            <h1 className={styles.title}>{CATEGORY_LABELS[activeCategory]} Movies</h1>

            {isLoading && <p>Loading...</p>}

            <div className={styles.grid}>
                {data?.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>

            {data && (
                <div className={styles.pagination}>
                    <button disabled={page <= 1} onClick={() => handlePageChange(page - 1)}>
                        Prev
                    </button>
                    <span>
                        {page} / {Math.min(data.total_pages, 500)}
                    </span>
                    <button disabled={page >= Math.min(data.total_pages, 500)} onClick={() => handlePageChange(page + 1)}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};
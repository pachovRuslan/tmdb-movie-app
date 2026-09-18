import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './MovieCardSkeleton.module.css';

export const MovieCardSkeleton = () => {
    return (
        <div className={styles.card}>
            <Skeleton className={styles.poster} />
            <div className={styles.info}>
                <Skeleton className={styles.line} />
                <Skeleton className={`${styles.line} ${styles.lineShort}`} />
            </div>
        </div>
    );
};
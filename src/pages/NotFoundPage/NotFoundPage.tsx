import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => {
    return (
        <div className={styles.page}>
            <p className={styles.code}>404</p>
            <p className={styles.message}>Page not found</p>
            <Link to="/" className={styles.homeButton}>
                Back to Main
            </Link>
        </div>
    );
};
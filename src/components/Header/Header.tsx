import { NavLink } from 'react-router-dom';
import tmdbLogo from '../assets/tmdb-logo.svg';
import styles from './Header.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleTheme } from '../../features/theme/themeSlice';

export const Header = () => {
    const dispatch = useAppDispatch();
    const themeMode = useAppSelector((state) => state.theme.mode);

    return (
        <header className={styles.header}>
            <NavLink to="/">
                <img src={tmdbLogo} alt="TMDB logo" className={styles.logo} />
            </NavLink>

            <nav className={styles.nav}>
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
                >
                    Main
                </NavLink>
                <NavLink
                    to="/category/popular"
                    className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
                >
                    Category Movies
                </NavLink>
                <NavLink
                    to="/filtered"
                    className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
                >
                    Filtered Movies
                </NavLink>
                <NavLink
                    to="/search"
                    className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
                >
                    Search
                </NavLink>
                <NavLink
                    to="/favorites"
                    className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
                >
                    Favorites
                </NavLink>
            </nav>

            <button onClick={() => dispatch(toggleTheme())}>
                {themeMode === 'light' ? '🌙' : '☀️'}
            </button>
        </header>
    );
};
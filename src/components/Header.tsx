
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleTheme } from '../features/theme/themeSlice';

export const Header = () => {
    const dispatch = useAppDispatch();
    const themeMode = useAppSelector((state) => state.theme.mode);

    return (
        <header>
            <button onClick={() => dispatch(toggleTheme())}>
                {themeMode === 'light' ? '🌙' : '☀️'}
            </button>
        </header>
    );
};
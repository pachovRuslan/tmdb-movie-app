import   { useEffect, useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { router } from './routes/AppRouter';
import { useAppSelector } from './app/hooks';
import { getMuiTheme } from './app/muiTheme';

export const App = () => {
    const themeMode = useAppSelector((state) => state.theme.mode);
    const muiTheme = useMemo(() => getMuiTheme(themeMode), [themeMode]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', themeMode);
    }, [themeMode]);

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
};

export default App;
import  { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { router } from './routes/AppRouter';
import { useAppSelector } from './app/hooks';
import { getMuiTheme } from './app/muiTheme';

export const App = () => {
    const themeMode = useAppSelector((state) => state.theme.mode);
    const muiTheme = getMuiTheme(themeMode);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', themeMode);
    }, [themeMode]);

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <RouterProvider router={router} />
            <ToastContainer position="bottom-right" theme={themeMode} />
        </ThemeProvider>
    );
};

export default App;
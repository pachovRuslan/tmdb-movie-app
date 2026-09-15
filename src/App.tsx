import  { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/AppRouter';
import { useAppSelector } from './app/hooks';

export const App = () => {
    const themeMode = useAppSelector((state) => state.theme.mode);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', themeMode);
    }, [themeMode]);

    return <RouterProvider router={router} />;
};

export default App;
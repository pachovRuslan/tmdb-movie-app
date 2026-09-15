import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { MainPage } from '../pages/MainPage';
import { CategoryMoviesPage } from '../pages/CategoryMoviesPage';
import { FilteredMoviesPage } from '../pages/FilteredMoviesPage';
import { SearchPage } from '../pages/SearchPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { MovieDetailsPage } from '../pages/MovieDetailsPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <MainPage /> },
            { path: 'category/:category', element: <CategoryMoviesPage /> },
            { path: 'filtered', element: <FilteredMoviesPage /> },
            { path: 'search', element: <SearchPage /> },
            { path: 'favorites', element: <FavoritesPage /> },
            { path: 'movie/:id', element: <MovieDetailsPage /> },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
]);
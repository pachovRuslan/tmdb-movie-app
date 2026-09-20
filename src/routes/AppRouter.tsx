import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "@/pages/MainPage";
import { CategoryMoviesPage } from "@/pages/CategoryMoviesPage/CategoryMoviesPage";
import { FilteredMoviesPage } from "@/pages/FilteredMoviesPage/FilteredMoviesPage";
import { SearchPage } from "@/pages/SearchPage/SearchPage";
import { FavoritesPage } from "@/pages/FavoritesPage/FavoritesPage";
import { MovieDetailsPage } from "@/pages/MovieDetailsPage/MovieDetailsPage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";
import { Layout } from "@/components/Layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "category/:category", element: <CategoryMoviesPage /> },
      { path: "filtered", element: <FilteredMoviesPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "movie/:id", element: <MovieDetailsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

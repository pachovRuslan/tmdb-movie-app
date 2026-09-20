import { Route, Routes } from "react-router"
import { Path } from "./Path"
import { Layout } from "@/components/Layout/Layout"
import { MainPage } from "@/pages/MainPage"
import { CategoryMoviesPage } from "@/pages/CategoryMoviesPage/CategoryMoviesPage"
import { FilteredMoviesPage } from "@/pages/FilteredMoviesPage/FilteredMoviesPage"
import { SearchPage } from "@/pages/SearchPage/SearchPage"
import { FavoritesPage } from "@/pages/FavoritesPage/FavoritesPage"
import { MovieDetailsPage } from "@/pages/MovieDetailsPage/MovieDetailsPage"
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage"

export const Routing = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path={Path.Main} element={<MainPage />} />
      <Route path={Path.Category} element={<CategoryMoviesPage />} />
      <Route path={Path.Filtered} element={<FilteredMoviesPage />} />
      <Route path={Path.Search} element={<SearchPage />} />
      <Route path={Path.Favorites} element={<FavoritesPage />} />
      <Route path={Path.MovieDetails} element={<MovieDetailsPage />} />
      <Route path={Path.NotFound} element={<NotFoundPage />} />
    </Route>
  </Routes>
)
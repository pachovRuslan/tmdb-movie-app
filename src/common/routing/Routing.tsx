import { Route, Routes } from "react-router"
import { Path } from "./Path"
import { Layout } from "@/common/components"
import { CategoryMoviesPage } from "@/features/movies/ui/CategoryMoviesPage/CategoryMoviesPage"
import { FilteredMoviesPage } from "@/features/movies/ui/FilteredMoviesPage/FilteredMoviesPage"
import { SearchPage } from "@/features/movies/ui/SearchPage/SearchPage"
import { FavoritesPage } from "@/features/favorites/ui/FavoritesPage/FavoritesPage"
import { MovieDetailsPage } from "@/features/movies/ui/MovieDetailsPage/MovieDetailsPage"
import { NotFoundPage } from "@/common/components/NotFoundPage/NotFoundPage"
import { MainPage } from "@/features/movies/ui/MainPage/MainPage"

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
import { NavLink } from "react-router";
import tmdbLogo from "@/assets/tmdb-logo.svg";
import s from "./Header.module.css";
import { useAppDispatch, useAppSelector } from "@/app/model/hooks";
import { toggleTheme } from "@/features/theme/model/themeSlice";

export const Header = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);

  return (
    <header className={s.header}>
      <NavLink to="/">
        <img src={tmdbLogo} alt="TMDB logo" className={s.logo} />
      </NavLink>

      <nav className={s.nav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? `${s.navLink} ${s.active}` : s.navLink
          }
        >
          Main
        </NavLink>
        <NavLink
          to="/category/popular"
          className={({ isActive }) =>
            isActive ? `${s.navLink} ${s.active}` : s.navLink
          }
        >
          Category Movies
        </NavLink>
        <NavLink
          to="/filtered"
          className={({ isActive }) =>
            isActive ? `${s.navLink} ${s.active}` : s.navLink
          }
        >
          Filtered Movies
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive ? `${s.navLink} ${s.active}` : s.navLink
          }
        >
          Search
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? `${s.navLink} ${s.active}` : s.navLink
          }
        >
          Favorites
        </NavLink>
      </nav>

      <button onClick={() => dispatch(toggleTheme())}>{themeMode === "light" ? "🌙" : "☀️"}</button>
    </header>
  );
};

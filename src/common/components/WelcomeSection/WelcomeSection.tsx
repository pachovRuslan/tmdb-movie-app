import { useState } from "react";
import { useNavigate } from "react-router";
import { getImageUrl } from "@/common/utils/image";
import type { Movie } from "@/common/types";
import s from "./WelcomeSection.module.css";

type WelcomeSectionProps = {
  movies: Movie[];
}

export const WelcomeSection = ({ movies }: WelcomeSectionProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [randomSeed] = useState(() => Math.random());

  const moviesWithBackdrop = movies.filter((movie) => movie.backdrop_path);
  const backdrop =
    moviesWithBackdrop.length > 0
      ? getImageUrl(
          moviesWithBackdrop[Math.floor(randomSeed * moviesWithBackdrop.length)].backdrop_path,
          "original",
        )
      : null;

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div
      className={s.welcome}
      style={backdrop ? { backgroundImage: `url(${backdrop})` } : undefined}
    >
      <div className={s.overlay} />
      <div className={s.content}>
        <h1>Welcome</h1>
        <div className={s.searchRow}>
          <input
            className={s.input}
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && handleSearch()}
          />
          <button className={s.searchButton} onClick={handleSearch} disabled={!query.trim()}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

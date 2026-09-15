
import { useGetNowPlayingMoviesQuery, useGetPopularMoviesQuery, useGetTopRatedMoviesQuery, useGetUpcomingMoviesQuery } from '../api/movieApi';
import { MovieRow } from '../components/MovieRow/MovieRow';
import { WelcomeSection } from '../components/WelcomeSection/WelcomeSection';
 

export const MainPage = () => {
    const { data: popular } = useGetPopularMoviesQuery(1);
    const { data: topRated } = useGetTopRatedMoviesQuery(1);
    const { data: upcoming } = useGetUpcomingMoviesQuery(1);
    const { data: nowPlaying } = useGetNowPlayingMoviesQuery(1);

    return (
        <div>
            <WelcomeSection movies={popular?.results ?? []} />
            {popular && <MovieRow title="Popular Movies" movies={popular.results} category="popular" />}
            {topRated && <MovieRow title="Top Rated Movies" movies={topRated.results} category="top_rated" />}
            {upcoming && <MovieRow title="Upcoming Movies" movies={upcoming.results} category="upcoming" />}
            {nowPlaying && <MovieRow title="Now Playing Movies" movies={nowPlaying.results} category="now_playing" />}
        </div>
    );
};
import { useGetNowPlayingMoviesQuery, useGetPopularMoviesQuery, useGetTopRatedMoviesQuery, useGetUpcomingMoviesQuery } from '../api/movieApi';
import { MovieRow } from '../components/MovieRow/MovieRow';
import { WelcomeSection } from '../components/WelcomeSection/WelcomeSection';
import { useApiErrorToast } from '../hooks/useApiErrorToast';


export const MainPage = () => {
    const { data: popular, error: popularError, isLoading: isPopularLoading } = useGetPopularMoviesQuery(1);
    const { data: topRated, error: topRatedError } = useGetTopRatedMoviesQuery(1);
    const { data: upcoming, error: upcomingError } = useGetUpcomingMoviesQuery(1);
    const { data: nowPlaying, error: nowPlayingError } = useGetNowPlayingMoviesQuery(1);

    useApiErrorToast(popularError);
    useApiErrorToast(topRatedError);
    useApiErrorToast(upcomingError);
    useApiErrorToast(nowPlayingError);

    return (
        <div>
            <WelcomeSection movies={popular?.results ?? []} />
            <MovieRow title="Popular Movies" movies={popular?.results ?? []} category="popular" isLoading={isPopularLoading} />
            {topRated && <MovieRow title="Top Rated Movies" movies={topRated.results} category="top_rated" />}
            {upcoming && <MovieRow title="Upcoming Movies" movies={upcoming.results} category="upcoming" />}
            {nowPlaying && <MovieRow title="Now Playing Movies" movies={nowPlaying.results} category="now_playing" />}
        </div>
    );
};
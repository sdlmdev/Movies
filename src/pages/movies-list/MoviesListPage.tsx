import { useNavigate } from 'react-router';
import { MovieCardActions } from '@widgets/MovieCardActions';
import { MoviesList } from '@widgets/MoviesList';
import { useMoviesFilters } from '@features/movies-filters';
import { useMovieSearch } from '@entities/movie';
import { useMoviesList } from '@entities/movie/api/useMoviesList';
import { getRouteMovie } from '@shared/constants/router';
import { useDictionary } from '@shared/hooks';

const MoviesListPage = () => {
	const t = useDictionary();
	const navigate = useNavigate();

	const { filters, resetFilters } = useMoviesFilters();
	const { query, ratingProvider, ...filterParams } = filters;

	const listResult = useMoviesList(filterParams, { enabled: !query });
	const searchResult = useMovieSearch(query ?? '', { enabled: Boolean(query) });

	const {
		movies,
		total,
		isLoading,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		isError,
	} = query ? searchResult : listResult;

	return (
		<MoviesList
			title={t.common.movies}
			movies={movies}
			total={total}
			ratingProvider={ratingProvider}
			isLoading={isLoading}
			isFetching={isFetching}
			isFetchingNextPage={isFetchingNextPage}
			hasNextPage={hasNextPage}
			fetchNextPage={fetchNextPage}
			isError={isError}
			onMovieClick={async (movie) => navigate(getRouteMovie(movie.id))}
			renderActions={(movie) => <MovieCardActions movie={movie} />}
			onErrorReset={resetFilters}
		/>
	);
};

export default MoviesListPage;

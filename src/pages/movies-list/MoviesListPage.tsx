import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Button, Group, Header, Placeholder } from '@vkontakte/vkui';
import { MovieVirtualGrid } from '@entities/movie';
import { useMoviesList } from '@entities/movie/api/useMoviesList';
import { getRouteMovie } from '@shared/constants/router';
import { useDictionary } from '@shared/hooks';
import { PageSkeleton } from '@shared/ui';
import { useMoviesFilters } from './model/useMoviesFilters';
import styles from './MoviesListPage.module.scss';

const MoviesListPage = () => {
	const t = useDictionary();
	const navigate = useNavigate();

	const { filters, ratingProvider, resetFilters } = useMoviesFilters();

	const {
		movies,
		total,
		isLoading,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		isError,
	} = useMoviesList(filters);

	const handleEndReached = useCallback(() => {
		if (hasNextPage && !isFetchingNextPage) {
			void fetchNextPage();
		}
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	const showSkeleton = isLoading || (isFetching && !isFetchingNextPage);

	if (showSkeleton) {
		return (
			<Group header={<Header>{t.common.movies}</Header>}>
				<PageSkeleton />
			</Group>
		);
	}

	if (isError) {
		return (
			<Group header={<Header>{t.common.movies}</Header>}>
				<Placeholder
					title={t.common.error}
					action={
						<Button size="m" onClick={resetFilters}>
							{t.filters.reset}
						</Button>
					}
				/>
			</Group>
		);
	}

	const footer = isFetchingNextPage ? (
		<div className={styles.loadingMore}>
			<PageSkeleton />
		</div>
	) : !hasNextPage && movies.length > 0 ? (
		<div className={styles.endOfList}>{t.movies.endOfList}</div>
	) : null;

	return (
		<Group
			header={
				<Header>
					{t.common.movies}
					{total > 0 && <span className={styles.total}> · {total}</span>}
				</Header>
			}
		>
			{!movies.length ? (
				<Placeholder title={t.common.noResults} />
			) : (
				<MovieVirtualGrid
					movies={movies}
					ratingProvider={ratingProvider}
					onMovieClick={async (movie) => navigate(getRouteMovie(movie.id))}
					endReached={handleEndReached}
					footer={footer}
				/>
			)}
		</Group>
	);
};

export default MoviesListPage;

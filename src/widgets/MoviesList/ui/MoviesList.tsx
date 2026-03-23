import { type ReactNode } from 'react';
import { Button, Group, Header, Placeholder } from '@vkontakte/vkui';
import { MovieVirtualGrid } from '@entities/movie';
import type { Movie, RatingProvider } from '@entities/movie/model/types';
import { UI_CHARS } from '@shared/constants/ui';
import { useDictionary } from '@shared/hooks';
import styles from './MoviesList.module.scss';
import { MoviesListSkeleton } from './MoviesListSkeleton/MoviesListSkeleton';

interface MoviesListProps {
	title: string;
	movies: Array<Movie>;
	total?: number;
	ratingProvider?: RatingProvider;
	isLoading?: boolean;
	isFetching?: boolean;
	isFetchingNextPage?: boolean;
	hasNextPage?: boolean;
	fetchNextPage?: VoidFunction;
	isError?: boolean;
	onMovieClick: (movie: Movie) => Promise<void>;
	renderActions?: (movie: Movie) => ReactNode;
	onErrorReset?: VoidFunction;
}

export const MoviesList = ({
	title,
	movies,
	total,
	ratingProvider,
	isLoading,
	isFetching,
	isFetchingNextPage,
	hasNextPage,
	fetchNextPage,
	isError,
	onMovieClick,
	renderActions,
	onErrorReset,
}: MoviesListProps) => {
	const t = useDictionary();

	const showSkeleton = isLoading || (isFetching && !isFetchingNextPage);

	if (showSkeleton) {
		return (
			<Group header={<Header>{title}</Header>}>
				<MoviesListSkeleton />
			</Group>
		);
	}

	if (isError) {
		return (
			<Group header={<Header>{title}</Header>}>
				<Placeholder
					title={t.common.error}
					action={
						onErrorReset && (
							<Button size="m" onClick={onErrorReset}>
								{t.filters.reset}
							</Button>
						)
					}
				/>
			</Group>
		);
	}

	const handleEndReached = () => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage?.();
		}
	};

	const footer = isFetchingNextPage ? (
		<div className={styles.loadingMore}>
			<MoviesListSkeleton />
		</div>
	) : movies.length > 0 ? (
		<div className={styles.endOfList}>{t.movies.endOfList}</div>
	) : null;

	const displayTotal = total ?? (movies.length > 0 ? movies.length : undefined);

	return (
		<Group
			header={
				<Header>
					{title}
					{displayTotal && (
						<span className={styles.total}>
							{UI_CHARS.MIDDLE_DOT}
							{displayTotal}
						</span>
					)}
				</Header>
			}
		>
			{!movies.length ? (
				<Placeholder title={t.common.noResults} />
			) : (
				<MovieVirtualGrid
					movies={movies}
					ratingProvider={ratingProvider}
					onMovieClick={onMovieClick}
					endReached={handleEndReached}
					footer={footer}
					renderActions={renderActions}
				/>
			)}
		</Group>
	);
};

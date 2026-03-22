import { ReactNode } from 'react';
import { SimpleGrid } from '@vkontakte/vkui';
import { Virtuoso } from 'react-virtuoso';
import { useGridColumns } from '@shared/hooks';
import type { Movie, RatingProvider } from '../../model/types';
import { MovieCard } from '../MovieCard/MovieCard';

interface MovieVirtualGridProps {
	movies: Array<Movie>;
	ratingProvider?: RatingProvider;
	onMovieClick: (movie: Movie) => void;
	endReached?: VoidFunction;
	footer?: ReactNode;
}

export const MovieVirtualGrid = ({
	movies,
	ratingProvider,
	onMovieClick,
	endReached,
	footer,
}: MovieVirtualGridProps) => {
	const { containerRef, columns } = useGridColumns();

	if (!movies || movies.length === 0) {
		return null;
	}

	const safeColumns = Math.max(1, columns);
	const rows: Array<Array<Movie>> = [];

	for (let i = 0; i < movies.length; i += safeColumns) {
		rows.push(movies.slice(i, i + safeColumns));
	}

	return (
		<div ref={containerRef}>
			<Virtuoso
				useWindowScroll
				data={rows}
				endReached={endReached}
				overscan={1200}
				computeItemKey={(_, row) => `${row[0]?.id ?? 0}-${ratingProvider ?? 'kp'}`}
				itemContent={(_, row) => (
					<SimpleGrid
						columns={safeColumns}
						gap={16}
						style={{ paddingBottom: 16, justifyItems: 'center' }}
					>
						{row.map((movie) => (
							<MovieCard
								key={movie.id}
								movie={movie}
								ratingProvider={ratingProvider}
								onClick={() => onMovieClick(movie)}
							/>
						))}
					</SimpleGrid>
				)}
				components={{
					Footer: footer ? () => <>{footer}</> : undefined,
				}}
			/>
		</div>
	);
};

import { type ReactNode } from 'react';
import { SimpleGrid } from '@vkontakte/vkui';
import { Virtuoso } from 'react-virtuoso';
import { DEFAULT_RATING_PROVIDER } from '@shared/constants/api';
import { GRID_CONFIG, UI_CHARS } from '@shared/constants/ui';
import { useGridColumns } from '@shared/hooks';
import type { Movie, RatingProvider } from '../../model/types';
import { MovieCard } from '../MovieCard/MovieCard';

interface MovieVirtualGridProps {
	movies: Array<Movie>;
	ratingProvider?: RatingProvider;
	onMovieClick: (movie: Movie) => void;
	endReached?: VoidFunction;
	footer?: ReactNode;
	renderActions?: (movie: Movie) => ReactNode;
}

export const MovieVirtualGrid = ({
	movies,
	ratingProvider,
	onMovieClick,
	endReached,
	footer,
	renderActions,
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
				computeItemKey={(_, row: Array<Movie>) =>
					`${row[0]?.id ?? 0}${UI_CHARS.DASH}${ratingProvider ?? DEFAULT_RATING_PROVIDER}`
				}
				itemContent={(_, row: Array<Movie>) => (
					<SimpleGrid
						columns={safeColumns}
						gap={GRID_CONFIG.GAP}
						style={{ paddingBottom: GRID_CONFIG.GAP, justifyItems: 'center' }}
					>
						{row.map((movie) => (
							<MovieCard
								key={movie.id}
								movie={movie}
								ratingProvider={ratingProvider}
								onClick={() => onMovieClick(movie)}
								actions={renderActions?.(movie)}
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

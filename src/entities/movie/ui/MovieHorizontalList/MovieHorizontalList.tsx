import { Box, Group, Header } from '@vkontakte/vkui';
import { Virtuoso } from 'react-virtuoso';
import { useDictionary } from '@shared/hooks';
import { Movie, MovieSimilar, RatingProvider } from '../../model/types';
import { MovieCard } from '../MovieCard/MovieCard';
import styles from './MovieHorizontalList.module.scss';

interface MovieHorizontalListProps {
	movies: Array<MovieSimilar>;
	ratingProvider?: RatingProvider;
	onMovieClick: (movie: Movie) => void;
	header?: string;
}

export const MovieHorizontalList = ({
	movies,
	ratingProvider,
	onMovieClick,
	header,
}: MovieHorizontalListProps) => {
	const t = useDictionary();

	if (!movies || !movies.length) {
		return null;
	}

	return (
		<Group header={<Header>{header ?? t.movie.similarMovies}</Header>}>
			<Box padding="2xl">
				<Virtuoso
					className={styles.list}
					horizontalDirection
					data={movies}
					components={{
						List: ({ style, children, ...props }) => (
							<div style={{ ...style, display: 'inline-flex', gap: '20px' }} {...props}>
								{children}
							</div>
						),
					}}
					itemContent={(_, movie) => (
						<MovieCard
							movie={movie as Movie}
							ratingProvider={ratingProvider}
							onClick={() => onMovieClick(movie as Movie)}
						/>
					)}
				/>
			</Box>
		</Group>
	);
};

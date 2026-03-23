import { EllipsisText, Image, SimpleCell } from '@vkontakte/vkui';
import { RatingBadge } from '@entities/movie';
import { POSTER_SIZES, UI_CHARS } from '@shared/constants/ui';
import { Movie } from '../../model/types';

interface MoviePosterProps {
	movie: Movie;
	onClick: (id: number) => void;
}

export const MovieSearchCell = ({ movie, onClick }: MoviePosterProps) => {
	if (!movie) {
		return null;
	}

	const { id, name, year, rating, poster, genres, alternativeName } = movie;
	const subtitle = [year, genres?.[0]?.name].filter(Boolean).join(UI_CHARS.POINT_SEPARATOR);

	return (
		<SimpleCell
			data-testid="movie-search-cell"
			onClick={() => onClick(id)}
			before={<Image src={poster?.previewUrl ?? poster?.url} size={POSTER_SIZES.SMALL} />}
			subtitle={subtitle}
			indicator={<RatingBadge rating={rating} />}
			activeMode="background"
		>
			<EllipsisText>{name || alternativeName}</EllipsisText>
		</SimpleCell>
	);
};

import { type ReactNode } from 'react';
import { Icon56CameraOutline } from '@vkontakte/icons';
import { Box, EllipsisText, Headline, Image, type ImageBaseProps, Title } from '@vkontakte/vkui';
import { RatingBadge } from '@entities/movie';
import { POSTER_SIZES, UI_CHARS } from '@shared/constants/ui';
import { formatYear, getMovieName } from '../../lib/formatters';
import type { Movie, RatingProvider } from '../../model/types';
import styles from './MovieCard.module.scss';

interface MovieCardProps {
	movie: Movie;
	onClick?: VoidFunction;
	ratingProvider?: RatingProvider;
	imageProps?: ImageBaseProps;
	cellSize?: ImageBaseProps['size'];
	actions?: ReactNode;
}

export const MovieCard = ({
	movie,
	onClick,
	ratingProvider,
	imageProps,
	cellSize = POSTER_SIZES.LARGE,
	actions,
}: MovieCardProps) => {
	const name = getMovieName(movie);
	const year = formatYear(movie.year);
	const genres = movie.genres?.map((g) => g.name).join(UI_CHARS.COMMA) || null;
	const { poster, rating } = movie;

	return (
		<Box padding="xl" className={styles.card} onClick={onClick}>
			<Image
				fallbackIcon={<Icon56CameraOutline />}
				src={poster?.url || poster?.previewUrl}
				alt={name}
				size={cellSize}
				{...imageProps}
			>
				<Image.Badge background="stroke">
					<RatingBadge rating={rating} provider={ratingProvider} size="m" />
				</Image.Badge>
				{actions && (
					<Image.FloatElement placement="top-start" inlineIndent="xs" blockIndent="xs">
						{actions}
					</Image.FloatElement>
				)}
			</Image>
			<Box inlineSize={cellSize}>
				<Title level="3">
					<EllipsisText>{name}</EllipsisText>
				</Title>
				<Headline weight="2" level="2">
					{year}
				</Headline>
				<Headline weight="2" level="2">
					<EllipsisText>{genres}</EllipsisText>
				</Headline>
			</Box>
		</Box>
	);
};

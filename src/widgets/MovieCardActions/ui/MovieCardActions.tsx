import { type MouseEvent } from 'react';
import {
	Icon20Arrows2LeftRightOutward,
	Icon20BookmarkOutline,
	Icon20BookmarkSlashOutline,
} from '@vkontakte/icons';
import { Button, ButtonGroup } from '@vkontakte/vkui';
import { useCompare } from '@app/providers/CompareProvider/CompareContext';
import { useFavorites } from '@app/providers/FavoritesProvider/FavoritesContext';
import type { Movie } from '@entities/movie/model/types';
import { useDictionary } from '@shared/hooks';

interface MovieCardActionsProps {
	movie: Movie;
}

const activeColor = 'var(--vkui--color_accent_red)';
const inactiveColor = 'white';

export const MovieCardActions = ({ movie }: MovieCardActionsProps) => {
	const t = useDictionary();
	const { isFavorite, requestAddToFavorites, removeFromFavorites } = useFavorites();
	const { isInCompare, addToCompare, removeFromCompare } = useCompare();

	const favorite = isFavorite(movie.id);
	const inCompare = isInCompare(movie.id);

	const handleFavoriteClick = (e: MouseEvent<HTMLElement>) => {
		e.stopPropagation();

		if (favorite) {
			removeFromFavorites(movie.id);
		} else {
			requestAddToFavorites(movie);
		}
	};

	const handleCompareClick = (e: MouseEvent<HTMLElement>) => {
		e.stopPropagation();

		if (inCompare) {
			removeFromCompare(movie.id);
		} else {
			addToCompare(movie);
		}
	};

	return (
		<ButtonGroup>
			<Button
				mode="tertiary"
				label={favorite ? t.movie.removeFromFavorites : t.movie.addToFavorites}
				onClick={handleFavoriteClick}
				after={
					favorite ? (
						<Icon20BookmarkSlashOutline fill={activeColor} />
					) : (
						<Icon20BookmarkOutline fill={inactiveColor} />
					)
				}
			></Button>
			<Button
				mode="tertiary"
				label={inCompare ? t.movie.removeFromCompare : t.common.compare}
				onClick={handleCompareClick}
				after={<Icon20Arrows2LeftRightOutward fill={inCompare ? activeColor : inactiveColor} />}
			></Button>
		</ButtonGroup>
	);
};

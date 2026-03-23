import {
	Icon20Arrows2LeftRightOutward,
	Icon20BookmarkOutline,
	Icon20BookmarkSlashOutline,
} from '@vkontakte/icons';
import { Button, ButtonGroup } from '@vkontakte/vkui';
import { useFavoritesActions, useFavoritesData } from '@features/add-to-favorites';
import { useCompareActions, useCompareData } from '@features/compare';
import type { Movie } from '@entities/movie/model/types';
import { useDictionary } from '@shared/hooks';

interface MovieDetailActionsProps {
	movie: Movie;
}

export const MovieDetailActions = ({ movie }: MovieDetailActionsProps) => {
	const t = useDictionary();
	const { isFavorite } = useFavoritesData();
	const { requestAddToFavorites, removeFromFavorites } = useFavoritesActions();
	const { isInCompare } = useCompareData();
	const { addToCompare, removeFromCompare } = useCompareActions();

	const inFavorites = isFavorite(movie.id);
	const inCompare = isInCompare(movie.id);

	const handleFavorite = () => {
		if (inFavorites) {
			removeFromFavorites(movie.id);
		} else {
			requestAddToFavorites(movie);
		}
	};

	const handleCompare = () => {
		if (inCompare) {
			removeFromCompare(movie.id);
		} else {
			addToCompare(movie);
		}
	};

	return (
		<ButtonGroup>
			<Button
				size="m"
				mode={inFavorites ? 'primary' : 'outline'}
				before={inFavorites ? <Icon20BookmarkSlashOutline /> : <Icon20BookmarkOutline />}
				onClick={handleFavorite}
			>
				{inFavorites ? t.movie.removeFromFavorites : t.movie.addToFavorites}
			</Button>
			<Button
				size="m"
				mode={inCompare ? 'primary' : 'outline'}
				before={<Icon20Arrows2LeftRightOutward />}
				onClick={handleCompare}
			>
				{inCompare ? t.movie.removeFromCompare : t.common.compare}
			</Button>
		</ButtonGroup>
	);
};

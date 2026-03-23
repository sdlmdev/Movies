import { type MouseEvent } from 'react';
import {
	Icon20Arrows2LeftRightOutward,
	Icon20BookmarkOutline,
	Icon20BookmarkSlashOutline,
} from '@vkontakte/icons';
import { Button, ButtonGroup } from '@vkontakte/vkui';
import classNames from 'classnames';
import { useFavoritesActions, useFavoritesData } from '@features/add-to-favorites';
import { useCompareActions, useCompareData } from '@features/compare';
import type { Movie } from '@entities/movie/model/types';
import { useDictionary } from '@shared/hooks';
import styles from './MovieCardActions.module.scss';

interface MovieCardActionsProps {
	movie: Movie;
}

export const MovieCardActions = ({ movie }: MovieCardActionsProps) => {
	const t = useDictionary();
	const { isFavorite } = useFavoritesData();
	const { requestAddToFavorites, removeFromFavorites } = useFavoritesActions();
	const { isInCompare } = useCompareData();
	const { addToCompare, removeFromCompare } = useCompareActions();

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
						<Icon20BookmarkSlashOutline className={styles.active} />
					) : (
						<Icon20BookmarkOutline className={styles.inactive} />
					)
				}
			></Button>
			<Button
				mode="tertiary"
				label={inCompare ? t.movie.removeFromCompare : t.common.compare}
				onClick={handleCompareClick}
				after={
					<Icon20Arrows2LeftRightOutward
						className={classNames(inCompare ? styles.active : styles.inactive)}
					/>
				}
			></Button>
		</ButtonGroup>
	);
};

import { Counter, type CounterProps } from '@vkontakte/vkui';
import cn from 'classnames';
import { getPrimaryRating } from '../../lib/getRatings';
import type { MovieRating, RatingProvider } from '../../model/types';
import styles from './RatingBadge.module.scss';

interface RatingBadgeProps {
	rating: MovieRating;
	size?: CounterProps['size'];
	provider?: RatingProvider;
}

const RATING_HIGH_THRESHOLD = 7;
const RATING_MEDIUM_THRESHOLD = 5;

export const RatingBadge = ({ rating, size = 's', provider }: RatingBadgeProps) => {
	const ratingData = getPrimaryRating(rating, provider);

	if (!ratingData) {
		return null;
	}

	return (
		<Counter
			data-testid="rating-badge"
			size={size}
			className={cn({
				[styles.high]: ratingData.value >= RATING_HIGH_THRESHOLD,
				[styles.medium]: ratingData.value >= RATING_MEDIUM_THRESHOLD,
				[styles.low]: ratingData.value < RATING_MEDIUM_THRESHOLD,
			})}
			mode="primary"
		>
			{ratingData.fixedValue}
		</Counter>
	);
};

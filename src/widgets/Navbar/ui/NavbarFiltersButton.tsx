import { useMatch } from 'react-router';
import { Icon28SlidersOutline } from '@vkontakte/icons';
import { IconButton } from '@vkontakte/vkui';
import classNames from 'classnames';
import { MoviesFiltersModal } from '@features/movies-filters';
import { getRouteFavorites, getRouteMain } from '@shared/constants/router';
import { useDictionary } from '@shared/hooks';
import { useMoviesFilters } from '../../../pages/movies-list/model/useMoviesFilters';
import styles from './NavbarFiltersButton.module.scss';

const MAX_RATING = 10;

export const NavbarFiltersButton = ({ onClick }: { onClick: () => void }) => {
	const isMainPage = useMatch(getRouteMain());
	const isFavoritesPage = useMatch(getRouteFavorites());
	const t = useDictionary();

	const { activeFiltersCount } = useMoviesFilters();

	if (!isMainPage && !isFavoritesPage) {
		return null;
	}

	return (
		<IconButton onClick={onClick} aria-label={t.filters.title}>
			<Icon28SlidersOutline
				className={classNames({
					[styles.active]: activeFiltersCount > 0,
				})}
			/>
		</IconButton>
	);
};

export const NavbarFiltersModalContainer = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) => {
	const {
		filters,
		ratingFrom,
		ratingTo,
		yearFrom,
		yearTo,
		ratingProvider,
		sortBy,
		sortOrder,
		setFilters,
		resetFilters,
	} = useMoviesFilters();

	return (
		<MoviesFiltersModal
			isOpen={isOpen}
			onClose={onClose}
			filters={filters}
			ratingFrom={ratingFrom ?? 0}
			ratingTo={ratingTo ?? MAX_RATING}
			yearFrom={yearFrom}
			yearTo={yearTo}
			ratingProvider={ratingProvider}
			sortBy={sortBy}
			sortOrder={sortOrder}
			onApply={(newFilters) => {
				setFilters({ ...newFilters, query: filters.query });
				onClose();
			}}
			onReset={resetFilters}
		/>
	);
};

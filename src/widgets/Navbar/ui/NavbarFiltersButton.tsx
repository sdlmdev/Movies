import { useMatch } from 'react-router';
import { Icon28SlidersOutline } from '@vkontakte/icons';
import { IconButton } from '@vkontakte/vkui';
import classNames from 'classnames';
import { MoviesFiltersModal, useMoviesFilters } from '@features/movies-filters';
import { API_LIMITS, DEFAULT_RATING_PROVIDER, SORT_ORDERS } from '@shared/constants/api';
import { CURRENT_YEAR } from '@shared/constants/common';
import { getRouteFavorites, getRouteMain } from '@shared/constants/router';
import { useDictionary } from '@shared/hooks';
import styles from './NavbarFiltersButton.module.scss';

const MAX_RATING = 10;

export const NavbarFiltersButton = ({ onClick }: { onClick: VoidFunction }) => {
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
	onClose: VoidFunction;
}) => {
	const { filters, setFilters, resetFilters } = useMoviesFilters();
	const { ratingFrom, ratingTo, yearFrom, yearTo, ratingProvider, sortBy, sortOrder } = filters;

	return (
		<MoviesFiltersModal
			isOpen={isOpen}
			onClose={onClose}
			filters={filters}
			ratingFrom={ratingFrom ?? 0}
			ratingTo={ratingTo ?? MAX_RATING}
			yearFrom={yearFrom ?? API_LIMITS.MIN_YEAR}
			yearTo={yearTo ?? CURRENT_YEAR}
			ratingProvider={ratingProvider ?? DEFAULT_RATING_PROVIDER}
			sortBy={sortBy}
			sortOrder={sortOrder ?? SORT_ORDERS.DESC}
			onApply={(newFilters) => {
				setFilters({ ...newFilters, query: filters.query });
				onClose();
			}}
			onReset={resetFilters}
		/>
	);
};

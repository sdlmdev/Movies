import { type ChangeEvent, type KeyboardEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Box, Flex, Popover, Search, Spinner } from '@vkontakte/vkui';
import { Virtuoso } from 'react-virtuoso';
import { useMoviesFilters } from '@pages/movies-list/model/useMoviesFilters';
import { useSearch } from '@features/search-movie/model/lib/hooks/useSearch';
import { MovieSearchCell, SearchSkeleton } from '@entities/movie';
import { SEARCH_PARAMS } from '@shared/constants/api';
import { SEARCH_CONFIG } from '@shared/constants/common';
import { getRouteMain, getRouteMovie } from '@shared/constants/router';
import { useDictionary } from '@shared/hooks';
import styles from './SearchMovie.module.scss';

export const SearchMovie = () => {
	const t = useDictionary();

	const { query, setQuery, results, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
		useSearch();

	const navigate = useNavigate();
	const { search } = useLocation();
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const {
		filters: { query: urlQuery },
	} = useMoviesFilters();

	useEffect(() => {
		setQuery(urlQuery ?? '');
	}, [urlQuery, setQuery]);

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;

		setQuery(value);
		setIsPopoverOpen(value.length > SEARCH_CONFIG.MIN_QUERY_LENGTH);

		if (!value.trim()) {
			const nextParams = new URLSearchParams(search);

			if (nextParams.has(SEARCH_PARAMS.QUERY)) {
				nextParams.delete(SEARCH_PARAMS.QUERY);
				navigate({ search: nextParams.toString() });
			}
		}
	};

	const handleResultClick = (id: number) => {
		navigate(getRouteMovie(id));
		setIsPopoverOpen(false);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const nextParams = new URLSearchParams(search);

			if (query.trim()) {
				nextParams.set(SEARCH_PARAMS.QUERY, query.trim());
			} else {
				nextParams.delete(SEARCH_PARAMS.QUERY);
			}

			setIsPopoverOpen(false);
			navigate({ pathname: getRouteMain(), search: nextParams.toString() });
		}
	};

	return (
		<div className={styles.container}>
			<Popover
				shown={isPopoverOpen && (results.length > 0 || isLoading)}
				onShownChange={setIsPopoverOpen}
				sameWidth
				disableFocusTrap
				content={
					isLoading ? (
						<Box padding="m">
							<SearchSkeleton />
						</Box>
					) : (
						<Virtuoso
							style={{ height: '400px', width: '100%' }}
							data={results}
							itemContent={(_, movie) => (
								<MovieSearchCell key={movie.id} movie={movie} onClick={handleResultClick} />
							)}
							endReached={() => {
								if (hasNextPage && !isFetchingNextPage) {
									void fetchNextPage();
								}
							}}
							components={{
								Footer: () =>
									isFetchingNextPage ? (
										<Flex justify="center" style={{ padding: 16 }}>
											<Spinner size="s" />
										</Flex>
									) : null,
							}}
						/>
					)
				}
				placement="bottom"
			>
				<Search
					value={query}
					onChange={handleSearchChange}
					onKeyDown={handleKeyDown}
					placeholder={t.common.searchPlaceholder}
					className={styles.searchInput}
				/>
			</Popover>
		</div>
	);
};

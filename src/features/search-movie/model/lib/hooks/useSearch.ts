import { useState } from 'react';
import { useMoviesList } from '@entities/movie/api/useMoviesList';
import { SEARCH_CONFIG } from '@shared/constants/common';
import { useDebounce } from '@shared/hooks';

export const useSearch = () => {
	const [query, setQuery] = useState('');
	const debouncedQuery = useDebounce(query, SEARCH_CONFIG.DEBOUNCE_DELAY);

	const { movies, isLoading, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage, isError } =
		useMoviesList(
			{ query: debouncedQuery },
			{ enabled: debouncedQuery.length >= SEARCH_CONFIG.MIN_QUERY_LENGTH },
		);

	const isReady = debouncedQuery.length >= SEARCH_CONFIG.MIN_QUERY_LENGTH;

	return {
		query,
		setQuery,
		results: isReady ? movies : [],
		isLoading: isReady ? isLoading : false,
		isFetching: isReady ? isFetching : false,
		isFetchingNextPage: isReady ? isFetchingNextPage : false,
		hasNextPage: isReady ? hasNextPage : false,
		fetchNextPage,
		isError,
	};
};

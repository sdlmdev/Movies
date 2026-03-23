import { useInfiniteQuery } from '@tanstack/react-query';
import { API_LIMITS, QUERY_KEYS } from '@shared/constants/api';
import type { MovieFilters } from '../model/types';
import { movieApi } from './movieApi';

export const useMoviesList = (
	filters: Omit<MovieFilters, 'page' | 'limit'>,
	options: { enabled?: boolean } = { enabled: true },
) => {
	const { data, isLoading, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage, isError } =
		useInfiniteQuery({
			queryKey: [QUERY_KEYS.MOVIES, filters],
			queryFn: async ({ pageParam, signal }) =>
				movieApi.getMovies(
					{
						...filters,
						page: pageParam,
						limit: API_LIMITS.MOVIES_PER_PAGE,
					},
					signal,
				),
			initialPageParam: 1,
			getNextPageParam: (lastPage) =>
				lastPage.page < lastPage.pages ? lastPage.page + 1 : undefined,
			enabled: options.enabled,
		});

	const movies = data?.pages.flatMap((page) => page.docs) ?? [];
	const total = data?.pages[0]?.total ?? 0;

	return {
		movies,
		total,
		isLoading,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		isError,
	};
};

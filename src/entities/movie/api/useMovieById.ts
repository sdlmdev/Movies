import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@shared/constants/api';
import { movieApi } from './movieApi';

export const MOVIE_BY_ID_QUERY_KEY = (id: string | number) =>
	[QUERY_KEYS.MOVIE_DETAIL, id] as const;

export const useMovieById = (id: string | number | undefined) => {
	return useQuery({
		queryKey: MOVIE_BY_ID_QUERY_KEY(id ?? ''),
		queryFn: async () => {
			if (!id) {
				throw new Error('Movie id is required');
			}

			return movieApi.getMovieById(id);
		},
		enabled: Boolean(id),
	});
};

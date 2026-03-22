import { useQuery } from '@tanstack/react-query';
import { FILTER_FIELDS, QUERY_KEYS } from '@shared/constants/api';
import { movieApi } from './movieApi';

export const useFilterOptions = () => {
	const { data, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.FILTER_OPTIONS],
		queryFn: async () => {
			const [genresData, countriesData] = await Promise.all([
				movieApi.getPossibleValues(FILTER_FIELDS.GENRES),
				movieApi.getPossibleValues(FILTER_FIELDS.COUNTRIES),
			]);

			return { genresData, countriesData };
		},
		staleTime: Infinity,
	});

	const genres = (data?.genresData ?? [])
		.filter((g) => g.name)
		.map((g) => ({ id: g.name, label: g.name }));

	const countries = (data?.countriesData ?? [])
		.filter((c) => c.name)
		.map((c) => ({ id: c.name, label: c.name }));

	return { genres, countries, isLoading };
};

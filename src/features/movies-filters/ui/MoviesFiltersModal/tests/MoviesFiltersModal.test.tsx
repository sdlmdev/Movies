import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SORT_ORDERS } from '@shared/constants/api';
import { translation } from '@shared/lib/i18n/locales/ru/translation';
import { MoviesFiltersModal } from '../MoviesFiltersModal';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

vi.mock('@shared/hooks', () => ({
	useDictionary: () => translation,
}));

vi.mock('../../lib/useFilterFormOptions', () => ({
	useFilterFormOptions: () => ({
		sortFieldOptions: [{ value: 'year', label: 'Год' }],
		sortOrderOptions: [{ value: 'asc', label: 'По возрастанию' }],
		isSeriesOptions: [{ value: 'movie', label: 'Фильмы' }],
		ageRatingOptions: [{ value: '18', label: '18+' }],
		genreOptions: [{ value: 'drama', label: 'Драма' }],
		countryOptions: [{ value: 'russia', label: 'Россия' }],
		providerOptions: [{ value: 'kp', label: 'Кинопоиск' }],
		isOptionsLoading: false,
	}),
}));

const MOCK_FILTERS = {
	genres: ['drama'],
	countries: ['russia'],
	isSeries: ['movie'],
	ageRating: ['18'],
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('MoviesFiltersModal', () => {
	it('matches snapshot when open', () => {
		const { baseElement } = render(
			<MoviesFiltersModal
				isOpen={true}
				onClose={vi.fn()}
				filters={MOCK_FILTERS}
				ratingFrom={0}
				ratingTo={10}
				yearFrom={1990}
				yearTo={2024}
				ratingProvider="kp"
				sortOrder={SORT_ORDERS.DESC}
				onApply={vi.fn()}
				onReset={vi.fn()}
			/>,
			{ wrapper: Wrapper },
		);

		expect(baseElement).toMatchSnapshot();
	});

	it('calls onApply with updated filters', () => {
		const onApply = vi.fn();

		render(
			<MoviesFiltersModal
				isOpen={true}
				onClose={vi.fn()}
				filters={MOCK_FILTERS}
				ratingFrom={0}
				ratingTo={10}
				yearFrom={1990}
				yearTo={2024}
				ratingProvider="kp"
				sortOrder={SORT_ORDERS.DESC}
				onApply={onApply}
				onReset={vi.fn()}
			/>,
			{ wrapper: Wrapper },
		);

		fireEvent.click(screen.getByTestId('filters-apply'));
		expect(onApply).toHaveBeenCalled();
	});

	it('calls onReset and onClose', () => {
		const onReset = vi.fn();
		const onClose = vi.fn();

		render(
			<MoviesFiltersModal
				isOpen={true}
				onClose={onClose}
				filters={MOCK_FILTERS}
				ratingFrom={0}
				ratingTo={10}
				yearFrom={1990}
				yearTo={2024}
				ratingProvider="kp"
				sortOrder={SORT_ORDERS.DESC}
				onApply={vi.fn()}
				onReset={onReset}
			/>,
			{ wrapper: Wrapper },
		);

		fireEvent.click(screen.getByTestId('filters-reset'));
		expect(onReset).toHaveBeenCalled();
		expect(onClose).toHaveBeenCalled();
	});
});

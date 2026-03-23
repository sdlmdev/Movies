import { MemoryRouter } from 'react-router';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useMoviesFilters } from '@features/movies-filters';
import { useSearch } from '../../model/useSearch';
import { SearchMovie } from '../SearchMovie';

vi.mock('@vkontakte/vkui', async (importOriginal) => {
	const original = await importOriginal<any>();

	return {
		...original,
		AppRoot: ({ children }: any) => <div data-testid="app-root">{children}</div>,
		ConfigProvider: ({ children }: any) => <div data-testid="config-provider">{children}</div>,
		Popover: ({ children, content, shown }: any) => (
			<div data-testid="popover-wrapper">
				{children}
				{shown && <div data-testid="popover-content">{content}</div>}
			</div>
		),
	};
});

vi.mock('../../model/useSearch', () => ({
	useSearch: vi.fn(),
}));

vi.mock('@features/movies-filters', () => ({
	useMoviesFilters: vi.fn(),
}));

vi.mock('@shared/hooks', () => ({
	useDictionary: () => ({
		common: {
			searchPlaceholder: 'Search movies...',
		},
	}),
}));

vi.mock('react-virtuoso', () => ({
	Virtuoso: ({ data, itemContent }: any) => (
		<div data-testid="search-results">
			{data.map((item: any, index: number) => itemContent(index, item))}
		</div>
	),
}));

const MOCK_RESULTS = [
	{ id: 1, name: 'Inception', poster: { url: 'poster1.jpg' }, rating: { kp: 8.8 }, year: 2010 },
	{ id: 2, name: 'Matrix', poster: { url: 'poster2.jpg' }, rating: { kp: 8.7 }, year: 1999 },
];

describe('SearchMovie', () => {
	it('matches snapshot when empty', () => {
		vi.mocked(useSearch).mockReturnValue({
			query: '',
			setQuery: vi.fn(),
			results: [],
			isLoading: false,
		} as any);

		vi.mocked(useMoviesFilters).mockReturnValue({ filters: { query: '' } } as any);

		const { baseElement } = render(
			<MemoryRouter>
				<SearchMovie />
			</MemoryRouter>,
		);

		expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument();
		expect(baseElement).toMatchSnapshot();
	});

	it('renders results search when query is present', () => {
		vi.mocked(useSearch).mockReturnValue({
			query: 'Inception',
			setQuery: vi.fn(),
			results: MOCK_RESULTS,
			isLoading: false,
		} as any);

		vi.mocked(useMoviesFilters).mockReturnValue({ filters: { query: 'Inception' } } as any);

		render(
			<MemoryRouter>
				<SearchMovie />
			</MemoryRouter>,
		);

		const input = screen.getByPlaceholderText('Search movies...');
		expect(input).toHaveValue('Inception');
	});

	it('calls setQuery on input change', () => {
		const setQuery = vi.fn();

		vi.mocked(useSearch).mockReturnValue({
			query: '',
			setQuery,
			results: [],
			isLoading: false,
		} as any);

		vi.mocked(useMoviesFilters).mockReturnValue({ filters: { query: '' } } as any);

		render(
			<MemoryRouter>
				<SearchMovie />
			</MemoryRouter>,
		);

		const input = screen.getByPlaceholderText('Search movies...');
		fireEvent.change(input, { target: { value: 'Inception' } });

		expect(setQuery).toHaveBeenCalledWith('Inception');
	});
});

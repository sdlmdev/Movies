import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
	useCompareActions,
	useCompareData,
	useCompareModal,
} from '../../CompareProvider/CompareContext';
import { CompareModal } from '../CompareModal';

vi.mock('../../CompareProvider/CompareContext', () => ({
	useCompareData: vi.fn(),
	useCompareActions: vi.fn(),
	useCompareModal: vi.fn(),
}));

vi.mock('@shared/hooks', () => ({
	useDictionary: () => ({
		common: {
			year: 'Year',
			rating: 'Rating',
			genre: 'Genre',
			duration: 'Duration',
			hour: 'h',
			min: 'm',
		},
		compare: {
			title: 'Comparison',
			empty: 'Your compare list is empty',
			hint: 'Add movies to compare',
			clearAll: 'Clear all',
		},
		movie: {
			removeFromCompare: 'Remove',
		},
	}),
}));

const MOCK_MOVIE_A = {
	id: 1,
	name: 'Inception',
	year: 2010,
	rating: { kp: 8.8 },
	genres: [{ name: 'Action' }],
	movieLength: 148,
	poster: { url: 'poster-a.jpg' },
} as any;

const MOCK_MOVIE_B = {
	id: 2,
	name: 'Matrix',
	year: 1999,
	rating: { kp: 8.7 },
	genres: [{ name: 'Sci-Fi' }],
	movieLength: 136,
	poster: { url: 'poster-b.jpg' },
} as any;

describe('CompareModal', () => {
	it('matches snapshot when empty', () => {
		vi.mocked(useCompareData).mockReturnValue({ compareList: [] } as any);

		vi.mocked(useCompareActions).mockReturnValue({
			removeFromCompare: vi.fn(),
			clearCompare: vi.fn(),
		} as any);

		vi.mocked(useCompareModal).mockReturnValue({
			isCompareOpen: true,
			closeCompare: vi.fn(),
			openCompare: vi.fn(),
		});

		const { baseElement } = render(<CompareModal />);

		expect(screen.getByText('Your compare list is empty')).toBeInTheDocument();
		expect(baseElement).toMatchSnapshot();
	});

	it('matches snapshot with movies', () => {
		vi.mocked(useCompareData).mockReturnValue({ compareList: [MOCK_MOVIE_A, MOCK_MOVIE_B] } as any);

		vi.mocked(useCompareActions).mockReturnValue({
			removeFromCompare: vi.fn(),
			clearCompare: vi.fn(),
		} as any);

		vi.mocked(useCompareModal).mockReturnValue({
			isCompareOpen: true,
			closeCompare: vi.fn(),
			openCompare: vi.fn(),
		});

		const { baseElement } = render(<CompareModal />);

		expect(screen.getByText('Inception')).toBeInTheDocument();
		expect(screen.getByText('Matrix')).toBeInTheDocument();
		expect(baseElement).toMatchSnapshot();
	});

	it('calls clearCompare when clear button clicked', () => {
		const clearCompare = vi.fn();
		vi.mocked(useCompareData).mockReturnValue({ compareList: [MOCK_MOVIE_A] } as any);

		vi.mocked(useCompareActions).mockReturnValue({
			removeFromCompare: vi.fn(),
			clearCompare,
		} as any);

		vi.mocked(useCompareModal).mockReturnValue({
			isCompareOpen: true,
			closeCompare: vi.fn(),
			openCompare: vi.fn(),
		});

		render(<CompareModal />);
		screen.getByText('Clear all').click();

		expect(clearCompare).toHaveBeenCalled();
	});
});

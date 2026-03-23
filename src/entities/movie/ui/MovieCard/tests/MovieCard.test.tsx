import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MovieCard } from '../MovieCard';

vi.mock('@entities/movie', async (importOriginal) => {
	const original = await importOriginal<any>();

	return {
		...original,
		RatingBadge: ({ rating, provider }: any) => (
			<div data-testid="rating-badge">
				{provider || 'kp'}: {rating[provider || 'kp']}
			</div>
		),
	};
});

const MOCK_MOVIE = {
	id: 1,
	name: 'Inception',
	alternativeName: 'Inception Alt',
	enName: 'Inception EN',
	year: 2010,
	genres: [{ name: 'Action' }, { name: 'Sci-Fi' }],
	poster: { url: 'poster.jpg', previewUrl: 'preview.jpg' },
	rating: { kp: 8.8, imdb: 8.7, tmdb: 8.6 },
};

describe('MovieCard', () => {
	it('renders movie information correctly', () => {
		render(<MovieCard movie={MOCK_MOVIE as any} />);

		expect(screen.getByText('Inception')).toBeInTheDocument();
		expect(screen.getByText('2010')).toBeInTheDocument();
		expect(screen.getByText('Action, Sci-Fi')).toBeInTheDocument();
		expect(screen.getByAltText('Inception')).toHaveAttribute('src', 'poster.jpg');
		expect(screen.getByTestId('rating-badge')).toHaveTextContent('kp: 8.8');
	});

	it('renders actions if passed', () => {
		render(
			<MovieCard
				movie={MOCK_MOVIE as any}
				actions={
					<>
						<button data-testid="test-action">Action</button>
					</>
				}
			/>,
		);

		expect(screen.getByTestId('test-action')).toBeInTheDocument();
	});

	it('matches snapshot', () => {
		const { baseElement } = render(<MovieCard movie={MOCK_MOVIE as any} />);
		expect(baseElement).toMatchSnapshot();
	});

	it('uses rating provider if passed', () => {
		render(<MovieCard movie={MOCK_MOVIE as any} ratingProvider="imdb" />);
		expect(screen.getByTestId('rating-badge')).toHaveTextContent('imdb: 8.7');
	});
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RatingBadge } from '../RatingBadge';

const RATING_HIGH_THRESHOLD = 7;
const RATING_MEDIUM_THRESHOLD = 5;

describe('RatingBadge', () => {
	const mockRating = { kp: 8.5, imdb: 7.2, tmdb: 4.5 };

	it('renders KP rating by default', () => {
		render(<RatingBadge rating={mockRating} />);
		expect(screen.getByTestId('rating-badge')).toHaveTextContent('8.5');
	});

	it('renders specific provider rating', () => {
		render(<RatingBadge rating={mockRating} provider="imdb" />);
		expect(screen.getByTestId('rating-badge')).toHaveTextContent('7.2');
	});

	it('applies high rating style', () => {
		render(<RatingBadge rating={{ kp: RATING_HIGH_THRESHOLD }} />);
		expect(screen.getByTestId('rating-badge')).toBeInTheDocument();
	});

	it('applies medium rating style', () => {
		render(<RatingBadge rating={{ kp: RATING_MEDIUM_THRESHOLD }} />);
		expect(screen.getByTestId('rating-badge')).toBeInTheDocument();
	});

	it('applies low rating style', () => {
		const lowRating = RATING_MEDIUM_THRESHOLD - 1;
		render(<RatingBadge rating={{ kp: lowRating }} />);
		expect(screen.getByTestId('rating-badge')).toBeInTheDocument();
	});

	it('returns null if no rating available', () => {
		const { container } = render(<RatingBadge rating={{}} />);
		expect(container).toBeEmptyDOMElement();
	});
});

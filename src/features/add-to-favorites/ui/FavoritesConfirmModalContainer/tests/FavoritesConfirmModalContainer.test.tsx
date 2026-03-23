import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useFavoritesModal } from '../../FavoritesProvider/FavoritesContext';
import { FavoritesConfirmModalContainer } from '../FavoritesConfirmModalContainer';

vi.mock('../../FavoritesProvider/FavoritesContext', () => ({
	useFavoritesModal: vi.fn(),
}));

vi.mock('@shared/hooks', () => ({
	useDictionary: () => ({
		favorites: {
			addConfirmTitle: 'Add to favorites?',
			addConfirmText: 'Movie {{title}} will be added.',
		},
		common: {
			confirm: 'Confirm',
			cancel: 'Cancel',
		},
	}),
}));

const MOCK_MOVIE = {
	id: 1,
	name: 'Inception',
};

describe('FavoritesConfirmModalContainer', () => {
	it('renders ConfirmModal when isConfirmOpen is true', () => {
		vi.mocked(useFavoritesModal).mockReturnValue({
			isConfirmOpen: true,
			pendingMovie: MOCK_MOVIE as any,
			confirmAdd: vi.fn(),
			cancelAdd: vi.fn(),
		});

		render(<FavoritesConfirmModalContainer />);

		expect(screen.getByText('Add to favorites?')).toBeInTheDocument();
		expect(screen.getByText(/Inception/)).toBeInTheDocument();
	});

	it('does not render ConfirmModal when isConfirmOpen is false', () => {
		vi.mocked(useFavoritesModal).mockReturnValue({
			isConfirmOpen: false,
			pendingMovie: null,
			confirmAdd: vi.fn(),
			cancelAdd: vi.fn(),
		});

		const { container } = render(<FavoritesConfirmModalContainer />);

		expect(container.firstChild).toBeNull();
	});

	it('calls confirmAdd when confirmed', () => {
		const confirmAdd = vi.fn();

		vi.mocked(useFavoritesModal).mockReturnValue({
			isConfirmOpen: true,
			pendingMovie: MOCK_MOVIE as any,
			confirmAdd,
			cancelAdd: vi.fn(),
		});

		render(<FavoritesConfirmModalContainer />);
		screen.getByText('Confirm').click();

		expect(confirmAdd).toHaveBeenCalled();
	});

	it('calls cancelAdd when cancelled', () => {
		const cancelAdd = vi.fn();

		vi.mocked(useFavoritesModal).mockReturnValue({
			isConfirmOpen: true,
			pendingMovie: MOCK_MOVIE as any,
			confirmAdd: vi.fn(),
			cancelAdd,
		});

		render(<FavoritesConfirmModalContainer />);
		screen.getByText('Cancel').click();

		expect(cancelAdd).toHaveBeenCalled();
	});
});

import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { translation } from '@shared/lib/i18n/locales/ru/translation';
import { ConfirmModal } from '../ConfirmModal';

vi.mock('@shared/hooks', () => ({
	useDictionary: () => translation,
}));

const MOCK_MOVIE = {
	id: 1,
	name: 'Inception',
} as any;

describe('ConfirmModal', () => {
	it('matches snapshot when open', () => {
		const { baseElement } = render(
			<ConfirmModal isOpen={true} movie={MOCK_MOVIE} onConfirm={vi.fn()} onCancel={vi.fn()} />,
		);

		expect(baseElement).toMatchSnapshot();
	});

	it('returns null if no movie', () => {
		const { container } = render(
			<ConfirmModal isOpen={true} movie={null} onConfirm={vi.fn()} onCancel={vi.fn()} />,
		);

		expect(container.firstChild).toBeNull();
	});
});

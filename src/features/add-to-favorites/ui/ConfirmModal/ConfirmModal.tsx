import {
	Box,
	Button,
	ButtonGroup,
	ModalPage,
	unstable_ModalPageFooter as ModalPageFooter,
	ModalPageHeader,
	Text,
} from '@vkontakte/vkui';
import { getMovieName } from '@entities/movie/lib/formatters';
import type { Movie } from '@entities/movie/model/types';
import { useDictionary } from '@shared/hooks';

interface ConfirmModalProps {
	isOpen: boolean;
	movie: Movie | null;
	onConfirm: VoidFunction;
	onCancel: VoidFunction;
}

export const ConfirmModal = ({ isOpen, movie, onConfirm, onCancel }: ConfirmModalProps) => {
	const t = useDictionary();

	if (!movie) {
		return null;
	}

	const bodyText = t.favorites.addConfirmText.replace('{{title}}', getMovieName(movie));

	return (
		<ModalPage open={isOpen} onClose={onCancel}>
			<ModalPageHeader>{t.favorites.addConfirmTitle}</ModalPageHeader>
			<Box padding="m">
				<Text Component="p">{bodyText}</Text>
			</Box>
			<ModalPageFooter>
				<ButtonGroup mode="horizontal" gap="m" stretched>
					<Button stretched appearance="negative" size="m" onClick={onCancel}>
						{t.common.cancel}
					</Button>
					<Button stretched appearance="accent" size="m" onClick={onConfirm}>
						{t.common.confirm}
					</Button>
				</ButtonGroup>
			</ModalPageFooter>
		</ModalPage>
	);
};

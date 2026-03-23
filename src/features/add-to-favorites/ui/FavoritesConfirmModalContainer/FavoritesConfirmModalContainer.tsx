import { useFavorites } from '@app/providers/FavoritesProvider';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';

export const FavoritesConfirmModalContainer = () => {
	const { isConfirmOpen, pendingMovie, confirmAdd, cancelAdd } = useFavorites();

	return (
		<ConfirmModal
			isOpen={isConfirmOpen}
			movie={pendingMovie}
			onConfirm={confirmAdd}
			onCancel={cancelAdd}
		/>
	);
};

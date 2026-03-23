import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { useFavoritesModal } from '../FavoritesProvider/FavoritesContext';

export const FavoritesConfirmModalContainer = () => {
	const { confirmAdd, cancelAdd, isConfirmOpen, pendingMovie } = useFavoritesModal();

	return (
		<ConfirmModal
			isOpen={isConfirmOpen}
			movie={pendingMovie}
			onConfirm={confirmAdd}
			onCancel={cancelAdd}
		/>
	);
};

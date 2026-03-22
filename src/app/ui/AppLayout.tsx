import { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import {
	Footer,
	Link,
	Panel,
	ScreenSpinner,
	Spacing,
	SplitCol,
	SplitLayout,
	View,
} from '@vkontakte/vkui';
import { Navbar } from '@widgets/Navbar';
import { ConfirmModal } from '@features/add-to-favorites';
import { CompareModal } from '@features/compare';
import { KINOPOISK_DEV_URL } from '@shared/constants/api';
import { useDictionary } from '@shared/hooks';
import { ScrollToTop } from '@shared/ui';
import { useFavorites } from '../providers/FavoritesProvider';

export const AppLayout = () => {
	const { isConfirmOpen, pendingMovie, confirmAdd, cancelAdd } = useFavorites();
	const t = useDictionary();

	return (
		<>
			<ScrollRestoration />
			<Navbar />
			<SplitLayout center>
				<SplitCol stretchedOnMobile autoSpaced>
					<View activePanel="main-content">
						<Panel id="main-content">
							<Spacing size={16} />
							<Suspense fallback={<ScreenSpinner state="loading" />}>
								<Outlet />
							</Suspense>

							<Footer>
								{t.footer.text}
								<Link href={KINOPOISK_DEV_URL} target="_blank">
									{t.footer.api}
								</Link>
							</Footer>

							<ConfirmModal
								isOpen={isConfirmOpen}
								movie={pendingMovie}
								onConfirm={confirmAdd}
								onCancel={cancelAdd}
							/>
							<CompareModal />
						</Panel>
					</View>
				</SplitCol>
			</SplitLayout>
			<ScrollToTop />
		</>
	);
};

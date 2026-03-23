import { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import { Panel, ScreenSpinner, Spacing, SplitCol, SplitLayout, View } from '@vkontakte/vkui';
import { AppFooter } from '@widgets/AppFooter';
import { Navbar } from '@widgets/Navbar';
import { FavoritesConfirmModalContainer } from '@features/add-to-favorites';
import { CompareModal } from '@features/compare';
import { ScrollToTop } from '@shared/ui';

export const AppLayout = () => {
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

							<AppFooter />

							<FavoritesConfirmModalContainer />
							<CompareModal />
						</Panel>
					</View>
				</SplitCol>
			</SplitLayout>
			<ScrollToTop />
		</>
	);
};

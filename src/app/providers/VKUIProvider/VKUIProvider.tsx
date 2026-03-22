import type { ReactNode } from 'react';
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import { useTheme } from '@shared/hooks';
import styles from './VKUIProvider.module.scss';

interface VKUIProviderProps {
	children: ReactNode;
}

export const VKUIProvider = ({ children }: VKUIProviderProps) => {
	const { theme } = useTheme();

	return (
		<ConfigProvider colorScheme={theme}>
			<AdaptivityProvider>
				<AppRoot className={styles.root}>{children}</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
};

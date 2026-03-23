import { Icon20Arrows2LeftRightOutward, Icon28FavoriteOutline } from '@vkontakte/icons';
import { ButtonGroup, Flex, IconButton } from '@vkontakte/vkui';
import cn from 'classnames';
import { useCompareData, useCompareModal } from '@features/compare';
import { LangSwitcher } from '@features/lang-switcher';
import { ThemeSwitcher } from '@features/theme-switcher';
import { getRouteFavorites } from '@shared/constants/router';
import { useDictionary } from '@shared/hooks';
import { NavigationButton } from '@shared/ui';
import { NavbarFiltersButton } from '../NavbarFilters/NavbarFilters';
import styles from './NavbarControls.module.scss';

interface NavbarControlsProps {
	isMobile: boolean;
	onFiltersClick: VoidFunction;
}

export const NavbarControls = ({ isMobile, onFiltersClick }: NavbarControlsProps) => {
	const t = useDictionary();
	const { compareList } = useCompareData();
	const { openCompare } = useCompareModal();

	return (
		<Flex direction={isMobile ? 'column' : 'row'} align="center" gap="s">
			<NavbarFiltersButton onClick={onFiltersClick} />

			<ButtonGroup align="center" gap="s" mode={isMobile ? 'vertical' : 'horizontal'}>
				<LangSwitcher />
				<ThemeSwitcher />
				<NavigationButton
					to={getRouteFavorites()}
					aria-label={t.common.favorites}
					data-testid="favorite-button"
				>
					<Icon28FavoriteOutline />
				</NavigationButton>
				<IconButton
					aria-label={t.common.compare}
					onClick={openCompare}
					label={t.common.compare}
					data-testid="compare-button"
				>
					<Icon20Arrows2LeftRightOutward
						width={28}
						height={28}
						className={cn({
							[styles.active]: compareList.length > 0,
						})}
					/>
				</IconButton>
			</ButtonGroup>
		</Flex>
	);
};

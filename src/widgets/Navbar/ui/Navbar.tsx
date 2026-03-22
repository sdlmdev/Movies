import { useState } from 'react';
import {
	Icon20Arrows2LeftRightOutward,
	Icon28FavoriteOutline,
	Icon28MenuOutline,
} from '@vkontakte/icons';
import {
	ButtonGroup,
	Flex,
	IconButton,
	PanelHeader,
	PanelHeaderButton,
	Popover,
	useAdaptivityConditionalRender,
} from '@vkontakte/vkui';
import classNames from 'classnames';
import { useCompare } from '@app/providers/CompareProvider/CompareContext';
import { LangSwitcher } from '@features/lang-switcher';
import { SearchMovie } from '@features/search-movie';
import { ThemeSwitcher } from '@features/theme-switcher';
import { getRouteFavorites } from '@shared/constants/router';
import { useDictionary } from '@shared/hooks';
import { Logo, NavigationButton } from '@shared/ui';
import styles from './Navbar.module.scss';
import { NavbarFiltersButton, NavbarFiltersModalContainer } from './NavbarFiltersButton';

export const Navbar = () => {
	const t = useDictionary();
	const { compareList, openCompare } = useCompare();
	const { sizeX } = useAdaptivityConditionalRender();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);

	const renderControls = (isMobile: boolean) => (
		<Flex direction={isMobile ? 'column' : 'row'} align="center" gap="s">
			<NavbarFiltersButton
				onClick={() => {
					setIsFiltersOpen(true);

					if (isMobile) {
						setIsMenuOpen(false);
					}
				}}
			/>

			<ButtonGroup align="center" gap="s" mode={isMobile ? 'vertical' : 'horizontal'}>
				<LangSwitcher />
				<ThemeSwitcher />
				<NavigationButton to={getRouteFavorites()} aria-label={t.common.favorites}>
					<Icon28FavoriteOutline />
				</NavigationButton>
				<IconButton aria-label={t.common.compare} onClick={openCompare} label={t.common.compare}>
					<Icon20Arrows2LeftRightOutward
						width={28}
						height={28}
						className={classNames({
							[styles.active]: compareList.length > 0,
						})}
					/>
				</IconButton>
			</ButtonGroup>
		</Flex>
	);

	return (
		<>
			<PanelHeader
				before={<Logo />}
				after={
					<>
						{sizeX.regular && (
							<div className={sizeX.regular.className}>{renderControls(false)}</div>
						)}
						{sizeX.compact && (
							<div className={sizeX.compact.className}>
								<Popover
									shown={isMenuOpen}
									onShownChange={setIsMenuOpen}
									content={renderControls(true)}
									trigger="click"
								>
									<PanelHeaderButton aria-label={t.common.menu}>
										<Icon28MenuOutline />
									</PanelHeaderButton>
								</Popover>
							</div>
						)}
					</>
				}
				delimiter="none"
			>
				<Flex align="center" justify="center">
					<SearchMovie />
				</Flex>
			</PanelHeader>
			<NavbarFiltersModalContainer isOpen={isFiltersOpen} onClose={() => setIsFiltersOpen(false)} />
		</>
	);
};

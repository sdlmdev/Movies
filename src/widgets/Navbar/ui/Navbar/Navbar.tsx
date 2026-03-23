import { useState } from 'react';
import { Icon28MenuOutline } from '@vkontakte/icons';
import {
	Flex,
	PanelHeader,
	PanelHeaderButton,
	Popover,
	useAdaptivityConditionalRender,
} from '@vkontakte/vkui';
import { SearchMovie } from '@features/search-movie';
import { useDictionary } from '@shared/hooks';
import { Logo } from '@shared/ui';
import { NavbarControls } from '../NavbarControls/NavbarControls';
import { NavbarFiltersModalContainer } from '../NavbarFilters/NavbarFilters';

export const Navbar = () => {
	const t = useDictionary();
	const { sizeX } = useAdaptivityConditionalRender();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);

	const handleFiltersClick = () => {
		setIsFiltersOpen(true);
		setIsMenuOpen(false);
	};

	return (
		<>
			<PanelHeader
				before={<Logo />}
				after={
					<>
						{sizeX.regular && (
							<div className={sizeX.regular.className}>
								<NavbarControls isMobile={false} onFiltersClick={handleFiltersClick} />
							</div>
						)}
						{sizeX.compact && (
							<div className={sizeX.compact.className}>
								<Popover
									shown={isMenuOpen}
									onShownChange={setIsMenuOpen}
									content={<NavbarControls isMobile={true} onFiltersClick={handleFiltersClick} />}
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

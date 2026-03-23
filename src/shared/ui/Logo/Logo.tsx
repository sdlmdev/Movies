import { Link, useLocation } from 'react-router';
import { Icon32VideoSquareOutline } from '@vkontakte/icons';
import { Flex, Text } from '@vkontakte/vkui';
import cn from 'classnames';
import { getRouteMain } from '@shared/constants/router';
import { useDictionary } from '@shared/hooks';
import styles from './Logo.module.scss';

export const Logo = () => {
	const t = useDictionary();
	const { search } = useLocation();

	return (
		<Link data-testid="logo" to={{ pathname: getRouteMain(), search }} className={cn(styles.logo)}>
			<Flex gap="s" align="center" noWrap>
				<Icon32VideoSquareOutline />
				<Text>{t.common.movies}</Text>
			</Flex>
		</Link>
	);
};

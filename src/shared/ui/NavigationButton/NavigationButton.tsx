import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { IconButton, type IconButtonProps } from '@vkontakte/vkui';

interface NavigationButtonProps extends IconButtonProps {
	to: string;
	children: ReactNode;
}

export const NavigationButton = ({ to, children, ...props }: NavigationButtonProps) => {
	const navigate = useNavigate();
	const { pathname, search } = useLocation();
	const isActive = pathname === to;

	const handleNavigate = () => {
		if (!props.disabled) {
			navigate({ pathname: to, search });
		}
	};

	return (
		<IconButton {...props} activated={isActive} onClick={handleNavigate}>
			{children}
		</IconButton>
	);
};

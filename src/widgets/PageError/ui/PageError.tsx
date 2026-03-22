import { useNavigate } from 'react-router';
import { Icon56ErrorOutline } from '@vkontakte/icons';
import { Button, Placeholder } from '@vkontakte/vkui';
import { getRouteMain } from '@shared/constants/router';
import { useDictionary } from '@shared/hooks';

interface PageErrorProps {
	onReset?: VoidFunction;
}

export const PageError = ({ onReset }: PageErrorProps) => {
	const t = useDictionary();
	const navigate = useNavigate();

	return (
		<Placeholder
			icon={<Icon56ErrorOutline />}
			title={t.errors.general}
			action={
				onReset ? (
					<Button size="s" onClick={onReset}>
						{t.common.retry}
					</Button>
				) : (
					<Button size="s" onClick={async () => navigate(getRouteMain())}>
						{t.common.toMain}
					</Button>
				)
			}
		/>
	);
};

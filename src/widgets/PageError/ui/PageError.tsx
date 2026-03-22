import { Icon56ErrorOutline } from '@vkontakte/icons';
import { Button, Placeholder } from '@vkontakte/vkui';
import { useDictionary } from '@shared/hooks';

interface PageErrorProps {
	onReset?: VoidFunction;
}

export const PageError = ({ onReset }: PageErrorProps) => {
	const t = useDictionary();

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
					<Button size="s" href="/">
						{t.common.toMain}
					</Button>
				)
			}
		/>
	);
};

import { useNavigate } from 'react-router';
import { Icon56GhostOutline } from '@vkontakte/icons';
import { Button, Placeholder } from '@vkontakte/vkui';
import { getRouteMain } from '@shared/constants/router';
import { useDictionary } from '@shared/hooks';

const NotFoundPage = () => {
	const t = useDictionary();
	const navigate = useNavigate();

	return (
		<Placeholder
			icon={<Icon56GhostOutline />}
			title="404"
			action={
				<Button size="s" onClick={async () => navigate(getRouteMain())}>
					{t.common.back}
				</Button>
			}
		>
			{t.errors.notFound}
		</Placeholder>
	);
};

export default NotFoundPage;

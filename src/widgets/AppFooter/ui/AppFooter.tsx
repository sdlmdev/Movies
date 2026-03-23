import { Footer, Link } from '@vkontakte/vkui';
import { KINOPOISK_DEV_URL } from '@shared/constants/api';
import { useDictionary } from '@shared/hooks';

export const AppFooter = () => {
	const t = useDictionary();

	return (
		<Footer>
			{t.footer.text}
			<Link href={KINOPOISK_DEV_URL} target="_blank">
				{t.footer.api}
			</Link>
		</Footer>
	);
};

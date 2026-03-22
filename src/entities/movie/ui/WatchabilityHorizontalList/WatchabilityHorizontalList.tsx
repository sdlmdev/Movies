import {
	Avatar,
	Box,
	EllipsisText,
	Group,
	Header,
	HorizontalCell,
	HorizontalScroll,
	Link,
} from '@vkontakte/vkui';
import { Virtuoso } from 'react-virtuoso';
import { AVATAR_SIZES } from '@shared/constants/ui';
import { useDictionary } from '@shared/hooks';
import { MovieWatchability } from '../../model/types';
import styles from './WatchabilityHorizontalList.module.scss';

const IMG_SIZE = '/orig';

export const WatchabilityHorizontalList = ({ items }: MovieWatchability) => {
	const t = useDictionary();

	if (!items || !items.length) {
		return null;
	}

	return (
		<Group header={<Header>{t.movie.watchability}</Header>}>
			<Box padding="2xl">
				<Virtuoso
					className={styles.list}
					horizontalDirection
					components={{
						List: ({ style, children, ...props }) => (
							<div style={{ ...style, display: 'inline-flex' }} {...props}>
								{children}
							</div>
						),
						Scroller: ({ style, children, ...props }) => (
							<HorizontalScroll style={style} {...props}>
								{children}
							</HorizontalScroll>
						),
					}}
					data={items}
					itemContent={(_, { logo, url, name }) => {
						const logoUrl = logo.url.endsWith(IMG_SIZE) ? logo.url : `${logo.url}${IMG_SIZE}`;

						return (
							<Link
								noUnderline
								key={url}
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.item}
								title={name}
							>
								<HorizontalCell
									title={<EllipsisText maxWidth={AVATAR_SIZES.WATCHABILITY}>{name}</EllipsisText>}
									textAlign="center"
									size="m"
								>
									<Avatar src={logoUrl} alt={name} size={AVATAR_SIZES.WATCHABILITY} />
								</HorizontalCell>
							</Link>
						);
					}}
				/>
			</Box>
		</Group>
	);
};

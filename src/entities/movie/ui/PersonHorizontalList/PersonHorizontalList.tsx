import {
	Avatar,
	Box,
	EllipsisText,
	Group,
	Header,
	HorizontalCell,
	HorizontalScroll,
} from '@vkontakte/vkui';
import { Virtuoso } from 'react-virtuoso';
import { AVATAR_SIZES } from '@shared/constants/ui';
import { useDictionary } from '@shared/hooks';
import type { MoviePerson } from '../../model/types';
import styles from './PersonHorizontalList.module.scss';

interface PersonHorizontalListProps {
	persons: Array<MoviePerson>;
}

export const PersonHorizontalList = ({ persons }: PersonHorizontalListProps) => {
	const t = useDictionary();

	if (!persons || !persons.length) {
		return null;
	}

	return (
		<Group header={<Header>{t.movie.team}</Header>}>
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
					data={persons}
					itemContent={(_, { photo, name, enName, profession }) => {
						return (
							<HorizontalCell
								title={<EllipsisText maxWidth={AVATAR_SIZES.PERSON}>{name ?? enName}</EllipsisText>}
								subtitle={<EllipsisText maxWidth={AVATAR_SIZES.PERSON}>{profession}</EllipsisText>}
								size="l"
								textAlign="center"
							>
								<Avatar src={photo} alt={name ?? enName} size={AVATAR_SIZES.PERSON} />
							</HorizontalCell>
						);
					}}
				/>
			</Box>
		</Group>
	);
};

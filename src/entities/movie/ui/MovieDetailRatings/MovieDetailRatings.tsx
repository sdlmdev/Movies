import { ContentBadge, Flex, Group, Header, SimpleCell } from '@vkontakte/vkui';
import { useDictionary } from '@shared/hooks';

interface RatingEntry {
	id: string;
	fixedValue: string;
	header?: string;
}

interface MovieDetailRatingsProps {
	ratings: Array<RatingEntry>;
}

export const MovieDetailRatings = ({ ratings }: MovieDetailRatingsProps) => {
	const t = useDictionary();

	if (ratings.length === 0) {
		return null;
	}

	return (
		<Group header={<Header>{t.common.rating}</Header>}>
			<Flex>
				{ratings.map((rating) => (
					<SimpleCell
						key={rating.id}
						before={
							<ContentBadge mode="outline" appearance="accent" size="l">
								{rating.fixedValue}
							</ContentBadge>
						}
					>
						{rating.header}
					</SimpleCell>
				))}
			</Flex>
		</Group>
	);
};

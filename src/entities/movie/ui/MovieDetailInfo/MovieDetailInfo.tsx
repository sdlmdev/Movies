import { Flex, Group, Header, InfoRow, SimpleCell } from '@vkontakte/vkui';
import { useDictionary } from '@shared/hooks';
import { formatCurrency, formatDate, formatDuration, formatYear } from '../../lib/formatters';
import type { Movie } from '../../model/types';

type MovieDetailInfoProps = {
	movie: Pick<
		Movie,
		'year' | 'movieLength' | 'isSeries' | 'ageRating' | 'ratingMpaa' | 'budget' | 'premiere'
	>;
};

export const MovieDetailInfo = ({ movie }: MovieDetailInfoProps) => {
	const t = useDictionary();
	const { year: movieYear, movieLength, isSeries, ageRating, ratingMpaa, budget, premiere } = movie;

	const year = formatYear(movieYear);
	const duration = formatDuration(movieLength, t.common.hour, t.common.min);

	return (
		<Group header={<Header>{t.movie.details}</Header>}>
			<Flex gap="xl">
				{year && (
					<SimpleCell>
						<InfoRow header={t.common.year}>{year}</InfoRow>
					</SimpleCell>
				)}
				{duration && (
					<SimpleCell>
						<InfoRow header={t.common.duration}>{duration}</InfoRow>
					</SimpleCell>
				)}
				<SimpleCell>
					<InfoRow header={t.filters.type}>
						{isSeries ? t.filters.typeSeries : t.filters.typeMovie}
					</InfoRow>
				</SimpleCell>
				{Number.isFinite(ageRating) && (
					<SimpleCell>
						<InfoRow header={t.filters.ageRating}>{ageRating}+</InfoRow>
					</SimpleCell>
				)}
				{ratingMpaa && (
					<SimpleCell>
						<InfoRow header={t.movie.ratingMpaa}>{ratingMpaa.toUpperCase()}</InfoRow>
					</SimpleCell>
				)}
				{budget && (
					<SimpleCell>
						<InfoRow header={t.movie.budget}>
							{formatCurrency(budget.value, budget.currency)}
						</InfoRow>
					</SimpleCell>
				)}
				{premiere?.world && (
					<SimpleCell>
						<InfoRow header={t.movie.premiereWorld}>{formatDate(premiere.world)}</InfoRow>
					</SimpleCell>
				)}
				{premiere?.russia && (
					<SimpleCell>
						<InfoRow header={t.movie.premiereRussia}>{formatDate(premiere.russia)}</InfoRow>
					</SimpleCell>
				)}
				{premiere?.digital && (
					<SimpleCell>
						<InfoRow header={t.movie.premiereDigital}>{formatDate(premiere.digital)}</InfoRow>
					</SimpleCell>
				)}
			</Flex>
		</Group>
	);
};

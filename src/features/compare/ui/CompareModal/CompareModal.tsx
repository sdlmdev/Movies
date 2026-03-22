import { Icon20Cancel, Icon20DeleteOutline } from '@vkontakte/icons';
import {
	Button,
	Headline,
	IconButton,
	ModalPage,
	ModalPageHeader,
	Placeholder,
	Separator,
	Subhead,
	useAdaptivityWithJSMediaQueries,
} from '@vkontakte/vkui';
import cn from 'classnames';
import { useCompare } from '@app/providers/CompareProvider/CompareContext';
import { MoviePoster } from '@entities/movie';
import { formatDuration, formatYear } from '@entities/movie/lib/formatters';
import { getPrimaryRating } from '@entities/movie/lib/getRatings';
import type { Movie } from '@entities/movie/model/types';
import { UI_CHARS } from '@shared/constants/ui';
import { useDictionary } from '@shared/hooks';
import styles from './CompareModal.module.scss';

interface ComparePosterBlockProps {
	movie: Movie;
	removeLabel: string;
	onRemove: VoidFunction;
	className?: string;
}

const ComparePosterBlock = ({
	movie,
	removeLabel,
	onRemove,
	className,
}: ComparePosterBlockProps) => {
	const title = movie.name || movie.alternativeName;

	return (
		<div className={cn(styles.posterSlot, className)}>
			<IconButton className={styles.removeBtn} label={removeLabel} onClick={onRemove}>
				<Icon20Cancel />
			</IconButton>
			<MoviePoster poster={movie.poster} alt={title} size={100} className={styles.posterImage} />
			<Headline weight="2" className={styles.posterTitle}>
				{title}
			</Headline>
		</div>
	);
};

export const CompareModal = () => {
	const t = useDictionary();
	const { isDesktop } = useAdaptivityWithJSMediaQueries();

	const { compareList, clearCompare, removeFromCompare, isCompareOpen, closeCompare } =
		useCompare();

	const [movieA, movieB] = compareList;
	const hasPair = Boolean(movieA && movieB);

	const rows = [
		{
			label: t.common.year,
			a: formatYear(movieA?.year) ?? UI_CHARS.DASH,
			b: formatYear(movieB?.year) ?? UI_CHARS.DASH,
		},
		{
			label: t.common.rating,
			a: movieA ? (getPrimaryRating(movieA.rating)?.fixedValue ?? UI_CHARS.DASH) : UI_CHARS.DASH,
			b: movieB ? (getPrimaryRating(movieB.rating)?.fixedValue ?? UI_CHARS.DASH) : UI_CHARS.DASH,
		},
		{
			label: t.common.genre,
			a: movieA?.genres?.map((g) => g.name).join(UI_CHARS.COMMA) || UI_CHARS.DASH,
			b: movieB?.genres?.map((g) => g.name).join(UI_CHARS.COMMA) || UI_CHARS.DASH,
		},
		{
			label: t.common.duration,
			a: formatDuration(movieA?.movieLength, t.common.hour, t.common.min) ?? UI_CHARS.DASH,
			b: formatDuration(movieB?.movieLength, t.common.hour, t.common.min) ?? UI_CHARS.DASH,
		},
	];

	return (
		<ModalPage
			open={isCompareOpen}
			onClose={closeCompare}
			{...(isDesktop ? { settlingHeight: 100 } : { dynamicContentHeight: true })}
		>
			<ModalPageHeader
				after={
					compareList.length ? (
						<Button
							size="s"
							mode="tertiary"
							appearance="negative"
							before={<Icon20DeleteOutline />}
							onClick={clearCompare}
						>
							{t.compare.clearAll}
						</Button>
					) : null
				}
			>
				{t.compare.title}
			</ModalPageHeader>

			{!compareList.length ? (
				<Placeholder title={t.compare.empty}>{t.compare.hint}</Placeholder>
			) : (
				<div className={styles.body}>
					<div className={cn(styles.posters, hasPair && styles.postersPair)}>
						{movieA && (
							<ComparePosterBlock
								movie={movieA}
								removeLabel={t.movie.removeFromCompare}
								onRemove={() => removeFromCompare(movieA.id)}
								className={cn(!hasPair && styles.posterSlotSingle)}
							/>
						)}
						{movieB && (
							<ComparePosterBlock
								movie={movieB}
								removeLabel={t.movie.removeFromCompare}
								onRemove={() => removeFromCompare(movieB.id)}
							/>
						)}
					</div>

					<Separator className={styles.separator} />

					<div className={styles.table}>
						{rows.map((row) => (
							<div key={row.label} className={cn(styles.row, hasPair && styles.rowPair)}>
								<Subhead weight="3" className={styles.cellLabel}>
									{row.label}
								</Subhead>
								<Subhead className={styles.cellValue}>{row.a}</Subhead>
								{hasPair ? <Subhead className={styles.cellValue}>{row.b}</Subhead> : null}
							</div>
						))}
					</div>
				</div>
			)}
		</ModalPage>
	);
};

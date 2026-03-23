import { useEffect, useState } from 'react';
import { Icon20DeleteOutline } from '@vkontakte/icons';
import {
	Button,
	ChipsSelect,
	FormItem,
	ModalPage,
	ModalPageHeader,
	Select,
	Slider,
	Spinner,
} from '@vkontakte/vkui';
import type { MovieFilters, RatingProvider, SortField, SortOrder } from '@entities/movie';
import { API_LIMITS, DEFAULT_RATING_PROVIDER, SORT_ORDERS } from '@shared/constants/api';
import { CURRENT_YEAR } from '@shared/constants/common';
import { UI_CHARS } from '@shared/constants/ui';
import { useDictionary } from '@shared/hooks';
import { useFilterFormOptions } from '../../lib/useFilterFormOptions';
import styles from './MoviesFiltersModal.module.scss';

interface MoviesFiltersModalProps {
	isOpen: boolean;
	onClose: VoidFunction;
	filters: Omit<MovieFilters, 'page' | 'limit'>;
	ratingFrom: number;
	ratingTo: number;
	yearFrom: number;
	yearTo: number;
	ratingProvider: RatingProvider;
	sortBy?: SortField;
	sortOrder: SortOrder;
	onApply: (filters: Omit<MovieFilters, 'page' | 'limit'>) => void;
	onReset: VoidFunction;
}

const MAX_RATING = API_LIMITS.MAX_RATING;

export const MoviesFiltersModal = ({
	isOpen,
	onClose,
	filters,
	ratingFrom,
	ratingTo,
	yearFrom,
	yearTo,
	ratingProvider,
	sortBy,
	sortOrder,
	onApply,
	onReset,
}: MoviesFiltersModalProps) => {
	const t = useDictionary();

	const {
		sortFieldOptions,
		sortOrderOptions,
		isSeriesOptions,
		ageRatingOptions,
		genreOptions,
		countryOptions,
		providerOptions,
		isOptionsLoading,
	} = useFilterFormOptions();

	const [localGenres, setLocalGenres] = useState<Array<string>>(filters.genres ?? []);
	const [localCountries, setLocalCountries] = useState<Array<string>>(filters.countries ?? []);
	const [localIsSeries, setLocalIsSeries] = useState<Array<string>>(filters.isSeries ?? []);
	const [localAgeRating, setLocalAgeRating] = useState<Array<string>>(filters.ageRating ?? []);
	const [localRating, setLocalRating] = useState<[number, number]>([ratingFrom, ratingTo]);
	const [localYear, setLocalYear] = useState<[number, number]>([yearFrom, yearTo]);
	const [localProvider, setLocalProvider] = useState<RatingProvider>(ratingProvider);
	const [localSortBy, setLocalSortBy] = useState<SortField | ''>(sortBy ?? '');
	const [localSortOrder, setLocalSortOrder] = useState<SortOrder>(sortOrder);

	useEffect(() => {
		if (isOpen) {
			setLocalGenres(filters.genres ?? []);
			setLocalCountries(filters.countries ?? []);
			setLocalIsSeries(filters.isSeries ?? []);
			setLocalAgeRating(filters.ageRating ?? []);
			setLocalRating([ratingFrom, ratingTo]);
			setLocalYear([yearFrom, yearTo]);
			setLocalProvider(ratingProvider);
			setLocalSortBy(sortBy ?? '');
			setLocalSortOrder(sortOrder);
		}
	}, [
		isOpen,
		filters.genres,
		filters.countries,
		filters.isSeries,
		filters.ageRating,
		ratingFrom,
		ratingTo,
		yearFrom,
		yearTo,
		ratingProvider,
		sortBy,
		sortOrder,
	]);

	const handleApply = () => {
		onApply({
			genres: localGenres.length > 0 ? localGenres : undefined,
			countries: localCountries.length > 0 ? localCountries : undefined,
			isSeries: localIsSeries.length > 0 ? localIsSeries : undefined,
			ageRating: localAgeRating.length > 0 ? localAgeRating : undefined,
			ratingFrom: localRating[0] > 0 ? localRating[0] : undefined,
			ratingTo: localRating[1] < MAX_RATING ? localRating[1] : undefined,
			yearFrom: localYear[0] > API_LIMITS.MIN_YEAR ? localYear[0] : undefined,
			yearTo: localYear[1] < CURRENT_YEAR ? localYear[1] : undefined,
			ratingProvider: localProvider !== DEFAULT_RATING_PROVIDER ? localProvider : undefined,
			sortBy: localSortBy || undefined,
			sortOrder: localSortOrder !== SORT_ORDERS.DESC ? localSortOrder : undefined,
		});

		onClose();
	};

	const handleReset = () => {
		onReset();
		onClose();
	};

	const selectedGenres = genreOptions.filter((opt) => localGenres.includes(opt.value));
	const selectedCountries = countryOptions.filter((opt) => localCountries.includes(opt.value));
	const selectedAgeRating = ageRatingOptions.filter((opt) => localAgeRating.includes(opt.value));

	return (
		<ModalPage open={isOpen} onClose={onClose} settlingHeight={80} dynamicContentHeight>
			<ModalPageHeader
				after={
					<Button
						size="s"
						mode="tertiary"
						appearance="negative"
						before={<Icon20DeleteOutline />}
						onClick={handleReset}
					>
						{t.filters.reset}
					</Button>
				}
			>
				{t.filters.title}
			</ModalPageHeader>

			<FormItem top={t.filters.type}>
				<Select
					value={localIsSeries[0] ?? ''}
					onChange={(e) => setLocalIsSeries(e.target.value ? [e.target.value] : [])}
					options={isSeriesOptions}
				/>
			</FormItem>

			<FormItem top={t.common.genre}>
				{isOptionsLoading ? (
					<Spinner size="s" />
				) : (
					<ChipsSelect
						value={selectedGenres}
						onChange={(opts) => setLocalGenres(opts.map((o) => o.value))}
						options={genreOptions}
						placeholder={t.filters.selectGenres}
					/>
				)}
			</FormItem>

			<FormItem top={t.filters.countries}>
				{isOptionsLoading ? (
					<Spinner size="s" />
				) : (
					<ChipsSelect
						value={selectedCountries}
						onChange={(opts) => setLocalCountries(opts.map((o) => o.value))}
						options={countryOptions}
						placeholder={t.filters.selectCountries}
					/>
				)}
			</FormItem>
			<FormItem top={t.filters.ageRating}>
				<ChipsSelect
					value={selectedAgeRating}
					onChange={(opts) => setLocalAgeRating(opts.map((o) => o.value))}
					options={ageRatingOptions}
					placeholder={t.filters.selectAgeRating}
				/>
			</FormItem>

			<FormItem top={t.filters.ratingProvider}>
				<Select
					value={localProvider}
					onChange={(e) => setLocalProvider(e.target.value as RatingProvider)}
					options={providerOptions}
				/>
			</FormItem>

			<FormItem top={t.filters.sortBy}>
				<Select
					value={localSortBy}
					onChange={(e) => setLocalSortBy(e.target.value as SortField | '')}
					options={sortFieldOptions}
				/>
			</FormItem>

			{localSortBy && (
				<FormItem top={t.filters.sortOrder}>
					<Select
						value={localSortOrder}
						onChange={(e) => setLocalSortOrder(e.target.value as SortOrder)}
						options={sortOrderOptions}
					/>
				</FormItem>
			)}

			<FormItem
				top={`${t.common.rating}: ${localRating[0]}${UI_CHARS.RANGE_SEPARATOR}${localRating[1]}`}
			>
				<Slider
					multiple
					min={0}
					max={MAX_RATING}
					step={0.5}
					value={localRating}
					onChange={setLocalRating}
				/>
			</FormItem>

			<FormItem
				top={`${t.filters.year}: ${localYear[0]}${UI_CHARS.RANGE_SEPARATOR}${localYear[1]}`}
			>
				<Slider
					multiple
					min={API_LIMITS.MIN_YEAR}
					max={CURRENT_YEAR}
					step={1}
					value={localYear}
					onChange={setLocalYear}
				/>
			</FormItem>

			<div className={styles.footer}>
				<Button size="l" stretched onClick={handleApply}>
					{t.filters.apply}
				</Button>
			</div>
		</ModalPage>
	);
};

import { useNavigate, useParams } from 'react-router';
import {
	Icon20Arrows2LeftRightOutward,
	Icon20BookmarkOutline,
	Icon20BookmarkSlashOutline,
} from '@vkontakte/icons';
import {
	Box,
	Button,
	ButtonGroup,
	Chip,
	ContentBadge,
	Flex,
	Group,
	Header,
	InfoRow,
	Placeholder,
	SimpleCell,
	Text,
	Title,
} from '@vkontakte/vkui';
import { useCompare } from '@app/providers/CompareProvider/CompareContext';
import { useFavorites } from '@app/providers/FavoritesProvider/FavoritesContext';
import {
	MovieHorizontalList,
	MoviePoster,
	PersonHorizontalList,
	WatchabilityHorizontalList,
} from '@entities/movie';
import { useMovieById } from '@entities/movie/api/useMovieById';
import {
	formatCurrency,
	formatDate,
	formatDuration,
	formatYear,
} from '@entities/movie/lib/formatters';
import { getDetailedRatings } from '@entities/movie/lib/getRatings';
import { getRouteMain, getRouteMovie } from '@shared/constants/router';
import { POSTER_SIZES } from '@shared/constants/ui';
import { useDictionary } from '@shared/hooks';
import styles from './MovieDetailPage.module.scss';
import { MovieDetailSkeleton } from './MovieDetailSkeleton';

const MovieDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const t = useDictionary();
	const { data: movie, isLoading, isError } = useMovieById(id);
	const { isFavorite, requestAddToFavorites, removeFromFavorites } = useFavorites();
	const { isInCompare, addToCompare, removeFromCompare } = useCompare();

	if (isLoading) {
		return <MovieDetailSkeleton />;
	}

	if (isError || !movie) {
		return (
			<Placeholder
				title={t.movie.errorTitle}
				action={<Button onClick={async () => navigate(getRouteMain())}>{t.common.back}</Button>}
			>
				{t.movie.errorText}
			</Placeholder>
		);
	}

	const {
		id: movieId,
		year: movieYear,
		movieLength,
		rating,
		isSeries,
		ageRating,
		ratingMpaa,
		budget,
		premiere,
		genres,
		countries,
		description,
		watchability,
		persons,
		similarMovies,
	} = movie;

	const inFavorites = isFavorite(movieId);
	const inCompare = isInCompare(movieId);
	const year = formatYear(movieYear);
	const duration = formatDuration(movieLength, t.common.hour, t.common.min);
	const ratingsDict = t.ratings as Record<string, string>;
	const detailedRatings = getDetailedRatings(rating, ratingsDict);

	const handleFavorite = () => {
		if (inFavorites) {
			removeFromFavorites(movieId);
		} else {
			requestAddToFavorites(movie);
		}
	};

	const handleCompare = () => {
		if (inCompare) {
			removeFromCompare(movieId);
		} else {
			addToCompare(movie);
		}
	};

	return (
		<Group>
			<Flex
				align="center"
				gap="4xl"
				padding="l"
				direction="column"
				className={styles.container}
				noWrap
			>
				<Flex flexShrink={0} align="center" gap="4xl" noWrap direction="column">
					<MoviePoster
						poster={movie.poster}
						alt={movie.name}
						size={POSTER_SIZES.DETAIL}
						heightSize={500}
					/>
					<ButtonGroup>
						<Button
							size="m"
							mode={inFavorites ? 'primary' : 'outline'}
							before={inFavorites ? <Icon20BookmarkSlashOutline /> : <Icon20BookmarkOutline />}
							onClick={handleFavorite}
						>
							{inFavorites ? t.movie.removeFromFavorites : t.movie.addToFavorites}
						</Button>
						<Button
							size="m"
							mode={inCompare ? 'primary' : 'outline'}
							before={<Icon20Arrows2LeftRightOutward />}
							onClick={handleCompare}
						>
							{inCompare ? t.movie.removeFromCompare : t.common.compare}
						</Button>
					</ButtonGroup>
				</Flex>

				<Flex direction="column" gap="xl">
					<Flex direction="column" gap="m" flexGrow={1}>
						<Box padding="2xl">
							<Title level="2" weight="1">
								{movie.name || movie.alternativeName}
							</Title>
							{movie.slogan && <Text>{movie.slogan}</Text>}
						</Box>

						<Group header={<Header>{t.common.rating}</Header>}>
							<Flex>
								{detailedRatings.length > 0 && (
									<Flex>
										{detailedRatings.map((rating) => (
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
								)}
							</Flex>
						</Group>
					</Flex>

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

					<Group header={<Header>{t.movie.genres}</Header>}>
						<Box padding="2xl">
							<Flex gap="xl">
								{genres?.length &&
									genres.map((genre) => (
										<Chip key={genre.name} value={genre.name} removable={false}>
											{genre.name}
										</Chip>
									))}
							</Flex>
						</Box>
					</Group>

					<Group header={<Header>{t.filters.countries}</Header>}>
						<Box padding="2xl">
							<Flex gap="xl">
								{countries?.length &&
									countries.map((country) => (
										<Chip key={country.name} value={country.name} removable={false}>
											{country.name}
										</Chip>
									))}
							</Flex>
						</Box>
					</Group>
				</Flex>
			</Flex>

			{description && (
				<Group header={<Header>{t.movie.description}</Header>}>
					<Box padding="2xl">{description}</Box>
				</Group>
			)}

			{watchability?.items && watchability.items.length && (
				<WatchabilityHorizontalList items={watchability.items} />
			)}

			{persons && persons.length && <PersonHorizontalList persons={persons} />}

			{similarMovies && similarMovies.length && (
				<MovieHorizontalList
					movies={similarMovies}
					onMovieClick={async (m) => navigate(getRouteMovie(m.id))}
				/>
			)}
		</Group>
	);
};

export default MovieDetailPage;

import { useNavigate, useParams } from 'react-router';
import { Box, Button, Chip, Flex, Group, Header, Placeholder, Text, Title } from '@vkontakte/vkui';
import { MovieDetailActions } from '@widgets/MovieDetailActions';
import {
	MovieDetailInfo,
	MovieDetailRatings,
	MovieHorizontalList,
	MoviePoster,
	PersonHorizontalList,
	WatchabilityHorizontalList,
} from '@entities/movie';
import { useMovieById } from '@entities/movie/api/useMovieById';
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

	const { genres, countries, description, watchability, persons, similarMovies, rating } = movie;
	const detailedRatings = getDetailedRatings(rating, t.ratings as Record<string, string>);

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
					<MovieDetailActions movie={movie} />
				</Flex>

				<Flex direction="column" gap="xl">
					<Flex direction="column" gap="m" flexGrow={1}>
						<Box padding="2xl">
							<Title level="2" weight="1">
								{movie.name || movie.alternativeName}
							</Title>
							{movie.slogan && <Text>{movie.slogan}</Text>}
						</Box>

						<MovieDetailRatings ratings={detailedRatings} />

						<MovieDetailInfo movie={movie} />

						{genres && genres.length > 0 && (
							<Group header={<Header>{t.movie.genres}</Header>}>
								<Box padding="2xl">
									<Flex gap="xl">
										{genres.map((genre) => (
											<Chip key={genre.name} value={genre.name} removable={false}>
												{genre.name}
											</Chip>
										))}
									</Flex>
								</Box>
							</Group>
						)}

						{countries && countries.length > 0 && (
							<Group header={<Header>{t.filters.countries}</Header>}>
								<Box padding="2xl">
									<Flex gap="xl">
										{countries.map((country) => (
											<Chip key={country.name} value={country.name} removable={false}>
												{country.name}
											</Chip>
										))}
									</Flex>
								</Box>
							</Group>
						)}
					</Flex>
				</Flex>
			</Flex>

			{description && (
				<Group header={<Header>{t.movie.description}</Header>}>
					<Box padding="2xl">{description}</Box>
				</Group>
			)}

			{watchability?.items && watchability.items.length > 0 && (
				<WatchabilityHorizontalList items={watchability.items} />
			)}

			{persons && persons.length > 0 && <PersonHorizontalList persons={persons} />}

			{similarMovies && similarMovies.length > 0 && (
				<MovieHorizontalList
					movies={similarMovies}
					onMovieClick={async (m) => navigate(getRouteMovie(m.id))}
				/>
			)}
		</Group>
	);
};

export default MovieDetailPage;

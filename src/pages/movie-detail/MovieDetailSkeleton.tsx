import {
	Avatar,
	Box,
	ButtonGroup,
	Flex,
	Group,
	Header,
	SimpleCell,
	Skeleton,
	Title,
} from '@vkontakte/vkui';
import { AVATAR_SIZES } from '@shared/constants/ui';
import { useDictionary } from '@shared/hooks';
import styles from './MovieDetailPage.module.scss';

export const MovieDetailSkeleton = () => {
	const t = useDictionary();

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
					<Skeleton className={styles.posterSkeleton} />
					<ButtonGroup>
						<Skeleton height={36} width={160} borderRadius={8} />
						<Skeleton height={36} width={140} borderRadius={8} />
					</ButtonGroup>
				</Flex>

				<Flex direction="column" gap="xl">
					<Flex direction="column" gap="m" flexGrow={1}>
						<Box padding="2xl">
							<Title level="2" weight="1">
								<Skeleton height={32} width="60%" borderRadius={8} />
							</Title>
							<Skeleton height={20} width="40%" borderRadius={6} style={{ marginTop: 12 }} />
						</Box>

						<Group header={<Header>{t.common.rating}</Header>}>
							<Flex>
								<Flex>
									{Array.from({ length: 2 }).map((_, i) => (
										<SimpleCell
											key={i}
											before={<Skeleton height={32} width={42} borderRadius={4} />}
										>
											<Skeleton height={16} width={80} />
										</SimpleCell>
									))}
								</Flex>
							</Flex>
						</Group>
					</Flex>

					<Group header={<Header>{t.movie.details}</Header>}>
						<Flex gap="xl">
							{Array.from({ length: 6 }).map((_, i) => (
								<SimpleCell key={i}>
									<Skeleton height={14} width={60} style={{ marginBottom: 8 }} />
								</SimpleCell>
							))}
						</Flex>
					</Group>

					<Group header={<Header>{t.movie.genres}</Header>}>
						<Box padding="2xl">
							<Flex gap="xl">
								{Array.from({ length: 3 }).map((_, i) => (
									<Skeleton key={i} height={28} width={80} borderRadius={14} />
								))}
							</Flex>
						</Box>
					</Group>

					<Group header={<Header>{t.filters.countries}</Header>}>
						<Box padding="2xl">
							<Flex gap="xl">
								{Array.from({ length: 2 }).map((_, i) => (
									<Skeleton key={i} height={28} width={80} borderRadius={14} />
								))}
							</Flex>
						</Box>
					</Group>
				</Flex>
			</Flex>

			<Group header={<Header>{t.movie.description}</Header>}>
				<Box padding="2xl">
					<Skeleton height={16} width="100%" />
					<Skeleton height={16} width="95%" style={{ marginTop: 8 }} />
					<Skeleton height={16} width="98%" style={{ marginTop: 8 }} />
					<Skeleton height={16} width="60%" style={{ marginTop: 8 }} />
				</Box>
			</Group>

			<Group header={<Header>{t.movie.watchability}</Header>}>
				<Box padding="2xl">
					<Flex gap="xl">
						{Array.from({ length: 4 }).map((_, i) => (
							<Skeleton key={i} height={40} width={40} borderRadius={8} />
						))}
					</Flex>
				</Box>
			</Group>

			<Group header={<Header>{t.movie.team}</Header>}>
				<Box padding="2xl">
					<Flex gap="xl">
						{Array.from({ length: 8 }).map((_, i) => (
							<Flex key={i} direction="column" align="center" gap="s">
								<Avatar
									size={AVATAR_SIZES.PERSON}
									src=""
									fallbackIcon={
										<Skeleton
											height={AVATAR_SIZES.PERSON}
											width={AVATAR_SIZES.PERSON}
											borderRadius="50%"
										/>
									}
								/>
								<Skeleton height={14} width={60} />
							</Flex>
						))}
					</Flex>
				</Box>
			</Group>

			<Group header={<Header>{t.movie.similarMovies}</Header>}>
				<Box padding="2xl">
					<Flex gap="xl">
						{Array.from({ length: 5 }).map((_, i) => (
							<Skeleton key={i} height={180} width={120} borderRadius={8} />
						))}
					</Flex>
				</Box>
			</Group>
		</Group>
	);
};

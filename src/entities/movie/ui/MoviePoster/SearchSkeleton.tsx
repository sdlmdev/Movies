import { SimpleCell, Skeleton } from '@vkontakte/vkui';

export const SearchSkeleton = () => {
	return (
		<>
			{Array.from({ length: 6 }).map((_, i) => (
				<SimpleCell
					key={i}
					before={<Skeleton height={44} width={44} borderRadius="50%" />}
					subtitle={<Skeleton height={12} width={100} />}
					activeMode="none"
				>
					<Skeleton height={16} width={150} />
				</SimpleCell>
			))}
		</>
	);
};

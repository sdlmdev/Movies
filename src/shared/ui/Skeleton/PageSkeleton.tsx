import { SimpleGrid, Skeleton } from '@vkontakte/vkui';
import { useGridColumns } from '@shared/hooks';

const ROWS_PER_SKELETON = 2;
const DEFAULT_SKELETON_COUNT = 6;

export const PageSkeleton = () => {
	const { containerRef, columns } = useGridColumns();
	const safeColumns = Math.max(1, columns);

	const skeletonCount = safeColumns * ROWS_PER_SKELETON || DEFAULT_SKELETON_COUNT;

	return (
		<div ref={containerRef} style={{ width: '100%' }}>
			<SimpleGrid
				columns={safeColumns}
				gap={16}
				align="center"
				style={{ paddingBottom: 16, justifyItems: 'center' }}
			>
				{Array.from({ length: skeletonCount }).map((_, i) => (
					<div
						key={i}
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 8,
							width: 230,
							padding: 16,
						}}
					>
						<Skeleton width={230} height={230} borderRadius={10} />
						<Skeleton height={24} width="80%" borderRadius={4} />
						<Skeleton height={20} width="40%" borderRadius={4} />
						<Skeleton height={20} width="60%" borderRadius={4} />
					</div>
				))}
			</SimpleGrid>
		</div>
	);
};

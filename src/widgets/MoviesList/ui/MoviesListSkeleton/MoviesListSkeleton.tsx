import { SimpleGrid, Skeleton } from '@vkontakte/vkui';
import { GRID_CONFIG, POSTER_SIZES } from '@shared/constants/ui';
import { useGridColumns } from '@shared/hooks';

const ROWS_PER_SKELETON = 2;
const DEFAULT_SKELETON_COUNT = 6;

export const MoviesListSkeleton = () => {
	const { containerRef, columns } = useGridColumns();
	const safeColumns = Math.max(1, columns);

	const skeletonCount = safeColumns * ROWS_PER_SKELETON || DEFAULT_SKELETON_COUNT;

	return (
		<div ref={containerRef} style={{ width: '100%' }}>
			<SimpleGrid
				columns={safeColumns}
				gap={GRID_CONFIG.GAP}
				align="center"
				style={{ paddingBottom: GRID_CONFIG.GAP, justifyItems: 'center' }}
			>
				{Array.from({ length: skeletonCount }).map((_, i) => (
					<div
						key={i}
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 8,
							width: POSTER_SIZES.LARGE,
							padding: GRID_CONFIG.GAP,
						}}
					>
						<Skeleton width={POSTER_SIZES.LARGE} height={POSTER_SIZES.LARGE} borderRadius={10} />
						<Skeleton height={24} width="80%" borderRadius={4} />
						<Skeleton height={20} width="40%" borderRadius={4} />
						<Skeleton height={20} width="60%" borderRadius={4} />
					</div>
				))}
			</SimpleGrid>
		</div>
	);
};

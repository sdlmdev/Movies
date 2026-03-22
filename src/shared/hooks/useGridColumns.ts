import { useEffect, useRef, useState } from 'react';
import { GRID_CONFIG } from '@shared/constants/ui';

export const useGridColumns = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [columns, setColumns] = useState<number>(GRID_CONFIG.DEFAULT_COLUMNS);

	useEffect(() => {
		const el = containerRef.current;

		if (!el) {
			return;
		}

		const observer = new ResizeObserver(() => {
			const width = el.offsetWidth;

			const cols = Math.max(
				1,
				Math.floor((width + GRID_CONFIG.GAP) / (GRID_CONFIG.CARD_MIN_WIDTH + GRID_CONFIG.GAP)),
			);

			setColumns(cols);
		});

		observer.observe(el);

		return () => observer.disconnect();
	}, []);

	return { containerRef, columns };
};

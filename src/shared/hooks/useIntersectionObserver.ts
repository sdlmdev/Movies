import { useCallback, useEffect, useRef } from 'react';

interface UseIntersectionObserverOptions {
	threshold?: number;
	rootMargin?: string;
	enabled?: boolean;
}

const DEFAULT_THRESHOLD = 0.1;

export const useIntersectionObserver = (
	onIntersect: VoidFunction,
	options: UseIntersectionObserverOptions = {},
) => {
	const { threshold = DEFAULT_THRESHOLD, rootMargin = '200px', enabled = true } = options;
	const targetRef = useRef<HTMLDivElement | null>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);

	const setRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}

			if (node && enabled) {
				observerRef.current = new IntersectionObserver(
					([entry]) => {
						if (entry.isIntersecting) {
							onIntersect();
						}
					},
					{ threshold, rootMargin },
				);

				observerRef.current.observe(node);
			}

			targetRef.current = node;
		},
		[onIntersect, threshold, rootMargin, enabled],
	);

	useEffect(() => {
		return () => observerRef.current?.disconnect();
	}, []);

	return setRef;
};

import { useEffect, useRef, useState } from 'react';
import { ScrollArrow } from '@vkontakte/vkui';
import cn from 'classnames';
import styles from './ScrollToTop.module.scss';

const SCROLL_THRESHOLD = 400;

export const ScrollToTop = () => {
	const [visible, setVisible] = useState(false);
	const rafRef = useRef<number | null>(null);

	useEffect(() => {
		const handleScroll = () => {
			if (rafRef.current !== null) {
				return;
			}

			rafRef.current = requestAnimationFrame(() => {
				setVisible(window.scrollY > SCROLL_THRESHOLD);
				rafRef.current = null;
			});
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);

			if (rafRef.current !== null) {
				cancelAnimationFrame(rafRef.current);
			}
		};
	}, []);

	const handleClick = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div
			data-testid="scroll-to-top"
			className={cn(styles.btn, { [styles.visible]: visible })}
			onClick={handleClick}
		>
			<ScrollArrow direction="up" size="m" />
		</div>
	);
};

import type { ReactElement } from 'react';
import { Icon28CameraOutline } from '@vkontakte/icons';
import { Image, type ImageBaseExpectedIconProps, type ImageProps } from '@vkontakte/vkui';
import { POSTER_SIZES } from '@shared/constants/ui';
import type { MoviePosterData } from '../../model/types';

interface MoviePosterProps extends Omit<ImageProps, 'src'> {
	poster?: MoviePosterData;
}

export const MoviePoster = ({
	poster,
	alt,
	fallbackIcon,
	size = POSTER_SIZES.MEDIUM,
	...props
}: MoviePosterProps) => {
	const defaultIcon: ReactElement<ImageBaseExpectedIconProps> =
		size >= POSTER_SIZES.THRESHOLD_LARGE ? (
			<Icon28CameraOutline width={36} height={36} />
		) : (
			<Icon28CameraOutline />
		);

	return (
		<Image
			size={size}
			src={poster?.url || poster?.previewUrl}
			alt={alt}
			fallbackIcon={fallbackIcon ?? defaultIcon}
			{...props}
		/>
	);
};

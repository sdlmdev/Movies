import { useNavigate } from 'react-router';
import { Icon56BookmarkOutline } from '@vkontakte/icons';
import { Placeholder } from '@vkontakte/vkui';
import { MovieCardActions } from '@widgets/MovieCardActions';
import { MoviesList } from '@widgets/MoviesList';
import { useFavoritesData, useFilteredFavorites } from '@features/add-to-favorites';
import { getRouteMovie } from '@shared/constants/router';
import { useDictionary } from '@shared/hooks';

const FavoritesPage = () => {
	const t = useDictionary();
	const navigate = useNavigate();
	const { favorites } = useFavoritesData();
	const { movies, ratingProvider } = useFilteredFavorites();

	if (!favorites.length) {
		return (
			<Placeholder icon={<Icon56BookmarkOutline />} title={t.favorites.empty}>
				{t.favorites.emptyHint}
			</Placeholder>
		);
	}

	return (
		<MoviesList
			title={t.common.favorites}
			movies={movies}
			ratingProvider={ratingProvider}
			onMovieClick={async (movie) => navigate(getRouteMovie(movie.id))}
			renderActions={(movie) => <MovieCardActions movie={movie} />}
		/>
	);
};

export default FavoritesPage;

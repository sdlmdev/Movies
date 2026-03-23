import { useNavigate } from 'react-router';
import { Icon56BookmarkOutline } from '@vkontakte/icons';
import { Group, Header, Placeholder } from '@vkontakte/vkui';
import { useFavorites } from '@app/providers/FavoritesProvider/FavoritesContext';
import { useFilteredFavorites } from '@features/add-to-favorites';
import { MovieVirtualGrid } from '@entities/movie';
import { getRouteMovie } from '@shared/constants/router';
import { useDictionary } from '@shared/hooks';

const FavoritesPage = () => {
	const t = useDictionary();
	const navigate = useNavigate();
	const { favorites } = useFavorites();
	const { movies, ratingProvider } = useFilteredFavorites();

	if (!favorites.length) {
		return (
			<Placeholder icon={<Icon56BookmarkOutline />} title={t.favorites.empty}>
				{t.favorites.emptyHint}
			</Placeholder>
		);
	}

	return (
		<Group header={<Header>{t.common.favorites}</Header>}>
			{!movies.length ? (
				<Placeholder title={t.common.noResults} />
			) : (
				<MovieVirtualGrid
					movies={movies}
					ratingProvider={ratingProvider}
					onMovieClick={async (movie) => navigate(getRouteMovie(movie.id))}
				/>
			)}
		</Group>
	);
};

export default FavoritesPage;

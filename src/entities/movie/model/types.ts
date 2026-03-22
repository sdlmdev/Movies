import { DEFAULT_RATING_PROVIDER } from '@shared/constants/api';

export type RatingProvider = 'kp' | 'imdb' | 'tmdb' | 'filmCritics' | 'russianFilmCritics';

export { DEFAULT_RATING_PROVIDER };

export interface MovieRating {
	kp?: number;
	imdb?: number;
	tmdb?: number;
	filmCritics?: number;
	russianFilmCritics?: number;
	await?: number;
}

export interface MovieGenre {
	name: string;
}

export interface MovieCountry {
	name: string;
}

export interface MoviePosterData {
	url?: string;
	previewUrl?: string;
}

export interface MovieBackdrop {
	url?: string;
	previewUrl?: string;
}

export interface MovieLogo {
	url?: string;
}

export interface MovieBudget {
	currency?: string;
	value?: number;
}

export interface CurrencyValue {
	value?: number;
	currency?: string;
}

export interface MovieFees {
	russia?: CurrencyValue;
	usa?: CurrencyValue;
	world?: CurrencyValue;
}

export interface MoviePremiere {
	country?: string;
	world?: string;
	russia?: string;
	digital?: string;
	cinema?: string;
	bluray?: string;
	dvd?: string;
}

export interface MovieExternalId {
	imdb?: string;
	tmdb?: number;
	kpHD?: string;
}

export interface MovieNames {
	language?: string;
	name: string;
	type?: string;
}

export interface MovieFact {
	value: string;
	type?: string;
	spoiler?: boolean;
}

export interface MovieReleaseYear {
	start?: number;
	end?: number;
}

export interface MoviePerson {
	id: number;
	name?: string;
	enName?: string;
	photo?: string;
	profession?: string;
	enProfession?: string;
	description?: string;
}

export interface MovieAudience {
	count?: number;
	country?: string;
}

export interface MovieNetwork {
	items?: Array<{
		name?: string;
		logo?: MovieLogo;
	}>;
}

export interface MovieSeasonInfo {
	number?: number;
	episodesCount?: number;
}

export interface MovieReviewInfo {
	count?: number;
	positiveCount?: number;
	percentage?: string;
}

export interface MovieSimilar {
	id: number;
	name: string;
	enName?: string;
	alternativeName?: string;
	type?: string;
	poster?: MoviePosterData;
	year?: number;
	rating?: MovieRating;
}

export interface WatchabilityItem {
	name: string;
	logo: {
		url: string;
	};
	url: string;
}

export interface MovieWatchability {
	items: Array<WatchabilityItem>;
}

export interface Movie {
	id: number;
	name: string;
	enName?: string;
	alternativeName?: string;
	names?: Array<MovieNames>;
	type?: string;
	year?: number;
	description?: string;
	shortDescription?: string;
	slogan?: string;
	rating: MovieRating;
	ratingMpaa?: string;
	ageRating?: number;
	movieLength?: number;
	poster?: MoviePosterData;
	backdrop?: MovieBackdrop;
	logo?: MovieLogo;
	genres: Array<MovieGenre>;
	countries: Array<MovieCountry>;
	budget?: MovieBudget;
	fees?: MovieFees;
	premiere?: MoviePremiere;
	externalId?: MovieExternalId;
	persons?: Array<MoviePerson>;
	similarMovies?: Array<MovieSimilar>;
	sequelsAndPrequels?: Array<MovieSimilar>;
	watchability?: MovieWatchability;
	releaseYears?: Array<MovieReleaseYear>;
	facts?: Array<MovieFact>;
	audience?: Array<MovieAudience>;
	networks?: MovieNetwork;
	seasonsInfo?: Array<MovieSeasonInfo>;
	reviewInfo?: MovieReviewInfo;
	createdAt?: string;
	isSeries?: boolean;
	lists?: Array<string>;
}

export type SortField = 'rating' | 'year' | 'duration';
export type SortOrder = 'asc' | 'desc';

export interface MovieFilters {
	query?: string;
	genres?: Array<string>;
	countries?: Array<string>;
	isSeries?: Array<string>;
	ageRating?: Array<string>;
	ratingFrom?: number;
	ratingTo?: number;
	yearFrom?: number;
	yearTo?: number;
	ratingProvider?: RatingProvider;
	sortBy?: SortField;
	sortOrder?: SortOrder;
	page?: number;
	limit?: number;
}

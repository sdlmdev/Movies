export interface PaginatedResponse<T> {
	docs: Array<T>;
	total: number;
	limit: number;
	page: number;
	pages: number;
}

export interface ApiError {
	statusCode: number;
	message: string;
	error: string;
}

import axios, { type AxiosError } from 'axios';
import { API_BASE_URL, API_KEY } from '../constants/api';
import type { ApiError } from './types';

export const apiInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

apiInstance.interceptors.request.use((config) => {
	if (API_KEY) {
		config.headers['X-API-KEY'] = API_KEY;
	}

	return config;
});

const HTTP_UNAUTHORIZED = 401;

apiInstance.interceptors.response.use(
	(response) => response,
	async (error: AxiosError<ApiError>) => {
		if (error.response?.status === HTTP_UNAUTHORIZED) {
			console.error('API key is invalid or expired');
		}

		return Promise.reject(error);
	},
);

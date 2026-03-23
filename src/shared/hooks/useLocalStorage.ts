import { useCallback, useEffect, useRef, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
	const initialValueRef = useRef(initialValue);

	const getStoredValue = useCallback((): T => {
		try {
			const item = window.localStorage.getItem(key);

			if (item === null) {
				window.localStorage.setItem(key, JSON.stringify(initialValueRef.current));

				return initialValueRef.current;
			}

			return JSON.parse(item) as T;
		} catch {
			window.localStorage.setItem(key, JSON.stringify(initialValueRef.current));

			return initialValueRef.current;
		}
	}, [key]);

	const [storedValue, setStoredValue] = useState<T>(getStoredValue);

	const setValue = (value: T | ((val: T) => T)) => {
		try {
			const valueToStore = value instanceof Function ? value(getStoredValue()) : value;

			window.localStorage.setItem(key, JSON.stringify(valueToStore));
			setStoredValue(valueToStore);

			window.dispatchEvent(new Event('local-storage-sync'));
		} catch (error) {
			console.error(`Error saving to localStorage key="${key}":`, error);
		}
	};

	useEffect(() => {
		const handleSync = () => {
			setStoredValue(getStoredValue());
		};

		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === key) {
				handleSync();
			}
		};

		window.addEventListener('storage', handleStorageChange);
		window.addEventListener('local-storage-sync', handleSync);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
			window.removeEventListener('local-storage-sync', handleSync);
		};
	}, [getStoredValue, key]);

	return [storedValue, setValue] as const;
};

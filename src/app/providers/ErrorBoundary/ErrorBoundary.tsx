import { Component, type ErrorInfo, type ReactNode, Suspense } from 'react';
import { ScreenSpinner } from '@vkontakte/vkui';
import { PageError } from '@widgets/PageError';

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error('ErrorBoundary caught:', error, info);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: undefined });
	};

	// eslint-disable-next-line @typescript-eslint/promise-function-async
	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<Suspense fallback={<ScreenSpinner state="loading" />}>
					<PageError onReset={this.handleReset} />
				</Suspense>
			);
		}

		return this.props.children;
	}
}

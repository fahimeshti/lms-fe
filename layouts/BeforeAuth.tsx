import { JSX, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Spinner from '@/components/atoms/Spinner';

function BeforeAuth<T extends JSX.IntrinsicAttributes>(WrappedComponent: React.ComponentType<T>) {
	function WithoutAuth(props: T) {
		const { isAuthenticated, token } = useAuth();
		const params = useSearchParams();
		const router = useRouter();

		const redirectUrl = params.get('redirect') || '/';
		const action = params.get('action');

		// Handle redirection if the user is authenticated
		useEffect(() => {
			if (isAuthenticated || token) {
				const actionQuery = action ? `?action=${action}` : '';
				router.replace(`${redirectUrl}${actionQuery}`);
			}
		}, [isAuthenticated, token, action, redirectUrl, router]);

		// Show spinner while redirecting
		if (isAuthenticated || token) {
			return (
				<div className="h-screen w-full flex items-center justify-center">
					<Spinner className="w-8 h-8" />
				</div>
			);
		}

		// Render the wrapped component for unauthenticated users
		return <WrappedComponent {...props} />;
	}

	return WithoutAuth;
}

export default BeforeAuth;

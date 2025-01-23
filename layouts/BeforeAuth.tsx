import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Spinner from '@/components/atoms/Spinner';

function BeforeAuth<P extends object = {}>(
	WrappedComponent: React.ComponentType<P>
) {
	return function WithoutAuth(props: any) {
		const { isAuthenticated, token } = useAuth();
		const params = useSearchParams();
		const router = useRouter();

		const redirectUrl = params.get('redirect') || '/';
		const action = params.get('action');

		useEffect(() => {
			if (isAuthenticated || token) {
				const actionQuery = action ? `?action=${action}` : '';
				router.replace(`${redirectUrl}${actionQuery}`);
			}
		}, [isAuthenticated, token, action, redirectUrl, router]);

		if (isAuthenticated || token) {
			return (
				<div className="h-screen w-full flex items-center justify-center">
					<Spinner className="w-8 h-8" />
				</div>
			);
		}

		return <WrappedComponent {...props} />;
	};
}

export default BeforeAuth;

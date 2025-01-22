import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Spinner from '@/components/atoms/Spinner';


const BeforeAuth = (WrappedComponent: any) => {
	function WithoutAuth(props: any) {
		const { isAuthenticated, token } = useAuth();
		const params = useSearchParams();
		const redirectUrl = params.get('redirect') || '/';
		const action = params.get('action');


		const [loading, setLoading] = useState(true);
		const router = useRouter();

		useEffect(() => {
			setLoading(false);
		}, []);

		if (loading) {
			return (
				<div className="h-screen w-full flex items-center justify-center">
					<Spinner className="w-8 h-8" />
				</div>
			)
		}

		if (isAuthenticated || token) {
			router.replace(`${redirectUrl}${action ? `?action=${action}` : ''}`);
			return null;
		}

		return <WrappedComponent {...props} />;
	}

	return WithoutAuth;
};

export default BeforeAuth;

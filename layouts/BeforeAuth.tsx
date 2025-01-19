import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';


const BeforeAuth = (WrappedComponent: any) => {
	function WithoutAuth(props: any) {
		const { isAuthenticated, token } = useAuth();

		const [loading, setLoading] = useState(true);
		const router = useRouter();

		useEffect(() => {
			setLoading(false);
		}, []);

		if (loading) {
			return "Loading...";
		}

		if (isAuthenticated || token) {
			router.push('/');
			return null;
		}

		return <WrappedComponent {...props} />;
	}

	return WithoutAuth;
};

export default BeforeAuth;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isAuthenticated, token } = useAuth();

    if (!isAuthenticated || !token) {
        return <Navigate to="/auth/signin" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;

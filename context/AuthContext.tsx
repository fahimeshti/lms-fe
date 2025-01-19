"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAccessToken } from '@/utils/storage';
import { AUTH_TOKEN_KEY, USER_PROFILE_KEY } from '@/utils/constants';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    login: () => void;
    logout: () => void;
    userProfile: Profile | null;
}

export interface Profile {
    id: string;
    full_name: string;
    email: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [userProfile, setUserProfile] = useState<Profile | null>(null);

    // Load the token from localStorage on mount
    useEffect(() => {
        const storedToken = getAccessToken();
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
            setUserProfile(JSON.parse(localStorage.getItem(USER_PROFILE_KEY) || '{}'));
        }
    }, []);

    const login = () => {
        const storedToken = getAccessToken();
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
            setUserProfile(JSON.parse(localStorage.getItem(USER_PROFILE_KEY) || '{}'));
        }
    };

    const logout = () => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_PROFILE_KEY);
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout, userProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

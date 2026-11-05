"use client"
import Spinner from "@/components/atoms/Spinner";
import { useAuth } from "@/context/AuthContext";
import { getCurrentUser } from "@/utils/api/auth";
import { saveSession, takeRedirect } from "@/utils/session";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import toast from "react-hot-toast";

// Landing page after Google sign-in: the backend puts the session token in
// the URL fragment (#access_token=...&expires_at=...).
const VerifyToken = () => {
    const router = useRouter();
    const { login } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.slice(1));
        const token = params.get('access_token');
        // Remove the token from the address bar / history right away.
        window.history.replaceState(null, '', window.location.pathname);

        if (!token) {
            router.replace('/auth/login?type=login');
            return;
        }

        getCurrentUser(token)
            .then((res) => {
                saveSession(token, res.data?.data?.user);
                login();
                toast.success('Logged in successfully');
                router.replace(takeRedirect());
            })
            .catch(() => {
                toast.error('Something went wrong, Please try again');
                router.replace('/auth/login?type=login');
            });
    }, []);

    return (
        <Suspense>
            <div className="h-screen w-full flex items-center justify-center">
                <Spinner className="w-8 h-8" />
            </div>
        </Suspense>
    );
}

export default VerifyToken;

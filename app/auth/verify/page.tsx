"use client"
import Spinner from "@/components/atoms/Spinner";
import { useApi } from "@/hooks/useApiCall";
import { parseJwt } from "@/utils";
import { createUserProfile } from "@/utils/api/auth";
import isEmpty from "@/utils/isEmpty";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import toast from "react-hot-toast";

const VerifyToken = () => {
    const router = useRouter();
    const { data, execute: execCreateUserProfile } = useApi<any, any>(
        createUserProfile,
        false,
        true,
    );

    useEffect(() => {
        const token = window.location.href.split('access_token=')[1]?.split('&expires_at')[0];
        if (token) {
            const user = parseJwt(token as string);

            if (isEmpty(user)) {
                router.push('/login');
                toast.error('Something went wrong, Please try again');
            };
            const {
                user_metadata: { full_name },
            } = user;

            execCreateUserProfile({ full_name }, token);
        }
    }, []);

    useEffect(() => {
        if (!isEmpty(data?.data?.data)) {
            toast.success('Email verified successfully, Please login');
            router.replace('/auth/login?type=login');
        }
    }, [data]);


    return (
        <Suspense>
            <div className="h-screen w-full flex items-center justify-center">
                <Spinner className="w-8 h-8" />
            </div>
        </Suspense>
    );
}

export default VerifyToken;
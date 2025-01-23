"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/atoms/Spinner";
import { API_ROOT, AUTH_TOKEN_KEY } from "@/utils/constants";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";

async function getPaymentStatus(paymentID: string | string[] | undefined, status: string | string[] | undefined) {
    const token = Cookies.get(AUTH_TOKEN_KEY)

    const response = await fetch(`${API_ROOT}/api/v1/payment/callback`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            paymentID,
            status,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch payment status");
    }

    const data = await response.json();
    return data;
}

const PaymentCallback = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const paymentID = searchParams.get('paymentID') || undefined;
    const status = searchParams.get('status') || undefined;
    const [countdown, setCountdown] = useState<number>(5);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const paymentData = await getPaymentStatus(paymentID, status);
                setData(paymentData?.data);
            } catch (error) {
                console.error("Error fetching payment status:", error);
            }
        }
        fetchData();
    }, [paymentID, status]);

    useEffect(() => {
        if (data) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        router.push("/profile");
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [data, router]);

    return (
        <Suspense>
            <div className="h-screen w-full flex items-center justify-center">
                {data ? (
                    <div className="text-center space-y-4">
                        <h1 className="text-2xl lg:text-3xl font-bold text-primary">
                            {data?.statusMessage}
                        </h1>
                        <p className="text-lg text-gray-600">
                            Redirecting to your courses in <span className="font-semibold">{countdown}</span> seconds...
                        </p>
                    </div>
                ) : (
                    <Spinner className="w-8 h-8" />
                )}
            </div>
        </Suspense>
    );
};

export default PaymentCallback;

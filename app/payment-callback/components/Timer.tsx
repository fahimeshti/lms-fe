"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Timer = ({
    data
}: {
    data: any
}) => {
    const router = useRouter();
    const [countdown, setCountdown] = useState<number>(5);

    useEffect(() => {
        if (data) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        router.replace("/profile");
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [data, router]);

    return (
        <p className="text-lg text-gray-600">
            Redirecting to your courses in <span className="font-semibold">{countdown}</span> seconds...
        </p>
    );
}

export default Timer;
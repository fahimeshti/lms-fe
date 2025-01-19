
"use client"
import Spinner from "@/components/atoms/Spinner";
import { useApi } from "@/hooks/useApiCall";
import { getPrivateCourse } from "@/utils/api/courses";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

function findSmallestSerial(items: any) {
    if (items.length === 0) return undefined; // Handle empty array

    return items?.data?.data?.courses?.[0]?.chapters.reduce((smallest: any, current: any) =>
        parseInt(current.serial, 10) < parseInt(smallest.serial, 10) ? current : smallest
    );
}

function sortBySerial(items: any[]): any[] {
    return items.sort((a: any, b: any) => parseInt(a.serial, 10) - parseInt(b.serial, 10));
}

const CoursePageMiddleware = () => {
    const { id } = useParams();
    const router = useRouter();
    const { data: courseData } = useApi<any, any>(
        getPrivateCourse,
        true,
        true,
        id
    );
    const chapter = courseData && findSmallestSerial(courseData);
    const chapterId = chapter?.id;
    const lectureId = chapter?.lectures && sortBySerial(chapter?.lectures)?.[0]?.id;

    useEffect(() => {
        if (chapterId) {
            router.push(`/learn/${id}/chapter/${chapterId}/lecture/${lectureId}`);
        }
    }, [chapterId]);

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <Spinner className="w-8 h-8" />
        </div>
    );
}

export default CoursePageMiddleware;
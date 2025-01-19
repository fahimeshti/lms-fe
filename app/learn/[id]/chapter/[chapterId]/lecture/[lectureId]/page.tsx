"use client"

import { Skeleton } from "@/components/ui/skeleton";
import { useApi } from "@/hooks/useApiCall";
import { getLecture } from "@/utils/api/courses";
import { useParams } from "next/navigation";

function getNonEmptyLectures(data: any) {
    return data.flatMap((course: any) =>
        course.chapters.flatMap((chapter: any) =>
            chapter.lectures.filter((lecture: any) => lecture && lecture.id)
        )
    );
}

const MyCourseDetailsPage = () => {
    const { lectureId } = useParams<{ id: string, chapterId: string, lectureId: string }>();
    const { data: lectureData, loading } = useApi<any, any>(
        getLecture,
        true,
        true,
        lectureId
    );
    const lecture = lectureData?.data?.data?.courses && getNonEmptyLectures(lectureData?.data?.data?.courses)?.[0];

    return (
        <>
            <div className="mb-6">
                <video
                    className="w-full rounded-lg"
                    src={lecture?.url}
                    controls
                />
            </div>
            <div>
                {loading ? (
                    <Skeleton className="w-1/2 h-8 bg-gray-300" />
                ) :
                    <h1 className="text-2xl font-bold mb-4">
                        {lecture?.title}
                    </h1>
                }
                {loading ? (
                    <div className="flex flex-col gap-2 mt-8">
                        {
                            Array.from({ length: 3 }).map((_, index) => (
                                <Skeleton key={index} className="w-full h-8 bg-gray-300" />
                            ))
                        }
                    </div>
                )
                    :
                    <div className="text-gray-500 dark:text-gray-400 whitespace-pre-line">
                        {lecture?.description}
                    </div>
                }
                <div>
                    {
                        lecture?.files?.map((file: any) => (
                            <a
                                key={file.id}
                                href={file.url}
                                target="_blank"
                                className="text-blue-500 dark:text-blue-400"
                            >
                                {file.name}
                            </a>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default MyCourseDetailsPage;

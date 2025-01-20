"use client"
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { useApi } from "@/hooks/useApiCall";
import { cn } from "@/lib/utils";
import { getPrivateCourse } from "@/utils/api/courses";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

function sortBySerial(items: any[]): any[] {
    return items.sort((a: any, b: any) => parseInt(a.serial, 10) - parseInt(b.serial, 10));
}

const MyCourseDetailsPageLayout = ({
    children
}:
    {
        children: React.ReactNode
    }) => {
    const { id, chapterId, lectureId } = useParams<{ id: string, chapterId: string, lectureId: string }>();
    const { data: courseData, loading } = useApi<any, any>(
        getPrivateCourse,
        true,
        true,
        id
    );

    const course = useMemo(() => courseData?.data?.data?.courses?.[0], [courseData]);
    const chapters = useMemo(() => course?.chapters || [], [course]);

    return (
        <>
            <Navbar />
            <div className="custom-container">
                <div className="grid min-h-screen grid-cols-[1fr_400px] bg-gray-100 dark:bg-gray-950">

                    <div className="p-6">
                        {children}
                    </div>

                    <div className="border-r bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                        <div className="mb-6 flex items-center gap-3 w-full">
                            {loading ?
                                <Skeleton className="w-12 h-12 bg-gray-300 rounded-md" />
                                :
                                <img
                                    src={course?.thumbnail}
                                    alt="Course thumbnail"
                                    width={48}
                                    height={48}
                                    className="rounded-md"
                                    style={{ aspectRatio: "48/48", objectFit: "cover" }}
                                />}
                            <div>
                                {loading ? (
                                    <Skeleton className="w-64 h-8 bg-gray-300" />
                                ) :
                                    <h2 className="text-lg font-semibold">
                                        {course?.title}
                                    </h2>
                                }
                                {/* <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {course?.instructors?.map((instructor: any) => instructor.name)?.join(", ")}
                                </p> */}
                            </div>
                        </div>
                        {loading ? (
                            <div className="flex flex-col gap-4 mt-8">
                                {
                                    Array.from({ length: 4 }).map((_, index) => (
                                        <Skeleton key={index} className="w-full h-8 bg-gray-300" />
                                    ))
                                }
                            </div>
                        )
                            :
                            <nav className="sticky top-20 bg-white max-h-96 overflow-y-auto">
                                <Accordion type="multiple" className="space-y-2" defaultValue={[chapterId]}>
                                    {sortBySerial(chapters)?.map((chapter: any) => (
                                        <AccordionItem key={chapter.id} value={chapter.id} className="text-sm rounded-md border-b-0">
                                            <AccordionTrigger className="hover:no-underline px-3 py-2.5 hover:bg-gray-100 rounded-md">
                                                <div className="flex gap-2 items-center">
                                                    <PlayIcon className="h-5 w-5" />
                                                    {chapter.title}
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <ul className="space-y-2 pl-6 pt-2">
                                                    {
                                                        sortBySerial(chapter?.lectures).map((lesson: any) => (
                                                            <li key={lesson.id}>
                                                                <Link
                                                                    href={`/learn/${id}/chapter/${chapter.id}/lecture/${lesson.id}`}
                                                                    className={cn(
                                                                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50",
                                                                        { "bg-gray-100": lesson.id === lectureId }
                                                                    )}
                                                                    prefetch={false}
                                                                >
                                                                    <PlayIcon className="h-4 w-4 min-h-4 min-w-4" />
                                                                    {lesson.title}
                                                                </Link>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </nav>
                        }

                        <div className="mt-6 space-y-4 border-t pt-6 dark:border-gray-800">
                            <div>
                                <h3 className="text-sm font-semibold">Course Details</h3>
                                <div className="mt-2 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <UserIcon className="h-5 w-5" />
                                        Instructor: {course?.instructors?.map((instructor: any) => instructor.name)?.join(", ")}
                                    </div>
                                    {course?.duration ? <div className="flex items-center gap-2">
                                        <ClockIcon className="h-5 w-5" />
                                        Duration: {course?.duration}
                                    </div> : null}
                                    {/* <div className="flex items-center gap-2">
                                        <StarIcon className="h-5 w-5 fill-yellow-500" />
                                        Rating: 4.8 (12,345 ratings)
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default MyCourseDetailsPageLayout;


function ClockIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}


function PlayIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="6 3 20 12 6 21 6 3" />
        </svg>
    )
}


function StarIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )
}


function UserIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}
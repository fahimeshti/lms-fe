"use client";
import CourseCard from "@/components/common/CourseCard";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useApi } from "@/hooks/useApiCall";
import { getPurchasedCourse } from "@/utils/api/courses";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const UserProfilePage = () => {
    const { data: courses, loading } = useApi<any, any>(
        getPurchasedCourse,
        true,
        true,
    );
    const courseList = courses?.data?.data;

    return (
        <Suspense>
            <Navbar />
            <div className="custom-container py-12">
                <h1 className="text-2xl font-bold text-gray-900">আমার কোর্সমূহ</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 mt-5">
                    {
                        loading ?
                            <>
                                {
                                    Array.from({ length: 4 }).map((_, index) => (
                                        <Skeleton key={index} className="h-80" />
                                    ))
                                }
                            </>
                            :
                            <>
                                {courseList?.length > 0 ?
                                    courseList?.map((course: any) => (
                                        <CourseCard key={course.id} data={course} purchased />
                                    )) :
                                    <div className="py-8 col-span-12 text-center flex flex-col items-center gap-4">
                                        <p className="text-gray-500 font-medium">No courses found</p>
                                        <Link href="/courses" className="flex items-center gap-2 text-sm font-medium text-primary">
                                            <Button>
                                                Explore Courses
                                                <ArrowRight size={20} />
                                            </Button>
                                        </Link>
                                    </div>
                                }
                            </>
                    }
                </div>
            </div>
            <Footer />
        </Suspense>
    );
}

export default UserProfilePage;
"use client";
import CourseCard from "@/components/common/CourseCard";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useApi } from "@/hooks/useApiCall";
import { getPurchasedCourse } from "@/utils/api/courses";

const userProfilePage = () => {
    const { data: courses, loading } = useApi<any, any>(
        getPurchasedCourse,
        true,
        true,
    );
    const courseList = courses?.data?.data;

    return (
        <>
            <Navbar />
            <div className="custom-container py-12">
                <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
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
                            courseList?.map((course: any) => (
                                <CourseCard key={course.id} data={course} purchased />
                            ))
                    }
                </div>
            </div>
            <Footer />
        </>
    );
}

export default userProfilePage;
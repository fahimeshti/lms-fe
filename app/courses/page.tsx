"use client"
import CourseCard from "@/components/common/CourseCard";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useApi } from "@/hooks/useApiCall";
import { getCourses } from "@/utils/api/courses";

const AllCoursesPage = () => {
    const { data: courses, loading } = useApi<any, any>(
        getCourses,
        true,
        true,
    );
    const courseList = courses?.data?.data.slice(0, 6);

    return (
        <div>
            <Navbar />
            <div className="custom-container py-6 lg:py-12">
                <h1 className="text-4xl font-bold text-gray-700 mb-5 text-left">
                    আমাদের সকল কোর্স
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
                    {
                        loading ?
                            <>
                                {
                                    Array.from({ length: 8 }).map((_, index) => (
                                        <Skeleton key={index} className="h-80" />
                                    ))
                                }
                            </>
                            :
                            courseList?.map((course: any) => (
                                <CourseCard key={course.id} data={course} />
                            ))
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AllCoursesPage;
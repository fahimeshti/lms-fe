"use client";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import CoursesSliderContainer from "../common/CoursesSliderContainer";
import { Navigation, Pagination } from 'swiper/modules';
import { SwiperSlide } from "swiper/react";
import CourseCard from "../common/CourseCard";
import { getCourses } from "@/utils/api/courses";
import { useApi } from "@/hooks/useApiCall";
import { CourseT } from "@/types";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const CoursesSection = () => {
    const { data: courses, loading } = useApi<any, any>(
        getCourses,
        true,
        true,
    );
    const courseList = courses?.data?.data.slice(0, 6);

    return (
        <div className="custom-container py-6 lg:py-12">
            <h1 className="text-4xl font-bold text-gray-700 mt-8 mb-4 text-center">
                আমাদের কোর্স সমুহঃ
            </h1>
            <p className="text-gray-500 text-center">সেরা শিক্ষকদের পরিচর্যায় দেশের যেকোন প্রান্ত থেকে অব্যাহত থাকুক পড়াশুনার অগ্রযাত্রা</p>

            {loading ?
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-8">
                    {
                        Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton key={index} className="h-64 w-full bg-gray-200" />
                        ))
                    }
                </div>
                :
                <CoursesSliderContainer
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    className="mySwiper w-full"
                    navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }}
                    modules={[Navigation, Pagination]}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 5,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                    navigations={
                        <>
                            <button className="arrow-left slider-arrow-custom absolute top-1/2 -left-3 sm:-left-4 -translate-y-1/2 border rounded-full bg-primary text-white p-1 disabled:bg-gray-200 transition-all duration-150">
                                <ChevronLeft />
                            </button>
                            <button className="arrow-right slider-arrow-custom absolute top-1/2 -right-3 sm:-right-4 -translate-y-1/2 border rounded-full bg-primary text-white p-1 disabled:bg-gray-200 transition-all duration-150">
                                <ChevronRight />
                            </button>
                        </>
                    }
                >
                    {
                        courseList?.map((course: CourseT) => (
                            <SwiperSlide key={course.id}>
                                <CourseCard data={course} />
                            </SwiperSlide>
                        ))
                    }
                </CoursesSliderContainer>
            }
            {/* all courses button */}
            <div className="flex justify-center">
                <Link href="/courses" className="bg-primary hover:bg-primary group flex items-center gap-2 text-white px-6 py-2.5 rounded-lg hover:bg-primary-dark transition-colors duration-300">
                    View All Courses
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-all duration-200" />
                </Link>
            </div>
        </div>
    );
}

export default CoursesSection;
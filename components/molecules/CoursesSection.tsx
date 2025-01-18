"use client";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import CoursesSliderContainer from "../common/CoursesSliderContainer";
import { Navigation, Pagination } from 'swiper/modules';
import { SwiperSlide } from "swiper/react";
import CourseCard from "../common/CourseCard";

const CoursesSection = () => {
    return (
        <div className="custom-container py-6 lg:py-12">
            <h1 className="text-4xl font-bold text-gray-800 mt-8 mb-4 text-center">Courses</h1>
            <p className="text-gray-600 text-center">Choose from a wide range of courses</p>
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
                    [...Array(6)].map((_, i) => (
                        <SwiperSlide key={i}>
                            <CourseCard data={{ id: i + 1, title: `Course ${i + 1}` }} />
                        </SwiperSlide>
                    ))
                }
            </CoursesSliderContainer>

            {/* all courses button */}
            <div className="flex justify-center">
                <button className="bg-primary hover:bg-primary/90 group flex items-center gap-2 text-white px-6 py-2.5 rounded-lg hover:bg-primary-dark transition-colors duration-150">
                    View All Courses
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-all duration-200" />
                </button>
            </div>
        </div>
    );
}

export default CoursesSection;
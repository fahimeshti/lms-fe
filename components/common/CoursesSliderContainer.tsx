"use client";
import CourseCard from "./CourseCard";
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CoursesSliderContainer = ({ children, navigations, wrapperClasses, ...props }: any) => {
    return (
        <div className="py-6 w-full">
            <div className="px-6 relative">
                <div className={`overflow-x-hidden ${wrapperClasses}`}>
                    <Swiper
                        {...props}
                    >

                        {children}
                    </Swiper>
                </div>

                {navigations}
            </div>

        </div>
    );
}

export default CoursesSliderContainer;
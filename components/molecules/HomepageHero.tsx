"use client";
import CoursesSliderContainer from "../common/CoursesSliderContainer";
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SwiperSlide } from "swiper/react";
import { useApi } from "@/hooks/useApiCall";
import { getCourses } from "@/utils/api/courses";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const HomepageHero = () => {
    const { data: courses, loading } = useApi<any, any>(
        getCourses,
        true,
        true,
    );
    const courseList = courses?.data?.data?.filter((item: any) => item.featured)?.slice(0, 6);

    return (
        <div className="bg-[#12121A] bg-gradient-to-br from-[#12121A] to-gray-900 h-[40vh] sm:h-[70vh] flex items-center justify-center">
            <div className="custom-container w-full">
                {loading ?
                    <div className="flex gap-12 w-full p-2 md:p-0">
                        <Skeleton className="w-full h-32 sm:h-64 opacity-60" />
                        <Skeleton className="w-full h-64 opacity-60 scale-110 hidden md:block" />
                        <Skeleton className="w-full h-64 opacity-60 hidden md:block" />
                    </div>
                    : courseList?.length > 0 &&
                    <CoursesSliderContainer
                        slidesPerView={'auto'}
                        centeredSlides={true}
                        spaceBetween={30}
                        loop={true}
                        className="mySwiper-hero w-full pb-8"
                        wrapperClasses="py-8"
                        navigation={{ nextEl: ".arrow-right-hero", prevEl: ".arrow-left-hero" }}
                        modules={[Navigation]}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 5,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1200: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                        }}
                        navigations={
                            <>
                                <button className="arrow-left-hero slider-arrow-custom absolute top-1/2 -left-3 sm:-left-4 -translate-y-1/2 rounded-full text-white hover:text-primary p-1 disabled:bg-gray-200 transition-all duration-150">
                                    <ChevronLeft size={32} strokeWidth={1.5} />
                                </button>
                                <button className="arrow-right-hero slider-arrow-custom absolute top-1/2 -right-3 sm:-right-4 -translate-y-1/2 rounded-full text-white hover:text-primary p-1 disabled:bg-gray-200 transition-all duration-150">
                                    <ChevronRight size={32} strokeWidth={1.5} />
                                </button>
                            </>
                        }
                    >
                        {
                            courseList?.map((image: any, i: number) => (
                                <SwiperSlide key={i}>
                                    <Link href={`/product/${image.id}`} className="h-52 block lg:border lg:border-gray-50/20 rounded-xl overflow-hidden">
                                        <img src={image.thumbnail} alt="" className="rounded-lg object-cover w-full h-full" />
                                    </Link>
                                </SwiperSlide>
                            ))
                        }
                    </CoursesSliderContainer>
                }
            </div>
        </div>
    );
}

export default HomepageHero;

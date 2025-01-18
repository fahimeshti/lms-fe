"use client";
import CoursesSliderContainer from "../common/CoursesSliderContainer";
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SwiperSlide } from "swiper/react";

const HomepageHero = () => {
    return (
        <div className="home-hero flex items-center justify-center">
            <div className="custom-container">
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
                            slidesPerView: 3,
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
                        bannerItems.map((image, i) => (
                            <SwiperSlide key={i}>
                                <img src={image} alt="" className="rounded-lg object-contain" />
                            </SwiperSlide>
                        ))
                    }

                </CoursesSliderContainer>

            </div>
        </div>
    );
}

export default HomepageHero;

const bannerItems = ["https://i.postimg.cc/0QdVx35b/engi-without-book-1.jpg", "https://i.postimg.cc/XvTgY50P/Medical.jpg", "https://i.postimg.cc/YSdh0GkV/frb-final-model-test-without-books.jpg", "https://i.postimg.cc/NfGs3ZPb/without-book-16-9.jpg"];

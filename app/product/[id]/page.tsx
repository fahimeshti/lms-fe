"use client";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { File, FileSpreadsheet, PhoneCall, SendHorizontal, FileVideo, ArrowRight } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef, useState } from "react";
import { useApi } from "@/hooks/useApiCall";
import { getPublicCourse, purchaseCourse, purchasedCourse } from "@/utils/api/courses";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import Spinner from "@/components/atoms/Spinner";
import Link from "next/link";

function getScrollDistanceFromTop(): number {
    return window.scrollY || document.documentElement.scrollTop || 0;
}

const SingleProduct = () => {
    // get id from params
    const { id } = useParams();
    const [scrollDistance, setScrollDistance] = useState(0);
    const stickyElementRef = useRef<HTMLDivElement>(null);
    const [distanceFromLeft, setDistanceFromLeft] = useState(0);

    const { data: courseData, loading } = useApi<any, any>(
        getPublicCourse,
        true,
        true,
        id
    );
    const { data: coursePurchaseData, execute: buyCourse, loading: buying } = useApi<any, any>(
        purchaseCourse,
        false,
        true
    );
    const { data: isCoursePurchased, loading: isCoursePurchasedLoading } = useApi<any, any>(
        purchasedCourse,
        true,
        true,
        id
    );

    const course = courseData?.data?.data;

    const chapters = course?.privateCourses?.chapters;

    const innerWidth = typeof window !== "undefined" ? window.innerWidth : 0;

    const getDistanceFromLeft = (element: HTMLElement): number => {
        const padding = window.innerWidth > 1024 ? 48 : 24;
        return element.getBoundingClientRect().left + element.offsetWidth + padding;
    };

    useEffect(() => {
        const updateDistance = () => {
            if (stickyElementRef.current) {
                setDistanceFromLeft(getDistanceFromLeft(stickyElementRef.current));
            }
        };

        // Update on initial render and on resize
        updateDistance();
        window.addEventListener('resize', updateDistance);

        return () => {
            window.removeEventListener('resize', updateDistance);
        };
    }, []);

    const handleScroll = () => {
        setScrollDistance(getScrollDistanceFromTop());
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleBuyCourse = () => {
        buyCourse(id);
    }

    useEffect(() => {
        console.log(coursePurchaseData?.data);
        
        if (coursePurchaseData?.data?.success) {
            toast.success("Course purchased successfully");
        }
    }, [coursePurchaseData]);

    return (
        <>
            <Navbar />
            <div>
                <div className="min-h-[300px] w-full" style={{
                    backgroundImage: "url('/ui_(1)_1716445506383.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",

                }}>
                    <div>
                        <div className="custom-container py-8">
                            <div className="container relative flex flex-col gap-4 md:flex-row md:gap-12 pb-6 md:py-10 min-h-[350px]">
                                <section className="order-1 flex flex-col justify-center flex-1 md:order-1  md:max-w-[calc(100%_-_348px)] lg:max-w-[calc(100%_-_448px)]">

                                    {
                                        course?.title ?
                                            <h1 className="text-white text-4xl font-bold">
                                                {course?.title}
                                            </h1>
                                            :
                                            <Skeleton className="w-full h-10 opacity-10" />
                                    }

                                    {course?.description ?
                                        <div className="text-gray-400 text-base font-medium mt-8 whitespace-pre-line">
                                            {course?.description}
                                        </div>
                                        :
                                        <Skeleton className="w-full h-5 opacity-10 mt-8" />
                                    }
                                </section>

                                <section
                                    className={`${innerWidth > 768 ? (scrollDistance > 300 ? "fixed top-16" : "absolute right-0 md:top-[50px] md:absolute") : "relative"} w-full md:max-w-[330px] lg:max-w-[400px] order-2 bg-white`}
                                    style={{
                                        left: (innerWidth > 768 && scrollDistance > 300) ? `${distanceFromLeft}px` : "unset",
                                    }}
                                >
                                    <div className="md:sticky md:top-16">

                                        <div className="md:border p-4">
                                            <div className="flex items-center gap-2">
                                                {course?.price ? <span className="text-2xl font-semibold">
                                                    ৳{course?.price}
                                                </span> : null}

                                                {course?.oldPrice ? <span className="line-through text-xl">
                                                    ৳{course?.oldPrice}
                                                </span> : null}
                                            </div>

                                            <div className="mt-4">
                                                {
                                                    isCoursePurchased?.data?.data?.isPurchased ?
                                                        <Link href={`/learn/${id}`}>
                                                            <Button
                                                                className="w-full text-base group"
                                                            >
                                                                কোর্সটি দেখুন
                                                                <ArrowRight className="group-hover:translate-x-1 transition-all duration-300" />
                                                            </Button>
                                                        </Link>
                                                        :
                                                        <Button
                                                            className="w-full text-base"
                                                            disabled={loading || buying || isCoursePurchasedLoading}
                                                            onClick={handleBuyCourse}
                                                        >
                                                            {
                                                                buying ?
                                                                    <Spinner />
                                                                    :
                                                                    "কোর্সটি কিনুন"
                                                            }
                                                        </Button>
                                                }
                                            </div>

                                            <section className="mt-6">
                                                <h6 className="font-semibold text-xl">এই কোর্সে যা থাকছে</h6>

                                                {
                                                    loading ?
                                                        <>
                                                            <Skeleton className="w-full h-5 mt-3" />
                                                            <Skeleton className="w-full h-5 my-3" />
                                                            <Skeleton className="w-full h-5 my-3" />
                                                            <Skeleton className="w-full h-5" />
                                                        </>
                                                        :
                                                        <ul className="space-y-2 mt-3">
                                                            <li className="font-medium flex items-center gap-2">
                                                                <SendHorizontal className="size-4 text-primary" />
                                                                সর্বমোট ৮টি বিষয় পড়ানো হবে
                                                            </li>
                                                            <li className="font-medium flex items-center gap-2">
                                                                <SendHorizontal className="size-4 text-primary" />
                                                                লাইভ ক্লাস নেয়া হবে
                                                            </li>
                                                            <li className="font-medium flex items-center gap-2">
                                                                <SendHorizontal className="size-4 text-primary" />
                                                                ক্লাসগুলো স্পেশাল ফেসবুক গ্রুপে নেয়া হবে।
                                                            </li>
                                                        </ul>
                                                }

                                            </section>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="custom-container py-8">
                    <div
                        ref={stickyElementRef}
                        className="md:max-w-[calc(100%_-_348px)] lg:max-w-[calc(100%_-_448px)]"
                    >
                        <h4 className="text-2xl font-semibold">কোর্স সিলেবাস</h4>

                        {loading ?
                            <Skeleton className="w-full h-64 mt-4" />
                            :
                            <div className="mt-4 w-full border rounded-lg px-4 py-2">
                                <Accordion type="single" collapsible className="">
                                    {
                                        chapters?.map((chapter: any) => {
                                            if (chapter?.lectures?.length > 0) {
                                                return (
                                                    <AccordionItem
                                                        value={chapter?.id}
                                                        key={chapter?.id}
                                                        className="last:border-b-0"
                                                    >
                                                        <AccordionTrigger className="data-[state=open]:mb-4 data-[state=open]:border-b ">
                                                            {chapter?.title}
                                                        </AccordionTrigger>
                                                        <AccordionContent>
                                                            <ul className="space-y-4">
                                                                {
                                                                    chapter?.lectures?.map((lecture: any) => (
                                                                        <li key={lecture.id} className="flex items-center gap-4">
                                                                            <FileVideo className="text-[#737373]" />
                                                                            <div className="flex flex-col gap-0">
                                                                                <span className="text-[#111827] text-sm font-semibold">{lecture.title}</span>
                                                                                <span className="text-[#737373] font-normal text-[13px]">{lecture.duration}</span>
                                                                            </div>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                )
                                            }
                                        })

                                    }

                                    {/* <AccordionItem value="item-2">
                                    <AccordionTrigger className="data-[state=open]:mb-4 data-[state=open]:border-b">
                                        Weekly Exam
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-4">
                                            <li className="flex items-center gap-4">
                                                <FileSpreadsheet className="text-[#737373]" />
                                                <div className="flex flex-col gap-0">
                                                    <span className="text-[#111827] text-sm font-semibold">Class one</span>
                                                    <span className="text-[#737373] font-normal text-[13px]">7 videos</span>
                                                </div>
                                            </li>
                                            <li className="flex items-center gap-4">
                                                <FileSpreadsheet className="text-[#737373]" />
                                                <div className="flex flex-col gap-0">
                                                    <span className="text-[#111827] text-sm font-semibold">Class one</span>
                                                    <span className="text-[#737373] font-normal text-[13px]">7 videos</span>
                                                </div>
                                            </li>
                                            <li className="flex items-center gap-4">
                                                <FileSpreadsheet className="text-[#737373]" />
                                                <div className="flex flex-col gap-0">
                                                    <span className="text-[#111827] text-sm font-semibold">Class one</span>
                                                    <span className="text-[#737373] font-normal text-[13px]">7 videos</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3" className="border-b-0">
                                    <AccordionTrigger className="data-[state=open]:mb-4 data-[state=open]:border-b ">Bangla 1st paper</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-4">
                                            <li className="flex items-center gap-4">
                                                <FileSpreadsheet className="text-[#737373]" />
                                                <div className="flex flex-col gap-0">
                                                    <span className="text-[#111827] text-sm font-semibold">Class one</span>
                                                    <span className="text-[#737373] font-normal text-[13px]">7 videos</span>
                                                </div>
                                            </li>
                                            <li className="flex items-center gap-4">
                                                <FileSpreadsheet className="text-[#737373]" />
                                                <div className="flex flex-col gap-0">
                                                    <span className="text-[#111827] text-sm font-semibold">Class one</span>
                                                    <span className="text-[#737373] font-normal text-[13px]">7 videos</span>
                                                </div>
                                            </li>
                                            <li className="flex items-center gap-4">
                                                <FileSpreadsheet className="text-[#737373]" />
                                                <div className="flex flex-col gap-0">
                                                    <span className="text-[#111827] text-sm font-semibold">Class one</span>
                                                    <span className="text-[#737373] font-normal text-[13px]">7 videos</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem> */}
                                </Accordion>
                            </div>
                        }


                        <div className="mt-8">
                            <h4 className="text-2xl font-semibold">কোর্স ইন্সট্রাক্টর</h4>
                            {loading ?
                                <Skeleton className="w-full h-32 mt-4" />
                                :
                                <div className="border rounded-md p-5 mt-4">
                                    <div className="flex flex-col gap-2">
                                        {
                                            course?.instructors?.map((instructor: any, index: number) => (
                                                <div key={index} className="flex items-center gap-4">
                                                    <div className="w-20 h-20 min-w-20 max-h-20 rounded-full bg-gray-200">
                                                        <img
                                                            src={instructor.image}
                                                            alt=""
                                                            className="w-full h-full object-cover rounded-full"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h6 className="font-semibold text-lg">{instructor?.name}</h6>
                                                        <p className="text-sm text-gray-500">
                                                            {instructor?.institution}({instructor?.experience})
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                        </div>



                        {/* <h4 className="text-2xl font-semibold mt-10">সচরাচর জিজ্ঞাসা</h4>
                        <div className="mt-4">
                            <Accordion type="single" collapsible className="w-full border rounded-lg px-4 py-2">
                                <AccordionItem value="item-1" className=" border-dashed">
                                    <AccordionTrigger className="data-[state=open]:mb-4 data-[state=open]:border-b ">
                                        Lorem, ipsum dolor.
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, reprehenderit ullam. Quidem iste labore repudiandae? Iure id veniam fugit sunt, quibusdam, expedita explicabo maiores aliquam obcaecati debitis hic, ex libero.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2" className=" border-dashed">
                                    <AccordionTrigger className="data-[state=open]:mb-4 data-[state=open]:border-b">
                                        Dolor sit amet consectetur, adipisicing elit.
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id voluptas autem reiciendis officia animi est cumque iusto, voluptatum ipsam, sapiente odio minus eveniet placeat dignissimos tempore voluptates perferendis hic necessitatibus!
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3" className="border-b-0 border-dashed">
                                    <AccordionTrigger className="data-[state=open]:mb-4 data-[state=open]:border-b ">
                                        Amet consectetur adipisicing elit. Aliquam.
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium amet maiores accusamus ad consequatur nobis laboriosam, dolorem consectetur, autem aut quibusdam ex perspiciatis corporis maxime minima iure cumque odit? Quo?
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div> */}

                        <h4 className="text-2xl font-semibold mt-10">আরও কোন জিজ্ঞাসা আছে?</h4>
                        <div className="mt-4">
                            <div className="border w-fit rounded-lg p-6 px-12 text-primary font-semibold flex items-center gap-2">
                                <PhoneCall strokeWidth={1.5} />
                                <span>
                                    কল করুন {" "}
                                    <a href="tel:+12345" className="hover:text-secondary transition-colors duration-200">12345</a>{" "}
                                    নম্বরে
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
}

export default SingleProduct;
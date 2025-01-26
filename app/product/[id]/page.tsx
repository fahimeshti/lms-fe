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
import { Suspense, useEffect, useRef, useState } from "react";
import { useApi } from "@/hooks/useApiCall";
import { getPublicCourse, purchaseCourse, purchasedCourse } from "@/utils/api/courses";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import Spinner from "@/components/atoms/Spinner";
import Link from "next/link";
import { getAccessToken } from "@/utils/storage";
import { BUY_NOW_KEY, PAYMENT_CALLBACK_URL } from "@/utils/constants";
import { paymentCheckoutApi } from "@/utils/api/payment";

function getScrollDistanceFromTop(): number {
    return window.scrollY || document.documentElement.scrollTop || 0;
}

const SingleProduct = () => {
    // get id from params
    const { id } = useParams();
    const [scrollDistance, setScrollDistance] = useState(0);
    const stickyElementRef = useRef<HTMLDivElement>(null);
    const [distanceFromLeft, setDistanceFromLeft] = useState(0);
    const router = useRouter();
    const params = useSearchParams();
    const action = params.get('action');

    const { data: courseData, loading } = useApi<any, any>(
        getPublicCourse,
        true,
        true,
        id
    );
    const { data: coursePurchaseData, execute: executePaymentCheckout, loading: buying } = useApi<any, any>(
        paymentCheckoutApi,
        false,
        true
    );
    const { data: isCoursePurchased, loading: isCoursePurchasedLoading, execute: fetchIsPurchased } = useApi<any, any>(
        purchasedCourse,
        false,
        true,
    );

    const course = courseData?.data?.data;

    const chapters = course?.privateCourses?.chapters;

    const [innerWidth, setInnerWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getDistanceFromLeft = (element: HTMLElement): number => {
        const padding = window.innerWidth > 1024 ? 48 : 24;
        return element.getBoundingClientRect().left + element.offsetWidth + padding;
    };

    useEffect(() => {
        const updateDistance = () => {
            if (typeof window !== "undefined" && stickyElementRef.current) {
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
        const token = getAccessToken();
        if (token) {
            executePaymentCheckout({
                callbackURL: PAYMENT_CALLBACK_URL
            }, id);
        } else {
            router.push(`/auth/login?redirect=${window.location.href}&action=${BUY_NOW_KEY}`);
        }
    }

    // check if user clicked buy now and course is loaded
    useEffect(() => {
        if (course?.title && action === BUY_NOW_KEY) {
            setTimeout(() => {
                executePaymentCheckout({
                    callbackURL: PAYMENT_CALLBACK_URL
                }, id);
            }, 1000);
        }
    }, [action, course]);

    // check if user has already purchased the course
    useEffect(() => {
        handleCallCheckPurchase();
    }, [id]);

    function handleCallCheckPurchase() {
        const token = getAccessToken();
        if (token) {
            fetchIsPurchased(id);
        }
    }

    useEffect(() => {
        if (coursePurchaseData?.data?.data?.bkashURL) {
            window.location.href = coursePurchaseData.data.data.bkashURL;
        }
    }, [coursePurchaseData]);

    return (
        <Suspense>
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
                                        <div className="p-1.5 pb-0 max-h-[325px] overflow-hidden border border-b-0">
                                            <img
                                                src={course?.thumbnail}
                                                alt={course?.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="md:border md:border-t-0 p-4">
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
                                                                অধ্যায়ভিত্তিক লেকচার শিট
                                                            </li>
                                                            <li className="font-medium flex items-center gap-2">
                                                                <SendHorizontal className="size-4 text-primary" />
                                                                লাইভ ক্লাস নেয়া হবে
                                                            </li>
                                                            <li className="font-medium flex items-center gap-2">
                                                                <SendHorizontal className="size-4 text-primary" />
                                                                ক্লাসগুলো স্পেশাল ফেসবুক গ্রুপে নেয়া হবে।
                                                            </li>
                                                            <li className="font-medium flex items-center gap-2">
                                                                <SendHorizontal className="size-4 text-primary" />
                                                                সার্বক্ষণিক মেন্টর সাপোর্ট
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
                                    <div className="grid grid-cols-12 gap-4">
                                        {
                                            course?.instructors?.map((instructor: any, index: number) => (
                                                <div key={index} className="flex items-center gap-4 col-span-12 lg:col-span-6">
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



                        <h4 className="text-2xl font-semibold mt-10">সচরাচর জিজ্ঞাসা</h4>
                        <div className="mt-4">
                            <Accordion type="single" defaultValue="item-1" collapsible className="w-full border rounded-lg px-4 py-2">
                                <AccordionItem value="item-1" className="border-b-0 border-dashed">
                                    <AccordionTrigger className="data-[state=open]:mb-4 data-[state=open]:border-b ">
                                        কোর্সটি কীভাবে কিনবো?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        কীভাবে পেমেন্ট করবেন তা বিস্তারিত জানতে <a href="http://youtube.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">এই ভিডিওটি</a> দেখুন
                                    </AccordionContent>
                                </AccordionItem>
                                {/* <AccordionItem value="item-2" className=" border-dashed">
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
                                </AccordionItem> */}
                            </Accordion>
                        </div>

                        <h4 className="text-2xl font-semibold mt-10">আরও কোন জিজ্ঞাসা আছে?</h4>
                        <div className="mt-4">
                            <a href="tel:+999" className="border w-fit rounded-lg p-6 px-12 text-primary font-semibold flex items-center gap-2">
                                <PhoneCall strokeWidth={1.5} />
                                <span>
                                    কল করুন {" "}
                                    <span className="">999</span>{" "}
                                    নম্বরে
                                </span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </Suspense>
    );
}

export default SingleProduct;
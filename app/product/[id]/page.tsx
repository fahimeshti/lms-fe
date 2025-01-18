"use client";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { File, FileSpreadsheet, PhoneCall, SendHorizontal } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef, useState } from "react";

function getScrollDistanceFromTop(): number {
    return window.scrollY || document.documentElement.scrollTop || 0;
}

const SingleProduct = () => {
    const [scrollDistance, setScrollDistance] = useState(0);
    const stickyElementRef = useRef<HTMLDivElement>(null);
    const [distanceFromLeft, setDistanceFromLeft] = useState(0);

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
                            <div className="container relative flex flex-col gap-4 md:flex-row md:gap-12 pb-6 md:py-10 min-h-[300px]">
                                <section className="order-1 flex flex-col justify-center flex-1 md:order-1  md:max-w-[calc(100%_-_348px)] lg:max-w-[calc(100%_-_448px)]">

                                    <h1 className="text-white text-4xl font-bold">SSC 2025 Business Studies Final Preparation Course</h1>
                                    <p className="text-gray-400 text-base font-medium mt-8">
                                        প্রিয় এসএসসি ২০২৫ ব্যাচের ব্যবসায় শিক্ষা বিভাগের শিক্ষার্থীরা,

                                        আর কয়েক মাসের মধ্যেই শুরু হতে যাচ্ছে তোমাদের এসএসসি ২০২৫ পরীক্ষা! তুমিও কি এখন বাকি সবার মতো পরীক্ষা নিয়ে চিন্তিত? এতো কম সময়ে পুরো সিলেবাস কিভাবে রিভিশন দিবো? কোন বিষয়টা কিভাবে পড়লে ভালো ফলাফল আসবে? এই সব প্রশ্ন কি তোমার মনেও ঘুরপাক খাচ্ছে?

                                        কিন্তু চিন্তার কোনো কারণ নেই। কারণ আমরা তোমাদের জন্য নিয়ে এসেছি এমন একটি কোর্স, যেখানে থাকছে সাধারণ গণিত, বাংলা, ইংরেজি, সাধারণ বিজ্ঞান, হিসাববিজ্ঞান, ফিন্যান্স- এই ৬টি বিষয়ের শেষ মুহূর্তের প্রস্তুতিসহ SSC 2025 ব্যাচের ব্যবসায় শিক্ষা বিভাগের পরীক্ষায় ভালো করার অসংখ্য টিপস আর ট্রিকস। তোমার সারা বছরের পড়াশোনা দুর্দান্ত হোক অথবা মোটামুটি, এই একটি কোর্সেই পরীক্ষার শেষ মুহূর্তের প্রস্ততি হবে ১০০-তে  ১০০!
                                    </p>
                                </section>

                                <section
                                    className={`${window.innerWidth > 768 ? (scrollDistance > 300 ? "fixed top-16" : "absolute right-0 md:top-[50px] md:absolute") : "relative"} w-full md:max-w-[330px] lg:max-w-[400px] order-2 bg-white`}
                                    style={{
                                        left: (window.innerWidth > 768 && scrollDistance > 300) ? `${distanceFromLeft}px` : "unset",
                                    }}
                                >
                                    <div className="md:sticky md:top-16">
                                        <div className="md:border p-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-semibold">৳2250</span>
                                                <span className="line-through text-xl">
                                                    ৳2500
                                                </span>
                                            </div>

                                            <div className="mt-4">
                                                <Button className="w-full">Enroll Now</Button>
                                            </div>

                                            <section className="mt-6">
                                                <h6 className="font-semibold text-xl">এই কোর্সে যা থাকছে</h6>

                                                <ul className="space-y-2 mt-3">
                                                    <li className="font-medium flex items-center gap-2">
                                                        <SendHorizontal className="size-4 text-primary" />
                                                        সর্বমোট ৮টি বিষয় পড়ানো হবে
                                                    </li>
                                                    <li className="font-medium flex items-center gap-2">
                                                        <SendHorizontal className="size-4 text-primary" />
                                                        মোট ৫০+ লাইভ ক্লাস নেয়া হবে
                                                    </li>
                                                    <li className="font-medium flex items-center gap-2">
                                                        <SendHorizontal className="size-4 text-primary" />
                                                        ক্লাসগুলো স্পেশাল ফেসবুক গ্রুপে নেয়া হবে।
                                                    </li>
                                                </ul>
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

                        <div className="mt-4">
                            <Accordion type="single" collapsible className="w-full border rounded-lg px-4 py-2">
                                <AccordionItem value="item-1">
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
                                </AccordionItem>
                                <AccordionItem value="item-2">
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
                                </AccordionItem>
                            </Accordion>
                        </div>

                        <h4 className="text-2xl font-semibold mt-10">সচরাচর জিজ্ঞাসা</h4>
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
                        </div>

                        <h4 className="text-2xl font-semibold mt-10">আরও কোন জিজ্ঞাসা আছে?</h4>
                        <div className="mt-4">
                            <div className="border w-fit rounded-lg p-6 px-12 text-teal-700 font-semibold flex items-center gap-2">
                                <PhoneCall strokeWidth={1.5} />
                                <span>কল করুন 12345 নম্বরে</span>
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
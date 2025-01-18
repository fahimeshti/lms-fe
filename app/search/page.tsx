"use client";
import Navbar from "@/components/common/Navbar";
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/common/Footer";

const SearchPage = () => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('query');

    return (
        <>
            <Navbar />
            <div className="custom-container pb-12">
                <div className="text-sm text-left mt-4 text-gray-950 font-normal flex items-center justify-between">
                    <div>
                        Showing 1 - 10 of 14 results for <span className="font-semibold">"{searchQuery}"</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="font-medium">Sorted by:</div>
                        <Select defaultValue="most-relavant">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="most-relavant">Most Relavant</SelectItem>
                                    <SelectItem value="latest">Latest</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <ul className="mt-4 space-y-5">
                    {
                        Array.from({ length: 10 }).map((_, i) => (
                            <li className="">
                                <Link href={`/product/${i}`} className="text-gray-950 border rounded-md p-4 flex items-start gap-4 hover:border-primary/30 transition-colors duration-150">
                                    <div
                                        className="rounded-md overflow-hidden h-28 w-52">
                                        <img
                                            src="https://cdn.10minuteschool.com/images/thumbnails/ssc-2025-business-studies-final-preparation-course-sqr-thumbnail.png?w=198&h=109"
                                            alt=""
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="h-full">
                                        <h2 className="text-lg font-semibold text-gray-950 hover:text-primary line-clamp-6">
                                            SSC 2025 Business Studies Final Preparation Course
                                        </h2>
                                        <span className="text-gray-600 font-medium text-sm block mt-2 mb-1">
                                            Author name
                                        </span>
                                        <span className="text-gray-600 bg-gray-200 block w-fit px-1.5 py-px rounded-md font-semibold text-sm">
                                            SSC
                                        </span>
                                    </div>

                                    <div className="ml-auto">
                                        {/* pricing */}
                                        <div className="text-right">
                                            <span className="text-primary font-semibold text-lg">
                                                ৳ 500
                                            </span>
                                            <span className="text-primary text-sm line-through block font-medium text-[#6b7280]">
                                                ৳ 1500
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <Footer />
        </>
    );
}

export default SearchPage;

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
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/components/common/Footer";
import { getCourses } from "@/utils/api/courses";
import { useApi } from "@/hooks/useApiCall";
import { Suspense, useEffect, useState } from "react";
import { CourseT } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const SearchPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('query');
    const searchFilter = searchParams.get('filter');
    const { data: courses, execute: fetchCourses, loading: apiLoading } = useApi<any, any>(
        getCourses,
        false,
        true,
    );
    const courseList = courses?.data?.data;

    // set loading state based on api loading
    useEffect(() => {
        setLoading(apiLoading);
    }, [apiLoading]);

    // fetch courses based on search query
    useEffect(() => {
        if (searchQuery) {
            fetchCourses(searchQuery, searchFilter);
        }
    }, [searchQuery, searchFilter]);

    const handleFilterChange = (value: string) => {
        const params = new URLSearchParams();
        if (searchQuery) params.append("query", searchQuery);
        if (value) params.append("filter", value);
        router.push(`/search?${params.toString()}`);
    }

    return (
        <Suspense>
            <Navbar />
            <div className="custom-container pb-12">
                <div className="text-sm text-left mt-4 text-gray-950 font-normal flex items-center justify-between">
                    {loading ?
                        <Skeleton className="h-8 w-1/2" />
                        :
                        <div>
                            {courseList?.length} results found for <span className="font-semibold">&quot;{searchQuery}&quot;</span>
                        </div>
                    }
                    <div className="flex items-center gap-2">
                        <div className="font-medium">Sorted by:</div>
                        <Select defaultValue="desc" onValueChange={handleFilterChange} disabled={loading}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="desc">Latest</SelectItem>
                                    <SelectItem value="asc">Oldest</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <ul className="mt-4 space-y-5">
                    {loading ?
                        Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-32 w-full" />
                        )) :
                        courseList?.map((course: CourseT) => (
                            <li className="" key={course.id}>
                                <Link href={`/product/${course.id}`} className="text-gray-950 border rounded-md p-4 flex items-start gap-4 hover:border-primary/30 transition-colors duration-150">
                                    <div
                                        className="rounded-md overflow-hidden h-28 w-52">
                                        <img
                                            src={course.thumbnail}
                                            alt=""
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="h-full">
                                        <h2 className="text-lg font-semibold text-gray-950 hover:text-primary line-clamp-6">
                                            {course.title}
                                        </h2>
                                        <span className="text-gray-600 font-medium text-sm mt-2 mb-1 flex gap-2">
                                            {
                                                course?.instructors?.map((instructor) => (
                                                    <span className="text-gray-600" key={instructor.name}>
                                                        {instructor.name}
                                                    </span>
                                                ))
                                            }
                                        </span>
                                        {course?.tags ?
                                            <span className="text-gray-600 bg-gray-200 block w-fit px-1.5 py-px rounded-md font-semibold text-sm">
                                                {course.tags}
                                            </span>
                                            : null}
                                    </div>

                                    <div className="ml-auto">
                                        {/* pricing */}
                                        <div className="text-right">
                                            <span className="text-primary font-semibold text-lg">
                                                ৳{course.price}
                                            </span>
                                            <span className="text-primary text-sm line-through block font-medium text-[#6b7280]">
                                                ৳{course.oldPrice}
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
        </Suspense>
    );
}

export default SearchPage;

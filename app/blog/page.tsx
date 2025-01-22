import Navbar from '@/components/common/Navbar'
import Link from 'next/link'
import Footer from '@/components/common/Footer'
import { API_ROOT } from '@/utils/constants'
import { BlogPost } from '@/types';

export async function getAllBlogs() {
    const API_BASE_URL = `${API_ROOT}/api/v1/blog`;

    try {
        const response = await fetch(API_BASE_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || "Failed to fetch blogs. Please try again."
            );
        }

        return await response.json();
    } catch (error: any) {
        console.error("Error fetching blogs from server:", error.message);
        throw error;
    }
}


export default async function BlogPage() {
    const blogs = await getAllBlogs();

    return (
        <>
            <Navbar />
            <div className="custom-container py-6 lg:py-12">
                <h1 className="text-4xl font-bold text-gray-700 mb-5 text-left">
                    Latest Blog
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
                    {blogs?.data?.map((post: BlogPost) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.id}`}
                        >
                            <article key={post.id} className="bg-white h-full shadow hover:shadow-md transition-all duration-150 overflow-hidden sm:rounded-lg">
                                <div className="">
                                    <div className="w-full h-48 bg-gray-100">
                                        <img
                                            src={post.thumbnail}
                                            alt=""
                                            className='object-cover w-full h-full'
                                        />
                                    </div>
                                    <div className="p-4 sm:p-4 h-[230px] flex flex-col justify-between">
                                        <div>
                                            <h2 className="text-2xl font-semibold text-gray-900 line-clamp-2">
                                                {post.title}
                                            </h2>
                                            <p className="mt-1 text-sm text-gray-600">{post.createdAt}</p>
                                            <p className="mt-2 text-sm text-gray-500 line-clamp-3">{post.content}</p>
                                        </div>
                                        <div className="pr-1 flex justify-end mt-4">
                                            <span className="text-primary hover:text-indigo-900">
                                                Read more →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </>

    )
}

import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import { BlogPost } from '@/types';
import { API_ROOT } from '@/utils/constants';

function formatDateToLong(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}

async function getBlogDetails(id: string) {
    const API_BASE_URL = `${API_ROOT}/api/v1/blog/${id}`;

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

const BlogDetailsPage = async ({ params }: any) => {
    const param = await params;
    const postData = await getBlogDetails(param.id);
    const post: BlogPost = postData?.data;

    return (
        <>
            <Navbar />
            <div className="custom-container !max-w-5xl py-6 lg:py-12">
                <article className="overflow-hidden w-full pt-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

                    <div className="flex items-center gap-3 text-gray-600 mb-4">
                        <div className='rounded-full w-12 h-12 overflow-hidden'>
                            <img
                                src={post.author?.image}
                                alt=""
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className='font-semibold text-xl'>{post.author?.name}</span>
                            {post.createdAt ? <span className="mr-4 font-medium">{formatDateToLong(new Date(post.createdAt))}</span> : null}
                        </div>
                    </div>

                    <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden mt-8">
                        <img
                            src={post.thumbnail}
                            alt=""
                            className="object-cover w-full"
                        />
                    </div>
                    <div className="pt-8">
                        <div className="prose max-w-none">
                            {post?.content?.split('\n').map((paragraph, index) => (
                                <p key={index} className="mb-4">{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </article>
            </div>
            <Footer />
        </>
    );
}

export default BlogDetailsPage;

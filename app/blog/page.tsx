import Navbar from '@/components/common/Navbar'
import Link from 'next/link'
import Footer from '@/components/common/Footer'

// Mock data for blog posts
const blogPosts = [
    {
        id: 1,
        img: "https://fakeimg.pl/600x400",
        title: "Getting Started with Next.js",
        excerpt: "Learn how to build fast and efficient web applications with Next.js, the React framework for production.",
        date: "2023-05-15"
    },
    {
        id: 2,
        img: "https://fakeimg.pl/600x400",
        title: "Mastering Tailwind CSS",
        excerpt: "Discover the power of utility-first CSS with Tailwind and create beautiful, responsive designs quickly.",
        date: "2023-05-10"
    },
    {
        id: 3,
        img: "https://fakeimg.pl/600x400",
        title: "The Future of Web Development",
        excerpt: "Explore emerging trends and technologies that are shaping the future of web development.",
        date: "2023-05-05"
    }
]

export default function BlogPage() {
    return (
        <>
            <Navbar />
            <div className="custom-container py-6 lg:py-12">
                <h1 className="text-4xl font-bold text-gray-700 mb-5 text-left">
                    Latest Blog
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
                    {blogPosts.map((post) => (
                        <Link
                            href={`/blog/${post.id}`}
                        >
                            <article key={post.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="">
                                    <div className="w-full">
                                        <img
                                            src={post.img}
                                            alt=""
                                        />
                                    </div>
                                    <div className="p-4 sm:p-4">
                                        <h2 className="text-2xl font-semibold text-gray-900">
                                            <Link href={`/blog/${post.id}`} className="hover:underline">
                                                {post.title}
                                            </Link>
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-600">{post.date}</p>
                                        <p className="mt-2 text-base text-gray-500 line-clamp-3">{post.excerpt}</p>
                                        <div className="mt-4">
                                            <Link href={`/blog/${post.id}`} className="text-primary hover:text-indigo-900">
                                                Read more →
                                            </Link>
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


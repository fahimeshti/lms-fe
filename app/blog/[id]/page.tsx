import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import Image from 'next/image';

function formatDateToLong(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}

// Example usage:
const date = new Date("2024-11-22");
console.log(formatDateToLong(date)); // Output: "November 22, 2024"


const BlogDetailsPage = ({ params }: { params: { id: string } }) => {
    // const post = blogPosts.find((p) => p.id.toString() === params.id)
    const post = {
        id: 1,
        title: "গণিত নিয়ে ভাবনা? আর না!",
        date: "2023-05-15",
        author: "John Doe",
        content: `আমাদের দেশের স্কুল-কলেজগুলোতে এমন অনেক শিক্ষার্থী আছে, গণিতের নাম শুনলেই যাদের ভয়ে অবস্থা খারাপ হয়ে যায়। শুধু স্কুল-কলেজ নয়, বিশ্ববিদ্যালয়ে এসেও আমি এমন অনেককেই দেখেছি যারা আজও গণিতকে ভয় পায় ঠিক আগের মতোই।
        গণিত নিয়ে সবার ভয় কিন্তু একরকম হয় না। কেউ হয়তো গাণিতিক সমস্যা সমাধান করাকেই ভয় পায়, কেউ আবার ভয় পায় সমস্যার মাঝখানে এসে আটকে যাওয়াকে, কেউ আবার ভয় পায় শুধু গণিত পরীক্ষাকে। তবে ভয়টা যে কারণেই হোক না কেন, তুমি কিন্তু চাইলেই জয় করে ফেলতে পারো তোমার গণিতের ভয়কে। চলো জেনে নেই, গণিতের ভয়কে জয় করার দারুণ কিছু উপায়।`
    }

    return (
        <>
            <Navbar />
            <div className="custom-container !max-w-5xl py-6 lg:py-12">
                <article className="overflow-hidden w-full pt-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

                    <div className="flex items-center gap-3 text-gray-600 mb-4">
                        <div className='rounded-full w-12 h-12 overflow-hidden'>
                            <img
                                src="https://blog.10minuteschool.com/wp-content/uploads/2017/11/23874112_897616407054481_717535714_o-1024x377.png"
                                alt=""
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className='font-semibold text-xl'>{post.author}</span>
                            {post.date ? <span className="mr-4 font-medium">{formatDateToLong(new Date(post.date))}</span> : null}
                        </div>
                    </div>

                    <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden mt-8">
                        <img
                            src={"https://blog.10minuteschool.com/wp-content/uploads/2017/11/23874112_897616407054481_717535714_o-1024x377.png"}
                            alt=""
                            className="object-cover w-full"
                        />
                    </div>
                    <div className="">
                        <div className="prose max-w-none">
                            {post.content.split('\n').map((paragraph, index) => (
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
import Link from "next/link";

const CourseCard = ({ data }: any) => {
    return (
        <Link href={`/product/${data.id}`} className="border hover:shadow bg-white block rounded-lg w-fit overflow-hidden transition-all duration-200">
            <div className="w-full">
                <img src="https://placehold.co/600x400" alt="" className="object-cover w-full h-full" />
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold line-clamp-2">{data.title}</h3>
                <p className="text-sm text-gray-500 font-medium truncate">Instructor Name</p>
                <p className="text-sm text-gray-500 line-clamp-3 mt-2">
                    Course Description Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam laboriosam hic pariatur nisi minus in impedit est? Ratione fugiat corporis iste, illum eius soluta voluptate rerum, impedit sed adipisci at.
                </p>
                <p className="font-semibold text-primary text-lg mt-2">৳400</p>
            </div>
        </Link>
    );
}

export default CourseCard;
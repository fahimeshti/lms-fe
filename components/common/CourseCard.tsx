import { CourseT } from "@/types";
import { IMAGE_FALLBACK } from "@/utils/constants";
import Link from "next/link";
import { Button } from "../ui/button";

const CourseCard = ({ data, purchased }: { data: CourseT, purchased?: boolean }) => {
    return (
        <Link href={purchased ? `/learn/${data.id}` : `/product/${data.id}`} className="border w-full hover:shadow bg-white block rounded-lg overflow-hidden transition-all duration-200">
            <div className="w-full min-h-40 max-h-40 h-40 overflow-hidden">
                <img src={data.thumbnail || IMAGE_FALLBACK} alt="" className="object-cover w-full h-full" />
            </div>

            <div className="p-4 min-h-[12rem] max-h-[12rem] flex justify-between flex-col">
                <div>
                    <h3 className="text-lg font-semibold line-clamp-2">{data.title}</h3>
                    <p className="text-sm text-gray-500 font-medium truncate">
                        {data.instructors.map((instructor) => instructor.name).join(", ")}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-2">
                        {data.description}
                    </p>
                </div>

                {
                    purchased ?
                        <div className="w-full mt-2">
                            <Button className="mt-2 w-full">
                                Go To Course
                            </Button>
                        </div>
                        :
                        <p className="font-bold text-primary text-xl mt-2">৳{data.price}</p>
                }

            </div>
        </Link>
    );
}

export default CourseCard;
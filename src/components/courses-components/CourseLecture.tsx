import { Controller, useFieldArray } from "react-hook-form";

const CourseLecture = ({ control, courseIndex, removeCourse }: any) => {
    const lecturesArray = useFieldArray({
        control,
        name: `chapters.${courseIndex}.lectures`
    });
    const { fields: lectures, append: appendLecture, remove: removeLecture } = lecturesArray;

    return (
        <div key={courseIndex} className="space-y-4 rounded-md mb-8">
            <div className="w-full flex items-center justify-between">
                <h3 className="text-lg font-semibold mb-2">
                    Chapter {courseIndex + 1}:
                </h3>
                <button type="button" onClick={() => removeCourse(courseIndex)} className="text-red-500">Remove Chapter</button>
            </div>

            <Controller
                name={`chapters.${courseIndex}.title`}
                control={control}
                render={({ field }) =>
                    <input
                        placeholder="Chapter Title*"
                        className="w-full rounded-lg border-[1.5px] bg-white border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed cursor-auto disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        {...field}
                    />}
            />
            <Controller
                name={`chapters.${courseIndex}.serial`}
                control={control}
                render={({ field }) => <input type="number" placeholder="Chapter Serial" className="w-full rounded-lg border-[1.5px] bg-white border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed cursor-auto disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" {...field} />}
            />

            <div className="space-y-4 py-4 rounded-md">
                {/* <h4 className="font-medium">Lectures:</h4> */}
                {lectures.map((lecture, lectureIndex) => (
                    <div key={lecture.id} className="space-y-4 mt-5">
                        <div className="flex items-center justify-between">
                            <h5 className="font-medium">Lecture {lectureIndex + 1}</h5>
                            <button
                                type="button"
                                onClick={() => removeLecture(lectureIndex)}
                                className="text-red-500"
                            >
                                Remove Lecture
                            </button>
                        </div>
                        <Controller
                            name={`chapters.${courseIndex}.lectures.${lectureIndex}.title`}
                            control={control}
                            render={({ field }) => <input {...field} placeholder="Lecture Title*" className="w-full rounded-lg border-[1.5px] bg-white border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed cursor-auto disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />}
                        />
                        <Controller
                            name={`chapters.${courseIndex}.lectures.${lectureIndex}.url`}
                            control={control}
                            render={({ field }) => <input {...field} placeholder="Lecture URL" className="w-full rounded-lg border-[1.5px] bg-white border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed cursor-auto disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />}
                        />
                        <Controller
                            name={`chapters.${courseIndex}.lectures.${lectureIndex}.description`}
                            control={control}
                            render={({ field }) => <textarea {...field} placeholder="Lecture Description" className="w-full rounded-lg border-[1.5px] border-stroke bg-white bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />}
                        />
                        <Controller
                            name={`chapters.${courseIndex}.lectures.${lectureIndex}.duration`}
                            control={control}
                            render={({ field }) => <input {...field} placeholder="Lecture Duration" className="w-full rounded-lg border-[1.5px] bg-white border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed cursor-auto disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />}
                        />

                    </div>
                ))}
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() => appendLecture({ title: "", url: "", files: [""], description: "", duration: "", serial: lectures?.length + 1 || 1 })}
                    className="bg-green-700 hover:bg-green-800 transition-all duration-150 text-white py-2 px-4 rounded-md"
                >
                    Add Lecture
                </button>
            </div>
        </div>
    );
}

export default CourseLecture;
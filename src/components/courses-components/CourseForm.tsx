import { useForm, useFieldArray } from 'react-hook-form';
import CourseLecture from './CourseLecture';

interface Lecture {
    title: string;
    url: string;
    files: string[];
    description: string;
    duration: string;
    serial: number;
}

interface Course {
    title: string;
    serial: number;
    lectures: Lecture[];
    id?: string;
}

type CourseFormProps = {
    disabled: boolean;
    handleSubmitToApi: (data: any) => void;
    defaultValues?: Course[];
};

const CourseForm = ({ disabled, handleSubmitToApi, defaultValues }: CourseFormProps) => {
    const { control, handleSubmit } = useForm<{ chapters: Course[] }>({
        defaultValues: {
            chapters: defaultValues || [
                {
                    title: "",
                    serial: 1,
                    lectures: [
                        {
                            title: "",
                            url: "",
                            files: [""],
                            description: "",
                            duration: "",
                            serial: 1,
                        }
                    ]
                }
            ]
        },
    });

    // UseFieldArray for courses
    const { fields: chapters, append: appendCourse, remove: removeCourse } = useFieldArray({
        control,
        name: "chapters",
    });

    const onSubmit = (data: any) => {
        handleSubmitToApi(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='bg-white dark:bg-form-strokedark rounded-md mt-4'>
            {chapters.map((_, courseIndex) => (
                <CourseLecture key={courseIndex} control={control} courseIndex={courseIndex} removeCourse={removeCourse} />
            ))}
            <button
                type="button"
                onClick={() => appendCourse({ title: "", serial: chapters?.length + 1 || 1, lectures: [] })}
                className='bg-primary text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2'
            >
                Add Chapter
            </button>
            <div className="w-full flex justify-end">
                <button disabled={disabled} type="submit" className='bg-primary hover:bg-primary/90 transition-all duration-150 text-white px-8 py-3 rounded-lg disabled:cursor-not-allowed disabled:bg-gray-500'>
                    Submit
                </button>
            </div>
        </form>
    );
};

export default CourseForm;

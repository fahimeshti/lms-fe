
import ImageInput from '../components/Image/ImageInput';
import MultiSelectC from '../components/select/MultiSelectC';
import Input from '../components/Input';

const EditCourseSection = ({ form, updateCourseLoading, onSubmit, course, authors, selectedAuthors }: any) => {
    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 bg-white dark:bg-form-strokedark p-8"
        >
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Course Title*
                </label>
                <Input form={form} name='title' placeholder="Title" />
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Description*
                </label>
                <textarea
                    placeholder="Description"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    {...form.register('description')}
                />
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Thumbnail URL*
                </label>
                <ImageInput form={form} name='thumbnail' defaultValue={course?.data?.data?.publicCourse?.thumbnail} />
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Short Video URL
                </label>
                <Input form={form} name='shortVideo' placeholder="ex: https://www.youtube.com/watch?v=videoId" />
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Price*
                </label>
                <Input form={form} name='price' placeholder="Price" />
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Old Price
                </label>
                <Input form={form} name='oldPrice' placeholder="Old Price" />
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Instructor(s)
                </label>
                <MultiSelectC name='instructorIds' data={authors} form={form} defaultValue={selectedAuthors} />
            </div>


            <div className="flex justify-end">
                <button
                    disabled={updateCourseLoading}
                    className="rounded-md bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 disabled:cursor-not-allowed disabled:bg-gray-500"
                >
                    Save
                </button>
            </div>

        </form>
    );
}

export default EditCourseSection;
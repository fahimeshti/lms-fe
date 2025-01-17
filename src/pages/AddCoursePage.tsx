import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import MultiSelectC from '../components/select/MultiSelectC';
import { getAuthors } from '../utils/api/authors';
import { useApi } from '../hooks/useApiCall';
import { addCourse } from '../utils/api/courses';
import { useEffect } from 'react';
import ImageInput from '../components/Image/ImageInput';

const FormSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  thumbnail: z.string().nonempty(),
  short_video: z.string().optional(),
  price: z.string(),
  oldPrice: z.string().optional(),
  instructorIds: z.array(z.string()),
});

const AddCoursePage = () => {
  const navigate = useNavigate();
  const { data: authorsData, } = useApi<any, any>(
    getAuthors,
    true,
    true,
  );
  const { data: courseData, execute: createCourse, loading } = useApi<any, any>(
    addCourse,
    false,
    true,
  );

  const authors = authorsData?.data?.data?.map((data: any) => ({
    value: data.id,
    label: data.name,
  }));


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
      thumbnail: '',
      short_video: '',
      price: '',
      oldPrice: '',
      instructorIds: [''],
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const newData: any = { ...data, };
    newData.price = parseInt(data.price || '0');
    newData.oldPrice = parseInt(data.oldPrice || '0');
    createCourse(newData);
  }

  useEffect(() => {
    if (courseData?.data) {
      const publicCourseId = courseData?.data?.data?.data.publicCourse.id;
      const privateCourseId = courseData?.data?.data?.data.privateCourse.id;

      navigate(`/courses/add/${publicCourseId}/${privateCourseId}`);
    }
  }, [courseData]);

  return (
    <>
      <Breadcrumb pageName="Course Details" />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-white dark:bg-form-strokedark p-8 py-10 rounded-md"
      >
        <div className="w-full rounded-full flex items-center gap-4 h-3 mb-12">
          <div className="w-full font-medium">
            Step 1
            <div className='w-full bg-primary rounded-full h-3 mt-1'></div>
          </div>
          <div className="w-full font-medium">
            Step 2
            <div className='w-full bg-gray-200 rounded-full h-3 mt-1'></div>
          </div>
        </div>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Course Title*
          </label>
          <input
            type="text"
            placeholder="Title"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            {...form.register('title')}
          />
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
          <ImageInput form={form} name='thumbnail' />
        </div>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Short Video URL
          </label>
          <input
            type="text"
            placeholder="Short Video URL"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            {...form.register('short_video')}
          />
        </div>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Price*
          </label>
          <input
            type="text"
            min={0}
            placeholder="Price"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            {...form.register('price')}
          />
        </div>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Old Price
          </label>
          <input
            type="text"
            min={0}
            placeholder="Old Price"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            {...form.register('oldPrice')}
          />
        </div>

        <div>
          <label className="mb-3 block text-black dark:text-white">
            Instructor(s)
          </label>
          <MultiSelectC name='instructorIds' data={authors} form={form} />
        </div>

        <div className="flex justify-end">
          <button
            className="rounded-md bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 flex items-center gap-2 disabled:cursor-not-allowed disabled:bg-gray-500"
            disabled={loading}
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

      </form>
    </>
  );
};

export default AddCoursePage;


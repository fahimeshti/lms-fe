import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../components/Input';
import ImageInput from '../components/Image/ImageInput';
import { useParams } from 'react-router-dom';
import { getAuthor, updateAuthor } from '../utils/api/authors';
import { useApi } from '../hooks/useApiCall';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const FormSchema = z.object({
  name: z.string().nonempty({
    message: 'Name is required',
  }),
  image: z.string().optional(),
  institution: z.string().optional(),
  experience: z.string().optional(),
});

const dummyData = {
  "id": "1",
  "name": "Will Smith",
  "image": "",
  "institution": "Some University",
  "experience": "25 years of teaching experience"
};

const EditAuthorPage = () => {
  const { id } = useParams<{ id: string }>();

  // getAuthor
  const { data: authorData } = useApi<any, any>(
    getAuthor,
    true,
    true,
    id
  );

  const { execute: updateAuthorApi, loading: loadingUpdate } = useApi<any, any>(
    updateAuthor,
    false,
    true,
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      image: '',
      institution: '',
      experience: '',
    },
  });

  useEffect(() => {
    if (authorData?.data?.data) {
      form.setValue('name', authorData?.data?.data?.name);
      form.setValue('image', authorData?.data?.data?.image);
      form.setValue('institution', authorData?.data?.data?.institution);
      form.setValue('experience', authorData?.data?.data?.experience);
    }
  }, [authorData]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    updateAuthorApi(id, data).then(() => {
      toast.success('Author updated successfully');
    }
    );
  };

  return (
    <>
      <Breadcrumb pageName="Author Details" />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-white dark:bg-form-strokedark p-8 rounded-md"
      >
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Author Name*
          </label>
          <Input form={form} name='name' placeholder="Author Name" />
        </div>

        <div>
          <label className="mb-3 block text-black dark:text-white">
            Image
          </label>
          <ImageInput form={form} name='image' defaultValue={authorData?.data?.data?.image} />
        </div>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Institution
          </label>
          <Input form={form} name='institution' placeholder="Institution" />
        </div>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Experience
          </label>
          <Input form={form} name='experience' placeholder="Experience" />
        </div>

        <div className="flex justify-end">
          <button
            disabled={loadingUpdate}
            className="rounded-md bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 disabled:cursor-not-allowed disabled:bg-gray-500"
          >
            Save
          </button>
        </div>

      </form>

      <div className='mt-8 bg-white rounded-md py-8'>
        <div className='text-xl font-medium text-black px-8'>
          Courses by this author
        </div>
        <div className='px-8 mt-4'>
          {authorData?.data?.data?.courses?.map((course: any) => (
            <div key={course.id} className='flex justify-between items-center border-b border-gray-200 py-4'>
              <div className='text-gray-700'>
                {course.title}
              </div>
              <div>
                {course.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EditAuthorPage;


import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../components/Input';
import ImageInput from '../components/Image/ImageInput';
import { addAuthor } from '../utils/api/authors';
import { useApi } from '../hooks/useApiCall';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const FormSchema = z.object({
  name: z.string().nonempty(),
  image: z.string().optional(),
  institution: z.string().optional(),
  experience: z.string().optional(),
});

const AddAuthorPage = () => {
  const navigate = useNavigate();
  const { execute: addAuthorApi, loading: loadingAdd } = useApi<any, any>(
    addAuthor,
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

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    addAuthorApi(data).then(() => {
      toast.success('Author added successfully');
      navigate('/authors');
    }
    );
  }

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
          <ImageInput form={form} name='image' />
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
            disabled={loadingAdd}
            className="rounded-md bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>

      </form>
    </>
  );
};

export default AddAuthorPage;


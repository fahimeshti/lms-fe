import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getCourse, updateCourse } from '../utils/api/courses';
import { useApi } from '../hooks/useApiCall';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getAuthors } from '../utils/api/authors';
import toast from 'react-hot-toast';
import EditCourseSection from '../sections/EditCourseSection';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import EditChaptersSection from '../sections/EditChaptersSection';
import Skeleton from '../components/Skeleton';

const FormSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  thumbnail: z.string().nonempty(),
  shortVideo: z.string().optional(),
  price: z.string(),
  oldPrice: z.string().optional(),
  instructorIds: z.array(z.string()),
});

const categories = [
  { name: 'Edit Details' },
  { name: 'Edit Chapters' },
];

const EditCoursePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabIndex = Number(searchParams.get("tab")) || 0;

  const { publicCourseId, privateCourseId } = useParams<{ publicCourseId: string, privateCourseId: string }>();
  const { loading, data: course, } = useApi<any, any>(
    getCourse,
    true,
    true,
    publicCourseId
  );
  const { data: authorsData, } = useApi<any, any>(
    getAuthors,
    true,
    true,
  );

  const authors = authorsData?.data?.data?.map((data: any) => ({
    value: data.id,
    label: data.name,
  }));

  const selectedAuthors = course?.data?.data?.publicCourse?.instructors?.map((data: any) => ({
    value: data.id,
    label: data.name,
  }));

  const { execute: updateCourseApi, loading: updateCourseLoading } = useApi<any, any>(
    updateCourse,
    false,
    true,
  );


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
      thumbnail: '',
      shortVideo: '',
      price: '',
      oldPrice: '',
    },
  });

  useEffect(() => {
    form.setValue('title', course?.data?.data?.publicCourse?.title || '');
    form.setValue('description', course?.data?.data?.publicCourse?.description || '');
    form.setValue('thumbnail', course?.data?.data?.publicCourse?.thumbnail || '');
    form.setValue('shortVideo', course?.data?.data?.publicCourse?.short_video || '');
    form.setValue('price', (course?.data?.data?.publicCourse?.price)?.toString() || '');
    form.setValue('oldPrice', course?.data?.data?.publicCourse?.oldPrice?.toString() || '');
    const instructorIds = course?.data?.data?.publicCourse?.instructors?.map((data: any) => data.id) || [];
    form.setValue('instructorIds', instructorIds);
  }, [course?.data?.data]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const newData: any = { ...data };
    newData.price = parseFloat(newData.price || 0);
    newData.oldPrice = parseFloat(newData.oldPrice || 0);

    updateCourseApi(publicCourseId, newData).then((ok) => {
      if (ok) {
        toast.success('Course updated successfully');
      }
    });
  }

  return (
    <>
      <Breadcrumb pageName="Edit Course" />

      <TabGroup defaultIndex={tabIndex} onChange={idx => {
        navigate(`/courses/${publicCourseId}/${privateCourseId}?tab=${idx}`);
      }}>
        <TabList className="flex gap-4">
          {categories.map(({ name }) => (
            <Tab
              key={name}
              className="bg-white rounded-none data-[selected]:outline-none text-black px-4 py-3 font-medium data-[selected]:text-white data-[selected]:bg-primary transition-all duration-100"
            >
              {name}
            </Tab>
          ))}
        </TabList>

        <TabPanels className="mt-3">
          <TabPanel className="">
            {loading ?
              <Skeleton className="h-96 w-full rounded-md" />
              :
              <EditCourseSection
                form={form}
                updateCourseLoading={updateCourseLoading}
                onSubmit={onSubmit}
                course={course}
                authors={authors}
                selectedAuthors={selectedAuthors}
              />
            }
          </TabPanel>
          <TabPanel className="">
            {
              loading ?
                <Skeleton className="h-96 w-full rounded-md" />
                :
                <EditChaptersSection
                  chapters={course?.data?.data?.chapters}
                />
            }
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
};

export default EditCoursePage;

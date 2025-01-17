import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
import CourseForm from '../components/courses-components/CourseForm';
import { useApi } from '../hooks/useApiCall';
import { addChapters } from '../utils/api/courses';
import toast from 'react-hot-toast';

// const FormSchema = z.object({
//   title: z.string().nonempty(),
//   description: z.string().nonempty(),
//   thumbnail: z.string().nonempty(),
//   shortVideo: z.string().optional(),
//   price: z.string(),
//   oldPrice: z.string().optional(),
// });

const AddChaptersPage = () => {
  const navigate = useNavigate();
  const { publicCourseId, privateCourseId } = useParams();
  const { execute: createChapters, loading } = useApi<any, any>(
    addChapters,
    false,
    true,
  );

  const handleSubmit = (data: any) => {
    data.privateCourseId = privateCourseId;
    createChapters(publicCourseId, data).then(() => {
      toast.success('Chapters added successfully');
      navigate(`/courses`);
    });
  }

  return (
    <>
      <Breadcrumb pageName="Course Details" />

      <div
        className="space-y-4 bg-white dark:bg-form-strokedark p-8 py-10 rounded-md"
      >
        <div className="w-full rounded-full flex items-center gap-4 h-3 mb-12">
          <div className="w-full font-medium">
            Step 1
            <div className='w-full bg-primary rounded-full h-3 mt-1'></div>
          </div>
          <div className="w-full font-medium">
            Step 2
            <div className='w-full bg-primary rounded-full h-3 mt-1'></div>
          </div>
        </div>

        <CourseForm
          disabled={loading}
          handleSubmitToApi={handleSubmit}
        />
      </div>
    </>
  );
};

export default AddChaptersPage;


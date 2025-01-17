import { Link } from 'react-router-dom';
import { deleteCourse, getCourses } from '../utils/api/courses';
import { useApi } from '../hooks/useApiCall';
import Skeleton from '../components/Skeleton';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import toast from 'react-hot-toast';

const MySwal = withReactContent(Swal);

const CoursesPage = () => {
  const { loading, data: courses, execute: refetchCourses } = useApi<any, any>(
    getCourses,
    true,
    true,
  );
  const { execute: execDeleteCourse } = useApi<any, any>(
    deleteCourse,
    false,
    true,
  );

  const handleDelete = (id: string) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      showLoaderOnConfirm: true,
      customClass: {
        confirmButton: 'bg-red-500 hover:bg-opacity-90',
        cancelButton: 'bg-gray-100 hover:bg-opacity-90 text-black',
      },
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        execDeleteCourse(id).then((success) => {
          if (success) {
            toast.success('Course deleted successfully');
            refetchCourses();
          }
        })

      }
    });
  };

  return (
    <>
      <div className="my-4 flex justify-end">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Courses
        </h2>
        <Link
          to="/courses/add"
          className="inline-flex ml-auto items-center justify-center rounded-md bg-primary py-3 px-8 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Course
        </Link>
      </div>

      <div className="space-y-4">
        {
          loading ?
            <>
              <Skeleton className="h-24 w-full rounded-md" />
              <Skeleton className="h-24 w-full rounded-md" />
              <Skeleton className="h-24 w-full rounded-md" />
            </>
            :
            <>
              {courses?.data?.data?.map((data: any) => (
                <div key={data?.id} className="overflow-hidden rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex gap-4">
                  <div className="w-32 h-auto border rounded-md overflow-hidden flex-shrink-0">
                    <img src={data.thumbnail} alt="" className='w-full h-full object-cover' />
                  </div>

                  <div className=''>
                    <h2 className="text-title-sm font-bold text-black dark:text-white">
                      {data.title}
                    </h2>
                    <p className="text-sm text-meta-4 dark:text-meta-2 mt-1 line-clamp-2">
                      {data.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 ml-auto">
                    <Link
                      to={`/courses/${data.id}/${data?.privateCourses?.id}`}
                      className="inline-flex items-center justify-center rounded-md border border-primary py-3 px-10 text-center font-medium text-primary hover:bg-primary/5 lg:px-8 xl:px-10"
                    >
                      Edit
                    </Link>
                    <button
                      type='button'
                      onClick={() => handleDelete(data.id)}
                      className="inline-flex items-center justify-center rounded-md border border-red-500 text-red-500 py-3 px-10 text-center font-medium hover:bg-red-500/5 lg:px-8 xl:px-10"
                    >
                      Delete
                    </button>

                  </div>
                </div>
              ))}
            </>
        }
      </div>
    </>
  );
};

export default CoursesPage;

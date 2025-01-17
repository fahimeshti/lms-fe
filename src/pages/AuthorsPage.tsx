import { Link } from 'react-router-dom';
import { deleteAuthor, getAuthors } from '../utils/api/authors';
import { useApi } from '../hooks/useApiCall';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import toast from 'react-hot-toast';

const MySwal = withReactContent(Swal);

const AuthorsPage = () => {
  const { data: authors, execute } = useApi<any, any>(
    getAuthors,
    true,
    true,
  );
  const { execute: execDeleteAuthor, } = useApi<any, any>(
    deleteAuthor,
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
        execDeleteAuthor(id).then((success) => {
          if (success) {
            toast.success('Author deleted successfully');
            execute();
          }
        })

      }
    });
  };

  return (
    <>
      <div className="my-4 flex justify-end">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Authors
        </h2>
        <Link
          to="/author/add"
          className="inline-flex ml-auto items-center justify-center rounded-md bg-primary py-3 px-8 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Author
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          authors?.data?.data?.map((data: any) => (
            <div
              key={data.id}
              className="overflow-hidden w-full rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4">
              <div className="w-full h-32 py-4 rounded-md overflow-hidden flex-shrink-0 bg-gray-50">
                <img src={data.image} alt="" className='w-full h-full object-contain' />
              </div>

              <div className=''>
                <h2 className="text-title-sm font-bold text-black dark:text-white">
                  {data.name}
                </h2>
                <p className="text-sm text-meta-4 dark:text-meta-2 mt-1 line-clamp-2">
                  {data.institution}
                </p>
              </div>

              <div className="flex items-center flex-wrap gap-4 ml-auto">
                <Link
                  to={`/author/${data.id}`}
                  className="inline-flex items-center justify-center rounded-md border border-primary py-3 px-10 text-center font-medium text-primary hover:bg-primary/5 lg:px-5 xl:px-8"
                >
                  Edit
                </Link>
                <button
                  type='button'
                  onClick={() => handleDelete(data.id)}
                  className="inline-flex items-center justify-center rounded-md border border-red-500 text-red-500 py-3 px-10 text-center font-medium hover:bg-red-500/5 lg:px-5 xl:px-8"
                >
                  Delete
                </button>

              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default AuthorsPage;

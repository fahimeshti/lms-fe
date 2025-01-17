import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApiCall";
import { getUsers } from "../utils/api/users";

const UsersPage = () => {
  const { data: users, } = useApi<any, any>(
    getUsers,
    true,
    true,
  );

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Users
        </h4>
      </div>

      <div className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark xsm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">User Name</p>
        </div>
        <div className="col-span-2 items-center flex">
          <p className="font-medium">Courses</p>
        </div>
        <div className="col-span-3 hidden xsm:flex items-center justify-center">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {
        users?.data?.data?.length <= 0 && (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500 dark:text-white">No users found</p>
          </div>
        )
      }

      {users?.data?.data?.map((product: any, idx: number) => (
        <div
          className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark xsm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={idx}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={product.avatarUrl} alt="Product" />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.fullName}
              </p>
            </div>
          </div>
          <div className="col-span-2 items-center flex">
            <p className="text-sm text-black dark:text-white pl-4">
              {product.courses.length}
            </p>
          </div>
          <div className="col-span-12 xsm:col-span-3 items-center flex justify-center gap-2 mt-4 xsm:mt-0">
            <Link
              to={`/user/${product.id}`}
              className="inline-flex items-center w-full xsm:w-fit justify-center text-sm sm:text-base rounded-md border border-primary py-2.5 px-8 text-center font-medium text-primary hover:bg-opacity-90 lg:px-6 xl:px-8"
            >
              View User
            </Link>
            {/* <Link
              to="/courses"
              className="inline-flex items-center justify-center rounded-md border border-red-500 text-red-500 py-2.5 px-8 text-center font-medium hover:bg-opacity-90 lg:px-6 xl:px-8"
            >
              Ban
            </Link> */}
          </div>

        </div>
      ))}
    </div>
  );
};

export default UsersPage;

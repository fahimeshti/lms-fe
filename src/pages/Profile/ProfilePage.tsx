
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    return (
        <>
            <Breadcrumb pageName="Profile" />

            <div className="overflow-hidden rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="relative z-20 h-20 md:h-32">
                    <img
                        src={'https://i.ibb.co.com/R0cVswx/banner-bg-Dq7yo13-U.jpg'}
                        alt="profile cover"
                        className="h-full w-full rounded-tl-sm rounded-tr-sm bg-center object-cover object-center"
                    />
                </div>
                <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
                    <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                        <div className="relative drop-shadow-2">
                            <img
                                src={
                                    'https://fakeimg.pl/400x400'
                                }
                                alt="profile"
                                className='rounded-full'
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                            Danish Heilium
                        </h3>

                        <div className="w-full md:p-4">
                            <h4 className="font-semibold text-black text-xl dark:text-white text-left">
                                Courses:
                            </h4>
                            <ul className="mt-4.5 list-decimal pl-8">
                                {
                                    dummyData.map((course, index) => (
                                        <li key={index}>
                                            <Link to={`external/${course.id}`} target='_blank' className='text-primary flex items-center gap-2 hover:text-primary/80'>
                                                <h5 className="text-lg text-left">
                                                    {course.title}
                                                </h5>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                </svg>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;

const dummyData = [
    {
        "id": "d33c5f48-1234-4fd7-9bc3-6b4d92a7468a",
        "title": "React Basics",
        "description": "Learn the basics of React, including components, state, and props.",
        "createdAt": "2025-01-01T10:00:00Z",
        "updatedAt": "2025-01-02T12:00:00Z"
    },
    {
        "id": "a56d5f89-5678-4bd2-9bcd-2e5f85c6bc3e",
        "title": "Advanced TypeScript",
        "description": "Master advanced TypeScript features like generics, decorators, and more.",
        "createdAt": "2025-01-05T15:00:00Z",
        "updatedAt": "2025-01-06T16:00:00Z"
    }
]
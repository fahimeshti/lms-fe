import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import DashboardPage from './pages/Dashboard/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import DefaultLayout from './layout/DefaultLayout';
import CoursesDetailsPage from './pages/EditCoursePage';
import AddCoursePage from './pages/AddCoursePage';
import AuthorsPage from './pages/AuthorsPage';
import AddAuthorPage from './pages/AddAuthorPage';
import EditAuthorPage from './pages/EditAuthorPage';
import UsersPage from './pages/UsersPage';
import ProfilePage from './pages/Profile/ProfilePage';
import PrivateRoute from './layout/PrivateRoute';
import PublicRoute from './layout/PublicRoute';
import AddChaptersPage from './pages/AddChaptersPage';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <PageTitle title="Dashboard" />
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <PrivateRoute>
              <PageTitle title="Courses" />
              <CoursesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses/:publicCourseId/:privateCourseId"
          element={
            <PrivateRoute>
              <PageTitle title="Edit Course" />
              <CoursesDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses/add"
          element={
            <PrivateRoute>
              <PageTitle title="Add Course" />
              <AddCoursePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses/add/:publicCourseId/:privateCourseId"
          element={
            <PrivateRoute>
              <PageTitle title="Add Chapters" />
              <AddChaptersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/authors"
          element={
            <PrivateRoute>
              <PageTitle title="Authors" />
              <AuthorsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/author/:id"
          element={
            <PrivateRoute>
              <PageTitle title="Authors" />
              <EditAuthorPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/author/add"
          element={
            <PrivateRoute>
              <PageTitle title="Add Author" />
              <AddAuthorPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <PageTitle title="Users" />
              <UsersPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/:id"
          element={
            <PrivateRoute>
              <PageTitle title="Profile" />
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/auth/signin"
          element={
            <PublicRoute>
              <PageTitle title="Signin" />
              <SignIn />
            </PublicRoute>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;

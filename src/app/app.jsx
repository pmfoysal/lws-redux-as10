import Layout from '../layouts/layout';
import { useDispatch } from 'react-redux';
import AuthRoute from '../routes/authRoute';
import Sitemap from '../pages/common/sitemap';
import AdminRoute from '../routes/adminRoute';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { Admin, Student, Common } from '../pages';
import PageLoader from '../components/pageLoader';
import StudentRoute from '../routes/studentRoute';
import { setAuth } from '../redux/features/others/auth';

const Error = lazy(() => import('../pages/common/error'));

export default function App() {
   const dispatch = useDispatch();

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user') || '');
      const accessToken = localStorage.getItem('token');
      if (user?.email && accessToken) dispatch(setAuth({ user, accessToken }));
   }, []);

   return (
      <Suspense fallback={<PageLoader />}>
         <Routes>
            <Route path='/' element={<Layout />}>
               <Route index element={<AuthRoute page={<Student.Signin />} />} />
               <Route path='sitemap' element={<Sitemap />} />
               <Route path='signin' element={<AuthRoute page={<Student.Signin />} />} />
               <Route path='signup' element={<AuthRoute page={<Student.Signup />} />} />
               <Route path='forget-password' element={<AuthRoute page={<Common.ForgetPassword />} />} />

               <Route path='quiz/:id_title' element={<StudentRoute page={<Student.Quiz />} />} />
               <Route path='video' element={<StudentRoute page={<Student.Video />} />} />
               <Route path='video/:id_title' element={<StudentRoute page={<Student.Video />} />} />
               <Route path='leaderboard' element={<StudentRoute page={<Student.Leaderboard />} />} />
               <Route path='assignment/:id_title' element={<StudentRoute page={<Student.Assignment />} />} />

               {/* === === ================================= === === */}

               <Route path='admin'>
                  <Route index element={<AuthRoute page={<Admin.Signin />} />} />
                  <Route path='signin' element={<AuthRoute page={<Admin.Signin />} />} />
                  <Route path='dashboard' element={<AdminRoute page={<Admin.Dashboard />} />} />

                  <Route path='videos' element={<AdminRoute page={<Admin.VideoList />} />} />
                  <Route path='video/add' element={<AdminRoute page={<Admin.VideoAdd />} />} />
                  <Route path='video/edit/:id_title' element={<AdminRoute page={<Admin.VideoEdit />} />} />

                  <Route path='quizzes' element={<AdminRoute page={<Admin.QuizList />} />} />
                  <Route path='quiz/add' element={<AdminRoute page={<Admin.QuizAdd />} />} />
                  <Route path='quiz/edit/:id_title' element={<AdminRoute page={<Admin.QuizEdit />} />} />

                  <Route path='assignments' element={<AdminRoute page={<Admin.AssignmentList />} />} />
                  <Route path='assignments/:id_title' element={<AdminRoute page={<Admin.AssignmentList />} />} />
                  <Route path='assignments/marks' element={<AdminRoute page={<Admin.AssignmentMarks />} />} />
                  <Route path='assignments/marks/:id_title' element={<AdminRoute page={<Admin.AssignmentMarks />} />} />
                  <Route path='assignment/add' element={<AdminRoute page={<Admin.AssignmentAdd />} />} />
                  <Route path='assignment/edit/:id_title' element={<AdminRoute page={<Admin.AssignmentEdit />} />} />
               </Route>
            </Route>
            <Route path='*' element={<Error />} />
         </Routes>
      </Suspense>
   );
}

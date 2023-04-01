import { Suspense, lazy } from 'react';
import Layout from '../layouts/layout';
import Sitemap from '../pages/common/sitemap';
import { Route, Routes } from 'react-router-dom';
import { Admin, Student, Common } from '../pages';
import PageLoader from '../components/pageLoader';
import StudentRoute from '../routes/studentRoute';
import AuthRoute from '../routes/authRoute';
const Error = lazy(() => import('../pages/common/error'));

export default function App() {
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
                  <Route path='dashboard' element={<Admin.Dashboard />} />

                  <Route path='videos' element={<Admin.VideoList />} />
                  <Route path='video/add' element={<Admin.VideoAdd />} />
                  <Route path='video/edit/:id_title' element={<Admin.VideoEdit />} />

                  <Route path='quizzes' element={<Admin.QuizList />} />
                  <Route path='quiz/add' element={<Admin.QuizAdd />} />
                  <Route path='quiz/edit/:id_title' element={<Admin.QuizEdit />} />

                  <Route path='assignments' element={<Admin.AssignmentList />} />
                  <Route path='assignments/:id_title' element={<Admin.AssignmentList />} />
                  <Route path='assignments/marks' element={<Admin.AssignmentMarks />} />
                  <Route path='assignments/marks/:id_title' element={<Admin.AssignmentMarks />} />
                  <Route path='assignment/add' element={<Admin.AssignmentAdd />} />
                  <Route path='assignment/edit/:id_title' element={<Admin.AssignmentEdit />} />
               </Route>
            </Route>
            <Route path='*' element={<Error />} />
         </Routes>
      </Suspense>
   );
}

import { Suspense } from 'react';
import Layout from '../layouts/layout';
import { Route, Routes } from 'react-router-dom';
import { Admin, Student, Common } from '../pages';
import PageLoader from '../components/pageLoader';

export default function App() {
   return (
      <Suspense fallback={<PageLoader />}>
         <Routes>
            <Route path='/' element={<Layout />}>
               <Route index element={<Student.Signin />} />
               <Route path='signin' element={<Student.Signin />} />
               <Route path='signup' element={<Student.Signup />} />
               <Route path='forget-password' element={<Common.ForgetPassword />} />

               <Route path='quiz/:id_title' element={<Student.Quiz />} />
               <Route path='video/:id_title' element={<Student.Video />} />
               <Route path='leaderboard' element={<Student.Leaderboard />} />

               <Route path='assignment/:id_title' element={<Student.AssignmentDetails />} />
               <Route path='assignment/submit/:id_title' element={<Student.AssignmentSubmit />} />
               <Route path='assignment/result/:id_title' element={<Student.AssignmentResult />} />

               {/* === === ================================= === === */}

               <Route path='admin'>
                  <Route index element={<Admin.Signin />} />
                  <Route path='signin' element={<Admin.Signin />} />
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
         </Routes>
      </Suspense>
   );
}

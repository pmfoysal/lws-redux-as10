import Layout from '../layouts/layout';
import { Admin, Student } from '../pages';
import { Route, Routes } from 'react-router-dom';

export default function App() {
   return (
      <Routes>
         <Route path='/' element={<Layout />}>
            <Route index element={<Student.Signin />} />
            <Route path='signin' element={<Student.Signin />} />
            <Route path='signup' element={<Student.Signup />} />
            <Route path='quiz/:id_title' element={<Student.Quiz />} />
            <Route path='video/:id_title' element={<Student.Video />} />
            <Route path='leaderboard' element={<Student.Leaderboard />} />

            <Route path='admin'>
               <Route index element={<Admin.Signin />} />
               <Route path='signin' element={<Admin.Signin />} />
               <Route path='videos' element={<Admin.Videos />} />
               <Route path='quizes' element={<Admin.Quizes />} />
               <Route path='dashboard' element={<Admin.Dashboard />} />
               <Route path='assignments' element={<Admin.Assignments />} />
               <Route path='assignments/marks' element={<Admin.AssignmentMarks />} />
            </Route>
         </Route>
      </Routes>
   );
}

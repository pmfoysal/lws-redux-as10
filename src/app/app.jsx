import Admin from '../pages/admin';
import Layout from '../layouts/layout';
import Student from '../pages/student';
import { Route, Routes } from 'react-router-dom';

export default function App() {
   return (
      <Routes>
         <Route path='/' element={<Layout />}>
            <Route index element={<Student.Signin />} />
            <Route path='admin'>
               <Route index element={<Admin.Signin />} />
            </Route>
         </Route>
      </Routes>
   );
}

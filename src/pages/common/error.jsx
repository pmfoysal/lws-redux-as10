import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import signoutThunk from '../../redux/middlewares/signoutThunk';

export default function Error({ code = 404, role = '' }) {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { pathname } = useLocation();
   const [message, setMessage] = useState('Opps! Page Not Found');

   function handleNavigate() {
      if (code === 401) {
         if (pathname.includes('/admin')) navigate('/admin/signin', { state: pathname });
         else navigate('/signin', { state: pathname });
      } else if (code === 403) {
         dispatch(signoutThunk()).then(() => {
            navigate(role === 'admin' ? '/admin/signin' : '/signin', { state: pathname });
         });
      }
   }

   useEffect(() => {
      if (code === 401) setMessage('Please signin to access this page!');
      else if (code === 403) setMessage(`Only ${role} can access this page!`);
   }, [code]);

   return (
      <section className='py-6 bg-primary h-screen grid place-items-center'>
         <div className='mx-auto max-w-md px-5 lg:px-0'>
            <h1 className='text-2xl font-bold'>{code}</h1>
            <p className=''>{message}</p>
            <div>
               <button onClick={() => navigate(-1)}>Go Back</button>
               {code === 401 ? <button onClick={handleNavigate}>Sign in</button> : null}
               {code === 403 ? <button onClick={handleNavigate}>Sign in to {role} account</button> : null}
            </div>
         </div>
      </section>
   );
}

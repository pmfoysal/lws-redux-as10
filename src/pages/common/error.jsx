import { useDispatch } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import signoutThunk from '../../redux/middlewares/signoutThunk';
import Head from '../../components/head';

export default function Error({ code = 404, role = '' }) {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { pathname } = useLocation();
   const [message, setMessage] = useState('Opps! Page Not Found');

   function handleNavigate() {
      if (code === 400) {
         if (role === 'admin') navigate('/admin/dashboard');
         else navigate('/video');
      } else if (code === 401) {
         if (pathname.includes('/admin')) navigate('/admin/signin', { state: pathname });
         else navigate('/signin', { state: pathname });
      } else if (code === 403) {
         dispatch(signoutThunk()).then(() => {
            navigate(role === 'admin' ? '/admin/signin' : '/signin', { state: pathname });
         });
      }
   }

   useEffect(() => {
      if (code === 400) setMessage('You are already signed in!');
      else if (code === 401) setMessage('Please signin to access this page!');
      else if (code === 403) setMessage(`Only ${role} can access this page!`);
   }, [code]);

   return (
      <Fragment>
         <Head title={message} />
         <section className='py-6 bg-primary h-screen grid place-items-center error-page'>
            <div className='mx-auto px-5 lg:px-0'>
               <h1 className='text-2xl font-bold error-code'>{'<! ' + code + ' />'}</h1>
               <p className='error-message'>{message}</p>
               <div className='input-group'>
                  {code !== 400 ? (
                     <button
                        className='back-button group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
                        onClick={() => navigate(-1)}
                     >
                        Go Back
                     </button>
                  ) : (
                     <button
                        className='back-button group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
                        onClick={handleNavigate}
                     >
                        Go to {role === 'admin' ? 'dashboard' : 'video'} page
                     </button>
                  )}
                  {code === 401 ? (
                     <button
                        className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
                        onClick={handleNavigate}
                     >
                        Sign in
                     </button>
                  ) : null}
                  {code === 403 ? (
                     <button
                        className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
                        onClick={handleNavigate}
                     >
                        Sign in to {role} account
                     </button>
                  ) : null}
               </div>
            </div>
         </section>
      </Fragment>
   );
}

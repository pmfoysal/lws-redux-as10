import { useState } from 'react';
import PageLoader from './pageLoader';
import { Link, useNavigate } from 'react-router-dom';
import { useSigninMutation } from '../redux/features/auth/enhancer';

export default function SigninForm() {
   const navigate = useNavigate();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [signin, { isLoading }] = useSigninMutation();

   function handleSignin(event) {
      event.preventDefault();
      signin({ email, password }).then(({ data }) => {
         if (data?.accessToken) {
            if (data?.user?.role === 'admin') navigate('/admin/dashboard');
            else navigate('/video');
         }
      });
   }

   return (
      <form className='mt-8 space-y-6' onSubmit={handleSignin}>
         {isLoading ? <PageLoader /> : null}
         <input type='hidden' name='remember' value='true' />
         <div className='rounded-md shadow-sm -space-y-px'>
            <div>
               <label htmlFor='email-address' className='sr-only'>
                  Email address
               </label>
               <input
                  required
                  name='email'
                  type='email'
                  value={email}
                  id='email-address'
                  autoComplete='email'
                  placeholder='Email address'
                  className='login-input rounded-t-md'
                  onChange={e => setEmail(e.target.value)}
               />
            </div>
            <div>
               <label htmlFor='password' className='sr-only'>
                  Password
               </label>
               <input
                  required
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  placeholder='Password'
                  autoComplete='current-password'
                  className='login-input rounded-b-md'
                  onChange={e => setPassword(e.target.value)}
               />
            </div>
         </div>
         <div className='flex items-center justify-end forget-text'>
            <div className='text-sm'>
               <Link to='/forget-password' className='font-medium text-violet-600 hover:text-violet-500'>
                  Forgot your password?
               </Link>
            </div>
         </div>
         <div>
            <button
               type='submit'
               className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
            >
               Sign in
            </button>
         </div>
      </form>
   );
}

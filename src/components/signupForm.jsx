import { useState } from 'react';
import message from '../utilities/message';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../redux/features/auth/enhancer';

export default function SignupForm() {
   const navigate = useNavigate();
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [role, setRole] = useState('student');
   const [password, setPassword] = useState('');
   const [signup, signupApi] = useSignupMutation();
   const [confirmPassword, setConfirmPassword] = useState('');

   function isValid() {
      if (password !== confirmPassword) {
         message.error("Passwords doesn't matched!");
         return false;
      }
      return true;
   }

   function handleSignup(event) {
      event.preventDefault();
      if (isValid()) {
         signup({ name, email, password, role }).then(({ data }) => {
            if (data?.accessToken) navigate('/video');
         });
      }
   }

   return (
      <form className='mt-8 space-y-6' onSubmit={handleSignup}>
         <input type='hidden' name='remember' value='true' />
         <div className='rounded-md shadow-sm -space-y-px'>
            <div>
               <label htmlFor='name' className='sr-only'>
                  Name
               </label>
               <input
                  required
                  id='name'
                  name='name'
                  type='name'
                  value={name}
                  autoComplete='name'
                  placeholder='Student Name'
                  className='login-input rounded-t-md'
                  onChange={e => setName(e.target.value)}
               />
            </div>
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
                  className='login-input '
                  placeholder='Email address'
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
                  className='login-input'
                  autoComplete='current-password'
                  onChange={e => setPassword(e.target.value)}
               />
            </div>
            <div>
               <label htmlFor='confirm-password' className='sr-only'>
                  Confirm Password
               </label>
               <input
                  required
                  type='password'
                  id='confirm-password'
                  name='confirm-password'
                  value={confirmPassword}
                  placeholder='Confirm Password'
                  autoComplete='confirm-password'
                  className='login-input rounded-b-md'
                  onChange={e => setConfirmPassword(e.target.value)}
               />
            </div>
         </div>
         <div>
            <button
               type='submit'
               disabled={signupApi.isLoading}
               className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
            >
               Create Account
            </button>
         </div>
      </form>
   );
}

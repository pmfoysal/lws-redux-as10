import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Head from '../../components/head';
import SigninForm from '../../components/signinForm';

export default function Signin() {
   return (
      <Fragment>
         <Head title='Sign in to Student Account' />
         <section className='py-6 h-screen grid place-items-center'>
            <div className='mx-auto max-w-md px-5 lg:px-0'>
               <div>
                  <img className='h-12 mx-auto' src='/assets/icons/learningportal.svg' />
                  <h2 className='mt-6 text-center text-3xl font-extrabold text-slate-100'>Sign in to Student Account</h2>
               </div>
               <SigninForm />
               <Link to='/signup' className='text-sm font-medium text-violet-600 hover:text-violet-500 already-text'>
                  Don't have an account?
               </Link>
            </div>
         </section>
      </Fragment>
   );
}

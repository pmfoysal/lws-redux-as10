import { Fragment } from 'react';
import Head from '../../components/head';
import SigninForm from '../../components/signinForm';

export default function Signin() {
   return (
      <Fragment>
         <Head title='Sign in to Student Account' />
         <section className='py-6 bg-primary h-screen grid place-items-center'>
            <div className='mx-auto max-w-md px-5 lg:px-0'>
               <div>
                  <img className='h-12 mx-auto' src='/assets/icons/learningportal.svg' />
                  <h2 className='mt-6 text-center text-3xl font-extrabold text-slate-100'>Sign in to Student Account</h2>
               </div>
               <SigninForm />
            </div>
         </section>
      </Fragment>
   );
}

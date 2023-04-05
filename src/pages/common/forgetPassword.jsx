import { Fragment } from 'react';
import Head from '../../components/head';
import ForgetForm from '../../components/forgetForm';

export default function ForgetPassword() {
   return (
      <Fragment>
         <Head title='Reset Password' />
         <section className='py-6 h-screen grid place-items-center'>
            <div className='mx-auto max-w-md px-5 lg:px-0'>
               <div>
                  <img className='h-12 mx-auto' src='/assets/icons/learningportal.svg' />
                  <h2 className='mt-6 text-center text-3xl font-extrabold text-slate-100'>Reset Password</h2>
               </div>
               <ForgetForm />
            </div>
         </section>
      </Fragment>
   );
}

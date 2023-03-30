import { Fragment } from 'react';
import Head from '../../components/head';

export default function Assignment() {
   return (
      <Fragment>
         <Head title={`Assignment - `} desc={`Assignment of ""`} />
         <section className='py-6'>
            <div className='mx-auto max-w-7xl px-5 py-6 lg:px-0'>
               <article>
                  <h1 className='text-2xl font-bold'>Assignment 1 - Implement Debounce Function</h1>
                  <h3 className='text-lg font-medium mt-2'>
                     Video: Debounce Function in JavaScript - JavaScript Job Interview question
                  </h3>
                  <h3 className='text-lg font-medium mt-2'>
                     Total Mark: <span className='total-mark rounded-md'>100</span>
                  </h3>
               </article>
               <article className='mt-8'>
                  <label>
                     <p>Repository Link:</p>
                     <input
                        type='url'
                        className='login-input rounded-md mt-2'
                        placeholder='Example: https://github.com/username/repository'
                     />
                  </label>
                  <button
                     type='submit'
                     className='mt-6 group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
                  >
                     <span className='px-4'>Submit</span>
                  </button>
               </article>
               <br />
               <article className='mt-8'>
                  <h3 className='text-lg font-medium mt-2'>
                     Submit Date: <span className='font-normal'>30 March, 2023 at 10:23:45 PM</span>
                  </h3>
                  <h3 className='text-lg font-medium mt-2'>
                     Status: <span className='font-normal'>Pending</span>
                  </h3>
                  <h3 className='text-lg font-medium mt-2'>
                     Result: <span className='total-mark rounded-md'>100</span>
                  </h3>
               </article>
            </div>
         </section>
      </Fragment>
   );
}

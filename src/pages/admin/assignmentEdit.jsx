import { Fragment } from 'react';
import Head from '../../components/head';
import AssignmentForm from '../../components/assignmentForm';

export default function AssignmentEdit() {
   return (
      <Fragment>
         <Head title={`Edit Assignment - `} desc={`Assignment of ""`} />
         <section className='py-6'>
            <div className='mx-auto max-w-7xl px-5 py-6 lg:px-0'>
               <h1 className='mt-8 text-2xl font-bold text-center'>Edit a Assignment</h1>
               <AssignmentForm mode='edit' />
            </div>
         </section>
      </Fragment>
   );
}

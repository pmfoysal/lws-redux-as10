import { Fragment } from 'react';
import Head from '../../components/head';
import AssignmentForm from '../../components/assignmentForm';

export default function AssignmentAdd() {
   return (
      <Fragment>
         <Head title='Add Assignment' />
         <section className='py-6'>
            <div className='mx-auto max-w-7xl px-5 py-6 lg:px-0'>
               <h1 className='mt-8 text-2xl font-bold text-center'>Add New Assignment</h1>
               <AssignmentForm mode='add' />
            </div>
         </section>
      </Fragment>
   );
}

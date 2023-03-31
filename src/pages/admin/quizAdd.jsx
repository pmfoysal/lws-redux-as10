import { Fragment } from 'react';
import Head from '../../components/head';
import QuizForm from '../../components/quizForm';

export default function QuizAdd() {
   return (
      <Fragment>
         <Head title='Add Quiz' />
         <section className='py-6'>
            <div className='mx-auto max-w-7xl px-5 py-6 lg:px-0'>
               <h1 className='mt-8 text-2xl font-bold text-center'>Add New Quiz</h1>
               <QuizForm mode='add' />
            </div>
         </section>
      </Fragment>
   );
}

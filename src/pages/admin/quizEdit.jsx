import { Fragment } from 'react';
import Empty from '../common/empty';
import Head from '../../components/head';
import { useParams } from 'react-router-dom';
import urlToId from '../../utilities/urlToId';
import QuizForm from '../../components/quizForm';
import PageLoader from '../../components/pageLoader';
import { useGetQuizQuery } from '../../redux/features/quizzes/enhancer';

export default function QuizEdit() {
   const { id_title } = useParams();
   const { data: quiz, isLoading } = useGetQuizQuery(urlToId(id_title), { skip: !id_title });

   if (id_title && !isLoading && quiz?.id === undefined) {
      return <Empty text='No quiz found with this parameters!' />;
   }

   return (
      <Fragment>
         <Head title={`Edit Quiz - ${quiz?.question}`} desc={`Quiz of "${quiz?.video_title}"`} />
         {isLoading ? <PageLoader /> : null}
         <section className='py-6'>
            <div className='mx-auto max-w-7xl px-5 py-6 lg:px-0'>
               <h1 className='mt-8 text-2xl font-bold text-center'>Edit a Quiz</h1>
               <QuizForm mode='edit' />
            </div>
         </section>
      </Fragment>
   );
}

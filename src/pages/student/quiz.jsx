import Head from '../../components/head';
import { useParams } from 'react-router-dom';
import urlToId from '../../utilities/urlToId';
import QuizItem from '../../components/quizItem';
import { Fragment, useEffect, useState } from 'react';
import { selectQuizzes } from '../../redux/features/quizzes/selectors';
import { useGetQuizzesQuery } from '../../redux/features/quizzes/enhancer';

export default function Quiz() {
   const { id_title } = useParams();
   const [quizzes, setQuizzes] = useState([]);
   const quizzesApi = useGetQuizzesQuery(null, { skip: !id_title });

   useEffect(() => {
      if (id_title) {
         if (quizzesApi.data?.length) {
            const temp = selectQuizzes(quizzesApi.data, urlToId(id_title));
            if (temp?.length) setQuizzes(temp);
         }
      }
   }, [quizzesApi, id_title]);

   return (
      <Fragment>
         <Head title={`Quizzes - ${quizzes[0]?.video_title}`} desc={`Quizzes of "${quizzes[0]?.video_title}"`} />
         <section className='py-6 bg-primary'>
            <div className='mx-auto max-w-7xl px-5 lg:px-0'>
               <div className='mb-8'>
                  <h1 className='text-2xl font-bold'>Quizzes for "{quizzes[0]?.video_title}"</h1>
                  <p className='text-sm text-slate-200 mt-2'>Each question contains 5 Mark</p>
               </div>
               <div className='space-y-8 '>
                  {quizzes.map((quiz, index) => (
                     <QuizItem key={`quiz-${index}`} index={index} {...quiz} />
                  ))}
               </div>
               <button className='px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 q-submit'>
                  Submit
               </button>
            </div>
         </section>
      </Fragment>
   );
}

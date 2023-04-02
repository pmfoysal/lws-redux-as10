import Error from '../common/error';
import Head from '../../components/head';
import { useSelector } from 'react-redux';
import urlToId from '../../utilities/urlToId';
import QuizItem from '../../components/quizItem';
import PageLoader from '../../components/pageLoader';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { selectQuizzes } from '../../redux/features/quizzes/selectors';
import { useGetVideosQuery } from '../../redux/features/videos/enhancer';
import { selectQuizMark } from '../../redux/features/quizMarks/selectors';
import { useGetQuizzesQuery } from '../../redux/features/quizzes/enhancer';
import { useAddQuizMarkMutation, useGetQuizMarksQuery } from '../../redux/features/quizMarks/enhancer';

export default function Quiz() {
   const markPerQuiz = 5;
   const navigate = useNavigate();
   const { id_title } = useParams();
   const videosApi = useGetVideosQuery();
   const [video, setVideo] = useState({});
   const [quizzes, setQuizzes] = useState([]);
   const quizMarksApi = useGetQuizMarksQuery();
   const { user } = useSelector(store => store.auth);
   const [hasQuizMark, setHasQuizMark] = useState({});
   const [submitQuiz, submitQuizApi] = useAddQuizMarkMutation();
   const quizzesApi = useGetQuizzesQuery(null, { skip: !id_title });

   function calculateMark() {
      return quizzes.reduce((mark, quiz) => {
         const isCorrect = quiz.options.every(option => option.isCorrect === option.isSelected);
         return (mark += isCorrect ? markPerQuiz : 0);
      }, 0);
   }

   function handleSubmit() {
      const mark = calculateMark();
      submitQuiz({
         student_id: user.id,
         student_name: user.name,
         video_id: quizzes[0].video_id,
         video_title: quizzes[0].video_title,
         totalQuiz: quizzes.length,
         totalCorrect: mark / markPerQuiz,
         totalWrong: quizzes.length - mark / markPerQuiz,
         totalMark: quizzes.length * markPerQuiz,
         mark,
      }).then(result => {
         if (result.data?.id !== undefined) navigate('/leaderboard');
      });
   }

   useEffect(() => {
      if (videosApi.data?.length) {
         if (id_title) {
            setVideo(videosApi.data.find(item => item.id === urlToId(id_title)));
         } else setVideo(videosApi.data[0]);
      }
   }, [id_title, videosApi]);

   useEffect(() => {
      if (video.id !== undefined) {
         if (quizMarksApi.data?.length) {
            const temp = selectQuizMark(quizMarksApi.data, user.id, video.id);
            if (temp?.id !== undefined) setHasQuizMark(true);
            else setHasQuizMark(false);
         } else setHasQuizMark(false);
      } else setHasQuizMark(false);
   }, [quizMarksApi, video, user]);

   useEffect(() => {
      if (id_title) {
         if (quizzesApi.data?.length) {
            const temp = selectQuizzes(quizzesApi.data, urlToId(id_title));
            if (temp?.length)
               setQuizzes(
                  temp?.map(quiz => {
                     return {
                        ...quiz,
                        options: quiz.options?.map(option => ({ ...option, isSelected: false })),
                     };
                  })
               );
         }
      }
   }, [quizzesApi, id_title]);

   if (hasQuizMark) return <Error />;

   return (
      <Fragment>
         <Head title={`Quizzes - ${quizzes[0]?.video_title}`} desc={`Quizzes of "${quizzes[0]?.video_title}"`} />
         {quizzesApi.isLoading || videosApi.isLoading || quizMarksApi.isLoading ? <PageLoader /> : null}
         <section className='py-6 bg-primary'>
            <div className='mx-auto max-w-7xl px-5 lg:px-0'>
               <div className='mb-8'>
                  <h1 className='text-2xl font-bold'>Quizzes for "{quizzes[0]?.video_title}"</h1>
                  <p className='text-sm text-slate-200 mt-2'>Each question contains 5 Mark</p>
               </div>
               <div className='space-y-8 '>
                  {quizzes.map((quiz, index) => (
                     <QuizItem key={`quiz-${index}`} index={index} {...quiz} setQuizzes={setQuizzes} />
                  ))}
               </div>
               <button
                  className='px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 q-submit'
                  disabled={submitQuizApi.isLoading}
                  onClick={handleSubmit}
               >
                  Submit
               </button>
            </div>
         </section>
      </Fragment>
   );
}

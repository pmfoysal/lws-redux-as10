import Empty from '../common/empty';
import Head from '../../components/head';
import { useSelector } from 'react-redux';
import getDate from '../../utilities/getDate';
import urlToId from '../../utilities/urlToId';
import { useParams, Link } from 'react-router-dom';
import PageLoader from '../../components/pageLoader';
import { Fragment, useEffect, useState } from 'react';
import stringToUrl from '../../utilities/stringToUrl';
import VideoSidebar from '../../components/videoSidebar';
import { selectQuizzes } from '../../redux/features/quizzes/selectors';
import { useGetVideosQuery } from '../../redux/features/videos/enhancer';
import { selectQuizMark } from '../../redux/features/quizMarks/selectors';
import { useGetQuizzesQuery } from '../../redux/features/quizzes/enhancer';
import { selectAssignment } from '../../redux/features/assignments/selectors';
import { useGetQuizMarksQuery } from '../../redux/features/quizMarks/enhancer';
import { useGetAssignmentsQuery } from '../../redux/features/assignments/enhancer';

export default function Video() {
   const { id_title } = useParams();
   const videosApi = useGetVideosQuery();
   const [video, setVideo] = useState({});
   const quizzesApi = useGetQuizzesQuery();
   const quizMarksApi = useGetQuizMarksQuery();
   const [hasQuiz, setHasQuiz] = useState(false);
   const assignmentsApi = useGetAssignmentsQuery();
   const { user } = useSelector(store => store.auth);
   const [hasQuizMark, setHasQuizMark] = useState({});
   const [hasAssignment, setHasAssignment] = useState(false);

   useEffect(() => {
      if (videosApi.data?.length) {
         if (id_title) {
            setVideo(videosApi.data.find(item => item.id === urlToId(id_title)));
         } else setVideo(videosApi.data[0]);
      }
   }, [id_title, videosApi]);

   useEffect(() => {
      if (video.id !== undefined) {
         if (quizzesApi.data?.length) {
            const quizzes = selectQuizzes(quizzesApi.data, video.id);
            if (quizzes?.length) setHasQuiz(true);
            else setHasQuiz(false);
         }
         if (assignmentsApi.data?.length) {
            const assignment = selectAssignment(assignmentsApi.data, video.id);
            if (assignment?.id) setHasAssignment(true);
            else setHasAssignment(false);
         }
      }
   }, [quizzesApi, assignmentsApi, video]);

   useEffect(() => {
      if (video.id !== undefined) {
         if (quizMarksApi.data?.length) {
            const temp = selectQuizMark(quizMarksApi.data, user.id, video.id);
            if (temp?.id !== undefined) setHasQuizMark(true);
            else setHasQuizMark(false);
         } else setHasQuizMark(false);
      } else setHasQuizMark(false);
   }, [quizMarksApi, video, user]);

   if (!videosApi.isLoading && videosApi.data?.length && id_title && video.title === undefined) {
      return <Empty text='No video found with this parameters!' />;
   }

   if (!videosApi.isLoading && !videosApi.data?.length) {
      return <Empty text='No videos found to play here!' />;
   }

   return (
      <Fragment>
         <Head title={`Video - ${video.title}`} desc={`${video.description}`} />
         {videosApi.isLoading || quizzesApi.isLoading || assignmentsApi.isLoading ? <PageLoader /> : null}
         <section className='py-6 bg-primary'>
            <div className='mx-auto max-w-7xl px-5 lg:px-0'>
               <div className='grid grid-cols-3 gap-2 lg:gap-8'>
                  <div className='col-span-full w-full space-y-8 lg:col-span-2'>
                     <iframe
                        width='100%'
                        src={video.url}
                        allowFullScreen
                        className='aspect-video'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                     ></iframe>
                     <div>
                        <h1 className='text-lg font-semibold tracking-tight text-slate-100'>{video.title}</h1>
                        <h2 className=' pb-4 text-sm leading-[1.7142857] text-slate-400'>
                           Uploaded on {getDate(video.createdAt)}
                        </h2>
                        <div className='flex gap-4'>
                           {hasAssignment ? (
                              <Link
                                 to={`/assignment/${video.id}_${stringToUrl(video.title)}`}
                                 className='px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary'
                              >
                                 এসাইনমেন্ট
                              </Link>
                           ) : null}
                           {hasQuiz ? (
                              <Fragment>
                                 {hasQuizMark ? (
                                    <p className='px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary'>
                                       কুইজে অংশগ্রহণ করেছেন
                                    </p>
                                 ) : (
                                    <Link
                                       to={`/quiz/${video.id}_${stringToUrl(video.title)}`}
                                       className='px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary'
                                    >
                                       কুইজে অংশগ্রহণ করুন
                                    </Link>
                                 )}
                              </Fragment>
                           ) : null}
                        </div>
                        <p className='mt-4 text-sm text-slate-400 leading-6'>{video.description}</p>
                     </div>
                  </div>
                  <VideoSidebar videos={videosApi.data} baseId={video.id} />
               </div>
            </div>
         </section>
      </Fragment>
   );
}

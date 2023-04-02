import Head from '../../components/head';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import urlToId from '../../utilities/urlToId';
import { Fragment, useEffect, useState } from 'react';
import getDateTime from '../../utilities/getDateTime';
import { selectAssignment } from '../../redux/features/assignments/selectors';
import { useGetAssignmentsQuery } from '../../redux/features/assignments/enhancer';
import { selectAssignmentMark } from '../../redux/features/assignmentMarks/selectors';
import { useGetAssignmentMarksQuery } from '../../redux/features/assignmentMarks/enhancer';

export default function Assignment() {
   const { id_title } = useParams();
   const [assignment, setAssignment] = useState({});
   const { user } = useSelector(store => store.auth);
   const [assignmentMark, setAssignmentMark] = useState({});
   const assignmentApi = useGetAssignmentsQuery(null, { skip: !id_title });
   const assignmentMarksApi = useGetAssignmentMarksQuery(null, { skip: !id_title });

   useEffect(() => {
      if (id_title) {
         if (assignmentApi.data?.length) {
            setAssignment(selectAssignment(assignmentApi.data, urlToId(id_title)) || {});
         }
      } else setAssignment({});
   }, [assignmentApi, id_title]);

   useEffect(() => {
      if (id_title) {
         if (assignmentMarksApi.data?.length) {
            setAssignmentMark(selectAssignmentMark(assignmentMarksApi.data, user.id, assignment.id) || {});
         }
      } else setAssignmentMark({});
   }, [assignmentMarksApi, id_title, user, assignment]);

   return (
      <Fragment>
         <Head title={`Assignment - ${assignment.title}`} desc={`Assignment of "${assignment.video_title}"`} />
         <section className='py-6'>
            <div className='mx-auto max-w-7xl px-5 py-6 lg:px-0'>
               <article>
                  <h1 className='text-2xl font-bold'>{assignment.title}</h1>
                  <h3 className='text-lg font-medium mt-2'>{assignment.video_title}</h3>
                  <h3 className='text-lg font-medium mt-2'>
                     Total Mark: <span className='total-mark rounded-md'>{assignment.totalMark}</span>
                  </h3>
               </article>
               <article className='mt-8'>
                  <label>
                     <p>Repository Link:</p>
                     <input
                        type='url'
                        className='login-input rounded-md mt-2'
                        placeholder='Example: https://github.com/username/repository'
                        readOnly={assignmentMark.id !== undefined}
                     />
                  </label>
                  {assignmentMark.id === undefined ? (
                     <button
                        type='submit'
                        className='mt-6 group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
                     >
                        <span className='px-4'>Submit</span>
                     </button>
                  ) : null}
               </article>
               <br />
               {assignmentMark.id !== undefined ? (
                  <article className='mt-8'>
                     <h3 className='text-lg font-medium mt-2'>
                        Submit Date: <span className='font-normal'>{getDateTime(assignmentMark.createdAt)}</span>
                     </h3>
                     <h3 className='text-lg font-medium mt-2'>
                        Result: <span className='font-normal capitalize'>{assignmentMark.status}</span>
                     </h3>
                     {assignmentMark.status === 'published' ? (
                        <h3 className='text-lg font-medium mt-2'>
                           Mark: <span className='total-mark rounded-md'>{assignmentMark.mark}</span>
                        </h3>
                     ) : null}
                  </article>
               ) : null}
            </div>
         </section>
      </Fragment>
   );
}

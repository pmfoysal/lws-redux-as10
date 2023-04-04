import { Fragment } from 'react';
import Head from '../../components/head';
import { useParams } from 'react-router-dom';
import urlToId from '../../utilities/urlToId';
import PageLoader from '../../components/pageLoader';
import AssignmentForm from '../../components/assignmentForm';
import { useGetAssignmentQuery } from '../../redux/features/assignments/enhancer';

export default function AssignmentEdit() {
   const { id_title } = useParams();
   const assignmentApi = useGetAssignmentQuery(urlToId(id_title));

   return (
      <Fragment>
         <Head
            title={`Edit Assignment - ${assignmentApi.data?.title}`}
            desc={`Assignment of "${assignmentApi.data?.video_title}"`}
         />
         {assignmentApi.isLoading ? <PageLoader /> : null}
         <section className='py-6'>
            <div className='mx-auto max-w-7xl px-5 py-6 lg:px-0'>
               <h1 className='mt-8 text-2xl font-bold text-center'>Edit a Assignment</h1>
               <AssignmentForm mode='edit' />
            </div>
         </section>
      </Fragment>
   );
}

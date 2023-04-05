import { Fragment } from 'react';
import Empty from '../common/empty';
import Head from '../../components/head';
import { useParams } from 'react-router-dom';
import urlToId from '../../utilities/urlToId';
import PageLoader from '../../components/pageLoader';
import AssignmentForm from '../../components/assignmentForm';
import { useGetAssignmentQuery } from '../../redux/features/assignments/enhancer';

export default function AssignmentEdit() {
   const { id_title } = useParams();
   const { data: assignment, isLoading } = useGetAssignmentQuery(urlToId(id_title), { skip: !id_title });

   if (id_title && !isLoading && assignment?.id === undefined) {
      return <Empty text='No assignment found with this parameters!' />;
   }

   return (
      <Fragment>
         <Head title={`Edit Assignment - ${assignment?.title}`} desc={`Assignment of "${assignment?.video_title}"`} />
         {isLoading ? <PageLoader /> : null}
         <section className='py-6'>
            <div className='mx-auto max-w-7xl px-5 py-6 lg:px-0'>
               <h1 className='mt-8 text-2xl font-bold text-center'>Edit a Assignment</h1>
               <AssignmentForm mode='edit' />
            </div>
         </section>
      </Fragment>
   );
}

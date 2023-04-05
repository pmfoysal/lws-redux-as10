import { Fragment } from 'react';
import Empty from '../common/empty';
import Head from '../../components/head';
import { useParams } from 'react-router-dom';
import urlToId from '../../utilities/urlToId';
import VideoForm from '../../components/videoForm';
import PageLoader from '../../components/pageLoader';
import { useGetVideoQuery } from '../../redux/features/videos/enhancer';

export default function VideoEdit() {
   const { id_title } = useParams();
   const { data: video, isLoading } = useGetVideoQuery(urlToId(id_title), { skip: !id_title });

   if (id_title && !isLoading && video?.id === undefined) {
      return <Empty text='No video found with this parameters!' />;
   }

   return (
      <Fragment>
         <Head title={`Edit Video - ${video?.title}`} desc={`${video?.description}`} />
         {isLoading ? <PageLoader /> : null}
         <section className='py-6'>
            <div className='mx-auto max-w-7xl px-5 py-6 lg:px-0'>
               <h1 className='mt-8 text-2xl font-bold text-center'>Edit a Video</h1>
               <VideoForm mode='edit' />
            </div>
         </section>
      </Fragment>
   );
}

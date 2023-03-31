import { Fragment } from 'react';
import Head from '../../components/head';
import VideoForm from '../../components/videoForm';

export default function VideoAdd() {
   return (
      <Fragment>
         <Head title='Add New Video' />
         <section className='py-6'>
            <div className='mx-auto max-w-7xl px-5 py-6 lg:px-0'>
               <h1 className='mt-8 text-2xl font-bold text-center'>Add New Video</h1>
               <VideoForm mode='add' />
            </div>
         </section>
      </Fragment>
   );
}

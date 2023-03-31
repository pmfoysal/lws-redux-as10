import { Fragment } from 'react';
import Head from '../../components/head';
import VideoForm from '../../components/videoForm';

export default function VideoEdit() {
   return (
      <Fragment>
         <Head title={`Edit Video - `} desc={``} />
         <section className='py-6'>
            <div className='mx-auto max-w-7xl px-5 py-6 lg:px-0'>
               <h1 className='mt-8 text-2xl font-bold text-center'>Edit a Video</h1>
               <VideoForm mode='edit' />
            </div>
         </section>
      </Fragment>
   );
}

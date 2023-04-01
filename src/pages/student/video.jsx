import { Fragment } from 'react';
import Head from '../../components/head';
import PageLoader from '../../components/pageLoader';
import VideoSidebar from '../../components/videoSidebar';
import { useGetVideoQuery } from '../../redux/features/videos/enhancer';
import getDate from '../../utilities/getDate';

export default function Video() {
   const { data, isLoading } = useGetVideoQuery({ id: 1 });

   return (
      <Fragment>
         <Head title={`Video - ${data?.title}`} desc={`${data?.description}`} />
         {isLoading ? <PageLoader /> : null}
         <section className='py-6 bg-primary'>
            <div className='mx-auto max-w-7xl px-5 lg:px-0'>
               <div className='grid grid-cols-3 gap-2 lg:gap-8'>
                  <div className='col-span-full w-full space-y-8 lg:col-span-2'>
                     <iframe
                        width='100%'
                        src={data?.url}
                        allowFullScreen
                        className='aspect-video'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                     ></iframe>
                     <div>
                        <h1 className='text-lg font-semibold tracking-tight text-slate-100'>{data?.title}</h1>
                        <h2 className=' pb-4 text-sm leading-[1.7142857] text-slate-400'>
                           Uploaded on {getDate(data?.createdAt)}
                        </h2>
                        <div className='flex gap-4'>
                           <a
                              href='#'
                              className='px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary'
                           >
                              এসাইনমেন্ট
                           </a>
                           <a
                              href='./Quiz.html'
                              className='px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary'
                           >
                              কুইজে অংশগ্রহণ করুন
                           </a>
                        </div>
                        <p className='mt-4 text-sm text-slate-400 leading-6'>{data?.description}</p>
                     </div>
                  </div>
                  <VideoSidebar />
               </div>
            </div>
         </section>
      </Fragment>
   );
}

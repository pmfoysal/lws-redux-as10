import VideoItem from './videoItem';

export default function VideoSidebar({ videos, baseId }) {
   return (
      <div className='col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30'>
         {videos?.map((video, index) => (
            <VideoItem key={`video-${index}`} {...video} baseId={baseId} />
         ))}
      </div>
   );
}

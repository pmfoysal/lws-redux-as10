import Modal from './modal';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetVideosQuery } from '../redux/features/videos/enhancer';
import {
   useAddAssignmentMutation,
   useEditAssignmentMutation,
   useGetAssignmentsQuery,
} from '../redux/features/assignments/enhancer';

export default function AssignmentForm({ mode }) {
   const navigate = useNavigate();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [addAssignment, addAssignmentApi] = useAddAssignmentMutation();
   const [editAssignment, editAssignmentApi] = useEditAssignmentMutation();
   const videosApi = useGetVideosQuery(undefined, { skip: mode === 'edit' });
   const assignmentsApi = useGetAssignmentsQuery(undefined, { skip: mode === 'edit' });

   const [title, setTitle] = useState('');
   const [videoId, setVideoId] = useState('');
   const [totalMark, setTotalMark] = useState('');

   function handleSubmit(event) {
      event.preventDefault();
      if (videoId !== '') setIsModalOpen(true);
   }

   function handleAssignment() {
      const video = videosApi.data?.find(item => item.id === Number(videoId));
      if (video?.id !== undefined) {
         const payload = { title, video_id: video.id, video_title: video.title, totalMark: Number(totalMark) };
         if (mode === 'add') {
            addAssignment(payload).then(() => {
               navigate('/admin/assignments');
            });
         } else if (mode === 'edit') {
         }
      }
   }

   function filterVideos(item) {
      if (mode === 'edit') return true;
      const ids = assignmentsApi.data?.map(item => item.video_id);
      return !ids?.includes(item.id);
   }

   return (
      <form className='add-form' onSubmit={handleSubmit}>
         <select
            required
            value={videoId}
            disabled={mode === 'edit'}
            className='login-input rounded-md dropdown'
            onChange={e => {
               if (mode !== 'edit') setVideoId(e.target.value);
            }}
         >
            <option value='' hidden>
               {videosApi.data?.filter(filterVideos)?.length ? 'Select Video' : 'No videos found without assignment'}
            </option>
            {videosApi.data?.filter(filterVideos)?.map((item, index) => (
               <option key={`video-${index}`} value={item.id}>
                  {item.title}
               </option>
            ))}
         </select>
         <input
            required
            type='text'
            value={title}
            autoComplete='title'
            placeholder='Assignment Title'
            className='login-input rounded-md'
            onChange={e => setTitle(e.target.value)}
         />
         <input
            required
            type='number'
            value={totalMark}
            autoComplete='marks'
            placeholder='Total Marks'
            className='login-input rounded-md'
            onChange={e => setTotalMark(e.target.value)}
         />
         <button
            type='submit'
            className='mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
         >
            {mode === 'add' ? '+ Add' : 'Update'}
         </button>
         <Modal
            type={mode}
            isOpen={isModalOpen}
            onClick={handleAssignment}
            setIsOpen={setIsModalOpen}
            isLoading={addAssignmentApi.isLoading || editAssignmentApi.isLoading}
            message={`Do you want to ${mode} this assignment?`}
         />
      </form>
   );
}

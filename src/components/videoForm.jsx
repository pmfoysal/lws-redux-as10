import Modal from './modal';
import urlToId from '../utilities/urlToId';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddVideoMutation, useEditVideoMutation, useGetVideoQuery } from '../redux/features/videos/enhancer';

export default function VideoForm({ mode }) {
   const navigate = useNavigate();
   const { id_title } = useParams();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [addVideo, addVideoApi] = useAddVideoMutation();
   const [editVideo, editVideoApi] = useEditVideoMutation();
   const { data: video, isLoading } = useGetVideoQuery(urlToId(id_title), { skip: !id_title || mode !== 'edit' });

   const [url, setUrl] = useState('');
   const [title, setTitle] = useState('');
   const [views, setViews] = useState('');
   const [duration, setDuration] = useState('');
   const [description, setDescription] = useState('');

   function handleSubmit(event) {
      event.preventDefault();
      setIsModalOpen(true);
   }

   function handleVideo() {
      const payload = { title, description, url, views, duration };
      if (mode === 'add') {
         payload.createdAt = new Date().toISOString();
         addVideo(payload).then(() => {
            navigate('/admin/videos');
         });
      } else if (mode === 'edit') {
         if (video?.id !== undefined) {
            payload.id = video.id;
            editVideo(payload).then(() => {
               navigate('/admin/videos');
            });
         }
      }
   }

   useEffect(() => {
      if (video?.id !== undefined && mode === 'edit') {
         setUrl(video.url);
         setTitle(video.title);
         setViews(video.views);
         setDuration(video.duration);
         setDescription(video.description);
      }
   }, [video, mode]);

   return (
      <form className='add-form' onSubmit={handleSubmit}>
         <input
            required
            type='text'
            value={title}
            autoComplete='title'
            placeholder='Video Title'
            className='login-input rounded-md'
            onChange={e => setTitle(e.target.value)}
         />
         <textarea
            required
            rows={6}
            type='text'
            value={description}
            autoComplete='description'
            placeholder='Video Description'
            className='login-input rounded-md'
            onChange={e => setDescription(e.target.value)}
         />
         <input
            required
            type='url'
            value={url}
            autoComplete='url'
            placeholder='Video Url'
            className='login-input rounded-md'
            onChange={e => setUrl(e.target.value)}
         />
         <div className='input-group'>
            <input
               required
               type='text'
               value={views}
               autoComplete='views'
               placeholder='Total Views'
               className='login-input rounded-md'
               onChange={e => setViews(e.target.value)}
            />
            <input
               required
               type='text'
               value={duration}
               autoComplete='duration'
               placeholder='Total Duration'
               className='login-input rounded-md'
               onChange={e => setDuration(e.target.value)}
            />
         </div>
         <button
            type='submit'
            disabled={addVideoApi.isLoading || editVideoApi.isLoading}
            className='mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
         >
            {mode === 'add' ? '+ Add' : 'Update'}
         </button>
         <Modal
            type={mode}
            isOpen={isModalOpen}
            onClick={handleVideo}
            setIsOpen={setIsModalOpen}
            isLoading={addVideoApi.isLoading || editVideoApi.isLoading}
            message={`Do you want to ${mode} this video?`}
         />
      </form>
   );
}

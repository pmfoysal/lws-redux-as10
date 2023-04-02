import urlToId from '../utilities/urlToId';
import { Link, useParams } from 'react-router-dom';
import stringToUrl from '../utilities/stringToUrl';

export default function VideoItem({ id, title, views, duration, baseId }) {
   const { id_title } = useParams();

   function isSelected() {
      if (id_title) return urlToId(id_title) === id;
      return baseId === id;
   }

   return (
      <Link to={`/video/${id}_${stringToUrl(title)}`}>
         <div
            className={`video-card w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2 ${
               isSelected() ? 'active' : ''
            }`}
         >
            <svg
               xmlns='http://www.w3.org/2000/svg'
               fill='none'
               viewBox='0 0 24 24'
               strokeWidth='1.5'
               stroke='currentColor'
               className='w-6 h-6 icon'
            >
               <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  fill={isSelected() ? 'red' : 'none'}
                  stroke={isSelected() ? 'red' : 'currentColor'}
               />
               <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  fill={isSelected() ? 'white' : 'none'}
                  stroke={isSelected() ? 'white' : 'currentColor'}
                  d='M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z'
               />
            </svg>
            <div clas='flex flex-col w-full'>
               <p className='text-slate-50 text-sm font-medium'>{title}</p>
               <div>
                  <span className='text-gray-400 text-xs mt-1'>{duration} Mins</span>
                  <span className='text-gray-400 text-xs mt-1'> | </span>
                  <span className='text-gray-400 text-xs mt-1'>{views} views</span>
               </div>
            </div>
         </div>
      </Link>
   );
}

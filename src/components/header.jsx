import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import signoutThunk from '../redux/middlewares/signoutThunk';

export default function Header() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   function handleSignout() {
      dispatch(signoutThunk()).then(({ payload: role }) => {
         if (role === 'admin') navigate('/admin/signin');
         else navigate('/signin');
      });
   }

   return (
      <nav className='shadow-md'>
         <div className='max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3'>
            <Link to='/'>
               <img className='h-10' src='/assets/icons/learningportal.svg' />
            </Link>
            <div className='flex items-center gap-3'>
               <Link to='/leaderboard' className='font-bold'>
                  Leaderboard
               </Link>
               <h2>Saad Hasan</h2>
               <button
                  className='flex gap-2 items-center px-4 py-1 rounded-full text-sm transition-all bg-red-600 hover:bg-red-700 font-medium'
                  onClick={handleSignout}
               >
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     fill='none'
                     viewBox='0 0 24 24'
                     strokeWidth='1.5'
                     stroke='currentColor'
                     className='w-6 h-6'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                     />
                  </svg>
                  Logout
               </button>
            </div>
         </div>
      </nav>
   );
}

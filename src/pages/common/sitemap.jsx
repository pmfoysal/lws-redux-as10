import { Link } from 'react-router-dom';

export default function Sitemap() {
   return (
      <div className='sitemap'>
         <Link to='/sitemap'>Home</Link>
         <Link to='/signin'>Student - Signin</Link>
         <Link to='/signup'>Student - Signup</Link>
         <Link to='/forget-password'>Student - Forget Password</Link>

         <Link to='/leaderboard'>Student - Leaderboard</Link>
         <Link to='/quiz/1-some-awesome-video-title'>Student - Quiz</Link>
         <Link to='/video/1-some-awesome-video-title'>Student - Video</Link>
         <Link to='/assignment/1-some-awesome-video-title'>Student - Assignment Details</Link>

         <Link to='/admin/signin'>Admin - Signin</Link>
         <Link to='/admin/dashboard'>Admin - Dashboard</Link>

         <Link to='/admin/videos'>Admin - Video List</Link>
         <Link to='/admin/video/add'>Admin - Video Add</Link>
         <Link to='/admin/video/edit/1-some-awesome-video-title'>Admin - Video Edit</Link>

         <Link to='/admin/quizzes'>Admin - Quiz List</Link>
         <Link to='/admin/quiz/add'>Admin - Quiz Add</Link>
         <Link to='/admin/quiz/edit/1-some-awesome-video-title'>Admin - Quiz Edit</Link>

         <Link to='/admin/assignments'>Admin - Assignment List</Link>
         <Link to='/admin/assignments/1-some-awesome-video-title'>Admin - Assignment List Specific</Link>
         <Link to='/admin/assignments/marks'>Admin - Assignment Marks</Link>
         <Link to='/admin/assignments/marks/1-some-awesome-video-title'>Admin - Assignment Marks Specific</Link>
         <Link to='/admin/assignment/add'>Admin - Assignment Add</Link>
         <Link to='/admin/assignment/edit/1-some-awesome-video-title'>Admin - Assignment Edit</Link>
      </div>
   );
}

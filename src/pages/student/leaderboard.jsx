import Head from '../../components/head';
import { useSelector } from 'react-redux';
import PageLoader from '../../components/pageLoader';
import { Fragment, useEffect, useState } from 'react';
import { useGetUsersQuery } from '../../redux/features/users/endpoints';
import { useGetQuizMarksQuery } from '../../redux/features/quizMarks/enhancer';
import { selectQuizMarkCount } from '../../redux/features/quizMarks/selectors';
import { useGetAssignmentMarksQuery } from '../../redux/features/assignmentMarks/enhancer';
import { selectAssignmentMarkCount } from '../../redux/features/assignmentMarks/selectors';

export default function Leaderboard() {
   const usersApi = useGetUsersQuery();
   const quizMarksApi = useGetQuizMarksQuery();
   const [userRank, setUserRank] = useState({});
   const [usersRank, setUsersRank] = useState([]);
   const { user } = useSelector(store => store.auth);
   const assignmentMarksApi = useGetAssignmentMarksQuery();

   function getUsersWithRank(users) {
      const ranked = users.map(userItem => {
         const total = userItem.quizMark + userItem.assignmentMark;
         const rank = users.filter(uItem => uItem.quizMark + uItem.assignmentMark > total).length + 1;
         return { ...userItem, rank };
      });
      return ranked.sort((prev, next) => prev.rank - next.rank);
   }

   function getCurrentUserRank(users, id) {
      return users.find(userItem => userItem.id === id);
   }

   useEffect(() => {
      if (usersApi.data?.length) {
         const tempUsers = usersApi.data.map(userItem => ({
            ...userItem,
            quizMark: selectQuizMarkCount(quizMarksApi.data || [], userItem.id),
            assignmentMark: selectAssignmentMarkCount(assignmentMarksApi.data || [], userItem.id),
         }));
         const usersRankTemp = getUsersWithRank(tempUsers);
         const userRankTemp = getCurrentUserRank(usersRankTemp, user.id);
         setUserRank(userRankTemp);
         setUsersRank(usersRankTemp);
      }
   }, [usersApi, quizMarksApi, assignmentMarksApi, user]);

   return (
      <Fragment>
         <Head title='Leader Board' />
         {usersApi.isLoading || quizMarksApi.isLoading || assignmentMarksApi.isLoading ? <PageLoader /> : null}
         <section className='py-6 bg-primary'>
            <div className='mx-auto max-w-7xl px-5 lg:px-0'>
               <div>
                  <h3 className='text-lg font-bold'>Your Position in Leaderboard</h3>
                  <table className='text-base w-full border border-slate-600/50 rounded-md my-4'>
                     <thead>
                        <tr>
                           <th className='table-th !text-center'>Rank</th>
                           <th className='table-th !text-center'>Name</th>
                           <th className='table-th !text-center'>Quiz Mark</th>
                           <th className='table-th !text-center'>Assignment Mark</th>
                           <th className='table-th !text-center'>Total</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr className='border-2 border-cyan'>
                           <td className='table-td text-center font-bold'>{userRank.rank}</td>
                           <td className='table-td text-center font-bold'>{userRank.name}</td>
                           <td className='table-td text-center font-bold'>{userRank.quizMark}</td>
                           <td className='table-td text-center font-bold'>{userRank.assignmentMark}</td>
                           <td className='table-td text-center font-bold'>{userRank.quizMark + userRank.assignmentMark || 0}</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div className='my-8'>
                  <h3 className='text-lg font-bold'>Top 20 Result</h3>
                  <table className='text-base w-full border border-slate-600/50 rounded-md my-4'>
                     <thead>
                        <tr className='border-b border-slate-600/50'>
                           <th className='table-th !text-center'>Rank</th>
                           <th className='table-th !text-center'>Name</th>
                           <th className='table-th !text-center'>Quiz Mark</th>
                           <th className='table-th !text-center'>Assignment Mark</th>
                           <th className='table-th !text-center'>Total</th>
                        </tr>
                     </thead>
                     <tbody>
                        {usersRank
                           .filter(item => item.rank <= 20 && item.role === 'student')
                           .map((item, index) => (
                              <tr key={`student-${index}`} className='border-b border-slate-600/50'>
                                 <td className='table-td text-center'>{item.rank}</td>
                                 <td className='table-td text-center'>{item.name}</td>
                                 <td className='table-td text-center'>{item.quizMark}</td>
                                 <td className='table-td text-center'>{item.assignmentMark}</td>
                                 <td className='table-td text-center'>{item.quizMark + item.assignmentMark}</td>
                              </tr>
                           ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </section>
      </Fragment>
   );
}

import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Head from '../../components/head';
import PageLoader from '../../components/pageLoader';
import getDateTime from '../../utilities/getDateTime';
import { useGetAssignmentMarksQuery } from '../../redux/features/assignmentMarks/enhancer';

export default function AssignmentMarks() {
   const assignmentMarksApi = useGetAssignmentMarksQuery();

   function getStats(assignmentMarks) {
      const stats = {};
      stats.total = assignmentMarks.length;
      stats.pending = assignmentMarks.filter(item => item.status === 'pending').length;
      stats.published = assignmentMarks.filter(item => item.status === 'published').length;
      return stats;
   }

   return (
      <Fragment>
         <Head title='Assignments Marks' />
         {assignmentMarksApi.isLoading ? <PageLoader /> : null}
         <section className='py-6'>
            <div className='mx-auto max-w-7xl px-5 lg:px-0'>
               <h1 className='text-2xl font-bold mt-4'>All Assignment Mark List</h1>
               <div className='mt-4 bg-opacity-10'>
                  <ul className='assignment-status'>
                     <li>
                        Total <span>{getStats(assignmentMarksApi.data || []).total}</span>
                     </li>
                     <li>
                        Pending <span>{getStats(assignmentMarksApi.data || []).pending}</span>
                     </li>
                     <li>
                        Mark Sent <span>{getStats(assignmentMarksApi.data || []).published}</span>
                     </li>
                  </ul>
                  <div className='overflow-x-auto mt-4'>
                     <table className='divide-y-1 text-base divide-gray-600 w-full'>
                        <thead>
                           <tr className='marks-table-row'>
                              <th className='table-th'>Assignment</th>
                              <th className='table-th'>Date</th>
                              <th className='table-th'>Student Name</th>
                              <th className='table-th'>Repo Link</th>
                              <th className='table-th flex justify-end'>Mark</th>
                           </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-600/50'>
                           {assignmentMarksApi.data?.map((item, index) => (
                              <tr key={`assignment-mark-${index}`} className='marks-table-row'>
                                 <td className='table-td'>{item.title}</td>
                                 <td className='table-td'>{getDateTime(item.createdAt)}</td>
                                 <td className='table-td'>{item.student_name}</td>
                                 <td className='table-td'>
                                    <Link to={item.repo_link} target='_blank'>
                                       View Code
                                    </Link>
                                 </td>
                                 {item.status === 'pending' ? (
                                    <td className='table-td flex justify-end input-mark'>
                                       <input
                                          className='login-input rounded-md'
                                          max={item.totalMark}
                                          placeholder='Mark'
                                          value=''
                                       />
                                       <svg
                                          fill='none'
                                          viewBox='0 0 24 24'
                                          strokeWidth='2'
                                          stroke='currentColor'
                                          className='w-6 h-6 text-green-500 cursor-pointer hover:text-green-400'
                                       >
                                          <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                                       </svg>
                                    </td>
                                 ) : (
                                    <td className='table-td flex justify-end'>{item.mark}</td>
                                 )}
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </section>
      </Fragment>
   );
}

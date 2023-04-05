import Empty from '../common/empty';
import { Link } from 'react-router-dom';
import Head from '../../components/head';
import { Fragment, useState } from 'react';
import Modal from '../../components/modal';
import PageLoader from '../../components/pageLoader';
import getDateTime from '../../utilities/getDateTime';
import { useEditAssignmentMarkMutation, useGetAssignmentMarksQuery } from '../../redux/features/assignmentMarks/enhancer';

export default function AssignmentMarks() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const assignmentMarksApi = useGetAssignmentMarksQuery();
   const [editMark, editMarkApi] = useEditAssignmentMarkMutation();
   const [modalData, setModalData] = useState({ id: '', value: '', title: '', name: '' });

   function getStats(assignmentMarks) {
      const stats = {};
      stats.total = assignmentMarks.length;
      stats.pending = assignmentMarks.filter(item => item.status === 'pending').length;
      stats.published = assignmentMarks.filter(item => item.status === 'published').length;
      return stats;
   }

   function handleMarkSubmit(item) {
      return event => {
         event.preventDefault();
         const value = Number(event.target[`mark-${item.id}`].value);
         setIsModalOpen(true);
         setModalData({
            value,
            id: item.id,
            title: item.title,
            name: item.student_name,
         });
      };
   }

   function handleEditMark() {
      editMark({ id: modalData.id, mark: modalData.value, status: 'published' }).then(() => {
         setIsModalOpen(false);
      });
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
                     {assignmentMarksApi.data?.length ? (
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
                                       <Link to={item.repo_link} target='_blank' className='link'>
                                          View Code
                                       </Link>
                                    </td>
                                    {item.status === 'pending' ? (
                                       <td className='table-td flex justify-end'>
                                          <form onSubmit={handleMarkSubmit(item)} className='input-mark'>
                                             <input
                                                type='number'
                                                name={`mark-${item.id}`}
                                                placeholder='Mark'
                                                max={item.totalMark}
                                                className='login-input rounded-md'
                                             />
                                             <button type='submit'>
                                                <svg
                                                   fill='none'
                                                   strokeWidth='2'
                                                   viewBox='0 0 24 24'
                                                   stroke='currentColor'
                                                   className='w-6 h-6 text-green-500 cursor-pointer hover:text-green-400'
                                                >
                                                   <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                                                </svg>
                                             </button>
                                          </form>
                                       </td>
                                    ) : (
                                       <td className='table-td flex justify-end'>{item.mark}</td>
                                    )}
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     ) : (
                        <Empty scope='inner' text='No assignment marks found to show here!' />
                     )}
                  </div>
               </div>
            </div>
         </section>
         <Modal
            type='edit'
            isOpen={isModalOpen}
            onClick={handleEditMark}
            setIsOpen={setIsModalOpen}
            isLoading={editMarkApi.isLoading}
            message={`Do you want to set mark of "${modalData.title}" assignment for "${modalData.name}"?`}
         />
      </Fragment>
   );
}

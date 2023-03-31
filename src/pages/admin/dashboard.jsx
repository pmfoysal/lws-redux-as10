import { Fragment } from 'react';
import data from '../../data/dashboard';
import { Link } from 'react-router-dom';
import Head from '../../components/head';

export default function Dashboard() {
   return (
      <Fragment>
         <Head title='Admin Dashboard' />
         <section className='py-6 bg-primary'>
            <div className='mx-auto max-w-7xl px-5 lg:px-0'>
               <div className='px-3 md:lg:xl:px-40  py-20 bg-opacity-10'>
                  <div className='grid grid-cols-1 md:grid-cols-2  gap-6 p-8'>
                     {data.map((item, index) => (
                        <Link key={`menu-${index}`} to={item.url} className='dashboard-item-card'>
                           {item.icon}
                           <p className='text-slate-200 mt-3 '>{item.name}</p>
                        </Link>
                     ))}
                  </div>
               </div>
            </div>
         </section>
      </Fragment>
   );
}

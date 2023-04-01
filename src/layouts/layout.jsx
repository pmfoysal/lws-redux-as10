import Header from '../components/header';
import { Fragment, Suspense } from 'react';
import authRoutes from '../data/authRoutes.json';
import PageLoader from '../components/pageLoader';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
   const { pathname } = useLocation();

   return (
      <Fragment>
         {!authRoutes.includes(pathname) ? <Header /> : null}
         <Suspense fallback={<PageLoader />}>
            <Outlet />
         </Suspense>
      </Fragment>
   );
}

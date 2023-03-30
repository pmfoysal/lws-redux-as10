import Header from '../components/header';
import { Fragment, Suspense } from 'react';
import PageLoader from '../components/pageLoader';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
   const { pathname } = useLocation();
   const authRoutes = ['/', '/signin', '/signup', '/forget-password', '/admin', '/admin/signin', '/admin/signup'];

   return (
      <Fragment>
         {!authRoutes.includes(pathname) ? <Header /> : null}
         <Suspense fallback={<PageLoader />}>
            <Outlet />
         </Suspense>
      </Fragment>
   );
}

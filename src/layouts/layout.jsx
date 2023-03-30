import { Fragment } from 'react';
import Header from '../components/header';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
   const { pathname } = useLocation();
   const authRoutes = ['/', '/signin', '/signup', '/admin', '/admin/signin', '/admin/signup'];

   return (
      <Fragment>
         {!authRoutes.includes(pathname) ? <Header /> : null}
         <Outlet />
      </Fragment>
   );
}

import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/header';

export default function Layout() {
   return (
      <Fragment>
         <Header />
         <Outlet />
      </Fragment>
   );
}

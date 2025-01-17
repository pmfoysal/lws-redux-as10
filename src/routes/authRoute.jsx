import Error from '../pages/common/error';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import authRoutes from '../data/authRoutes.json';
import PageLoader from '../components/pageLoader';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AuthRoute({ page }) {
   const navigate = useNavigate();
   const { pathname } = useLocation();
   const [loading, setLoading] = useState(true);
   const [isAuthRoute, setIsAuthRoute] = useState(false);
   const { role } = useSelector(store => store.auth.user);

   useEffect(() => {
      if (role && authRoutes.includes(pathname)) {
         setIsAuthRoute(true);
         navigate(role === 'admin' ? '/admin/dashboard' : '/video');
      } else {
         setIsAuthRoute(false);
      }
      setLoading(false);
   }, [role, pathname]);

   if (loading) return <PageLoader />;
   if (isAuthRoute) return <Error code={400} role={role} />;
   return page;
}

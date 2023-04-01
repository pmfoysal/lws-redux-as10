import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import authRoutes from '../data/authRoutes.json';
import PageLoader from '../components/pageLoader';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AuthRoute({ page }) {
   const navigate = useNavigate();
   const { pathname } = useLocation();
   const [loading, setLoading] = useState(true);
   const { role } = useSelector(store => store.auth.user);

   useEffect(() => {
      if (role && authRoutes.includes(pathname)) {
         navigate(-1);
      }
      setLoading(false);
   }, [role, pathname]);

   if (loading) return <PageLoader />;
   return page;
}

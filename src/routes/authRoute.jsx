import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import authRoutes from '../data/authRoutes.json';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AuthRoute({ page }) {
   const navigate = useNavigate();
   const { pathname } = useLocation();
   const { role } = useSelector(store => store.auth.user);

   useEffect(() => {
      if (role && authRoutes.includes(pathname)) {
         console.log('yes');
         navigate(-1);
      }
   }, [role, pathname]);

   console.log(role, pathname);

   return page;
}

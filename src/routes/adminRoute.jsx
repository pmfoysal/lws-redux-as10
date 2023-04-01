import { useSelector } from 'react-redux';
import Error from '../pages/common/error';

export default function AdminRoute({ page }) {
   const { role } = useSelector(store => store.auth.user);

   if (!role) return <Error code={401} />;
   else if (role !== 'admin') return <Error code={403} role='admin' />;
   return page;
}

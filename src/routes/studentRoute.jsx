import { useSelector } from 'react-redux';
import Error from '../pages/common/error';

export default function StudentRoute({ page }) {
   const { role } = useSelector(store => store.auth.user);

   if (!role) return <Error code={401} />;
   else if (role !== 'student') return <Error code={403} role='student' />;
   return page;
}

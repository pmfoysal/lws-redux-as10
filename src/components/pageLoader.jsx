import { Triangle } from 'react-loader-spinner';

export default function PageLoader() {
   return (
      <section className='page-loader bg-primary'>
         <Triangle height='80' width='80' color='rgb(124, 58, 237)' visible={true} />
      </section>
   );
}

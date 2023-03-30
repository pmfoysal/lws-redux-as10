import { Helmet } from 'react-helmet-async';

export default function Head({ title, desc = '' }) {
   return (
      <Helmet>
         <title>LWS-LP - {title}</title>
         <meta name='description' content={desc} />
      </Helmet>
   );
}

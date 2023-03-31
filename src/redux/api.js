import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export default createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:9000',
      prepareHeaders: headers => {
         headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
         return headers;
      },
   }),
   endpoints: () => ({}),
});

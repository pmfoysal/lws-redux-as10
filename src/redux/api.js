import signoutThunk from './middlewares/signoutThunk';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const fetchData = fetchBaseQuery({
   baseUrl: 'http://localhost:9000',
   prepareHeaders: headers => {
      headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      return headers;
   },
});

export default createApi({
   reducerPath: 'api',
   baseQuery: async (...args) => {
      const result = await fetchData(...args);
      const { dispatch } = args[1];
      if (result?.error?.status === 401) {
         dispatch(signoutThunk()).then(({ payload: role }) => {
            if (role === 'admin') window.location.href = '/admin/signin';
            else window.location.href = '/signin';
         });
      }
      return result;
   },
   endpoints: () => ({}),
});

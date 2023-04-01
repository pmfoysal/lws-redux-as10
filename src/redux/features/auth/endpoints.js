import api from '../../api';

export default api.injectEndpoints({
   endpoints: builder => ({
      signin: builder.mutation({
         query: data => ({
            url: '/signin',
            method: 'POST',
            body: data,
         }),
      }),
      signup: builder.mutation({
         query: data => ({
            url: '/signup',
            method: 'POST',
            body: data,
         }),
      }),
   }),
});

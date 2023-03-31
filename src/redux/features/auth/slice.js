import api from '../../api';

const auth = api.injectEndpoints({
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

export default auth;
export const {} = auth;

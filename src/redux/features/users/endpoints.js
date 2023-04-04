import api from '../../api';

export default api.injectEndpoints({
   endpoints: builder => ({
      getUsers: builder.query({
         query: () => '/users',
      }),
      getUser: builder.query({
         query: id => `/users/${id}`,
      }),
   }),
});

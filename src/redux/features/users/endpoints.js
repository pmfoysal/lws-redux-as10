import api from '../../api';

const users = api.injectEndpoints({
   endpoints: builder => ({
      getUsers: builder.query({
         query: () => '/users',
      }),
      getUser: builder.query({
         query: id => `/users/${id}`,
      }),
   }),
});

export default users;
export const { useGetUsersQuery, useGetUserQuery } = users;

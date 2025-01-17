import api from '../../api';

export default api.injectEndpoints({
   endpoints: builder => ({
      getAssignments: builder.query({
         query: () => '/assignments',
      }),
      getAssignment: builder.query({
         query: id => `/assignments/${id}`,
      }),
      addAssignment: builder.mutation({
         query: data => ({
            url: '/assignments',
            method: 'POST',
            body: data,
         }),
      }),
      editAssignment: builder.mutation({
         query: ({ id, ...data }) => ({
            url: `/assignments/${id}`,
            method: 'PATCH',
            body: data,
         }),
      }),
      deleteAssignment: builder.mutation({
         query: id => ({
            url: `/assignments/${id}`,
            method: 'DELETE',
         }),
      }),
   }),
});

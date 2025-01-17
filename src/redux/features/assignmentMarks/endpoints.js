import api from '../../api';

export default api.injectEndpoints({
   endpoints: builder => ({
      getAssignmentMarks: builder.query({
         query: () => '/assignmentMark',
      }),
      getAssignmentMark: builder.query({
         query: id => `/assignmentMark/${id}`,
      }),
      addAssignmentMark: builder.mutation({
         query: data => ({
            url: '/assignmentMark',
            method: 'POST',
            body: data,
         }),
      }),
      editAssignmentMark: builder.mutation({
         query: ({ id, ...data }) => ({
            url: `/assignmentMark/${id}`,
            method: 'PATCH',
            body: data,
         }),
      }),
      deleteAssignmentMark: builder.mutation({
         query: id => ({
            url: `/assignmentMark/${id}`,
            method: 'DELETE',
         }),
      }),
   }),
});

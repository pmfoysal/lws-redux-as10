import api from '../../api';

const quizMarks = api.injectEndpoints({
   endpoints: builder => ({
      getQuizMarks: builder.query({
         query: () => '/quizMark',
      }),
      getQuizMark: builder.query({
         query: id => `/quizMark/${id}`,
      }),
      addQuizMark: builder.mutation({
         query: data => ({
            url: '/quizMark',
            method: 'POST',
            body: data,
         }),
      }),
      editQuizMark: builder.mutation({
         query: ({ id, ...data }) => ({
            url: `/quizMark/${id}`,
            method: 'PATCH',
            body: data,
         }),
      }),
      deleteQuizMark: builder.mutation({
         query: id => ({
            url: `/quizMark/${id}`,
            method: 'DELETE',
         }),
      }),
   }),
});

export default quizMarks;
export const {
   useGetQuizMarksQuery,
   useGetQuizMarkQuery,
   useAddQuizMarkMutation,
   useEditQuizMarkMutation,
   useDeleteQuizMarkMutation,
} = quizMarks;

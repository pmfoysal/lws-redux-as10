import api from '../../api';

const quizzes = api.injectEndpoints({
   endpoints: builder => ({
      getQuizzes: builder.query({
         query: () => '/quizzes',
      }),
      getQuiz: builder.query({
         query: id => `/quizzes/${id}`,
      }),
      addQuiz: builder.mutation({
         query: data => ({
            url: '/quizzes',
            method: 'POST',
            body: data,
         }),
      }),
      editQuiz: builder.mutation({
         query: ({ id, ...data }) => ({
            url: `/quizzes/${id}`,
            method: 'PATCH',
            body: data,
         }),
      }),
      deleteQuiz: builder.mutation({
         query: id => ({
            url: `/quizzes/${id}`,
            method: 'DELETE',
         }),
      }),
   }),
});

export default quizzes;
export const { useGetQuizzesQuery, useGetQuizQuery, useAddQuizMutation, useEditQuizMutation, useDeleteQuizMutation } = quizzes;

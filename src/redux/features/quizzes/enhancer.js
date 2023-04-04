import quizzes from './endpoints';
import message from '../../../utilities/message';

const { updateQueryData } = quizzes.util;

const enhancedQuizzes = quizzes.enhanceEndpoints({
   endpoints: {
      getQuizzes: {
         onQueryStarted: async (data, { queryFulfilled }) => {
            try {
               await queryFulfilled;
            } catch (error) {
               message.error(error.message || error.error.error || error.error.data);
            }
         },
      },
      getQuiz: {
         onQueryStarted: async (data, { queryFulfilled }) => {
            try {
               await queryFulfilled;
            } catch (error) {
               message.error(error.message || error.error.error || error.error.data);
            }
         },
      },
      addQuiz: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            try {
               const { data: result } = await queryFulfilled;
               dispatch(
                  updateQueryData('getQuizzes', undefined, draft => {
                     draft.push(result);
                  })
               );
            } catch (error) {
               message.error(error.message || error.error.error || error.error.data);
            }
         },
      },
      editQuiz: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            const updatedGetQuiz = dispatch(
               updateQueryData('getQuiz', data.id, draft => {
                  if (draft.id === data.id) Object.assign(draft, data);
               })
            );
            const updatedGetQuizzes = dispatch(
               updateQueryData('getQuizzes', undefined, draft => {
                  draft.forEach(quiz => {
                     if (quiz.id === data.id) {
                        Object.assign(quiz, data);
                     }
                  });
               })
            );
            try {
               await queryFulfilled;
            } catch (error) {
               updatedGetQuiz.undo();
               updatedGetQuizzes.undo();
               message.error(error.message || error.error.error || error.error.data);
            }
         },
      },
      deleteQuiz: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            const deletedGetQuizzes = dispatch(
               updateQueryData('getQuizzes', undefined, draft => {
                  const index = draft.findIndex(quiz => quiz.id === data.id);
                  draft.splice(index, 1);
               })
            );
            try {
               await queryFulfilled;
            } catch (error) {
               deletedGetQuizzes.undo();
               message.error(error.message || error.error.error || error.error.data);
            }
         },
      },
   },
});

export const { useGetQuizzesQuery, useGetQuizQuery, useAddQuizMutation, useEditQuizMutation, useDeleteQuizMutation } =
   enhancedQuizzes;

import quizMarks from './endpoints';
import message from '../../../utilities/message';

const { updateQueryData } = quizMarks.util;

const enhancedQuizMarks = quizMarks.enhanceEndpoints({
   endpoints: {
      getQuizMarks: {
         onQueryStarted: async (data, { queryFulfilled }) => {
            try {
               await queryFulfilled;
            } catch (error) {
               message.error(error.message || error.error.error || error.error.data);
            }
         },
      },
      getQuizMark: {
         onQueryStarted: async (data, { queryFulfilled }) => {
            try {
               await queryFulfilled;
            } catch (error) {
               message.error(error.message || error.error.error || error.error.data);
            }
         },
      },
      addQuizMark: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            try {
               const { data: result } = await queryFulfilled;
               dispatch(
                  updateQueryData('getQuizMarks', undefined, draft => {
                     draft.push(result);
                  })
               );
            } catch (error) {
               message.error(error.message || error.error.error || error.error.data);
            }
         },
      },
      editQuizMark: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            const updatedGetQuizMark = dispatch(
               updateQueryData('getQuizMark', data.id, draft => {
                  if (draft.id === data.id) Object.assign(draft, data);
               })
            );
            const updatedGetQuizMarks = dispatch(
               updateQueryData('getQuizMarks', undefined, draft => {
                  draft.forEach(quizMark => {
                     if (quizMark.id === data.id) {
                        Object.assign(quizMark, data);
                     }
                  });
               })
            );
            try {
               await queryFulfilled;
            } catch (error) {
               updatedGetQuizMark.undo();
               updatedGetQuizMarks.undo();
               message.error(error.message || error.error.error || error.error.data);
            }
         },
      },
      deleteQuizMark: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            const deletedGetQuizMark = dispatch(
               updateQueryData('getQuizMarks', undefined, draft => {
                  const index = draft.findIndex(quizMark => quizMark.id === data);
                  draft.splice(index, 1);
               })
            );
            try {
               await queryFulfilled;
            } catch (error) {
               deletedGetQuizMark.undo();
               message.error(error.message || error.error.error || error.error.data);
            }
         },
      },
   },
});

export const {
   useGetQuizMarksQuery,
   useGetQuizMarkQuery,
   useAddQuizMarkMutation,
   useEditQuizMarkMutation,
   useDeleteQuizMarkMutation,
} = enhancedQuizMarks;

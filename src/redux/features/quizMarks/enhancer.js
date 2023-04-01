import quizMarks from './endpoints';

const { updateQueryData } = quizMarks.util;

quizMarks.enhanceEndpoints({
   endpoints: {
      addQuizMark: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            try {
               const { data: result } = await queryFulfilled;
               dispatch(updateQueryData('getQuizMarks', undefined, draft => draft.push(result)));
            } catch (error) {}
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
            }
         },
      },
      deleteQuizMark: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            const deletedGetQuizMark = dispatch(
               updateQueryData('getQuizMarks', undefined, draft => {
                  const index = draft.findIndex(quizMark => quizMark.id === data.id);
                  draft.splice(index, 1);
               })
            );
            try {
               await queryFulfilled;
            } catch (error) {
               deletedGetQuizMark.undo();
            }
         },
      },
   },
});
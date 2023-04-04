import assignmentMarks from './endpoints';
import message from '../../../utilities/message';

const { updateQueryData } = assignmentMarks.util;

const enhancedAssignmentMarks = assignmentMarks.enhanceEndpoints({
   endpoints: {
      getAssignmentMarks: {
         onQueryStarted: async (data, { queryFulfilled }) => {
            try {
               await queryFulfilled;
            } catch (error) {
               message.error(error.message || error.error.error || error.error.data);
            }
         },
      },
      getAssignmentMark: {
         onQueryStarted: async (data, { queryFulfilled }) => {
            try {
               await queryFulfilled;
            } catch (error) {
               message.error(error.message || error.error.error || error.error.data);
            }
         },
      },
      addAssignmentMark: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            try {
               const { data: result } = await queryFulfilled;
               dispatch(
                  updateQueryData('getAssignmentMarks', undefined, draft => {
                     draft.push(result);
                  })
               );
            } catch (error) {
               message.error(error.message || error.error.error || error.error.data);
            }
         },
      },
      editAssignmentMark: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            const updatedGetAssignmentMark = dispatch(
               updateQueryData('getAssignmentMark', data.id, draft => {
                  if (draft.id === data.id) Object.assign(draft, data);
               })
            );
            const updatedGetAssignmentMarks = dispatch(
               updateQueryData('getAssignmentMarks', undefined, draft => {
                  draft.forEach(assignmentMark => {
                     if (assignmentMark.id === data.id) {
                        Object.assign(assignmentMark, data);
                     }
                  });
               })
            );
            try {
               await queryFulfilled;
            } catch (error) {
               updatedGetAssignmentMark.undo();
               updatedGetAssignmentMarks.undo();
               message.error(error.message || error.error.error || error.error.data);
            }
         },
      },
      deleteAssignmentMark: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            const deletedGetAssignmentMarks = dispatch(
               updateQueryData('getAssignmentMarks', undefined, draft => {
                  const index = draft.findIndex(assignmentMark => assignmentMark.id === data.id);
                  draft.splice(index, 1);
               })
            );
            try {
               await queryFulfilled;
            } catch (error) {
               deletedGetAssignmentMarks.undo();
               message.error(error.message || error.error.error || error.error.data);
            }
         },
      },
   },
});

export const {
   useGetAssignmentMarksQuery,
   useGetAssignmentMarkQuery,
   useAddAssignmentMarkMutation,
   useEditAssignmentMarkMutation,
   useDeleteAssignmentMarkMutation,
} = enhancedAssignmentMarks;

import assignments from './endpoints';
import message from '../../../utilities/message';

const { updateQueryData } = assignments.util;

const enhancedAssignments = assignments.enhanceEndpoints({
   endpoints: {
      addAssignment: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            try {
               const { data: result } = await queryFulfilled;
               dispatch(
                  updateQueryData('getAssignments', undefined, draft => {
                     draft.push(result);
                  })
               );
            } catch (error) {
               message.error(error.message || error.error.data);
            }
         },
      },
      editAssignment: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            const updatedGetAssignment = dispatch(
               updateQueryData('getAssignment', data.id, draft => {
                  if (draft.id === data.id) Object.assign(draft, data);
               })
            );
            const updatedGetAssignments = dispatch(
               updateQueryData('getAssignments', undefined, draft => {
                  draft.forEach(assignment => {
                     if (assignment.id === data.id) {
                        Object.assign(assignment, data);
                     }
                  });
               })
            );
            try {
               await queryFulfilled;
            } catch (error) {
               updatedGetAssignment.undo();
               updatedGetAssignments.undo();
               message.error(error.message || error.error.data);
            }
         },
      },
      deleteAssignment: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            const deletedGetAssignments = dispatch(
               updateQueryData('getAssignments', undefined, draft => {
                  const index = draft.findIndex(assignment => assignment.id === data.id);
                  draft.splice(index, 1);
               })
            );
            try {
               await queryFulfilled;
            } catch (error) {
               deletedGetAssignments.undo();
               message.error(error.message || error.error.data);
            }
         },
      },
   },
});

export const {
   useGetAssignmentsQuery,
   useGetAssignmentQuery,
   useAddAssignmentMutation,
   useEditAssignmentMutation,
   useDeleteAssignmentMutation,
} = enhancedAssignments;

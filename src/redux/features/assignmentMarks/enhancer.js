import assignmentMarks from './endpoints';

const { updateQueryData } = assignmentMarks.util;

assignmentMarks.enhanceEndpoints({
   endpoints: {
      addAssignmentMark: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            try {
               const { data: result } = await queryFulfilled;
               dispatch(updateQueryData('getAssignmentMarks', undefined, draft => draft.push(result)));
            } catch (error) {}
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
            }
         },
      },
   },
});

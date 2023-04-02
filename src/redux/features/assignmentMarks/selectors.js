export function selectAssignmentMark(assignmentMarks, studentId, assignmentId) {
   return assignmentMarks.find(item => {
      return item.student_id === studentId && item.assignment_id === assignmentId;
   });
}

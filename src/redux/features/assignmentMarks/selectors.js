export function selectAssignmentMark(assignmentMarks, studentId, assignmentId) {
   return assignmentMarks.find(item => {
      return item.student_id === studentId && item.assignment_id === assignmentId;
   });
}

export function selectAssignmentMarkCount(assignmentMarks, studentId) {
   return assignmentMarks.reduce((mark, assignmentMark) => {
      if (assignmentMark.student_id === studentId) {
         return (mark += assignmentMark.mark);
      }
      return mark;
   }, 0);
}

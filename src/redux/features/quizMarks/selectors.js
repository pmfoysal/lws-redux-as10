export function selectQuizMark(quizMarks, studentId, videoId) {
   return quizMarks.find(quizMark => {
      return quizMark.student_id === studentId && quizMark.video_id === videoId;
   });
}

export function selectQuizMarkCount(quizMarks, studentId) {
   return quizMarks.reduce((mark, quizMark) => {
      if (quizMark.student_id === studentId) {
         return (mark += quizMark.mark);
      }
      return mark;
   }, 0);
}

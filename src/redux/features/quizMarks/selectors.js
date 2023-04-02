export function selectQuizMark(quizMarks, studentId, videoId) {
   return quizMarks.find(quizMark => {
      return quizMark.student_id === studentId && quizMark.video_id === videoId;
   });
}

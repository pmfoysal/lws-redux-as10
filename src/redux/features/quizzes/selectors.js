export function selectQuizzes(quizzes, videoId) {
   return quizzes.filter(item => item.video_id === videoId);
}

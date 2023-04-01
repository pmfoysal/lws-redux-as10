export function selectAssignment(assignments, videoId) {
   return assignments.find(item => item.video_id === videoId);
}

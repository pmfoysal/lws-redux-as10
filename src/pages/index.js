import { lazy } from 'react';

export const Student = {
   Quiz: lazy(() => import('./student/quiz')),
   Video: lazy(() => import('./student/video')),
   Signin: lazy(() => import('./student/signin')),
   Signup: lazy(() => import('./student/signup.jsx')),
   Leaderboard: lazy(() => import('./student/leaderboard')),
   AssignmentResult: lazy(() => import('./student/assignment-result')),
   AssignmentSubmit: lazy(() => import('./student/assignment-submit')),
   AssignmentDetails: lazy(() => import('./student/assignment-details')),
};

export const Admin = {
   Signin: lazy(() => import('./admin/signin')),
   Dashboard: lazy(() => import('./admin/dashboard')),
   QuizAdd: lazy(() => import('./admin/quiz-add')),
   QuizList: lazy(() => import('./admin/quiz-list')),
   QuizEdit: lazy(() => import('./admin/quiz-edit')),
   VideoAdd: lazy(() => import('./admin/video-add')),
   VideoList: lazy(() => import('./admin/video-list')),
   VideoEdit: lazy(() => import('./admin/video-edit')),
   AssignmentAdd: lazy(() => import('./admin/assignment-add')),
   AssignmentList: lazy(() => import('./admin/assignment-list')),
   AssignmentEdit: lazy(() => import('./admin/assignment-edit')),
   AssignmentMarks: lazy(() => import('./admin/assignment-marks')),
};

import { lazy } from 'react';

export const Common = {
   ForgetPassword: lazy(() => import('./common/forgetPassword')),
};

export const Student = {
   Quiz: lazy(() => import('./student/quiz')),
   Video: lazy(() => import('./student/video')),
   Signin: lazy(() => import('./student/signin')),
   Signup: lazy(() => import('./student/signup.jsx')),
   Leaderboard: lazy(() => import('./student/leaderboard')),
   AssignmentResult: lazy(() => import('./student/assignmentResult')),
   AssignmentSubmit: lazy(() => import('./student/assignmentSubmit')),
   AssignmentDetails: lazy(() => import('./student/assignmentDetails')),
};

export const Admin = {
   Signin: lazy(() => import('./admin/signin')),
   Dashboard: lazy(() => import('./admin/dashboard')),
   QuizAdd: lazy(() => import('./admin/quizAdd')),
   QuizList: lazy(() => import('./admin/quizList')),
   QuizEdit: lazy(() => import('./admin/quizEdit')),
   VideoAdd: lazy(() => import('./admin/videoAdd')),
   VideoList: lazy(() => import('./admin/videoList')),
   VideoEdit: lazy(() => import('./admin/videoEdit')),
   AssignmentAdd: lazy(() => import('./admin/assignmentAdd')),
   AssignmentList: lazy(() => import('./admin/assignmentList')),
   AssignmentEdit: lazy(() => import('./admin/assignmentEdit')),
   AssignmentMarks: lazy(() => import('./admin/assignmentMarks')),
};

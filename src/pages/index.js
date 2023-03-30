import { lazy } from 'react';

export const Student = {
   Quiz: lazy(() => import('./student/quiz')),
   Video: lazy(() => import('./student/video')),
   Signin: lazy(() => import('./student/signin')),
   Signup: lazy(() => import('./student/signup.jsx')),
   Assignment: lazy(() => import('./student/assignment')),
   Leaderboard: lazy(() => import('./student/leaderboard')),
};

export const Admin = {
   Signin: lazy(() => import('./admin/signin')),
   Quizes: lazy(() => import('./admin/quizes')),
   Videos: lazy(() => import('./admin/videos')),
   Dashboard: lazy(() => import('./admin/dashboard')),
   Assignments: lazy(() => import('./admin/assignments')),
   AssignmentMarks: lazy(() => import('./admin/assignmentMarks')),
};

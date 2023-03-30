import { lazy } from 'react';

export const Student = {
   Quiz: lazy(() => import('./student/quiz')),
   Video: lazy(() => import('./student/video')),
   Signin: lazy(() => import('./student/signin')),
   Assignment: lazy(() => import('./student/assignment')),
   Leaderboard: lazy(() => import('./student/leaderboard')),
   Signup: lazy(() => import('../components/signup')),
};

export const Admin = {
   Signin: lazy(() => import('./admin/signin')),
   Quizes: lazy(() => import('./admin/quizes')),
   Videos: lazy(() => import('./admin/videos')),
   Dashboard: lazy(() => import('./admin/dashboard')),
   Assignments: lazy(() => import('./admin/assignments')),
   AssignmentMarks: lazy(() => import('./admin/assignmentMarks')),
};

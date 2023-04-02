import api from './api';
import auth from './features/others/auth';
import history from './features/others/history';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
   reducer: {
      auth,
      history,
      [api.reducerPath]: api.reducer,
   },
   middleware: defaults => [...defaults(), api.middleware],
});

import api from './api';
import auth from './features/others/auth';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
   reducer: {
      auth,
      [api.reducerPath]: api.reducer,
   },
   middleware: defaults => [...defaults(), api.middleware],
});

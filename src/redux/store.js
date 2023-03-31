import api from './api';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
   reducer: {
      [api.reducerPath]: api.reducer,
   },
   middleware: defaults => [...defaults(), api.middleware],
});

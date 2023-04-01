import { createAsyncThunk } from '@reduxjs/toolkit';

export default createAsyncThunk('auth/signout', async (...args) => {
   const { getState } = args[1];
   return getState().auth.user?.role;
});

import { createSlice } from '@reduxjs/toolkit';
import signoutThunk from '../../middlewares/signoutThunk';

const initialState = {
   user: {},
   token: '',
};

const auth = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setAuth: (state, action) => {
         const { user, accessToken } = action.payload;
         state.user = user;
         state.token = accessToken;
         localStorage.setItem('token', accessToken);
         localStorage.setItem('user', JSON.stringify(user));
      },
      signout: state => {
         state.user = {};
         state.token = '';
         localStorage.removeItem('user');
         localStorage.removeItem('token');
      },
   },
   extraReducers: builder => {
      builder.addCase(signoutThunk.fulfilled, state => {
         state.user = {};
         state.token = '';
         localStorage.removeItem('user');
         localStorage.removeItem('token');
      });
   },
});

export default auth.reducer;
export const { setAuth, signout } = auth.actions;

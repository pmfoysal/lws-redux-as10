import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   user: {},
   token: '',
};

const auth = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setUser: (state, action) => {
         const { user, accessToken } = action.payload;
         state.user = user;
         state.token = accessToken;
         localStorage.setItem('user', JSON.stringify(user));
         localStorage.setItem('token', JSON.stringify(accessToken));
      },
   },
});

export default auth.reducer;
export const { setUser } = auth.actions;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   routes: [],
};

const history = createSlice({
   name: 'history',
   initialState,
   reducers: {
      pushHistory: (state, action) => {
         state.routes.push(action.payload);
      },
   },
});

export default history.reducer;
export const { pushHistory } = history.actions;

import { createSlice } from '@reduxjs/toolkit';

import { stateType, TUserLogin } from '../types';


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    isLogged: false,
  } as TUserLogin,
  reducers: {
    userLogin(state, { payload }) {
      return { ...state, isLogged: true, email: payload };
    }
  }
});

export const { userLogin } = userSlice.actions;
export const selectEmail = (state: stateType) => state.user.email;
export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

interface TUserLogin {
  email: string;
  isLogged: boolean;
}

export const slice = createSlice({
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

export const { userLogin } = slice.actions;
export const selectUser = (state: TUserLogin) => state.email;
export default slice.reducer;

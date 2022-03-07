import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import userReducer from './userSlice';
import walletReducer from './walletSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    wallet: walletReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>

// snippet https://jsfiddle.net/3njbkc0x/
// https://youtu.be/mT8nFaFyJnw?t=1041
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store;
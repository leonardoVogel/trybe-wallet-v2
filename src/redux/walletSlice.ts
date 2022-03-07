import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrencies } from '../services/api';
import { stateType } from '../types';

interface TWalletState {
  currencies: string[];
  expenses: object[];
  isLoading: boolean;
  //TODO REMOVE ANY TYPE
  error: any;
}

export const fetchCurrencies = createAsyncThunk('wallet/requestCurrencies',
  async () => {
    try {
      const currencies = await getCurrencies();
      return currencies;
    } catch (error) {
      return error;
    }
})

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    currencies: [],
    expenses: [],
    isLoading: false,
    error: '',
  } as TWalletState,
  reducers: {
    newExpense(state, { payload }) {
      return { ...state, isLoading: false, expenses: [...state.expenses, payload] };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.pending, (state) => {
      state.isLoading = true;
    }).addCase(fetchCurrencies.fulfilled, (state, action) => {
      state.currencies = action.payload;
      state.isLoading = false;
    }).addCase(fetchCurrencies.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
  }
});

export const { newExpense } = walletSlice.actions;
export const currenciesList = (state: stateType) => state.wallet.currencies;
export default walletSlice.reducer;

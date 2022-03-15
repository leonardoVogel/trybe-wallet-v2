import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getCurrencies, getExchangeRates } from '../services/api';
import { stateType, TWalletState, expenseObjectType } from '../types';

export const fetchCurrencies = createAsyncThunk('wallet/requestCurrencies',
  async () => {
    try {
      const currencies = await getCurrencies();
      return currencies;
    } catch (error) {
      return error;
    }
})

export const fetchExchangeRates = createAsyncThunk('wallet/requestExchangeRates',
  async (newExpenseObject: expenseObjectType, { dispatch }) => {
    dispatch(isLoading());
    try {
      const exchangeRates = await getExchangeRates();
      const newExpenseWithExchangeRates = { ...newExpenseObject, exchangeRates };
      dispatch(newExpense(newExpenseWithExchangeRates))
    } catch (error) {
      return error;
    }
})

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    currencies: [],
    expenses: [],
    currentID: 0,
    expenseToEditId: 0,
    isLoading: false,
    error: '',
  } as TWalletState,
  reducers: {
    isLoading(state) {
      return { ...state, isLoading: true };
    },
    newExpense(state, { payload }) {
      return { ...state, isLoading: false, expenses: [...state.expenses, payload] };
    },
    removeExpense(state, { payload }) {
      return {
        ...state,
        expenses: state.expenses.filter(({ id }: any) => payload !== id),
      };
    },
    editExpense(state, { payload }) {
      return { ...state, expenseToEditId: payload };
    },
    saveEditExpense(state, { payload }) {
      return { ...state, expenses: payload };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.pending, (state) => {
      state.isLoading = true;
    }).addCase(fetchCurrencies.fulfilled, (state, { payload }: any) => {
      payload.length > 3 ? state.currencies = payload : state.error = 'Request error';
      state.isLoading = false;
    }).addCase(fetchCurrencies.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Error';
    })
  }
});

export const { newExpense, isLoading, removeExpense, editExpense, saveEditExpense } = walletSlice.actions;
export const selectCurrenciesList = (state: stateType) => state.wallet.currencies;
export const selectExpensesList = (state: stateType) => state.wallet.expenses;
export const selectExpensesToEdit = (state: stateType) => state.wallet.expenseToEditId;
export default walletSlice.reducer;

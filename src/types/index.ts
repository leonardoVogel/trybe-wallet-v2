import { ChangeEvent, InputHTMLAttributes } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLSelectElement | HTMLInputElement> {
  type: string;
  id: string;
  value: string;
  options?: string[];
  label?: string;
  onInputChange: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}

export interface TWalletState {
  currencies: string[];
  expenses: object[];
  isLoading: boolean;
  error: string;
}

export interface TUserLogin {
  email: string;
  isLogged: boolean;
}

export interface expenseObjectType {
  id: number;
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
}

export interface exchangeRateType {
  code: string;
  ask: string;
}

export interface fullExpenseObjectType {
  id: number;
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates?: exchangeRateType;
}

export interface stateType {
  user: {
    email: string;
    isLogged: boolean;
  };
  wallet: {
    currencies: string[];
    expenses: fullExpenseObjectType[];
    isLoading: boolean;
    error: string;
  };
}
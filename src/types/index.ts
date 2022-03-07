import { ChangeEvent, InputHTMLAttributes } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLSelectElement | HTMLInputElement> {
  type: string;
  id: string;
  value: string;
  options?: string[];
  label?: string;
  onInputChange: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}

export interface stateType {
  user: {
    email: string;
    isLogged: boolean;
  };
  wallet: {
    currencies: string[];
    expenses: object[];
    isLoading: boolean;
    error: any;
  };
}
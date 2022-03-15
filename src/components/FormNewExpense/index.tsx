import { ChangeEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { INITIAL_STATE } from "../../utils/constants";
import { InputNewExpense } from "../InputNewExpense";
import { FormNewExpensePropsInterface, fullExpenseObjectType } from "../../types";
import {
  selectCurrenciesList,
  saveEditExpense,
  fetchCurrencies,
  fetchExchangeRates,
  selectExpensesList,
  selectExpensesToEdit,
} from "../../redux/walletSlice";

export function FormNewExpense({ editMode, setEditMode }: FormNewExpensePropsInterface) {
  const [form, setForm] = useState(INITIAL_STATE);
  const dispatch = useDispatch();
  const currencies = useSelector(selectCurrenciesList)
  const expenses = useSelector(selectExpensesList);
  const expensesToEditID = useSelector(selectExpensesToEdit);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch])

  useEffect(() => {
    if (editMode) {
      expenses.map(({ id }, index) => {
        if (id === expensesToEditID) {
          return setForm(expenses[index]);
        }
        return '';
      });
    } else {
      setForm((state: fullExpenseObjectType) => ({ ...INITIAL_STATE, id: state.id }));
    }
  }, [editMode, expenses, expensesToEditID])

  const handleInputChange = ({ target: { id, value } }: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setForm((state) => ({ ...state, [id]: value }))
  }

  const addNewExpense = (event: any) => {
    event.preventDefault();
 
    dispatch(fetchExchangeRates(form))
    setForm((state: fullExpenseObjectType) => {
      return ({ ...state, id: state.id + 1, value: '0', description: '' });
    })
  }

  const editExpense = (event: any) => {
    event.preventDefault();

    const newExpenseList = expenses.map((expense: any) => {
      if (expense.id === form.id) {
        return form;
      }
      return expense;
    })

    dispatch(saveEditExpense(newExpenseList));
    setForm(INITIAL_STATE);
    setEditMode(false);
  }

  return (
    <form onSubmit={ editMode ? editExpense : addNewExpense }>
      <InputNewExpense
          id="value"
          type="number"
          onInputChange={ handleInputChange }
          value={ form.value }
        />
        <InputNewExpense
          id="description"
          type="text"
          onInputChange={ handleInputChange }
          value={ form.description }
        />
        <InputNewExpense
          id="currency"
          type="select"
          label="Moeda"
          options={ currencies }
          onInputChange={ handleInputChange }
          value={ form.currency }
        />
        <InputNewExpense
          id="method"
          type="select"
          label="Método"
          options={ ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'] }
          onInputChange={ handleInputChange }
          value={ form.method }
        />
        <InputNewExpense
          id="tag"
          type="select"
          label="Tag"
          options={ ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'] }
          onInputChange={ handleInputChange }
          value={ form.tag }
        />
        <button type="submit">
          { editMode ? 'Editar despesa' : 'Adicionar despesa' }
        </button>
    </form>
  )
}
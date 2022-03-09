import { ChangeEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { INITIAL_STATE } from "../../utils/constants";
import { InputNewExpense } from "../InputNewExpense";
import { selectCurrenciesList, fetchCurrencies, fetchExchangeRates } from "../../redux/walletSlice";
import { fullExpenseObjectType } from "../../types";

export function FormNewExpense() {
  const [form, setForm] = useState(INITIAL_STATE);
  const dispatch = useDispatch();
  const currencies = useSelector(selectCurrenciesList)

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch])
  

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

  return (
    <form onSubmit={ addNewExpense }>
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
          Adicionar despesa
        </button>
    </form>
  )
}
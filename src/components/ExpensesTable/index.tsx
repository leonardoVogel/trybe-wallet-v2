import { useDispatch, useSelector } from "react-redux";

import { removeExpense, selectExpensesList } from "../../redux/walletSlice";
import { FaTrash } from 'react-icons/fa';

export function ExpensesTable() {
  const expenses = useSelector(selectExpensesList)
  const dispatch = useDispatch();

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        { expenses
          .map(({ id, description, tag, method, value, exchangeRates, currency }: any) => {
            const exchange = +exchangeRates[currency].ask;
            const currencyName = exchangeRates[currency].name;

            return (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{(+value).toFixed(2)}</td>
                <td>{currencyName}</td>
                <td>{exchange.toFixed(2)}</td>
                <td>{(exchange * +value).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => dispatch(removeExpense(id)) }
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>);
          })}
      </tbody>
    </table>
  );
}

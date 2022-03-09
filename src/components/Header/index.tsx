import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

import { selectEmail } from "../../redux/userSlice";
import { selectExpensesList } from "../../redux/walletSlice";

export function Header() {
  const [totalExpenses, setTotalExpenses] = useState(0)
  const email = useSelector(selectEmail);
  const expensesList = useSelector(selectExpensesList);

  useEffect(() => {
    const totalExpenses = expensesList.reduce((acc, curr: any) => {
      const { exchangeRates, currency, value } = curr;
      const currentExpenseValue = +value * +exchangeRates[currency].ask
      return acc + currentExpenseValue;
    }, 0)
    
    setTotalExpenses(totalExpenses)
  }, [expensesList])
  

  return (
    <header>
      <h1>LOGO</h1>
      <div>
        <p>Email: <span>{ email }</span></p>
        <p>Total: R$<span>{ totalExpenses.toFixed(2) }</span></p>
        <p>BRL</p>
      </div>
    </header>
  )
}

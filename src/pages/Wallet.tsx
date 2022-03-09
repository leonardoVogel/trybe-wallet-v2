import { ExpensesTable } from "../components/ExpensesTable";
import { FormNewExpense } from "../components/FormNewExpense";
import { Header } from "../components/Header";

export function Wallet() {
  return (
    <>
      <Header />
      <FormNewExpense />
      <ExpensesTable />
    </>
  )
}

import { useState } from "react";

import { ExpensesTable } from "../components/ExpensesTable";
import { FormNewExpense } from "../components/FormNewExpense";
import { Header } from "../components/Header";

export function Wallet() {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <Header />
      <FormNewExpense editMode={editMode} setEditMode={setEditMode} />
      <ExpensesTable setEditMode={setEditMode} />
    </>
  )
}

import React from 'react';
import './styles/App.css';
import './styles/common.css';
import Header from './components/Header';
import UserManagement from './components/UserManagement';
import AddExpense from './components/AddExpense';
import Settlement from './components/Settlement';
import ExpenseHistory from './components/ExpenseHistory';
import EditExpenseModal from './components/EditExpenseModal';
import { useExpenseState } from './hooks/useExpenseState';
import { calculateSettlements } from './utils/settlementCalculator';

const ExpenseSplitter = () => {
  const initialUsers = [];

  const {
    users,
    expenses,
    newUserName,
    desc,
    amount,
    payer,
    involvedUsers,
    editingExpenseId,
    setNewUserName,
    setDesc,
    setAmount,
    setPayer,
    setEditingExpenseId,
    addUser,
    removeUser,
    addExpense,
    removeExpense,
    toggleInvolved,
    updateExpense,
    resetState,
  } = useExpenseState(initialUsers);

  const settlements = calculateSettlements(users, expenses);
  const expenseToEdit = expenses.find((e) => e.id === editingExpenseId);

  return (
    <div className="app">
      <div className="app__container">
        <Header onResetAll={resetState} />

        <div className="app__grid">
          <UserManagement
            users={users}
            expenses={expenses}
            newUserName={newUserName}
            onNewUserNameChange={setNewUserName}
            onAddUser={addUser}
            onRemoveUser={removeUser}
          />

          <AddExpense
            users={users}
            desc={desc}
            amount={amount}
            payer={payer}
            involvedUsers={involvedUsers}
            onDescChange={setDesc}
            onAmountChange={setAmount}
            onPayerChange={setPayer}
            onToggleInvolved={toggleInvolved}
            onAddExpense={addExpense}
          />
        </div>

        <Settlement settlements={settlements} />

        <ExpenseHistory
          users={users}
          expenses={expenses}
          onRemoveExpense={removeExpense}
          onEditExpense={setEditingExpenseId}
        />

        {editingExpenseId && expenseToEdit && (
          <EditExpenseModal
            users={users}
            expense={expenseToEdit}
            onSave={updateExpense}
            onCancel={() => setEditingExpenseId(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ExpenseSplitter;

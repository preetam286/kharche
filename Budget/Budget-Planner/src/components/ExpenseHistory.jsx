import React from 'react';
import { Trash2, Edit2 } from 'lucide-react';
import '../styles/ExpenseHistory.css';

const ExpenseHistory = ({ users, expenses, onRemoveExpense, onEditExpense }) => {
  const getExcludedUsers = (expense) => {
    return users.filter((u) => !expense.involved.includes(u.id));
  };

  const formatInvolved = (expense) => {
    const excluded = getExcludedUsers(expense);
    if (excluded.length === 0) {
      return 'Everyone';
    }
    const names = excluded.map((u) => u.name).join(', ');
    return `Everyone except ${names}`;
  };

  return (
    <div className="expense-history card">
      <h2 className="expense-history__title">Recent Activity</h2>
      {expenses.length === 0 ? (
        <p className="expense-history__empty">No expenses added yet.</p>
      ) : (
        <div className="expense-history__table-wrapper">
          <table className="expense-history__table">
            <thead className="expense-history__header">
              <tr>
                <th>Description</th>
                <th>Paid By</th>
                <th>Amount</th>
                <th>Split</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => {
                const payerName = users.find((u) => u.id === exp.payer)?.name || 'Unknown';
                return (
                  <tr key={exp.id} className="expense-history__row">
                    <td className="expense-history__cell expense-history__cell--desc">
                      {exp.desc}
                    </td>
                    <td className="expense-history__cell">{payerName}</td>
                    <td className="expense-history__cell">₹{exp.amount.toFixed(2)}</td>
                    <td className="expense-history__cell expense-history__cell--split">
                      {formatInvolved(exp)}
                    </td>
                    <td className="expense-history__cell expense-history__cell--actions">
                      <button
                        onClick={() => onEditExpense(exp.id)}
                        className="expense-history__edit-btn"
                        title="Edit expense"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onRemoveExpense(exp.id)}
                        className="expense-history__delete-btn"
                        title="Delete expense"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpenseHistory;

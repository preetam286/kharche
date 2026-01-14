import React from 'react';
import { Plus } from 'lucide-react';
import '../styles/AddExpense.css';

const AddExpense = ({
  users,
  desc,
  amount,
  payer,
  involvedUsers,
  onDescChange,
  onAmountChange,
  onPayerChange,
  onToggleInvolved,
  onAddExpense,
}) => {
  return (
    <div className="add-expense card">
      <h2 className="add-expense__title">
        <Plus className="icon-inline" size={20} /> Add Expense
      </h2>

      <form onSubmit={onAddExpense} className="add-expense__form">
        <div className="form-group">
          <label className="form-label">Description</label>
          <input
            type="text"
            placeholder="e.g. Dinner, Taxi"
            className="form-input"
            value={desc}
            onChange={(e) => onDescChange(e.target.value)}
          />
        </div>

        <div className="add-expense__row">
          <div className="form-group">
            <label className="form-label">Amount</label>
            <input
              type="number"
              placeholder="0.00"
              className="form-input"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Paid By</label>
            <select
              className="form-input"
              value={payer}
              onChange={(e) => onPayerChange(e.target.value)}
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Split Amongst</label>
          <div className="add-expense__checkboxes">
            {users.map((u) => (
              <label key={u.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={involvedUsers.includes(u.id)}
                  onChange={() => onToggleInvolved(u.id)}
                  className="checkbox-input"
                />
                <span className="checkbox-text">{u.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" disabled={users.length < 2} className="add-expense__submit">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;

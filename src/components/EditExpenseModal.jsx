import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import '../styles/EditExpenseModal.css';

const EditExpenseModal = ({ users, expense, onSave, onCancel }) => {
  const [desc, setDesc] = useState(expense.desc);
  const [amount, setAmount] = useState(expense.amount.toString());
  const [payer, setPayer] = useState(expense.payer.toString());
  const [involved, setInvolved] = useState(expense.involved);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Add class to body to prevent scrolling
    document.body.classList.add('modal-open');
    return () => {
      // Remove class when modal unmounts
      document.body.classList.remove('modal-open');
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!desc.trim()) {
      newErrors.desc = 'Description is required';
    }

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (involved.length === 0) {
      newErrors.involved = 'At least one person must be included in the split';
    }

    if (!involved.includes(parseInt(payer))) {
      newErrors.payer = 'The person who paid must be included in the split';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    onSave({
      id: expense.id,
      desc: desc.trim(),
      amount: parseFloat(amount),
      payer: parseInt(payer),
      involved: involved,
    });
  };

  const toggleInvolved = (userId) => {
    if (involved.includes(userId)) {
      setInvolved(involved.filter((id) => id !== userId));
    } else {
      setInvolved([...involved, userId]);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Expense</h2>
          <button onClick={onCancel} className="modal-close">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Description</label>
            <input
              type="text"
              placeholder="e.g. Dinner, Taxi"
              className="form-input"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            {errors.desc && <span className="error-text">{errors.desc}</span>}
          </div>

          <div className="modal-row">
            <div className="form-group">
              <label className="form-label">Amount</label>
              <input
                type="number"
                placeholder="0.00"
                className="form-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {errors.amount && <span className="error-text">{errors.amount}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Paid By</label>
              <select
                className="form-input"
                value={payer}
                onChange={(e) => setPayer(e.target.value)}
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
              {errors.payer && <span className="error-text">{errors.payer}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Split Amongst</label>
            <div className="modal-checkboxes">
              {users.map((u) => (
                <label key={u.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={involved.includes(u.id)}
                    onChange={() => toggleInvolved(u.id)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">{u.name}</span>
                </label>
              ))}
            </div>
            {errors.involved && <span className="error-text">{errors.involved}</span>}
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseModal;

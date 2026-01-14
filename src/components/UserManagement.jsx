import React, { useState } from 'react';
import { Users, X, UserPlus } from 'lucide-react';
import ConfirmModal from './ConfirmModal';
import '../styles/UserManagement.css';

const UserManagement = ({ users, expenses = [], newUserName, onNewUserNameChange, onAddUser, onRemoveUser }) => {
  const [pendingRemove, setPendingRemove] = useState(null);

  const handleRemoveClick = (user) => {
    // compute number of affected expenses
    const affected = expenses.filter((exp) => exp.involved.includes(user.id) || exp.payer === user.id).length;
    setPendingRemove({ user, affected });
  };

  const confirmRemove = () => {
    if (pendingRemove) {
      onRemoveUser(pendingRemove.user.id);
      setPendingRemove(null);
    }
  };

  return (
    <div className="user-management card">
      <div className="user-management__header">
        <h2 className="user-management__title">
          <Users className="icon-inline" size={20} /> Group Members
        </h2>
        <span className="user-management__count">{users.length} people</span>
      </div>

      <div className="user-management__list">
        {users.map((u) => (
          <div key={u.id} className="user-management__item">
            <span>{u.name}</span>
            <button onClick={() => handleRemoveClick(u)} className="user-management__remove-btn">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={onAddUser} className="user-management__form">
        <input
          type="text"
          placeholder="Enter name..."
          className="user-management__input"
          value={newUserName}
          onChange={(e) => onNewUserNameChange(e.target.value)}
        />
        <button type="submit" className="user-management__button">
          <UserPlus size={20} />
        </button>
      </form>

      {pendingRemove && (
        <ConfirmModal
          title={`Remove ${pendingRemove.user.name}`}
          message={
            pendingRemove.affected > 0
              ? `${pendingRemove.user.name} is referenced in ${pendingRemove.affected} expense(s). Removing will update those expenses. Continue?`
              : `Remove ${pendingRemove.user.name}?`
          }
          onCancel={() => setPendingRemove(null)}
          onConfirm={confirmRemove}
        />
      )}
    </div>
  );
};

export default UserManagement;

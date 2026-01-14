import React from 'react';
import { Users, X, UserPlus } from 'lucide-react';
import '../styles/UserManagement.css';

const UserManagement = ({ users, newUserName, onNewUserNameChange, onAddUser, onRemoveUser }) => {
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
            <button onClick={() => onRemoveUser(u.id)} className="user-management__remove-btn">
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
    </div>
  );
};

export default UserManagement;

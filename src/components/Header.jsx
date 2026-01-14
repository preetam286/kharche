import React, { useState } from 'react';
import { IndianRupee } from 'lucide-react';
import ConfirmModal from './ConfirmModal';
import '../styles/Header.css';

const Header = ({ onResetAll }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    setShowConfirm(false);
    if (onResetAll) onResetAll();
  };

  return (
    <header className="header">
      <div className="header__icon-wrapper">
        <IndianRupee size={24} />
      </div>
      <h1 className="header__title">Group Expense Splitter</h1>
      <button className="header__reset" onClick={() => setShowConfirm(true)} aria-label="Reset All">
        Reset All
      </button>

      {showConfirm && (
        <ConfirmModal
          title="Reset all data"
          message="This will remove all users and expenses. Are you sure?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleConfirm}
        />
      )}
    </header>
  );
};

export default Header;

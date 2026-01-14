import React from 'react';
import { IndianRupee } from 'lucide-react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__icon-wrapper">
        <IndianRupee size={24} />
      </div>
      <h1 className="header__title">Group Expense Splitter</h1>
    </header>
  );
};

export default Header;

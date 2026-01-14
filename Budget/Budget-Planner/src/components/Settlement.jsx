import React from 'react';
import '../styles/Settlement.css';

const Settlement = ({ settlements }) => {
  return (
    <div className="settlement">
      <h2 className="settlement__title">Final Settlement Plan</h2>
      {settlements.length === 0 ? (
        <p className="settlement__empty">No debts found. Everyone is settled up!</p>
      ) : (
        <div className="settlement__list">
          {settlements.map((s, idx) => (
            <div key={idx} className="settlement__item">
              <div className="settlement__info">
                <span className="settlement__from">{s.from}</span>
                <span className="settlement__label">pays</span>
                <span className="settlement__to">{s.to}</span>
              </div>
              <div className="settlement__amount">₹{s.amount}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Settlement;

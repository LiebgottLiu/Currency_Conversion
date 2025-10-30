import React from 'react';
import "./index.css";
export default function CurrencyCard({ code, symbol, flag, amount, rate }) {
   return (
    <div className="currency-card">
      
      <div className="left-section">
        <div className="flag-container">
          <img src={flag} alt={code} className="flag-img" />
        </div>
        <span className="currency-code">{code}</span>
      </div>

      
      <div className="right-section">
        <div className="currency-amount">
          {symbol}{amount}
        </div>
        <div className="currency-rate">
          1 AUD = {rate} {code}
        </div>
      </div>
    </div>
  );
}
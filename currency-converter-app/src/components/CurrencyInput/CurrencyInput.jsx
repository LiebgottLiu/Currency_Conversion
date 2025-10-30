import React from 'react';
import "./index.css";

export default function CurrencyInput({ amount, onChange  }) {

  return(
    <div className='currency-input'>
      <div className='left-section'>
        <div className='flag-AUS'>
          <img src = 'https://flagcdn.com/w40/au.png' alt= 'AUD' className='flag-img' />
        </div>
        <span className='currency-code'>{"AUD"}</span>
      </div>

      <div className='right-section'>
        <div className='currency-amount'>
          {'$'}
        <input
          type="number"
          className="currecny-input"
          value={amount ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val === '' ? '' : parseFloat(val));
          }}
          placeholder="Enter amount"
        />
        </div>
      </div>

    </div>

  )
}

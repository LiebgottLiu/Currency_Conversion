import React from 'react';
import CurrencyCard from './CurrencyCard';

const currencies = [
  { code: 'CAD', symbol: '$', flag: 'https://flagcdn.com/w40/ca.png', rate: 0.9163 },
  { code: 'EUR', symbol: '€', flag: 'https://flagcdn.com/w40/eu.png', rate: 0.6167 },
  { code: 'GBP', symbol: '£', flag: 'https://flagcdn.com/w40/gb.png', rate: 0.5439 },
  { code: 'NZD', symbol: '$', flag: 'https://flagcdn.com/w40/nz.png', rate: 1.0712 },
  { code: 'USD', symbol: '$', flag: 'https://flagcdn.com/w40/us.png', rate: 0.6675 },
];

export default function CurrencyList({ audAmount }) {
  return (
    <div>
      {currencies.map(({ code, symbol, rate, flag }) => {
        const converted = (audAmount * rate).toFixed(2);
        return (
          <CurrencyCard
            key={code}
            code={code}
            symbol={symbol}
            rate={rate}
            amount={converted}
            flag={flag}
          />
        );
      })}
    </div>
  );
}

import React from 'react';

export default function CurrencyCard({ flag,code,symbol,amount,rate }){
    return(
    <div className="flex items-center justify-between border rounded-lg p-3 shadow-sm mb-3 bg-white">
      <div className="flex items-center">
        <img src={flag} alt={code} className="w-6 h-6 mr-3" />
        <div>
          <div className="text-md font-semibold">{code} {symbol}{amount}</div>
          <div className="text-sm text-gray-500">1 AUD = {rate} {code}</div>
        </div>
      </div>
    </div>

    );

}
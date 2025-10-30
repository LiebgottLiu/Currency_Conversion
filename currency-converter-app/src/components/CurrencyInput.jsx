import React from 'react';

export default function CurrencyInput({ amount, onChangeAmount }){
    return(
        <div className="flex items-center justify-between border border-blue-500 rounded-xl px-4 py-3 mb-4">    
            <div className="flex items-center">
                <img src="https://flagcdn.com/w40/au.png" alt="AUD"  className="w-6 h-6 mr-2" />
                <span className="font-medium">AUD</span>
            </div>
            <input
                type="number"
                className="text-right font-semibold text-lg outline-none w-32"
                value={amount}
                onChangeAmount={(e) => onChangeAmount(e.target.value)}
            />

        </div>
    );

}
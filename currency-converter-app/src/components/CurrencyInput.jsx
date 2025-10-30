import React from 'react';

export default function CurrencyInput({ amount, onChange,onConvert  }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <input
        type="number"
        className="w-full border border-gray-400 rounded-lg p-2 text-lg outline-none"
        value={amount}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        placeholder="Enter AUD amount"
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        onClick={onConvert}
      >
        Convert
      </button>
    </div>
  );
}

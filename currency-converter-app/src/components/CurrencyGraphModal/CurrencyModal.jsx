import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./index.css";

export default function CurrencyModal({ visible, onClose, data, code }) {
  if (!visible) return null;

  return (
    <div className="currency-modal-overlay" onClick={onClose}>
      <div className="currency-modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-semibold mb-4">AUD to {code} - Last 14 Days</h3>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis
              dataKey="date"
              ticks={data.filter((_, i) => i % 5 === 0).map(d => d.date)}
              
              textAnchor="star"  
              height={60} 
            />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#8884d8"
              dot={{ r: 3 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <button className="currency-modal-close" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

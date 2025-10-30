import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { getRatesURL } from "../../config/api";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import CurrencyCard from "../CurrencyCard/CurrencyCard";
import "./index.css";

const currencies = [
  { code: 'CAD', symbol: '$', flag: 'https://flagcdn.com/w40/ca.png' },
  { code: 'EUR', symbol: '€', flag: 'https://flagcdn.com/w40/eu.png' },
  { code: 'GBP', symbol: '£', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'NZD', symbol: '$', flag: 'https://flagcdn.com/w40/nz.png' },
  { code: 'USD', symbol: '$', flag: 'https://flagcdn.com/w40/us.png' },
];

export default function CurrencyConverter() {
  const [audAmount, setAudAmount] = useState();
  const[rates,setRates] = useState({});
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchRates = async () => {
    try{
      const response = await axios.get(getRatesURL());
      const data = response.data;
      setRates(data.rates);
      setLastUpdated(moment.unix(data.timestamp).format("DD/MM/YYYY HH:mm:ss"))

    }catch (e) {
      console.error("Can not fetch rates.", e)
    }

  };

  useEffect(() => {
    fetchRates();
  }, []);

  const convert = (rate) => {
    if(!rates["AUD"] || !audAmount) return "0.00";
    return((audAmount / rates["AUD"]) * rate).toFixed(2);
  };



    return (
      <div className="converter-container bg-gray-100 p-6 rounded-xl shadow-md max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center mb-4">AUD Converter</h1>
        {/* user input section */}
        <CurrencyInput
          amount={audAmount}
          onChange={setAudAmount}
          onConvert={fetchRates}
        />
        
        {/* convert button */}
          <button  className="convert-button"
          title="Covert"
          onClick={convert}
          > Covert</button>
            
        {/* showing cards */}
        <div>
          {currencies.map((cur) => (
            <CurrencyCard
              key={cur.code}
              code={cur.code}
              symbol={cur.symbol}
              flag={cur.flag}
              rate={rates[cur.code] ? (rates[cur.code] / rates["AUD"]).toFixed(4) : "-"}
              amount={rates[cur.code] ? convert(rates[cur.code]) : "-"}
              lastUpdated={lastUpdated}
            />
          ))}
        </div>
        {lastUpdated && (
          <p className="text-sm text-gray-500 text-center mt-3">
            Last updated: {lastUpdated}
          </p>
        )}
      </div>
    );
}
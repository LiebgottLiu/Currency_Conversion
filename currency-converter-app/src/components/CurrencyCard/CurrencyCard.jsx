import React, { useState } from 'react';
import "./index.css";
import axios from "axios";
import moment from "moment";
import { getHistoricalRatesURL } from '../../config/api';
import CurrencyModal from "../CurrencyGraphModal/CurrencyModal";

// cache for historical data 
const historicalCache = {};

export default function CurrencyCard({ code, symbol, flag, amount, rate, lastUpdated  }) {

  const [showModal, setShowModal] = useState(false);
  const [ historicalData, setHistoricalData] = useState([]);
  const [ loading, setLoading] = useState(false);

  const handleClick = async () => {
    setShowModal(true);
    
    //use if it is in cache
    if(historicalCache[code]){
      setHistoricalData(historicalCache[code])
    }

    

    const baseDate = lastUpdated
    ? moment(lastUpdated, "DD/MM/YYYY HH:mm:ss")
    : moment();

    setLoading(true);

    const dates = Array.from({ length: 14 }, (_, i) =>
      baseDate.clone().subtract(14 - i, "days").format("YYYY-MM-DD")
    );
      
      try{
        const response = await Promise.all(
          dates.map((date) => axios.get(getHistoricalRatesURL(date)))
        ) 
        const dataPoints = response.map((res,idx) =>{
          const rates = res.data.rates;
          const rateAUD = rates["AUD"];
          const historicalRate = 
              rateAUD && rates[code] ? (rates[code]/ rateAUD).toFixed(4): null;
              return{ date:dates[idx],rate:historicalRate};
        })
        
        historicalCache[code] = dataPoints;
        setHistoricalData(dataPoints);
      }catch(e){
        console.error("Can not get history data" , e)
      }
    

    setLoading(false);

  };

   return (
    <>
    <div className="currency-card" onClick={handleClick}> 
      
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

      {/* show pop up section */}
      <CurrencyModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        data={historicalData}
        code={code}
        loading = {loading}
      />
    </>
  );
}
import React, { useState } from 'react';
import "./index.css";
import axios from "axios";
import moment from "moment";
import { getHistoricalRatesURL } from '../../config/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
export default function CurrencyCard({ code, symbol, flag, amount, rate, lastUpdated  }) {

  const [showPopup, setShowPopup ] = useState(false);
  const [ historicalData, setHistoricalData] = useState([]);
  const [ loading, setLoading] = useState(false);

  const handleClick = async () => {
    setShowPopup(true);
    setLoading(true);


    const baseDate = lastUpdated
    ? moment(lastUpdated, "DD/MM/YYYY HH:mm:ss")
    : moment();

    const dataPoints = [];

    for(let i = 13; i >= 0; i--){
      const date =  baseDate.clone().subtract(i, 'days').format('YYYY-MM-DD');
      
      try{
        const response = await axios.get(getHistoricalRatesURL(date))
        const rates = response.data.rates
        const rateAUD = rates['AUD'];
        const historicalRate = rateAUD && rates[code] ? (rates[code] / rateAUD).toFixed(4) : null;
        dataPoints.push({
          date,
          rate:historicalRate,
        });
      }catch(e){
        console.error("Can not get history data" , e)
      }
    }

    setHistoricalData(dataPoints);
    setLoading(false);

  };

  const renderCustomDot = (props) => {
    const { payload } = props;
    if (payload.current) {
      return <circle cx={props.cx} cy={props.cy} r={6} fill="#ff0000" stroke="#000" strokeWidth={2} />;
    }
    return <circle cx={props.cx} cy={props.cy} r={3} fill="#8884d8" />;
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
      {showPopup && (
        <div className='popup-overlay' onClick={() => setShowPopup(false)}>
            <div className='popup-content' onClick={(e) => e.stopPropagation()}>
              <h3>AUD to {code} - Last 14 Days</h3>
              {loading? (
                <p>Loading....</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalData}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="date"
                    ticks={historicalData.filter((_,i) => i%5 ===0).map(d =>d.date)}
                  />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#8884d8"
                    dot={renderCustomDot}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              )}
              <button onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
      )}
    </>
  );
}
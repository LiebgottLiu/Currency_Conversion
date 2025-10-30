import { useState } from 'react'
import CurrencyConverter   from './components/CurrencyConverter/CurrencyConverter'


function App() {
  const [audAmount, setAudAmount] = useState();

  return (
    <div className="app-container">
      <CurrencyConverter />
    </div>
  );
}

export default App

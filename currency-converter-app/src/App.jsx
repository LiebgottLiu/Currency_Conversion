import { useState } from 'react'
import CurrencyConverter   from './components/CurrencyConverter'


function App() {
  const [audAmount, setAudAmount] = useState();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <CurrencyConverter />
    </div>
  );
}

export default App

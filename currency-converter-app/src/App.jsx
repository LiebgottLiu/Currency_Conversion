import { useState } from 'react'
import CurrencyInput from './components/CurrencyInput'
import CurrencyList  from './components/CurrencyList'


function App() {
  const [audAmount, setAudAmount] = useState(1000);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-10">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-semibold mb-4 text-center">Convert</h1>
        <CurrencyInput amount={audAmount} onChangeAmount={setAudAmount} />
        <CurrencyList audAmount={audAmount} />
      </div>
    </div>
  );
}

export default App

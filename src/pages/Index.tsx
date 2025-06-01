import { useState, useEffect } from 'react';

export default function Index() {
  const [balance, setBalance] = useState<number>(0);
  const [deductible, setDeductible] = useState<number>(0);
  const [repairByInsured, setRepairByInsured] = useState<number[]>([]);
  const [repairByContractor, setRepairByContractor] = useState<number[]>([]);
  const [totalRepairByInsured, setTotalRepairByInsured] = useState<number>(0);
  const [totalRepairByContractor, setTotalRepairByContractor] = useState<number>(0);
  const [balancePlusDeductible, setBalancePlusDeductible] = useState<number>(0);

  useEffect(() => {
    setTotalRepairByInsured(repairByInsured.reduce((acc, curr) => acc + curr, 0));
  }, [repairByInsured]);

  useEffect(() => {
    setTotalRepairByContractor(repairByContractor.reduce((acc, curr) => acc + curr, 0));
  }, [repairByContractor]);

  useEffect(() => {
    setBalancePlusDeductible(balance + deductible);
  }, [balance, deductible]);

  // Calculate final balance
  const finalBalance = balancePlusDeductible - totalRepairByInsured - totalRepairByContractor;
  const isNegative = finalBalance < 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Insurance Claim Calculator</h1>

        {/* Balance and Deductible Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Balance and Deductible</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="balance" className="block text-gray-700 text-sm font-bold mb-2">
                Balance:
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  id="balance"
                  className="shadow appearance-none border rounded w-full py-2 px-3 pl-7 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter balance"
                  value={balance}
                  onChange={(e) => setBalance(parseFloat(e.target.value))}
                />
              </div>
            </div>
            <div>
              <label htmlFor="deductible" className="block text-gray-700 text-sm font-bold mb-2">
                Deductible:
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  id="deductible"
                  className="shadow appearance-none border rounded w-full py-2 px-3 pl-7 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter deductible"
                  value={deductible}
                  onChange={(e) => setDeductible(parseFloat(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Balance + Deductible:</h3>
              <span className="text-2xl font-bold text-blue-600">${balancePlusDeductible.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Repair by Insured Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Repair by Insured</h2>
          {repairByInsured.map((amount, index) => (
            <div key={index} className="mb-2">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 pl-7 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder={`Enter amount for repair ${index + 1}`}
                  value={amount}
                  onChange={(e) => {
                    const newRepairByInsured = [...repairByInsured];
                    newRepairByInsured[index] = parseFloat(e.target.value);
                    setRepairByInsured(newRepairByInsured);
                  }}
                />
              </div>
            </div>
          ))}
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => setRepairByInsured([...repairByInsured, 0])}
          >
            Add Repair
          </button>
          <div className="mt-4">
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Total Repair by Insured:</h3>
              <span className="text-2xl font-bold text-blue-600">${totalRepairByInsured.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Repair by Contractor Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Repair by Contractor</h2>
          {repairByContractor.map((amount, index) => (
            <div key={index} className="mb-2">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 pl-7 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder={`Enter amount for repair ${index + 1}`}
                  value={amount}
                  onChange={(e) => {
                    const newRepairByContractor = [...repairByContractor];
                    newRepairByContractor[index] = parseFloat(e.target.value);
                    setRepairByContractor(newRepairByContractor);
                  }}
                />
              </div>
            </div>
          ))}
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => setRepairByContractor([...repairByContractor, 0])}
          >
            Add Repair
          </button>
          <div className="mt-4">
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Total Repair by Contractor:</h3>
              <span className="text-2xl font-bold text-blue-600">${totalRepairByContractor.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Final Balance Section */}
        <div className={`bg-white rounded-lg shadow-md p-6 ${isNegative ? 'border-red-500 border-2' : ''}`}>
          <div className={`flex justify-between items-center p-4 rounded-lg ${isNegative ? 'bg-red-50' : 'bg-green-50'}`}>
            <h3 className={`text-lg font-semibold ${isNegative ? 'text-red-800' : 'text-green-800'}`}>
              {isNegative ? 'Additional Cash Out of Pocket by Insured' : 'Final Balance'}
            </h3>
            <span className={`text-2xl font-bold ${isNegative ? 'text-red-600' : 'text-green-600'}`}>
              ${Math.abs(finalBalance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

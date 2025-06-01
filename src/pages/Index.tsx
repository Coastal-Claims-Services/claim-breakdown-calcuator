import React, { useState } from 'react';

const IndexPage: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState(500000);
  const [downPayment, setDownPayment] = useState(10);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [insuranceRate, setInsuranceRate] = useState(0.5);
  const [hoaFees, setHoaFees] = useState(100);

  const [rentCollected, setRentCollected] = useState(3000);
  const [vacancyRate, setVacancyRate] = useState(5);
  const [maintenanceCostRate, setMaintenanceCostRate] = useState(10);
  const [propertyManagementRate, setPropertyManagementRate] = useState(10);

  const [contractorRepair1Title, setContractorRepair1Title] = useState("Option");
  const [contractorRepair1Cost, setContractorRepair1Cost] = useState(0);
  const [contractorRepair2Title, setContractorRepair2Title] = useState("Option");
  const [contractorRepair2Cost, setContractorRepair2Cost] = useState(0);
  const [contractorRepair3Title, setContractorRepair3Title] = useState("Plywood");
  const [contractorRepair3Cost, setContractorRepair3Cost] = useState(1000);

  const loanAmount = propertyValue * (1 - downPayment / 100);
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPrincipalInterest = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  const monthlyPropertyTax = (propertyValue * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = (propertyValue * (insuranceRate / 100)) / 12;
  const totalMonthlyExpenses = monthlyPrincipalInterest + monthlyPropertyTax + monthlyInsurance + hoaFees;

  const grossAnnualIncome = rentCollected * 12;
  const vacancyCost = grossAnnualIncome * (vacancyRate / 100);
  const effectiveGrossIncome = grossAnnualIncome - vacancyCost;
  const maintenanceCost = grossAnnualIncome * (maintenanceCostRate / 100);
  const propertyManagementCost = grossAnnualIncome * (propertyManagementRate / 100);
  const totalOperatingExpenses = monthlyPropertyTax * 12 + monthlyInsurance * 12 + hoaFees * 12 + maintenanceCost + propertyManagementCost;
  const netOperatingIncome = effectiveGrossIncome - totalOperatingExpenses;

  const totalContractorRepairs = contractorRepair1Cost + contractorRepair2Cost + contractorRepair3Cost;

  const capRate = (netOperatingIncome / propertyValue) * 100;
  const cashFlow = netOperatingIncome - totalMonthlyExpenses * 12 - totalContractorRepairs;
  const cashOnCashReturn = (cashFlow / (propertyValue * (downPayment / 100) + totalContractorRepairs)) * 100;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Real Estate Investment Calculator</h1>

      {/* Property Details */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Property Details</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Value</label>
            <input
              type="number"
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment (%)</label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (Years)</label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Tax Rate (%)</label>
            <input
              type="number"
              value={propertyTaxRate}
              onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Rate (%)</label>
            <input
              type="number"
              value={insuranceRate}
              onChange={(e) => setInsuranceRate(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">HOA Fees</label>
          <input
            type="number"
            value={hoaFees}
            onChange={(e) => setHoaFees(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Income & Expense Details */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Income & Expense Details</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rent Collected</label>
            <input
              type="number"
              value={rentCollected}
              onChange={(e) => setRentCollected(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vacancy Rate (%)</label>
            <input
              type="number"
              value={vacancyRate}
              onChange={(e) => setVacancyRate(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Cost Rate (%)</label>
            <input
              type="number"
              value={maintenanceCostRate}
              onChange={(e) => setMaintenanceCostRate(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Management Rate (%)</label>
            <input
              type="number"
              value={propertyManagementRate}
              onChange={(e) => setPropertyManagementRate(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
                <div className="bg-blue-50 p-4 rounded mb-6">
                  <h3 className="font-semibold text-lg mb-3 text-blue-800">Repairs by Contractor</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Repair Description</label>
                      <input
                        type="text"
                        value={contractorRepair1Title}
                        onChange={(e) => setContractorRepair1Title(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter repair description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Cost</label>
                      <input
                        type="number"
                        value={contractorRepair1Cost}
                        onChange={(e) => setContractorRepair1Cost(Number(e.target.value))}
                        className="w-full p-2 border rounded"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Repair Description</label>
                      <input
                        type="text"
                        value={contractorRepair2Title}
                        onChange={(e) => setContractorRepair2Title(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter repair description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Cost</label>
                      <input
                        type="number"
                        value={contractorRepair2Cost}
                        onChange={(e) => setContractorRepair2Cost(Number(e.target.value))}
                        className="w-full p-2 border rounded"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Repair Description</label>
                      <input
                        type="text"
                        value={contractorRepair3Title}
                        onChange={(e) => setContractorRepair3Title(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter repair description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Cost</label>
                      <input
                        type="number"
                        value={contractorRepair3Cost}
                        onChange={(e) => setContractorRepair3Cost(Number(e.target.value))}
                        className="w-full p-2 border rounded"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
      </div>

      {/* Results */}
      <div className="bg-green-100 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-green-800">Results</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-700">Monthly Principal & Interest:</p>
            <p className="font-semibold">${monthlyPrincipalInterest.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-700">Monthly Property Tax:</p>
            <p className="font-semibold">${monthlyPropertyTax.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-700">Monthly Insurance:</p>
            <p className="font-semibold">${monthlyInsurance.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-700">HOA Fees:</p>
            <p className="font-semibold">${hoaFees.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-700">Total Monthly Expenses:</p>
            <p className="font-semibold">${totalMonthlyExpenses.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-700">Gross Annual Income:</p>
            <p className="font-semibold">${grossAnnualIncome.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-700">Vacancy Cost:</p>
            <p className="font-semibold">${vacancyCost.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-700">Effective Gross Income:</p>
            <p className="font-semibold">${effectiveGrossIncome.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-700">Total Operating Expenses:</p>
            <p className="font-semibold">${totalOperatingExpenses.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-700">Net Operating Income (NOI):</p>
            <p className="font-semibold">${netOperatingIncome.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-700">Cap Rate:</p>
            <p className="font-semibold">{capRate.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-gray-700">Cash Flow:</p>
            <p className="font-semibold">${cashFlow.toFixed(2)}</p>
          </div>
           <div>
            <p className="text-gray-700">Cash on Cash Return:</p>
            <p className="font-semibold">{cashOnCashReturn.toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;

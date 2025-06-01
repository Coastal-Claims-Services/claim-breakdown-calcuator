
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const EstimateCalculation = () => {
  const navigate = useNavigate();
  
  // Coverage amounts state
  const [coverageAmount, setCoverageAmount] = useState<number>(0);
  const [policyLimit, setPolicyLimit] = useState<number>(0);
  
  // Sub-limits state
  const [subLimits, setSubLimits] = useState({
    dwelling: 0,
    otherStructures: 0,
    personalProperty: 0,
    lossOfUse: 0,
    medicalPayments: 0,
    personalLiability: 0,
    debris: 0,
    pollutant: 0,
    ordinance: 0,
    legalFees: false,
    paidIncurred: false
  });

  // Deductible state
  const [deductible, setDeductible] = useState<number>(0);

  // Calculate totals for Page 1
  const totalSubLimits = Object.entries(subLimits).reduce((total, [key, value]) => {
    if (typeof value === 'number') {
      return total + value;
    }
    return total;
  }, 0);

  const balance = Math.max(0, coverageAmount - totalSubLimits);
  const ccsFeesPercentage = 10;
  const ccsFees = balance * (ccsFeesPercentage / 100);
  const balanceAfterFees = balance - ccsFees;
  const balanceAfterDeductible = Math.max(0, balanceAfterFees - deductible);

  const handleContinueToRepairs = () => {
    // Pass the balance to the next page via navigation state
    navigate('/final-settlement', { 
      state: { 
        balanceAfterDeductible,
        coverageAmount,
        policyLimit,
        deductible,
        balance,
        ccsFees,
        balanceAfterFees
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">Insurance Estimate Calculator - Page 1</h1>
        
        {/* Coverage Amounts */}
        <Card>
          <CardHeader>
            <CardTitle>Coverage Amounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="coverage-amount">Coverage Amount</Label>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">$</span>
                  <Input
                    id="coverage-amount"
                    type="number"
                    value={coverageAmount || ''}
                    onChange={(e) => setCoverageAmount(Number(e.target.value))}
                    placeholder="Enter coverage amount"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="policy-limit">Policy Limit</Label>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">$</span>
                  <Input
                    id="policy-limit"
                    type="number"
                    value={policyLimit || ''}
                    onChange={(e) => setPolicyLimit(Number(e.target.value))}
                    placeholder="Enter policy limit"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sub-Limits */}
        <Card>
          <CardHeader>
            <CardTitle>Sub-Limits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries({
                dwelling: "Dwelling",
                otherStructures: "Other Structures",
                personalProperty: "Personal Property", 
                lossOfUse: "Loss of Use",
                medicalPayments: "Medical Payments",
                personalLiability: "Personal Liability",
                debris: "Debris",
                pollutant: "Pollutant",
                ordinance: "Ordinance"
              }).map(([key, label]) => (
                <div key={key}>
                  <Label htmlFor={key}>{label}</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">$</span>
                    <Input
                      id={key}
                      type="number"
                      value={subLimits[key as keyof typeof subLimits] || ''}
                      onChange={(e) => setSubLimits(prev => ({
                        ...prev,
                        [key]: Number(e.target.value)
                      }))}
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 mt-6">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="legal-fees"
                  checked={subLimits.legalFees}
                  onCheckedChange={(checked) => setSubLimits(prev => ({
                    ...prev,
                    legalFees: checked as boolean
                  }))}
                />
                <Label htmlFor="legal-fees">Legal Fees</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="paid-incurred"
                  checked={subLimits.paidIncurred}
                  onCheckedChange={(checked) => setSubLimits(prev => ({
                    ...prev,
                    paidIncurred: checked as boolean
                  }))}
                />
                <Label htmlFor="paid-incurred">Paid/Incurred</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calculations */}
        <Card>
          <CardHeader>
            <CardTitle>Calculations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="deductible">Deductible</Label>
              <div className="flex items-center space-x-2">
                <span className="text-lg">$</span>
                <Input
                  id="deductible"
                  type="number"
                  value={deductible || ''}
                  onChange={(e) => setDeductible(Number(e.target.value))}
                  placeholder="Enter deductible amount"
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Balance</span>
                <span className="text-lg font-bold">$ {balance.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">CCS Fees ({ccsFeesPercentage}%)</span>
                <span className="text-lg font-bold">$ {ccsFees.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Balance after Fees</span>
                <span className="text-lg font-bold">$ {balanceAfterFees.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-green-100 p-4 rounded-lg border-2 border-green-300">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Balance + Deductible</span>
                <span className="text-xl font-bold text-green-700">$ {balanceAfterDeductible.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Button 
                onClick={handleContinueToRepairs}
                className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700"
              >
                Continue to Repairs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EstimateCalculation;


import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation, useNavigate } from 'react-router-dom';

const FinalSettlement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the balance from page 1
  const { balanceAfterDeductible = 0 } = location.state || {};
  
  // Repair amounts state
  const [repairToInsured, setRepairToInsured] = useState<number>(0);
  const [repairToContractor, setRepairToContractor] = useState<number>(0);
  const [optionalRoofRepair, setOptionalRoofRepair] = useState<number>(0);

  // Calculate final balance
  const finalBalance = balanceAfterDeductible - repairToInsured - repairToContractor - optionalRoofRepair;

  const handleBackToEstimate = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Final Settlement - Page 2</h1>
          <Button 
            onClick={handleBackToEstimate}
            variant="outline"
          >
            ← Back to Estimate
          </Button>
        </div>

        {/* Starting Balance */}
        <Card>
          <CardHeader>
            <CardTitle>Starting Balance from Page 1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-100 p-4 rounded-lg border-2 border-green-300">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Balance + Deductible</span>
                <span className="text-xl font-bold text-green-700">$ {balanceAfterDeductible.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Repair Calculations */}
        <Card>
          <CardHeader>
            <CardTitle>Repair Amounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="repair-to-insured">Repair to Insured</Label>
              <div className="flex items-center space-x-2">
                <span className="text-lg">$</span>
                <Input
                  id="repair-to-insured"
                  type="number"
                  value={repairToInsured || ''}
                  onChange={(e) => setRepairToInsured(Number(e.target.value))}
                  placeholder="Enter repair amount to insured"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="repair-to-contractor">Repair to Contractor</Label>
              <div className="flex items-center space-x-2">
                <span className="text-lg">$</span>
                <Input
                  id="repair-to-contractor"
                  type="number"
                  value={repairToContractor || ''}
                  onChange={(e) => setRepairToContractor(Number(e.target.value))}
                  placeholder="Enter repair amount to contractor"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="optional-roof-repair">Optional Roof Repair</Label>
              <div className="flex items-center space-x-2">
                <span className="text-lg">$</span>
                <Input
                  id="optional-roof-repair"
                  type="number"
                  value={optionalRoofRepair || ''}
                  onChange={(e) => setOptionalRoofRepair(Number(e.target.value))}
                  placeholder="Enter optional roof repair amount"
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300 mt-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Final Balance</span>
                <span className={`text-xl font-bold ${finalBalance >= 0 ? 'text-blue-700' : 'text-red-700'}`}>
                  $ {finalBalance.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinalSettlement;

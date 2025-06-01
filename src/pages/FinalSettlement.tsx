
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation, useNavigate } from 'react-router-dom';

const FinalSettlement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const calculationData = location.state || {};

  const [optionalRoofRepair, setOptionalRoofRepair] = useState(0);

  const balanceFromPage1 = calculationData.balanceAfterDeductible || 0;
  const finalBalance = balanceFromPage1 + optionalRoofRepair;

  const handleBackToCalculation = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Final Settlement - Page 2</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Summary from Page 1 */}
          <Card className="bg-blue-50">
            <CardHeader>
              <CardTitle className="text-lg">Summary from Page 1</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span>Total Coverage:</span>
                  <span className="font-medium">${(calculationData.totalCoverage || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Repairs:</span>
                  <span className="font-medium">${(calculationData.totalRepairs || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deductible:</span>
                  <span className="font-medium">${(calculationData.deductible || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Balance After Deductible:</span>
                  <span className="text-green-600">${balanceFromPage1.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Additional Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="optionalRoof">Optional Roof Repair</Label>
                <Input
                  id="optionalRoof"
                  type="number"
                  value={optionalRoofRepair}
                  onChange={(e) => setOptionalRoofRepair(Number(e.target.value))}
                  placeholder="0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Final Calculation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Final Settlement Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Balance from Page 1:</span>
                  <span className="font-medium">${balanceFromPage1.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Optional Roof Repair:</span>
                  <span className="font-medium">${optionalRoofRepair.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-xl">
                  <span className="font-bold">Final Balance:</span>
                  <span className="font-bold text-green-600">${finalBalance.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button onClick={handleBackToCalculation} variant="outline" className="flex-1">
              ← Back to Calculation
            </Button>
            <Button className="flex-1" variant="default">
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinalSettlement;

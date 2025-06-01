import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [roofChecked, setRoofChecked] = useState(false);
  const [squares, setSquares] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [coverageAChecked, setCoverageAChecked] = useState(false);
  const [coverageAValue, setCoverageAValue] = useState('');
  const [coverageBChecked, setCoverageBChecked] = useState(false);
  const [coverageBValue, setCoverageBValue] = useState('');
  const [coverageCChecked, setCoverageCChecked] = useState(false);
  const [coverageCValue, setCoverageCValue] = useState('');
  const [coverageDChecked, setCoverageDChecked] = useState(false);
  const [coverageDValue, setCoverageDValue] = useState('');

  const calculateTotal = () => {
    let total = 0;
    if (roofChecked && totalCost) {
      total += parseFloat(totalCost);
    }
    if (coverageAChecked && coverageAValue) {
      total += parseFloat(coverageAValue);
    }
    if (coverageBChecked && coverageBValue) {
      total += parseFloat(coverageBValue);
    }
    if (coverageCChecked && coverageCValue) {
      total += parseFloat(coverageCValue);
    }
    if (coverageDChecked && coverageDValue) {
      total += parseFloat(coverageDValue);
    }
    return total.toFixed(2);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Insurance Loss Estimate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Roof Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="roof"
                  checked={roofChecked}
                  onCheckedChange={setRoofChecked}
                />
                <Label htmlFor="roof" className="text-lg font-semibold">Roof</Label>
              </div>
              
              {roofChecked && (
                <div className="ml-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="squares">Squares:</Label>
                      <Input
                        id="squares"
                        type="number"
                        value={squares}
                        onChange={(e) => setSquares(e.target.value)}
                        placeholder="Enter squares"
                        className="w-32"
                      />
                    </div>
                    <div>
                      <Label htmlFor="totalCost">Total Cost:</Label>
                      <Input
                        id="totalCost"
                        type="number"
                        value={totalCost}
                        onChange={(e) => setTotalCost(e.target.value)}
                        placeholder="Enter total cost"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Coverage A Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="coverageA"
                  checked={coverageAChecked}
                  onCheckedChange={setCoverageAChecked}
                />
                <Label htmlFor="coverageA" className="text-lg font-semibold">Coverage A - Dwelling</Label>
              </div>
              
              {coverageAChecked && (
                <div className="ml-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="coverageAValue">Total Coverage A Value:</Label>
                    <Input
                      id="coverageAValue"
                      type="number"
                      value={coverageAValue}
                      onChange={(e) => setCoverageAValue(e.target.value)}
                      placeholder="Enter Coverage A value"
                    />
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>Sub-limits:</p>
                    <ul className="list-disc ml-5">
                      <li>Foundation: 20% of Coverage A</li>
                      <li>Roofing: 15% of Coverage A</li>
                      <li>Electrical: 10% of Coverage A</li>
                      <li>Plumbing: 10% of Coverage A</li>
                      <li>HVAC: 10% of Coverage A</li>
                      <li>Interior Finishes: 35% of Coverage A</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Coverage B Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="coverageB"
                  checked={coverageBChecked}
                  onCheckedChange={setCoverageBChecked}
                />
                <Label htmlFor="coverageB" className="text-lg font-semibold">Coverage B - Other Structures</Label>
              </div>
              
              {coverageBChecked && (
                <div className="ml-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="coverageBValue">Total Coverage B Value:</Label>
                    <Input
                      id="coverageBValue"
                      type="number"
                      value={coverageBValue}
                      onChange={(e) => setCoverageBValue(e.target.value)}
                      placeholder="Enter Coverage B value"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Coverage C Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="coverageC"
                  checked={coverageCChecked}
                  onCheckedChange={setCoverageCChecked}
                />
                <Label htmlFor="coverageC" className="text-lg font-semibold">Coverage C - Personal Property</Label>
              </div>
              
              {coverageCChecked && (
                <div className="ml-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="coverageCValue">Total Coverage C Value:</Label>
                    <Input
                      id="coverageCValue"
                      type="number"
                      value={coverageCValue}
                      onChange={(e) => setCoverageCValue(e.target.value)}
                      placeholder="Enter Coverage C value"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Coverage D Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="coverageD"
                  checked={coverageDChecked}
                  onCheckedChange={setCoverageDChecked}
                />
                <Label htmlFor="coverageD" className="text-lg font-semibold">Coverage D - Loss of Use</Label>
              </div>
              
              {coverageDChecked && (
                <div className="ml-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="coverageDValue">Total Coverage D Value:</Label>
                    <Input
                      id="coverageDValue"
                      type="number"
                      value={coverageDValue}
                      onChange={(e) => setCoverageDValue(e.target.value)}
                      placeholder="Enter Coverage D value"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Totals Section */}
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Total Estimated Loss:</h3>
                <span className="text-xl font-bold">${calculateTotal()}</span>
              </div>
            </div>

            {/* Print Button */}
            <div className="flex justify-center mt-6">
              <Button onClick={handlePrint} className="print:hidden">
                Print Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;

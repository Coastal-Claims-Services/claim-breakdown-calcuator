
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const EstimateCalculation = () => {
  const navigate = useNavigate();

  // Coverage state
  const [coverageA, setCoverageA] = useState(0);
  const [coverageB, setCoverageB] = useState(0);
  const [coverageC, setCoverageC] = useState(0);
  const [coverageD, setCoverageD] = useState(0);

  // Sub-limits state
  const [coverageASubLimits, setCoverageASubLimits] = useState([
    { name: "Other Structures", amount: 0 },
    { name: "Personal Property", amount: 0 },
    { name: "Additional Living Expenses", amount: 0 }
  ]);

  const [coverageBAmount, setCoverageBAmount] = useState(0);
  const [coverageCAmount, setCoverageCAmount] = useState(0);
  const [coverageDAmount, setCoverageDAmount] = useState(0);

  // Repairs by insured
  const [interiorRepairs, setInteriorRepairs] = useState(0);
  const [exteriorRepairs, setExteriorRepairs] = useState(0);
  const [fences, setFences] = useState(0);
  const [screenEnclosure, setScreenEnclosure] = useState(0);

  // Repairs by contractor
  const [roofSquares, setRoofSquares] = useState(0);
  const [additionalRoofSquares, setAdditionalRoofSquares] = useState(0);
  const [gutterLinearFeet, setGutterLinearFeet] = useState(0);
  const [solarPanels, setSolarPanels] = useState(0);
  const [soffitLinearFeet, setSoffitLinearFeet] = useState(0);
  const [fasciaLinearFeet, setFasciaLinearFeet] = useState(0);

  // Payment information
  const [priorPayments, setPriorPayments] = useState(0);
  const [paymentsWithoutFees, setPaymentsWithoutFees] = useState(0);
  const [deductible, setDeductible] = useState(0);

  // Calculations
  const totalCoverageA = coverageA + coverageASubLimits.reduce((sum, item) => sum + item.amount, 0);
  const totalCoverageB = coverageB + coverageBAmount;
  const totalCoverageC = coverageC + coverageCAmount;
  const totalCoverageD = coverageD + coverageDAmount;
  const totalCoverage = totalCoverageA + totalCoverageB + totalCoverageC + totalCoverageD;

  const totalRepairsByInsured = interiorRepairs + exteriorRepairs + fences + screenEnclosure;

  const roofCost = roofSquares * 150;
  const additionalRoofCost = additionalRoofSquares * 150;
  const gutterCost = gutterLinearFeet * 25;
  const solarCost = solarPanels * 500;
  const soffitCost = soffitLinearFeet * 15;
  const fasciaCost = fasciaLinearFeet * 20;
  const totalRepairsByContractor = roofCost + additionalRoofCost + gutterCost + solarCost + soffitCost + fasciaCost;

  const totalRepairs = totalRepairsByInsured + totalRepairsByContractor;
  const balance = Math.min(totalRepairs, totalCoverage) - priorPayments - paymentsWithoutFees;
  const balanceAfterDeductible = Math.max(0, balance - deductible);

  const handleContinue = () => {
    const calculationData = {
      balance,
      balanceAfterDeductible,
      totalCoverage,
      totalRepairs,
      deductible
    };
    navigate('/final-settlement', { state: calculationData });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Insurance Estimate Calculation - Page 1</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Coverage Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Coverage Amounts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="coverageA">Coverage A - Dwelling</Label>
                  <Input
                    id="coverageA"
                    type="number"
                    value={coverageA}
                    onChange={(e) => setCoverageA(Number(e.target.value))}
                    placeholder="0"
                  />
                </div>
                
                {coverageASubLimits.map((limit, index) => (
                  <div key={index}>
                    <Label>{limit.name}</Label>
                    <Input
                      type="number"
                      value={limit.amount}
                      onChange={(e) => {
                        const newLimits = [...coverageASubLimits];
                        newLimits[index].amount = Number(e.target.value);
                        setCoverageASubLimits(newLimits);
                      }}
                      placeholder="0"
                    />
                  </div>
                ))}

                <div>
                  <Label htmlFor="coverageB">Coverage B</Label>
                  <Input
                    id="coverageB"
                    type="number"
                    value={coverageB}
                    onChange={(e) => setCoverageB(Number(e.target.value))}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="coverageBAmount">Coverage B Amount</Label>
                  <Input
                    id="coverageBAmount"
                    type="number"
                    value={coverageBAmount}
                    onChange={(e) => setCoverageBAmount(Number(e.target.value))}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="coverageC">Coverage C</Label>
                  <Input
                    id="coverageC"
                    type="number"
                    value={coverageC}
                    onChange={(e) => setCoverageC(Number(e.target.value))}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="coverageCAmount">Coverage C Amount</Label>
                  <Input
                    id="coverageCAmount"
                    type="number"
                    value={coverageCAmount}
                    onChange={(e) => setCoverageCAmount(Number(e.target.value))}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="coverageD">Coverage D</Label>
                  <Input
                    id="coverageD"
                    type="number"
                    value={coverageD}
                    onChange={(e) => setCoverageD(Number(e.target.value))}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="coverageDAmount">Coverage D Amount</Label>
                  <Input
                    id="coverageDAmount"
                    type="number"
                    value={coverageDAmount}
                    onChange={(e) => setCoverageDAmount(Number(e.target.value))}
                    placeholder="0"
                  />
                </div>

                <div className="pt-2 border-t">
                  <strong>Total Coverage: ${totalCoverage.toLocaleString()}</strong>
                </div>
              </CardContent>
            </Card>

            {/* Repairs Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Repair Estimates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Repairs by Insured */}
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-3">Repairs by Insured</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="interior">Interior Repairs</Label>
                      <Input
                        id="interior"
                        type="number"
                        value={interiorRepairs}
                        onChange={(e) => setInteriorRepairs(Number(e.target.value))}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="exterior">Exterior Repairs</Label>
                      <Input
                        id="exterior"
                        type="number"
                        value={exteriorRepairs}
                        onChange={(e) => setExteriorRepairs(Number(e.target.value))}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="fences">Fences</Label>
                      <Input
                        id="fences"
                        type="number"
                        value={fences}
                        onChange={(e) => setFences(Number(e.target.value))}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="screen">Screen Enclosure</Label>
                      <Input
                        id="screen"
                        type="number"
                        value={screenEnclosure}
                        onChange={(e) => setScreenEnclosure(Number(e.target.value))}
                        placeholder="0"
                      />
                    </div>

                    <div className="text-sm font-medium">
                      Subtotal: ${totalRepairsByInsured.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Repairs by Contractor */}
                <div>
                  <h3 className="font-semibold mb-3">Repairs by Contractor</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="roof">Roof (squares @ $150)</Label>
                      <Input
                        id="roof"
                        type="number"
                        value={roofSquares}
                        onChange={(e) => setRoofSquares(Number(e.target.value))}
                        placeholder="0"
                      />
                      <div className="text-sm text-gray-600">${roofCost.toLocaleString()}</div>
                    </div>

                    <div>
                      <Label htmlFor="additionalRoof">Additional Roof (squares @ $150)</Label>
                      <Input
                        id="additionalRoof"
                        type="number"
                        value={additionalRoofSquares}
                        onChange={(e) => setAdditionalRoofSquares(Number(e.target.value))}
                        placeholder="0"
                      />
                      <div className="text-sm text-gray-600">${additionalRoofCost.toLocaleString()}</div>
                    </div>

                    <div>
                      <Label htmlFor="gutter">Gutter (linear feet @ $25)</Label>
                      <Input
                        id="gutter"
                        type="number"
                        value={gutterLinearFeet}
                        onChange={(e) => setGutterLinearFeet(Number(e.target.value))}
                        placeholder="0"
                      />
                      <div className="text-sm text-gray-600">${gutterCost.toLocaleString()}</div>
                    </div>

                    <div>
                      <Label htmlFor="solar">Solar (panels @ $500)</Label>
                      <Input
                        id="solar"
                        type="number"
                        value={solarPanels}
                        onChange={(e) => setSolarPanels(Number(e.target.value))}
                        placeholder="0"
                      />
                      <div className="text-sm text-gray-600">${solarCost.toLocaleString()}</div>
                    </div>

                    <div>
                      <Label htmlFor="soffit">Soffit (linear feet @ $15)</Label>
                      <Input
                        id="soffit"
                        type="number"
                        value={soffitLinearFeet}
                        onChange={(e) => setSoffitLinearFeet(Number(e.target.value))}
                        placeholder="0"
                      />
                      <div className="text-sm text-gray-600">${soffitCost.toLocaleString()}</div>
                    </div>

                    <div>
                      <Label htmlFor="fascia">Fascia (linear feet @ $20)</Label>
                      <Input
                        id="fascia"
                        type="number"
                        value={fasciaLinearFeet}
                        onChange={(e) => setFasciaLinearFeet(Number(e.target.value))}
                        placeholder="0"
                      />
                      <div className="text-sm text-gray-600">${fasciaCost.toLocaleString()}</div>
                    </div>

                    <div className="text-sm font-medium">
                      Subtotal: ${totalRepairsByContractor.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <strong>Total Repairs: ${totalRepairs.toLocaleString()}</strong>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Final Calculations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Final Calculations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="priorPayments">Prior Payments</Label>
                  <Input
                    id="priorPayments"
                    type="number"
                    value={priorPayments}
                    onChange={(e) => setPriorPayments(Number(e.target.value))}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="paymentsWithoutFees">Payments Without Fees</Label>
                  <Input
                    id="paymentsWithoutFees"
                    type="number"
                    value={paymentsWithoutFees}
                    onChange={(e) => setPaymentsWithoutFees(Number(e.target.value))}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="deductible">Deductible</Label>
                  <Input
                    id="deductible"
                    type="number"
                    value={deductible}
                    onChange={(e) => setDeductible(Number(e.target.value))}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Total Repairs:</span>
                  <span className="font-medium">${totalRepairs.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Coverage:</span>
                  <span className="font-medium">${totalCoverage.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Covered Amount:</span>
                  <span className="font-medium">${Math.min(totalRepairs, totalCoverage).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Prior Payments:</span>
                  <span className="font-medium">-${priorPayments.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payments Without Fees:</span>
                  <span className="font-medium">-${paymentsWithoutFees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Balance:</span>
                  <span className="font-semibold">${balance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deductible:</span>
                  <span className="font-medium">-${deductible.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-lg">
                  <span className="font-bold">Balance After Deductible:</span>
                  <span className="font-bold text-green-600">${balanceAfterDeductible.toLocaleString()}</span>
                </div>
              </div>

              <Button onClick={handleContinue} className="w-full mt-4" size="lg">
                Continue to Final Settlement →
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default EstimateCalculation;

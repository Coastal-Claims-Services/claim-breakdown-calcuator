
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  // State for all form inputs
  const [rcv, setRcv] = useState(0);
  const [depreciation, setDepreciation] = useState(0);
  const [acv, setAcv] = useState(0);
  const [deductible, setDeductible] = useState(0);
  const [netClaim, setNetClaim] = useState(0);
  
  // Coverage amounts
  const [dwellingCoverage, setDwellingCoverage] = useState(0);
  const [otherStructuresCoverage, setOtherStructuresCoverage] = useState(0);
  const [personalPropertyCoverage, setPersonalPropertyCoverage] = useState(0);
  const [lossOfUseCoverage, setLossOfUseCoverage] = useState(0);
  
  // Policy limits
  const [policyLimit, setPolicyLimit] = useState(0);
  
  // Sub-limits with checkboxes
  const [roofSurfacingLimit, setRoofSurfacingLimit] = useState(0);
  const [roofSurfacingChecked, setRoofSurfacingChecked] = useState(false);
  const [ordinanceLawLimit, setOrdinanceLawLimit] = useState(0);
  const [ordinanceLawChecked, setOrdinanceLawChecked] = useState(false);
  const [moldLimit, setMoldLimit] = useState(0);
  const [moldChecked, setMoldChecked] = useState(false);
  
  // Calculate values
  useEffect(() => {
    setAcv(rcv - depreciation);
  }, [rcv, depreciation]);
  
  useEffect(() => {
    setNetClaim(Math.max(0, acv - deductible));
  }, [acv, deductible]);

  const balanceAfterDeductible = netClaim;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Insurance Claim Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Calculation Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="rcv">RCV (Replacement Cost Value)</Label>
                  <Input
                    id="rcv"
                    type="number"
                    value={rcv || ""}
                    onChange={(e) => setRcv(Number(e.target.value))}
                    className="text-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="depreciation">Depreciation</Label>
                  <Input
                    id="depreciation"
                    type="number"
                    value={depreciation || ""}
                    onChange={(e) => setDepreciation(Number(e.target.value))}
                    className="text-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="acv">ACV (Actual Cash Value)</Label>
                  <Input
                    id="acv"
                    type="number"
                    value={acv}
                    readOnly
                    className="text-lg bg-gray-100"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="deductible">Deductible</Label>
                  <Input
                    id="deductible"
                    type="number"
                    value={deductible || ""}
                    onChange={(e) => setDeductible(Number(e.target.value))}
                    className="text-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="netClaim">Net Claim</Label>
                  <Input
                    id="netClaim"
                    type="number"
                    value={netClaim}
                    readOnly
                    className="text-lg bg-gray-100"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Coverage Amounts Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Coverage Amounts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dwelling">Dwelling Coverage</Label>
                  <Input
                    id="dwelling"
                    type="number"
                    value={dwellingCoverage || ""}
                    onChange={(e) => setDwellingCoverage(Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="otherStructures">Other Structures Coverage</Label>
                  <Input
                    id="otherStructures"
                    type="number"
                    value={otherStructuresCoverage || ""}
                    onChange={(e) => setOtherStructuresCoverage(Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="personalProperty">Personal Property Coverage</Label>
                  <Input
                    id="personalProperty"
                    type="number"
                    value={personalPropertyCoverage || ""}
                    onChange={(e) => setPersonalPropertyCoverage(Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="lossOfUse">Loss of Use Coverage</Label>
                  <Input
                    id="lossOfUse"
                    type="number"
                    value={lossOfUseCoverage || ""}
                    onChange={(e) => setLossOfUseCoverage(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Policy Limits Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Policy Limits</h3>
              <div>
                <Label htmlFor="policyLimit">Policy Limit</Label>
                <Input
                  id="policyLimit"
                  type="number"
                  value={policyLimit || ""}
                  onChange={(e) => setPolicyLimit(Number(e.target.value))}
                />
              </div>
            </div>

            <Separator />

            {/* Sub-Limits Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Sub-Limits</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    id="roofSurfacing"
                    checked={roofSurfacingChecked}
                    onCheckedChange={setRoofSurfacingChecked}
                  />
                  <Label htmlFor="roofSurfacing" className="flex-1">
                    Roof Surfacing Limit
                  </Label>
                  <Input
                    type="number"
                    value={roofSurfacingLimit || ""}
                    onChange={(e) => setRoofSurfacingLimit(Number(e.target.value))}
                    className="w-32"
                    disabled={!roofSurfacingChecked}
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <Checkbox
                    id="ordinanceLaw"
                    checked={ordinanceLawChecked}
                    onCheckedChange={setOrdinanceLawChecked}
                  />
                  <Label htmlFor="ordinanceLaw" className="flex-1">
                    Ordinance & Law Limit
                  </Label>
                  <Input
                    type="number"
                    value={ordinanceLawLimit || ""}
                    onChange={(e) => setOrdinanceLawLimit(Number(e.target.value))}
                    className="w-32"
                    disabled={!ordinanceLawChecked}
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <Checkbox
                    id="mold"
                    checked={moldChecked}
                    onCheckedChange={setMoldChecked}
                  />
                  <Label htmlFor="mold" className="flex-1">
                    Mold Limit
                  </Label>
                  <Input
                    type="number"
                    value={moldLimit || ""}
                    onChange={(e) => setMoldLimit(Number(e.target.value))}
                    className="w-32"
                    disabled={!moldChecked}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Final Balance Section */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-center">
                <Label className="text-xl font-bold">Balance + Deductible</Label>
                <div className="text-3xl font-bold text-blue-600 mt-2">
                  ${(balanceAfterDeductible + deductible).toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;

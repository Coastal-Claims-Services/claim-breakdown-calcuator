import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  // All state variables for claim info, coverage, etc.
  const [claimNumber, setClaimNumber] = useState('');
  const [dateOfLoss, setDateOfLoss] = useState('');
  const [insured, setInsured] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [adjuster, setAdjuster] = useState('');
  const [carrierClaimNumber, setCarrierClaimNumber] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [deductible, setDeductible] = useState('');
  const [limit, setLimit] = useState('');

  // Coverage states
  const [dwelling, setDwelling] = useState('');
  const [detachedStructures, setDetachedStructures] = useState('');
  const [personalProperty, setPersonalProperty] = useState('');
  const [lossOfUse, setLossOfUse] = useState('');
  const [personalLiability, setPersonalLiability] = useState('');
  const [medicalPayments, setMedicalPayments] = useState('');

  // Sub-limits states
  const [jewelry, setJewelry] = useState('');
  const [firearms, setFirearms] = useState('');
  const [silverware, setSilverware] = useState('');
  const [golfers, setGolfers] = useState('');
  const [furs, setFurs] = useState('');
  const [electronics, setElectronics] = useState('');
  const [bicycles, setBicycles] = useState('');
  const [cameras, setCameras] = useState('');
  const [musical, setMusical] = useState('');
  const [stamps, setStamps] = useState('');
  const [coins, setCoins] = useState('');
  const [fine, setFine] = useState('');

  // RCV and ACV states
  const [roofRCV, setRoofRCV] = useState('');
  const [roofACV, setRoofACV] = useState('');
  const [exteriorRCV, setExteriorRCV] = useState('');
  const [exteriorACV, setExteriorACV] = useState('');
  const [interiorRCV, setInteriorRCV] = useState('');
  const [interiorACV, setInteriorACV] = useState('');
  const [contentsRCV, setContentsRCV] = useState('');
  const [contentsACV, setContentsACV] = useState('');
  const [lossOfUseRCV, setLossOfUseRCV] = useState('');
  const [lossOfUseACV, setLossOfUseACV] = useState('');

  // Repair by Insured states
  const [repairItem1, setRepairItem1] = useState('');
  const [repairCost1, setRepairCost1] = useState('');
  const [repairItem2, setRepairItem2] = useState('');
  const [repairCost2, setRepairCost2] = useState('');
  const [repairItem3, setRepairItem3] = useState('');
  const [repairCost3, setRepairCost3] = useState('');

  // Repair by Contractor states
  const [contractorItem1, setContractorItem1] = useState('');
  const [contractorCost1, setContractorCost1] = useState('');
  const [contractorItem2, setContractorItem2] = useState('');
  const [contractorCost2, setContractorCost2] = useState('');
  const [contractorItem3, setContractorItem3] = useState('Plywood');
  const [contractorCost3, setContractorCost3] = useState('');

  // All calculation functions
  const calculateTotalRCV = () => {
    const roof = parseFloat(roofRCV) || 0;
    const exterior = parseFloat(exteriorRCV) || 0;
    const interior = parseFloat(interiorRCV) || 0;
    const contents = parseFloat(contentsRCV) || 0;
    const lossUse = parseFloat(lossOfUseRCV) || 0;
    return roof + exterior + interior + contents + lossUse;
  };

  const calculateTotalACV = () => {
    const roof = parseFloat(roofACV) || 0;
    const exterior = parseFloat(exteriorACV) || 0;
    const interior = parseFloat(interiorACV) || 0;
    const contents = parseFloat(contentsACV) || 0;
    const lossUse = parseFloat(lossOfUseACV) || 0;
    return roof + exterior + interior + contents + lossUse;
  };

  const calculateBalance = () => {
    return calculateTotalRCV() - calculateTotalACV();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Insurance Claim Report</h1>
        
        {/* Claim Information section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Claim Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="claimNumber">Claim Number</Label>
                <Input
                  id="claimNumber"
                  value={claimNumber}
                  onChange={(e) => setClaimNumber(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="dateOfLoss">Date of Loss</Label>
                <Input
                  id="dateOfLoss"
                  type="date"
                  value={dateOfLoss}
                  onChange={(e) => setDateOfLoss(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="insured">Insured</Label>
                <Input
                  id="insured"
                  value={insured}
                  onChange={(e) => setInsured(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="propertyAddress">Property Address</Label>
                <Input
                  id="propertyAddress"
                  value={propertyAddress}
                  onChange={(e) => setPropertyAddress(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="adjuster">Adjuster</Label>
                <Input
                  id="adjuster"
                  value={adjuster}
                  onChange={(e) => setAdjuster(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="carrierClaimNumber">Carrier Claim Number</Label>
                <Input
                  id="carrierClaimNumber"
                  value={carrierClaimNumber}
                  onChange={(e) => setCarrierClaimNumber(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="policyNumber">Policy Number</Label>
                <Input
                  id="policyNumber"
                  value={policyNumber}
                  onChange={(e) => setPolicyNumber(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="deductible">Deductible</Label>
                <Input
                  id="deductible"
                  type="number"
                  value={deductible}
                  onChange={(e) => setDeductible(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="limit">Policy Limit</Label>
                <Input
                  id="limit"
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coverage Limits section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Coverage Limits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dwelling">Dwelling</Label>
                <Input
                  id="dwelling"
                  type="number"
                  value={dwelling}
                  onChange={(e) => setDwelling(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="detachedStructures">Detached Structures</Label>
                <Input
                  id="detachedStructures"
                  type="number"
                  value={detachedStructures}
                  onChange={(e) => setDetachedStructures(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="personalProperty">Personal Property</Label>
                <Input
                  id="personalProperty"
                  type="number"
                  value={personalProperty}
                  onChange={(e) => setPersonalProperty(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lossOfUse">Loss of Use</Label>
                <Input
                  id="lossOfUse"
                  type="number"
                  value={lossOfUse}
                  onChange={(e) => setLossOfUse(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="personalLiability">Personal Liability</Label>
                <Input
                  id="personalLiability"
                  type="number"
                  value={personalLiability}
                  onChange={(e) => setPersonalLiability(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="medicalPayments">Medical Payments</Label>
                <Input
                  id="medicalPayments"
                  type="number"
                  value={medicalPayments}
                  onChange={(e) => setMedicalPayments(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sub-limits section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Sub-limits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="jewelry">Jewelry</Label>
                <Input
                  id="jewelry"
                  type="number"
                  value={jewelry}
                  onChange={(e) => setJewelry(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="firearms">Firearms</Label>
                <Input
                  id="firearms"
                  type="number"
                  value={firearms}
                  onChange={(e) => setFirearms(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="silverware">Silverware</Label>
                <Input
                  id="silverware"
                  type="number"
                  value={silverware}
                  onChange={(e) => setSilverware(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="golfers">Golfer's Equipment</Label>
                <Input
                  id="golfers"
                  type="number"
                  value={golfers}
                  onChange={(e) => setGolfers(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="furs">Furs</Label>
                <Input
                  id="furs"
                  type="number"
                  value={furs}
                  onChange={(e) => setFurs(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="electronics">Electronics</Label>
                <Input
                  id="electronics"
                  type="number"
                  value={electronics}
                  onChange={(e) => setElectronics(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="bicycles">Bicycles</Label>
                <Input
                  id="bicycles"
                  type="number"
                  value={bicycles}
                  onChange={(e) => setBicycles(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cameras">Cameras</Label>
                <Input
                  id="cameras"
                  type="number"
                  value={cameras}
                  onChange={(e) => setCameras(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="musical">Musical Instruments</Label>
                <Input
                  id="musical"
                  type="number"
                  value={musical}
                  onChange={(e) => setMusical(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="stamps">Stamps</Label>
                <Input
                  id="stamps"
                  type="number"
                  value={stamps}
                  onChange={(e) => setStamps(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="coins">Coins</Label>
                <Input
                  id="coins"
                  type="number"
                  value={coins}
                  onChange={(e) => setCoins(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="fine">Fine Arts</Label>
                <Input
                  id="fine"
                  type="number"
                  value={fine}
                  onChange={(e) => setFine(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Damage Estimate section with RCV/ACV table */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Damage Estimate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Item</th>
                    <th className="border border-gray-300 p-2 text-center">RCV</th>
                    <th className="border border-gray-300 p-2 text-center">ACV</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">Roof</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        type="number"
                        value={roofRCV}
                        onChange={(e) => setRoofRCV(e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        type="number"
                        value={roofACV}
                        onChange={(e) => setRoofACV(e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">Exterior</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        type="number"
                        value={exteriorRCV}
                        onChange={(e) => setExteriorRCV(e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        type="number"
                        value={exteriorACV}
                        onChange={(e) => setExteriorACV(e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">Interior</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        type="number"
                        value={interiorRCV}
                        onChange={(e) => setInteriorRCV(e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        type="number"
                        value={interiorACV}
                        onChange={(e) => setInteriorACV(e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">Contents</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        type="number"
                        value={contentsRCV}
                        onChange={(e) => setContentsRCV(e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        type="number"
                        value={contentsACV}
                        onChange={(e) => setContentsACV(e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">Loss of Use</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        type="number"
                        value={lossOfUseRCV}
                        onChange={(e) => setLossOfUseRCV(e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        type="number"
                        value={lossOfUseACV}
                        onChange={(e) => setLossOfUseACV(e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr className="bg-gray-50 font-bold">
                    <td className="border border-gray-300 p-2">Total</td>
                    <td className="border border-gray-300 p-2 text-center">
                      {formatCurrency(calculateTotalRCV())}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {formatCurrency(calculateTotalACV())}
                    </td>
                  </tr>
                  <tr className="bg-blue-50 font-bold">
                    <td className="border border-gray-300 p-2">Balance</td>
                    <td className="border border-gray-300 p-2 text-center" colSpan={2}>
                      {formatCurrency(calculateBalance())}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Repair Sections */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Repair Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="insured" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="insured">Repair by Insured</TabsTrigger>
                <TabsTrigger value="contractor">Repair by Contractor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="insured" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="repairItem1">Repair Item 1</Label>
                      <Input
                        id="repairItem1"
                        value={repairItem1}
                        onChange={(e) => setRepairItem1(e.target.value)}
                        placeholder="Enter repair item"
                      />
                    </div>
                    <div>
                      <Label htmlFor="repairCost1">Cost</Label>
                      <Input
                        id="repairCost1"
                        type="number"
                        value={repairCost1}
                        onChange={(e) => setRepairCost1(e.target.value)}
                        placeholder="Enter cost"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="repairItem2">Repair Item 2</Label>
                      <Input
                        id="repairItem2"
                        value={repairItem2}
                        onChange={(e) => setRepairItem2(e.target.value)}
                        placeholder="Enter repair item"
                      />
                    </div>
                    <div>
                      <Label htmlFor="repairCost2">Cost</Label>
                      <Input
                        id="repairCost2"
                        type="number"
                        value={repairCost2}
                        onChange={(e) => setRepairCost2(e.target.value)}
                        placeholder="Enter cost"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="repairItem3">Repair Item 3</Label>
                      <Input
                        id="repairItem3"
                        value={repairItem3}
                        onChange={(e) => setRepairItem3(e.target.value)}
                        placeholder="Enter repair item"
                      />
                    </div>
                    <div>
                      <Label htmlFor="repairCost3">Cost</Label>
                      <Input
                        id="repairCost3"
                        type="number"
                        value={repairCost3}
                        onChange={(e) => setRepairCost3(e.target.value)}
                        placeholder="Enter cost"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="contractor" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contractorItem1">Contractor Item 1</Label>
                      <Input
                        id="contractorItem1"
                        value={contractorItem1}
                        onChange={(e) => setContractorItem1(e.target.value)}
                        placeholder="Enter contractor item"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contractorCost1">Cost</Label>
                      <Input
                        id="contractorCost1"
                        type="number"
                        value={contractorCost1}
                        onChange={(e) => setContractorCost1(e.target.value)}
                        placeholder="Enter cost"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contractorItem2">Contractor Item 2</Label>
                      <Input
                        id="contractorItem2"
                        value={contractorItem2}
                        onChange={(e) => setContractorItem2(e.target.value)}
                        placeholder="Enter contractor item"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contractorCost2">Cost</Label>
                      <Input
                        id="contractorCost2"
                        type="number"
                        value={contractorCost2}
                        onChange={(e) => setContractorCost2(e.target.value)}
                        placeholder="Enter cost"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contractorItem3">Contractor Item 3</Label>
                      <Input
                        id="contractorItem3"
                        value={contractorItem3}
                        onChange={(e) => setContractorItem3(e.target.value)}
                        placeholder="Enter contractor item"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contractorCost3">Cost</Label>
                      <Input
                        id="contractorCost3"
                        type="number"
                        value={contractorCost3}
                        onChange={(e) => setContractorCost3(e.target.value)}
                        placeholder="Enter cost"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;

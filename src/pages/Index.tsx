import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Index() {
  const [repairByContractorAmount, setRepairByContractorAmount] = useState<string>('');
  const [repairByOwnerAmount, setRepairByOwnerAmount] = useState<string>('');
  const [repairByInsuranceAmount, setRepairByInsuranceAmount] = useState<string>('');
  const [roofRepairAmount, setRoofRepairAmount] = useState<string>('');

  const calculateRepairByContractorTotal = () => {
    const base = parseFloat(repairByContractorAmount) || 0;
    const roof = parseFloat(roofRepairAmount) || 0;
    return base + roof;
  };

  const calculateTotal = () => {
    const repairByContractor = parseFloat(repairByContractorAmount) || 0;
    const repairByOwner = parseFloat(repairByOwnerAmount) || 0;
    const repairByInsurance = parseFloat(repairByInsuranceAmount) || 0;
    const roofRepair = parseFloat(roofRepairAmount) || 0;
    return repairByContractor + repairByOwner + repairByInsurance + roofRepair;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Repair Cost Calculator</h1>

      {/* Repair by Contractor */}
      <Card>
        <CardHeader>
          <CardTitle>Repair by Contractor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4 items-center">
            <Label>Repair by Contractor:</Label>
            <Input
              type="number"
              step="0.01"
              value={repairByContractorAmount}
              onChange={(e) => setRepairByContractorAmount(e.target.value)}
              className="w-full"
            />
            <div className="font-semibold">
              ${parseFloat(repairByContractorAmount) || 0}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 items-center">
            <Label>Repair Roof (Optional):</Label>
            <Input
              type="number"
              step="0.01"
              value={roofRepairAmount}
              onChange={(e) => setRoofRepairAmount(e.target.value)}
              className="w-full"
              placeholder="Enter amount for plywood, etc."
            />
            <div className="font-semibold">
              ${parseFloat(roofRepairAmount) || 0}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 items-center border-t pt-4">
            <Label className="font-bold">Total:</Label>
            <div></div>
            <div className="font-bold text-lg">
              ${calculateRepairByContractorTotal().toFixed(2)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Repair by Owner */}
      <Card>
        <CardHeader>
          <CardTitle>Repair by Owner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 items-center">
            <Label>Repair by Owner:</Label>
            <Input
              type="number"
              step="0.01"
              value={repairByOwnerAmount}
              onChange={(e) => setRepairByOwnerAmount(e.target.value)}
              className="w-full"
            />
            <div className="font-semibold">
              ${parseFloat(repairByOwnerAmount) || 0}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Repair by Insurance */}
      <Card>
        <CardHeader>
          <CardTitle>Repair by Insurance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 items-center">
            <Label>Repair by Insurance:</Label>
            <Input
              type="number"
              step="0.01"
              value={repairByInsuranceAmount}
              onChange={(e) => setRepairByInsuranceAmount(e.target.value)}
              className="w-full"
            />
            <div className="font-semibold">
              ${parseFloat(repairByInsuranceAmount) || 0}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total */}
      <Card>
        <CardHeader>
          <CardTitle>Total Repair Costs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${calculateTotal().toFixed(2)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

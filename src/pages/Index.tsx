import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import { PrintPreview } from '@/components/PrintPreview';
import { Textarea } from '@/components/ui/textarea';

const Index = () => {
  const [releaseType, setReleaseType] = useState('');
  const [customReleaseTypeName, setCustomReleaseTypeName] = useState('');
  const [openingStatement, setOpeningStatement] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [deductible, setDeductible] = useState('');
  const [coverageA, setCoverageA] = useState('');
  const [coverageB, setCoverageB] = useState('');
  const [coverageC, setCoverageC] = useState('');
  const [coverageD, setCoverageD] = useState('');
  const [customSubLimits, setCustomSubLimits] = useState([
    { id: 1, type: 'Firearms', amount: '', policyLimit: '', checked: false },
    { id: 2, type: 'Cash', amount: '', policyLimit: '', checked: false },
    { id: 3, type: 'Jewelry', amount: '', policyLimit: '', checked: false },
    { id: 4, type: 'Computers', amount: '', policyLimit: '', checked: false },
    { id: 5, type: 'Furs', amount: '', policyLimit: '', checked: false },
  ]);
  const [priorPayments, setPriorPayments] = useState([
    { id: 1, amount: '', description: '', paFeesChecked: false, paFeesPercent: '10', paFeesAmount: '' }
  ]);
  const [paymentsWithoutFees, setPaymentsWithoutFees] = useState([
    { id: 1, type: 'legalFees', typeName: 'Legal Fees', amount: '', checked: false }
  ]);
  const [customPaymentDeductions, setCustomPaymentDeductions] = useState([]);
  const [customInsuredRepairs, setCustomInsuredRepairs] = useState([]);
  const [customContractorRepairs, setCustomContractorRepairs] = useState([]);
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  // Add new state for insured information
  const [insuredName, setInsuredName] = useState('');
  const [insuredAddress, setInsuredAddress] = useState('');
  const [insuredClaimNumber, setInsuredClaimNumber] = useState('');

  const calculateCoverageTotal = () => {
    const a = parseFloat(coverageA) || 0;
    const b = parseFloat(coverageB) || 0;
    const c = parseFloat(coverageC) || 0;
    const d = parseFloat(coverageD) || 0;
    return a + b + c + d;
  };

  const calculatePriorPaymentsTotal = () => {
    return priorPayments.reduce((total, payment) => {
      const amount = parseFloat(payment.amount) || 0;
      const paFees = payment.paFeesChecked ? parseFloat(payment.paFeesAmount) || 0 : 0;
      return total + amount + paFees;
    }, 0);
  };

  const calculatePaymentsWithoutFeesTotal = () => {
    return paymentsWithoutFees.reduce((total, payment) => {
      return payment.checked ? total + (parseFloat(payment.amount) || 0) : total;
    }, 0);
  };

  const calculateCustomPaymentDeductionsTotal = () => {
    return customPaymentDeductions.reduce((total, payment) => {
      return payment.checked ? total + (parseFloat(payment.amount) || 0) : total;
    }, 0);
  };

  const calculateCustomInsuredRepairsTotal = () => {
    return customInsuredRepairs.reduce((total, repair) => {
      return repair.checked ? total + (parseFloat(repair.amount) || 0) : total;
    }, 0);
  };

  const calculateCustomContractorRepairsTotal = () => {
    return customContractorRepairs.reduce((total, repair) => {
      return repair.checked ? total + (parseFloat(repair.amount) || 0) : total;
    }, 0);
  };

  const calculateFinalBalance = () => {
    const totalCoverage = calculateCoverageTotal();
    const deductibleAmount = parseFloat(deductible) || 0;
    const priorPaymentsTotal = calculatePriorPaymentsTotal();
    const paymentsWithoutFeesTotal = calculatePaymentsWithoutFeesTotal();
    const customPaymentDeductionsTotal = calculateCustomPaymentDeductionsTotal();
    const insuredRepairsTotal = calculateCustomInsuredRepairsTotal();
    const contractorRepairsTotal = calculateCustomContractorRepairsTotal();
    
    return totalCoverage - deductibleAmount - priorPaymentsTotal - paymentsWithoutFeesTotal - customPaymentDeductionsTotal - insuredRepairsTotal - contractorRepairsTotal;
  };

  useEffect(() => {
    priorPayments.forEach((payment, index) => {
      if (payment.paFeesChecked) {
        const amount = parseFloat(payment.amount) || 0;
        const percent = parseFloat(payment.paFeesPercent) || 0;
        const feesAmount = (amount * percent / 100).toFixed(2);
        
        const updatedPayments = [...priorPayments];
        updatedPayments[index] = { ...payment, paFeesAmount: feesAmount };
        setPriorPayments(updatedPayments);
      }
    });
  }, [priorPayments.map(p => `${p.amount}-${p.paFeesPercent}-${p.paFeesChecked}`).join('|')]);

  const addPriorPayment = () => {
    const newId = Math.max(...priorPayments.map(p => p.id), 0) + 1;
    setPriorPayments([...priorPayments, {
      id: newId,
      amount: '',
      description: '',
      paFeesChecked: false,
      paFeesPercent: '10',
      paFeesAmount: ''
    }]);
  };

  const removePriorPayment = (id) => {
    setPriorPayments(priorPayments.filter(payment => payment.id !== id));
  };

  const updatePriorPayment = (id, field, value) => {
    setPriorPayments(priorPayments.map(payment => 
      payment.id === id ? { ...payment, [field]: value } : payment
    ));
  };

  const addCustomPaymentDeduction = () => {
    const newId = Math.max(...customPaymentDeductions.map(p => p.id), 0) + 1;
    setCustomPaymentDeductions([...customPaymentDeductions, {
      id: newId,
      description: '',
      amount: '',
      checked: false
    }]);
  };

  const removeCustomPaymentDeduction = (id) => {
    setCustomPaymentDeductions(customPaymentDeductions.filter(payment => payment.id !== id));
  };

  const updateCustomPaymentDeduction = (id, field, value) => {
    setCustomPaymentDeductions(customPaymentDeductions.map(payment => 
      payment.id === id ? { ...payment, [field]: value } : payment
    ));
  };

  const addCustomInsuredRepair = () => {
    const newId = Math.max(...customInsuredRepairs.map(r => r.id), 0) + 1;
    setCustomInsuredRepairs([...customInsuredRepairs, {
      id: newId,
      description: '',
      amount: '',
      checked: false
    }]);
  };

  const removeCustomInsuredRepair = (id) => {
    setCustomInsuredRepairs(customInsuredRepairs.filter(repair => repair.id !== id));
  };

  const updateCustomInsuredRepair = (id, field, value) => {
    setCustomInsuredRepairs(customInsuredRepairs.map(repair => 
      repair.id === id ? { ...repair, [field]: value } : repair
    ));
  };

  const addCustomContractorRepair = () => {
    const newId = Math.max(...customContractorRepairs.map(r => r.id), 0) + 1;
    setCustomContractorRepairs([...customContractorRepairs, {
      id: newId,
      description: '',
      amount: '',
      checked: false
    }]);
  };

  const removeCustomContractorRepair = (id) => {
    setCustomContractorRepairs(customContractorRepairs.filter(repair => repair.id !== id));
  };

  const updateCustomContractorRepair = (id, field, value) => {
    setCustomContractorRepairs(customContractorRepairs.map(repair => 
      repair.id === id ? { ...repair, [field]: value } : repair
    ));
  };

  const updateCustomSubLimit = (id, field, value) => {
    setCustomSubLimits(customSubLimits.map(subLimit => 
      subLimit.id === id ? { ...subLimit, [field]: value } : subLimit
    ));
  };

  const updatePaymentWithoutFees = (id, field, value) => {
    setPaymentsWithoutFees(paymentsWithoutFees.map(payment => 
      payment.id === id ? { ...payment, [field]: value } : payment
    ));
  };

  const handlePrintPreview = () => {
    setShowPrintPreview(true);
  };

  const printData = {
    releaseType,
    customReleaseTypeName,
    openingStatement,
    claimAmount,
    deductible,
    coverageA,
    coverageB,
    coverageC,
    coverageD,
    totalCoverage: calculateCoverageTotal(),
    customSubLimits,
    priorPayments,
    paymentsWithoutFees,
    customPaymentDeductions,
    customInsuredRepairs,
    customContractorRepairs,
    finalBalance: calculateFinalBalance(),
    // Add insured information to print data
    insuredName,
    insuredAddress,
    insuredClaimNumber
  };

  return (
    <div className="container mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img 
          src="/lovable-uploads/d8102e62-174d-41ec-8e54-53ba66b1e02d.png" 
          alt="Coastal Claims Services Logo" 
          className="h-12 w-auto"
        />
        <h1 className="text-3xl font-bold" style={{ color: '#1e3a8a' }}>
          Claim Breakdown Calculator
        </h1>
      </div>

      {/* Release Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Release Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="release-type">Select Release Type</Label>
            <Select value={releaseType} onValueChange={setReleaseType}>
              <SelectTrigger>
                <SelectValue placeholder="Select a release type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="partial">Partial Release</SelectItem>
                <SelectItem value="full">Full Release</SelectItem>
                <SelectItem value="custom">Custom Release</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {releaseType === 'custom' && (
            <div>
              <Label htmlFor="custom-release-name">Custom Release Type Name</Label>
              <Input
                id="custom-release-name"
                value={customReleaseTypeName}
                onChange={(e) => setCustomReleaseTypeName(e.target.value)}
                placeholder="Enter custom release type name"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Insured Information */}
      <Card>
        <CardHeader>
          <CardTitle>Insured Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="insured-name">Insured's Name</Label>
            <Input
              id="insured-name"
              value={insuredName}
              onChange={(e) => setInsuredName(e.target.value)}
              placeholder="Enter insured's full name"
            />
          </div>
          
          <div>
            <Label htmlFor="insured-address">Insured's Address</Label>
            <Textarea
              id="insured-address"
              value={insuredAddress}
              onChange={(e) => setInsuredAddress(e.target.value)}
              placeholder="Enter insured's complete address"
              className="min-h-[80px]"
            />
          </div>
          
          <div>
            <Label htmlFor="insured-claim-number">Insured's Claim Number</Label>
            <Input
              id="insured-claim-number"
              value={insuredClaimNumber}
              onChange={(e) => setInsuredClaimNumber(e.target.value)}
              placeholder="Enter claim number"
            />
          </div>
        </CardContent>
      </Card>

      {/* Opening Statement */}
      <Card>
        <CardHeader>
          <CardTitle>Opening Statement</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={openingStatement}
            onChange={(e) => setOpeningStatement(e.target.value)}
            placeholder="Enter opening statement for the claim breakdown..."
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      {/* Basic Claim Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Claim Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="claim-amount">Claim Amount</Label>
              <Input
                id="claim-amount"
                type="number"
                value={claimAmount}
                onChange={(e) => setClaimAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            
            <div>
              <Label htmlFor="deductible">Deductible</Label>
              <Input
                id="deductible"
                type="number"
                value={deductible}
                onChange={(e) => setDeductible(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coverage Information */}
      <Card>
        <CardHeader>
          <CardTitle>Coverage Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="coverage-a">Coverage A</Label>
              <Input
                id="coverage-a"
                type="number"
                value={coverageA}
                onChange={(e) => setCoverageA(e.target.value)}
                placeholder="0.00"
              />
            </div>
            
            <div>
              <Label htmlFor="coverage-b">Coverage B</Label>
              <Input
                id="coverage-b"
                type="number"
                value={coverageB}
                onChange={(e) => setCoverageB(e.target.value)}
                placeholder="0.00"
              />
            </div>
            
            <div>
              <Label htmlFor="coverage-c">Coverage C</Label>
              <Input
                id="coverage-c"
                type="number"
                value={coverageC}
                onChange={(e) => setCoverageC(e.target.value)}
                placeholder="0.00"
              />
            </div>
            
            <div>
              <Label htmlFor="coverage-d">Coverage D</Label>
              <Input
                id="coverage-d"
                type="number"
                value={coverageD}
                onChange={(e) => setCoverageD(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="bg-blue-900 text-white p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Coverage</span>
              <span className="text-lg font-semibold">${calculateCoverageTotal().toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coverage A Sub-limits */}
      <Card>
        <CardHeader>
          <CardTitle>Coverage A Sub-limits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {customSubLimits.map((subLimit) => (
            <div key={subLimit.id} className="flex items-center space-x-4 p-3 border rounded-lg">
              <Checkbox
                checked={subLimit.checked}
                onCheckedChange={(checked) => updateCustomSubLimit(subLimit.id, 'checked', checked)}
              />
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label className="text-sm">{subLimit.type}</Label>
                </div>
                <div>
                  <Input
                    type="number"
                    value={subLimit.amount}
                    onChange={(e) => updateCustomSubLimit(subLimit.id, 'amount', e.target.value)}
                    placeholder="Amount"
                    disabled={!subLimit.checked}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    value={subLimit.policyLimit}
                    onChange={(e) => updateCustomSubLimit(subLimit.id, 'policyLimit', e.target.value)}
                    placeholder="Policy Limit"
                    disabled={!subLimit.checked}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Prior Payments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Prior Payments
            <Button onClick={addPriorPayment} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Payment
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {priorPayments.map((payment) => (
            <div key={payment.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Payment Amount</Label>
                    <Input
                      type="number"
                      value={payment.amount}
                      onChange={(e) => updatePriorPayment(payment.id, 'amount', e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input
                      value={payment.description}
                      onChange={(e) => updatePriorPayment(payment.id, 'description', e.target.value)}
                      placeholder="Payment description"
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removePriorPayment(payment.id)}
                  className="ml-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={payment.paFeesChecked}
                  onCheckedChange={(checked) => updatePriorPayment(payment.id, 'paFeesChecked', checked)}
                />
                <Label>Include PA Fees</Label>
              </div>
              
              {payment.paFeesChecked && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-6">
                  <div>
                    <Label>PA Fees Percentage</Label>
                    <Input
                      type="number"
                      value={payment.paFeesPercent}
                      onChange={(e) => updatePriorPayment(payment.id, 'paFeesPercent', e.target.value)}
                      placeholder="10"
                    />
                  </div>
                  <div>
                    <Label>PA Fees Amount</Label>
                    <Input
                      type="number"
                      value={payment.paFeesAmount}
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Payments Without Fees */}
      <Card>
        <CardHeader>
          <CardTitle>Payments Without Fees</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentsWithoutFees.map((payment) => (
            <div key={payment.id} className="flex items-center space-x-4 p-3 border rounded-lg">
              <Checkbox
                checked={payment.checked}
                onCheckedChange={(checked) => updatePaymentWithoutFees(payment.id, 'checked', checked)}
              />
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>{payment.typeName}</Label>
                </div>
                <div>
                  <Input
                    type="number"
                    value={payment.amount}
                    onChange={(e) => updatePaymentWithoutFees(payment.id, 'amount', e.target.value)}
                    placeholder="0.00"
                    disabled={!payment.checked}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Custom Payment/Deductions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Custom Payment/Deductions
            <Button onClick={addCustomPaymentDeduction} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Payment/Deduction
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {customPaymentDeductions.map((payment) => (
            <div key={payment.id} className="flex items-center space-x-4 p-3 border rounded-lg">
              <Checkbox
                checked={payment.checked}
                onCheckedChange={(checked) => updateCustomPaymentDeduction(payment.id, 'checked', checked)}
              />
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Input
                    value={payment.description}
                    onChange={(e) => updateCustomPaymentDeduction(payment.id, 'description', e.target.value)}
                    placeholder="Description"
                    disabled={!payment.checked}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    value={payment.amount}
                    onChange={(e) => updateCustomPaymentDeduction(payment.id, 'amount', e.target.value)}
                    placeholder="0.00"
                    disabled={!payment.checked}
                  />
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeCustomPaymentDeduction(payment.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Repairs by the Insured */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Repairs by the Insured
            <Button onClick={addCustomInsuredRepair} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Repair
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {customInsuredRepairs.map((repair) => (
            <div key={repair.id} className="flex items-center space-x-4 p-3 border rounded-lg">
              <Checkbox
                checked={repair.checked}
                onCheckedChange={(checked) => updateCustomInsuredRepair(repair.id, 'checked', checked)}
              />
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Input
                    value={repair.description}
                    onChange={(e) => updateCustomInsuredRepair(repair.id, 'description', e.target.value)}
                    placeholder="Repair description"
                    disabled={!repair.checked}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    value={repair.amount}
                    onChange={(e) => updateCustomInsuredRepair(repair.id, 'amount', e.target.value)}
                    placeholder="0.00"
                    disabled={!repair.checked}
                  />
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeCustomInsuredRepair(repair.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Repairs by Contractor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Repairs by Contractor
            <Button onClick={addCustomContractorRepair} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Repair
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {customContractorRepairs.map((repair) => (
            <div key={repair.id} className="flex items-center space-x-4 p-3 border rounded-lg">
              <Checkbox
                checked={repair.checked}
                onCheckedChange={(checked) => updateCustomContractorRepair(repair.id, 'checked', checked)}
              />
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Input
                    value={repair.description}
                    onChange={(e) => updateCustomContractorRepair(repair.id, 'description', e.target.value)}
                    placeholder="Repair description"
                    disabled={!repair.checked}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    value={repair.amount}
                    onChange={(e) => updateCustomContractorRepair(repair.id, 'amount', e.target.value)}
                    placeholder="0.00"
                    disabled={!repair.checked}
                  />
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeCustomContractorRepair(repair.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Final Balance */}
      <Card>
        <CardHeader>
          <CardTitle>Final Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-900 text-white p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">
                {calculateFinalBalance() >= 0 ? 'Final Balance' : 'Total Out of Pocket Expense After Deductible by Insured'}
              </span>
              <span className={`text-2xl font-bold ${calculateFinalBalance() >= 0 ? 'text-white' : 'text-red-400'}`}>
                ${calculateFinalBalance() >= 0 ? calculateFinalBalance().toFixed(2) : Math.abs(calculateFinalBalance()).toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Print Button */}
      <div className="flex justify-center">
        <Button onClick={handlePrintPreview} size="lg" className="bg-blue-900 hover:bg-blue-800">
          Generate Print Preview
        </Button>
      </div>

      {/* Print Preview Modal */}
      <PrintPreview
        isOpen={showPrintPreview}
        onClose={() => setShowPrintPreview(false)}
        data={printData}
      />
    </div>
  );
};

export default Index;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const [claimAmount, setClaimAmount] = useState('');
  const [deductible, setDeductible] = useState('');
  const [coverageA, setCoverageA] = useState('');
  const [coverageB, setCoverageB] = useState('');
  const [coverageC, setCoverageC] = useState('');
  const [coverageD, setCoverageD] = useState('');

  // Optional deduction amounts
  const [recoverableDepreciationAmount, setRecoverableDepreciationAmount] = useState('');
  const [nonRecoverableDepreciationAmount, setNonRecoverableDepreciationAmount] = useState('');
  const [paidWhenIncurredAmount, setPaidWhenIncurredAmount] = useState('');
  const [ordinanceLawAmount, setOrdinanceLawAmount] = useState('');

  // Prior payments amounts
  const [priorPaymentsAmount, setPriorPaymentsAmount] = useState('');
  const [priorCCSFeesAmount, setPriorCCSFeesAmount] = useState('');

  // Payments without CCS fees amounts
  const [priorToCCSAmount, setPriorToCCSAmount] = useState('');
  const [legalFeesAmount, setLegalFeesAmount] = useState('');
  const [paidIncurredAmount, setPaidIncurredAmount] = useState('');
  const [optionalPaymentAmount, setOptionalPaymentAmount] = useState('');
  const [optionalPaymentDescription, setOptionalPaymentDescription] = useState('Optional Payment');

  // Repairs by the Insured amounts
  const [interiorRepairsAmount, setInteriorRepairsAmount] = useState('');
  const [exteriorRepairsAmount, setExteriorRepairsAmount] = useState('');
  const [fencesAmount, setFencesAmount] = useState('');
  const [screenEnclosureAmount, setScreenEnclosureAmount] = useState('');
  const [optionalRepairAmount, setOptionalRepairAmount] = useState('');
  const [optionalRepairDescription, setOptionalRepairDescription] = useState('Optional Repair');

  // PA fee percentages (editable, default to 10%)
  const [coverageAFeePercent, setCoverageAFeePercent] = useState('10');
  const [coverageBFeePercent, setCoverageBFeePercent] = useState('10');
  const [coverageCFeePercent, setCoverageCFeePercent] = useState('10');
  const [coverageDFeePercent, setCoverageDFeePercent] = useState('10');
  const [priorCCSFeePercent, setPriorCCSFeePercent] = useState('10');

  const [openSections, setOpenSections] = useState({
    coverages: false,
    optionalDeductions: true,
    priorPayments: true,
    paymentsWithoutFees: true,
    repairsByInsured: true,
    repairsByContractor: true,
    ccsFees: false
  });

  const [checkedItems, setCheckedItems] = useState({
    // Existing checkboxes (removed coverage fee checkboxes)
    recoverableDepreciation: false,
    nonRecoverableDepreciation: false,
    paidWhenIncurred: false,
    ordinanceLaw: false,
    priorPayments: false,
    priorCCSFees: false,
    priorToCCS: false,
    legalFees: false,
    paidIncurred: false,
    optionalPayment: false,
    interiorRepairs: false,
    exteriorRepairs: false,
    fences: false,
    screenEnclosure: false,
    optionalRepair: false,
    roof: false,
    additionalRoof: false,
    gutters: false,
    solar: false,
    soffit: false,
    fascia: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckboxChange = (item: string, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: checked
    }));
  };

  const calculateTotalCoverage = () => {
    const a = parseFloat(coverageA) || 0;
    const b = parseFloat(coverageB) || 0;
    const c = parseFloat(coverageC) || 0;
    const d = parseFloat(coverageD) || 0;
    return a + b + c + d;
  };

  const calculateTotalDeductions = () => {
    let deductions = 0;
    
    if (checkedItems.recoverableDepreciation) {
      deductions += parseFloat(recoverableDepreciationAmount) || 0;
    }
    if (checkedItems.nonRecoverableDepreciation) {
      deductions += parseFloat(nonRecoverableDepreciationAmount) || 0;
    }
    if (checkedItems.paidWhenIncurred) {
      deductions += parseFloat(paidWhenIncurredAmount) || 0;
    }
    if (checkedItems.ordinanceLaw) {
      deductions += parseFloat(ordinanceLawAmount) || 0;
    }
    
    return deductions;
  };

  const calculatePriorPayments = () => {
    let payments = 0;
    
    if (checkedItems.priorPayments) {
      payments += parseFloat(priorPaymentsAmount) || 0;
    }
    if (checkedItems.priorCCSFees) {
      payments += parseFloat(priorCCSFeesAmount) || 0;
    }
    
    return payments;
  };

  const calculatePaymentsWithoutFees = () => {
    let payments = 0;
    
    if (checkedItems.priorToCCS) {
      payments += parseFloat(priorToCCSAmount) || 0;
    }
    if (checkedItems.legalFees) {
      payments += parseFloat(legalFeesAmount) || 0;
    }
    if (checkedItems.paidIncurred) {
      payments += parseFloat(paidIncurredAmount) || 0;
    }
    if (checkedItems.optionalPayment) {
      payments += parseFloat(optionalPaymentAmount) || 0;
    }
    
    return payments;
  };

  // Calculate PA fees based on the balance after deductible, not the full coverage amounts
  const calculatePAFees = (balance: number) => {
    const a = parseFloat(coverageA) || 0;
    const b = parseFloat(coverageB) || 0;
    const c = parseFloat(coverageC) || 0;
    const d = parseFloat(coverageD) || 0;
    const totalCoverage = a + b + c + d;
    
    if (totalCoverage === 0) return 0;
    
    // Calculate proportional amounts based on balance
    const aBalance = (a / totalCoverage) * balance;
    const bBalance = (b / totalCoverage) * balance;
    const cBalance = (c / totalCoverage) * balance;
    const dBalance = (d / totalCoverage) * balance;
    
    const aFee = aBalance * ((parseFloat(coverageAFeePercent) || 0) / 100);
    const bFee = bBalance * ((parseFloat(coverageBFeePercent) || 0) / 100);
    const cFee = cBalance * ((parseFloat(coverageCFeePercent) || 0) / 100);
    const dFee = dBalance * ((parseFloat(coverageDFeePercent) || 0) / 100);
    
    return aFee + bFee + cFee + dFee;
  };

  const totalCoverage = calculateTotalCoverage();
  const totalDeductions = calculateTotalDeductions();
  const totalPriorPayments = calculatePriorPayments();
  const totalPaymentsWithoutFees = calculatePaymentsWithoutFees();
  
  // Calculate balance: Total Coverage - Deductions - Prior Payments - Payments without fees - Deductible
  const balanceAfterDeductible = totalCoverage - totalDeductions - totalPriorPayments - totalPaymentsWithoutFees - (parseFloat(deductible) || 0);
  
  // Calculate PA fees using the balance
  const paFees = calculatePAFees(balanceAfterDeductible);
  
  // Final balance after PA fees
  const finalBalance = balanceAfterDeductible - paFees;

  // Balance plus deductible for repairs
  const balancePlusDeductible = finalBalance + (parseFloat(deductible) || 0);

  // Auto-calculate Prior CCS Fees when Prior Payments amount or percentage changes
  useEffect(() => {
    if (checkedItems.priorCCSFees && priorPaymentsAmount) {
      const priorPayment = parseFloat(priorPaymentsAmount) || 0;
      const feePercent = parseFloat(priorCCSFeePercent) || 0;
      const calculatedFee = (priorPayment * feePercent / 100).toFixed(2);
      setPriorCCSFeesAmount(calculatedFee);
    }
  }, [priorPaymentsAmount, priorCCSFeePercent, checkedItems.priorCCSFees]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs">📋</span>
              </div>
              CCS Claim Breakdown Tool
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Total Coverage Amount - Sum of A+B+C+D only */}
            <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
              <Label htmlFor="total-coverage" className="text-sm font-medium">
                Total Coverage
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-lg">$</span>
                <span className="text-lg font-semibold min-w-24 text-right">
                  {totalCoverage.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Coverages A through D - removed PA fee inputs */}
            <Collapsible 
              open={openSections.coverages} 
              onOpenChange={() => toggleSection('coverages')}
            >
              <CollapsibleTrigger className="flex items-center gap-2 w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.coverages && "rotate-180")} />
                <span className="font-medium">Coverages A through D</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="coverage-a" className="text-sm font-medium w-16">
                      Coverage A
                    </Label>
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-sm">$</span>
                      <Input
                        id="coverage-a"
                        type="text"
                        placeholder="0.00"
                        value={coverageA}
                        onChange={(e) => setCoverageA(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="coverage-b" className="text-sm font-medium w-16">
                      Coverage B
                    </Label>
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-sm">$</span>
                      <Input
                        id="coverage-b"
                        type="text"
                        placeholder="0.00"
                        value={coverageB}
                        onChange={(e) => setCoverageB(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="coverage-c" className="text-sm font-medium w-16">
                      Coverage C
                    </Label>
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-sm">$</span>
                      <Input
                        id="coverage-c"
                        type="text"
                        placeholder="0.00"
                        value={coverageC}
                        onChange={(e) => setCoverageC(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="coverage-d" className="text-sm font-medium w-16">
                      Coverage D
                    </Label>
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-sm">$</span>
                      <Input
                        id="coverage-d"
                        type="text"
                        placeholder="0.00"
                        value={coverageD}
                        onChange={(e) => setCoverageD(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Optional Deductions */}
            <Collapsible 
              open={openSections.optionalDeductions} 
              onOpenChange={() => toggleSection('optionalDeductions')}
            >
              <CollapsibleTrigger className="flex items-center gap-2 w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.optionalDeductions && "rotate-180")} />
                <span className="font-medium">Optional Deductions</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="recoverable-depreciation"
                      checked={checkedItems.recoverableDepreciation}
                      onCheckedChange={(checked) => handleCheckboxChange('recoverableDepreciation', checked as boolean)}
                    />
                    <Label htmlFor="recoverable-depreciation" className="text-sm">
                      Recoverable Depreciation
                    </Label>
                  </div>
                  {checkedItems.recoverableDepreciation && (
                    <div className="ml-6 flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        type="text"
                        placeholder="Enter amount"
                        value={recoverableDepreciationAmount}
                        onChange={(e) => setRecoverableDepreciationAmount(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="non-recoverable-depreciation"
                      checked={checkedItems.nonRecoverableDepreciation}
                      onCheckedChange={(checked) => handleCheckboxChange('nonRecoverableDepreciation', checked as boolean)}
                    />
                    <Label htmlFor="non-recoverable-depreciation" className="text-sm">
                      Non-Recoverable Depreciation
                    </Label>
                  </div>
                  {checkedItems.nonRecoverableDepreciation && (
                    <div className="ml-6 flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        type="text"
                        placeholder="Enter amount"
                        value={nonRecoverableDepreciationAmount}
                        onChange={(e) => setNonRecoverableDepreciationAmount(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="paid-when-incurred"
                      checked={checkedItems.paidWhenIncurred}
                      onCheckedChange={(checked) => handleCheckboxChange('paidWhenIncurred', checked as boolean)}
                    />
                    <Label htmlFor="paid-when-incurred" className="text-sm">
                      Paid When Incurred
                    </Label>
                  </div>
                  {checkedItems.paidWhenIncurred && (
                    <div className="ml-6 flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        type="text"
                        placeholder="Enter amount"
                        value={paidWhenIncurredAmount}
                        onChange={(e) => setPaidWhenIncurredAmount(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="ordinance-law"
                      checked={checkedItems.ordinanceLaw}
                      onCheckedChange={(checked) => handleCheckboxChange('ordinanceLaw', checked as boolean)}
                    />
                    <Label htmlFor="ordinance-law" className="text-sm">
                      Ordinance & Law
                    </Label>
                  </div>
                  {checkedItems.ordinanceLaw && (
                    <div className="ml-6 flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        type="text"
                        placeholder="Enter amount"
                        value={ordinanceLawAmount}
                        onChange={(e) => setOrdinanceLawAmount(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Prior Payments with CCS Fees */}
            <Collapsible 
              open={openSections.priorPayments} 
              onOpenChange={() => toggleSection('priorPayments')}
            >
              <CollapsibleTrigger className="flex items-center gap-2 w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.priorPayments && "rotate-180")} />
                <span className="font-medium">Prior Payments</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="prior-payments"
                      checked={checkedItems.priorPayments}
                      onCheckedChange={(checked) => handleCheckboxChange('priorPayments', checked as boolean)}
                    />
                    <Label htmlFor="prior-payments" className="text-sm">
                      Prior Payments
                    </Label>
                  </div>
                  {checkedItems.priorPayments && (
                    <div className="ml-6 flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        type="text"
                        placeholder="Enter amount"
                        value={priorPaymentsAmount}
                        onChange={(e) => setPriorPaymentsAmount(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="prior-ccs-fees"
                      checked={checkedItems.priorCCSFees}
                      onCheckedChange={(checked) => handleCheckboxChange('priorCCSFees', checked as boolean)}
                    />
                    <Label htmlFor="prior-ccs-fees" className="text-sm">
                      Prior CCS Fees
                    </Label>
                    <Input
                      type="text"
                      value={priorCCSFeePercent}
                      onChange={(e) => setPriorCCSFeePercent(e.target.value)}
                      className="w-16 text-center"
                    />
                    <span className="text-sm">%</span>
                  </div>
                  {checkedItems.priorCCSFees && (
                    <div className="ml-6 flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        type="text"
                        placeholder="0.00"
                        value={priorCCSFeesAmount}
                        onChange={(e) => setPriorCCSFeesAmount(e.target.value)}
                        className="flex-1"
                        readOnly
                      />
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Payments to CCS without Fees */}
            <Collapsible 
              open={openSections.paymentsWithoutFees} 
              onOpenChange={() => toggleSection('paymentsWithoutFees')}
            >
              <CollapsibleTrigger className="flex items-center gap-2 w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.paymentsWithoutFees && "rotate-180")} />
                <span className="font-medium">Payments to CCS without Fees</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="prior-to-ccs"
                      checked={checkedItems.priorToCCS}
                      onCheckedChange={(checked) => handleCheckboxChange('priorToCCS', checked as boolean)}
                    />
                    <Label htmlFor="prior-to-ccs" className="text-sm">
                      Prior to CCS (No Fees)
                    </Label>
                  </div>
                  {checkedItems.priorToCCS && (
                    <div className="ml-6 flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        type="text"
                        placeholder="Enter amount"
                        value={priorToCCSAmount}
                        onChange={(e) => setPriorToCCSAmount(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="legal-fees"
                      checked={checkedItems.legalFees}
                      onCheckedChange={(checked) => handleCheckboxChange('legalFees', checked as boolean)}
                    />
                    <Label htmlFor="legal-fees" className="text-sm">
                      Legal Fees
                    </Label>
                  </div>
                  {checkedItems.legalFees && (
                    <div className="ml-6 flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        type="text"
                        placeholder="Enter amount"
                        value={legalFeesAmount}
                        onChange={(e) => setLegalFeesAmount(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="paid-incurred"
                      checked={checkedItems.paidIncurred}
                      onCheckedChange={(checked) => handleCheckboxChange('paidIncurred', checked as boolean)}
                    />
                    <Label htmlFor="paid-incurred" className="text-sm">
                      Paid/Incurred
                    </Label>
                  </div>
                  {checkedItems.paidIncurred && (
                    <div className="ml-6 flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        type="text"
                        placeholder="Enter amount"
                        value={paidIncurredAmount}
                        onChange={(e) => setPaidIncurredAmount(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="optional-payment"
                      checked={checkedItems.optionalPayment}
                      onCheckedChange={(checked) => handleCheckboxChange('optionalPayment', checked as boolean)}
                    />
                    <Input
                      type="text"
                      value={optionalPaymentDescription}
                      onChange={(e) => setOptionalPaymentDescription(e.target.value)}
                      className="text-sm flex-1"
                      placeholder="Optional Payment"
                    />
                  </div>
                  {checkedItems.optionalPayment && (
                    <div className="ml-6 flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        type="text"
                        placeholder="Enter amount"
                        value={optionalPaymentAmount}
                        onChange={(e) => setOptionalPaymentAmount(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Deductible */}
            <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
              <Label htmlFor="deductible" className="text-sm font-medium w-20">
                Deductible
              </Label>
              <div className="flex items-center gap-2 flex-1">
                <span className="text-lg">$</span>
                <Input
                  id="deductible"
                  type="text"
                  placeholder="Enter deductible amount"
                  value={deductible}
                  onChange={(e) => setDeductible(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Balance after Deductible */}
            <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
              <span className="font-medium">Balance</span>
              <span className="text-lg font-semibold">$ {balanceAfterDeductible.toFixed(2)}</span>
            </div>

            {/* CCS Fees - now expandable with individual coverage fee inputs in 2x2 grid */}
            <Collapsible 
              open={openSections.ccsFees} 
              onOpenChange={() => toggleSection('ccsFees')}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2">
                  <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.ccsFees && "rotate-180")} />
                  <span className="font-medium">CCS Fees</span>
                </div>
                <span className="text-lg font-semibold">$ {paFees.toFixed(2)}</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="coverage-a-fees" className="text-sm font-medium w-20">
                      Coverage A Fees
                    </Label>
                    <Input
                      type="text"
                      value={coverageAFeePercent}
                      onChange={(e) => setCoverageAFeePercent(e.target.value)}
                      className="w-16 text-center"
                    />
                    <span className="text-sm">%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="coverage-c-fees" className="text-sm font-medium w-20">
                      Coverage C Fees
                    </Label>
                    <Input
                      type="text"
                      value={coverageCFeePercent}
                      onChange={(e) => setCoverageCFeePercent(e.target.value)}
                      className="w-16 text-center"
                    />
                    <span className="text-sm">%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="coverage-b-fees" className="text-sm font-medium w-20">
                      Coverage B Fees
                    </Label>
                    <Input
                      type="text"
                      value={coverageBFeePercent}
                      onChange={(e) => setCoverageBFeePercent(e.target.value)}
                      className="w-16 text-center"
                    />
                    <span className="text-sm">%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="coverage-d-fees" className="text-sm font-medium w-20">
                      Coverage D Fees
                    </Label>
                    <Input
                      type="text"
                      value={coverageDFeePercent}
                      onChange={(e) => setCoverageDFeePercent(e.target.value)}
                      className="w-16 text-center"
                    />
                    <span className="text-sm">%</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Balance after PA Fees */}
            <div className="flex items-center justify-between bg-green-100 p-3 rounded-lg">
              <span className="font-medium">Balance after PA Fees</span>
              <span className="text-lg font-semibold text-green-700">$ {finalBalance.toFixed(2)}</span>
            </div>

            {/* Balance + Deductible */}
            <div className="flex items-center justify-between bg-green-100 p-3 rounded-lg">
              <span className="font-medium">Balance + Deductible</span>
              <span className="text-lg font-semibold text-green-700">$ {balancePlusDeductible.toFixed(2)}</span>
            </div>

            {/* Repairs by the Insured */}
            <Collapsible 
              open={openSections.repairsByInsured} 
              onOpenChange={() => toggleSection('repairsByInsured')}
            >
              <CollapsibleTrigger className="flex items-center gap-2 w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.repairsByInsured && "rotate-180")} />
                <span className="font-medium">Repairs by the Insured</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 space-y-3">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="interior-repairs"
                      checked={checkedItems.interiorRepairs}
                      onCheckedChange={(checked) => handleCheckboxChange('interiorRepairs', checked as boolean)}
                    />
                    <Label htmlFor="interior-repairs" className="text-sm">
                      Interior Repairs
                    </Label>
                  </div>
                  {checkedItems.interiorRepairs && (
                    <div className="ml-6 flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        type="text"
                        placeholder="Enter amount"
                        value={interiorRepairsAmount}
                        onChange={(e) => setInteriorRepairsAmount(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="exterior-repairs"
                      checked={checkedItems.exteriorRepairs}
                      onCheckedChange={(checked) => handleCheckboxChange('exteriorRepairs', checked as boolean)}
                    />
                    <Label htmlFor="exterior-repairs" className="text-sm">
                      Exterior Repairs
                    </Label>
                  </div>
                  {checkedItems.exteriorRepairs && (
                    <div className="ml-6 flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        type="text"
                        placeholder="Enter amount"
                        value={exteriorRepairsAmount}
                        onChange={(e) => setExteriorRepairsAmount(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="fences"
                      checked={checkedItems.fences}
                      onCheckedChange={(checked) => handleCheckboxChange('fences', checked as boolean)}
                    />
                    <Label htmlFor="fences" className="text-sm">
                      Fences
                    </Label>
                  </div>
                  {checkedItems.fences && (
                    <div className="ml-6 flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        type="text"
                        placeholder="Enter amount"
                        value={fencesAmount}
                        onChange={(e) => setFencesAmount(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="screen-enclosure"
                      checked={checkedItems.screenEnclosure}
                      onCheckedChange={(checked) => handleCheckboxChange('screenEnclosure', checked as boolean)}
                    />
                    <Label htmlFor="screen-enclosure" className="text-sm">
                      Screen Enclosure
                    </Label>
                  </div>
                  {checkedItems.screenEnclosure && (
                    <div className="ml-6 flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        type="text"
                        placeholder="Enter amount"
                        value={screenEnclosureAmount}
                        onChange={(e) => setScreenEnclosureAmount(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="optional-repair"
                      checked={checkedItems.optionalRepair}
                      onCheckedChange={(checked) => handleCheckboxChange('optionalRepair', checked as boolean)}
                    />
                    <Input
                      type="text"
                      value={optionalRepairDescription}
                      onChange={(e) => setOptionalRepairDescription(e.target.value)}
                      className="text-sm flex-1"
                      placeholder="Optional Repair"
                    />
                  </div>
                  {checkedItems.optionalRepair && (
                    <div className="ml-6 flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        type="text"
                        placeholder="Enter amount"
                        value={optionalRepairAmount}
                        onChange={(e) => setOptionalRepairAmount(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;

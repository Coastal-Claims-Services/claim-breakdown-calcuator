import React, { useState } from 'react';
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

  // PA fee percentages (editable, default to 10%)
  const [coverageAFeePercent, setCoverageAFeePercent] = useState('10');
  const [coverageBFeePercent, setCoverageBFeePercent] = useState('10');
  const [coverageCFeePercent, setCoverageCFeePercent] = useState('10');
  const [coverageDFeePercent, setCoverageDFeePercent] = useState('10');
  const [priorCCSFeePercent, setPriorCCSFeePercent] = useState('10');
  const [ccsFeesPercent, setCcsFeesPercent] = useState('10');

  const [openSections, setOpenSections] = useState({
    coverages: false,
    optionalDeductions: true,
    priorPayments: true,
    paymentsWithoutFees: true,
    repairsByInsured: true,
    repairsByContractor: true
  });

  const [checkedItems, setCheckedItems] = useState({
    // Coverage fee checkboxes
    coverageAFees: false,
    coverageBFees: false,
    coverageCFees: false,
    coverageDFees: false,
    // Existing checkboxes
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

  const calculateCoverageWithFees = () => {
    const a = parseFloat(coverageA) || 0;
    const b = parseFloat(coverageB) || 0;
    const c = parseFloat(coverageC) || 0;
    const d = parseFloat(coverageD) || 0;
    
    let totalWithFees = 0;
    
    // Add coverage amounts and apply editable fee percentage if checkbox is checked
    totalWithFees += checkedItems.coverageAFees ? a * (1 + (parseFloat(coverageAFeePercent) || 0) / 100) : a;
    totalWithFees += checkedItems.coverageBFees ? b * (1 + (parseFloat(coverageBFeePercent) || 0) / 100) : b;
    totalWithFees += checkedItems.coverageCFees ? c * (1 + (parseFloat(coverageCFeePercent) || 0) / 100) : c;
    totalWithFees += checkedItems.coverageDFees ? d * (1 + (parseFloat(coverageDFeePercent) || 0) / 100) : d;
    
    return totalWithFees;
  };

  const totalCoverage = calculateTotalCoverage();
  const totalDeductions = calculateTotalDeductions();
  const adjustedTotal = totalCoverage - totalDeductions;
  const coverageWithFees = calculateCoverageWithFees() - totalDeductions;

  const balance = coverageWithFees;
  const ccsFees = balance * ((parseFloat(ccsFeesPercent) || 0) / 100);
  const balanceAfterFees = balance - ccsFees;
  const balanceWithDeductible = balanceAfterFees - (parseFloat(deductible) || 0);

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
            {/* Total Coverage Amount - Single Line */}
            <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
              <Label htmlFor="total-coverage" className="text-sm font-medium">
                Total Coverage
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-lg">$</span>
                <span className="text-lg font-semibold min-w-24 text-right">
                  {adjustedTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Coverages A through D */}
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
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="coverage-a-fees"
                        checked={checkedItems.coverageAFees}
                        onCheckedChange={(checked) => handleCheckboxChange('coverageAFees', checked as boolean)}
                      />
                      <Label htmlFor="coverage-a-fees" className="text-sm whitespace-nowrap">
                        PA Fees
                      </Label>
                      <Input
                        type="text"
                        value={coverageAFeePercent}
                        onChange={(e) => setCoverageAFeePercent(e.target.value)}
                        className="w-16 text-center"
                      />
                      <span className="text-sm">%</span>
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
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="coverage-b-fees"
                        checked={checkedItems.coverageBFees}
                        onCheckedChange={(checked) => handleCheckboxChange('coverageBFees', checked as boolean)}
                      />
                      <Label htmlFor="coverage-b-fees" className="text-sm whitespace-nowrap">
                        PA Fees
                      </Label>
                      <Input
                        type="text"
                        value={coverageBFeePercent}
                        onChange={(e) => setCoverageBFeePercent(e.target.value)}
                        className="w-16 text-center"
                      />
                      <span className="text-sm">%</span>
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
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="coverage-c-fees"
                        checked={checkedItems.coverageCFees}
                        onCheckedChange={(checked) => handleCheckboxChange('coverageCFees', checked as boolean)}
                      />
                      <Label htmlFor="coverage-c-fees" className="text-sm whitespace-nowrap">
                        PA Fees
                      </Label>
                      <Input
                        type="text"
                        value={coverageCFeePercent}
                        onChange={(e) => setCoverageCFeePercent(e.target.value)}
                        className="w-16 text-center"
                      />
                      <span className="text-sm">%</span>
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
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="coverage-d-fees"
                        checked={checkedItems.coverageDFees}
                        onCheckedChange={(checked) => handleCheckboxChange('coverageDFees', checked as boolean)}
                      />
                      <Label htmlFor="coverage-d-fees" className="text-sm whitespace-nowrap">
                        PA Fees
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
              <CollapsibleContent className="p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="prior-to-ccs"
                    checked={checkedItems.priorToCCS}
                    onCheckedChange={(checked) => handleCheckboxChange('priorToCCS', checked as boolean)}
                  />
                  <Label htmlFor="prior-to-ccs" className="text-sm">
                    Prior to CCS
                  </Label>
                </div>
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
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="optional-payment"
                    checked={checkedItems.optionalPayment}
                    onCheckedChange={(checked) => handleCheckboxChange('optionalPayment', checked as boolean)}
                  />
                  <Label htmlFor="optional-payment" className="text-sm">
                    Optional Payment
                  </Label>
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

            {/* Balance */}
            <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
              <span className="font-medium">Balance</span>
              <span className="text-lg font-semibold">$ {balance.toFixed(2)}</span>
            </div>

            {/* CCS Fees */}
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="font-medium">CCS Fees</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  value={ccsFeesPercent}
                  onChange={(e) => setCcsFeesPercent(e.target.value)}
                  className="w-16 text-center"
                />
                <span className="text-sm">%</span>
              </div>
              <span className="text-lg font-semibold">$ {ccsFees.toFixed(2)}</span>
            </div>

            {/* Balance after Fees */}
            <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
              <span className="font-medium">Balance after Fees</span>
              <span className="text-lg font-semibold text-green-600">$ {balanceAfterFees.toFixed(2)}</span>
            </div>

            {/* Balance + Deductible */}
            <div className="flex items-center justify-between bg-green-100 p-3 rounded-lg">
              <span className="font-medium">Balance + Deductible</span>
              <span className="text-lg font-semibold text-green-700">$ {balanceWithDeductible.toFixed(2)}</span>
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
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;

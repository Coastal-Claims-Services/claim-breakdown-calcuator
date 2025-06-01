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
  const [openSections, setOpenSections] = useState({
    optionalDeductions: true,
    priorPayments: true,
    paymentsWithoutFees: true,
    repairsByInsured: true,
    repairsByContractor: true
  });

  const [checkedItems, setCheckedItems] = useState({
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

  const balance = 0.00;
  const ccsFeesPercent = 10;
  const ccsFees = 0.00;
  const balanceAfterFees = 0.00;
  const balanceWithDeductible = 0.00;

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
            {/* Total Coverage Amount */}
            <div className="flex items-center gap-4">
              <Label htmlFor="coverage" className="text-sm font-medium w-20">
                Total Coverage
              </Label>
              <div className="flex items-center gap-2 flex-1">
                <span className="text-lg">$</span>
                <Input
                  id="coverage"
                  type="text"
                  placeholder="Enter total claim amount"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Optional Deductions */}
            <Collapsible 
              open={openSections.optionalDeductions} 
              onOpenChange={() => toggleSection('optionalDeductions')}
            >
              <CollapsibleTrigger className="flex items-center gap-2 w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.optionalDeductions && "rotate-180")} />
                <span className="font-medium">Optional Deductions</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 space-y-3">
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
              </CollapsibleContent>
            </Collapsible>

            {/* Prior Payments with CCS Fees */}
            <Collapsible 
              open={openSections.priorPayments} 
              onOpenChange={() => toggleSection('priorPayments')}
            >
              <CollapsibleTrigger className="flex items-center gap-2 w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.priorPayments && "rotate-180")} />
                <span className="font-medium">Prior Payments with CCS Fees</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 space-y-3">
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
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="prior-ccs-fees"
                    checked={checkedItems.priorCCSFees}
                    onCheckedChange={(checked) => handleCheckboxChange('priorCCSFees', checked as boolean)}
                  />
                  <Label htmlFor="prior-ccs-fees" className="text-sm">
                    Prior CCS Fees
                  </Label>
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
                <span className="text-sm text-gray-600">({ccsFeesPercent}%)</span>
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

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

  // Policy limits for each coverage
  const [policyLimitA, setPolicyLimitA] = useState('');
  const [policyLimitB, setPolicyLimitB] = useState('');
  const [policyLimitC, setPolicyLimitC] = useState('');
  const [policyLimitD, setPolicyLimitD] = useState('');

  // Sub-limits for Coverage A
  const [screenEnclosureSubLimit, setScreenEnclosureSubLimit] = useState('');
  const [moldSubLimit, setMoldSubLimit] = useState('');
  const [waterMitigationSubLimit, setWaterMitigationSubLimit] = useState('');
  const [matchingSubLimit, setMatchingSubLimit] = useState('');
  const [ordinanceLawSubLimit, setOrdinanceLawSubLimit] = useState('');
  const [screenEnclosureSubLimitDescription, setScreenEnclosureSubLimitDescription] = useState('Screen Enclosure');
  const [moldSubLimitDescription, setMoldSubLimitDescription] = useState('Mold');
  const [waterMitigationSubLimitDescription, setWaterMitigationSubLimitDescription] = useState('Water Mitigation');
  const [matchingSubLimitDescription, setMatchingSubLimitDescription] = useState('Matching');
  const [ordinanceLawSubLimitDescription, setOrdinanceLawSubLimitDescription] = useState('Ordinance & Law');

  // Policy limits for Coverage A sub-limits
  const [screenEnclosureSubLimitPolicy, setScreenEnclosureSubLimitPolicy] = useState('');
  const [moldSubLimitPolicy, setMoldSubLimitPolicy] = useState('');
  const [waterMitigationSubLimitPolicy, setWaterMitigationSubLimitPolicy] = useState('');
  const [matchingSubLimitPolicy, setMatchingSubLimitPolicy] = useState('');
  const [ordinanceLawSubLimitPolicy, setOrdinanceLawSubLimitPolicy] = useState('');

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

  // Repairs by Contractor amounts and quantities
  const [roofSquares, setRoofSquares] = useState('');
  const [roofTotalCost, setRoofTotalCost] = useState('');
  const [additionalRoofSquares, setAdditionalRoofSquares] = useState('');
  const [additionalRoofTotalCost, setAdditionalRoofTotalCost] = useState('');
  const [guttersLinearFeet, setGuttersLinearFeet] = useState('');
  const [guttersTotalCost, setGuttersTotalCost] = useState('');
  const [solarPanels, setSolarPanels] = useState('');
  const [solarTotalCost, setSolarTotalCost] = useState('');
  const [soffitLinearFeet, setSoffitLinearFeet] = useState('');
  const [soffitTotalCost, setSoffitTotalCost] = useState('');
  const [fasciaLinearFeet, setFasciaLinearFeet] = useState('');
  const [fasciaTotalCost, setFasciaTotalCost] = useState('');

  // PA fee percentages (editable, default to 10%)
  const [coverageAFeePercent, setCoverageAFeePercent] = useState('10');
  const [coverageBFeePercent, setCoverageBFeePercent] = useState('10');
  const [coverageCFeePercent, setCoverageCFeePercent] = useState('10');
  const [coverageDFeePercent, setCoverageDFeePercent] = useState('10');
  const [priorCCSFeePercent, setPriorCCSFeePercent] = useState('10');

  const [openSections, setOpenSections] = useState({
    coverages: false,
    coverageASubLimits: false,
    optionalDeductions: true,
    priorPayments: true,
    paymentsWithoutFees: true,
    repairsByInsured: true,
    repairsByContractor: true,
    ccsFees: false
  });

  const [checkedItems, setCheckedItems] = useState({
    // Coverage A sub-limits
    screenEnclosureSubLimit: false,
    moldSubLimit: false,
    waterMitigationSubLimit: false,
    matchingSubLimit: false,
    ordinanceLawSubLimit: false,
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

  // Function to calculate overage amount
  const calculateOverage = (coverage: string, policyLimit: string) => {
    const coverageAmount = parseFloat(coverage) || 0;
    const limitAmount = parseFloat(policyLimit) || 0;
    return limitAmount > 0 && coverageAmount > limitAmount ? coverageAmount - limitAmount : 0;
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

  // Calculate cost per unit functions
  const calculateCostPerSquare = (totalCost: string, squares: string) => {
    const cost = parseFloat(totalCost) || 0;
    const sq = parseFloat(squares) || 0;
    return sq > 0 ? (cost / sq).toFixed(2) : '0.00';
  };

  const calculateCostPerLinearFoot = (totalCost: string, linearFeet: string) => {
    const cost = parseFloat(totalCost) || 0;
    const feet = parseFloat(linearFeet) || 0;
    return feet > 0 ? (cost / feet).toFixed(2) : '0.00';
  };

  const calculateCostPerPanel = (totalCost: string, panels: string) => {
    const cost = parseFloat(totalCost) || 0;
    const panelCount = parseFloat(panels) || 0;
    return panelCount > 0 ? (cost / panelCount).toFixed(2) : '0.00';
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
      <div className="max-w-4xl mx-auto">
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

            {/* Coverages A through D - restructured with two columns and policy limits */}
            <Collapsible 
              open={openSections.coverages} 
              onOpenChange={() => toggleSection('coverages')}
            >
              <CollapsibleTrigger className="flex items-center gap-2 w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.coverages && "rotate-180")} />
                <span className="font-medium">Coverages A through D</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Coverage A with Sub-limits */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="coverage-a" className="text-sm font-medium w-20">
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
                        <Label className="text-sm font-medium w-20 text-gray-600">
                          Policy Limit
                        </Label>
                        <div className="flex items-center gap-1 flex-1">
                          <span className="text-sm">$</span>
                          <Input
                            type="text"
                            placeholder="0.00"
                            value={policyLimitA}
                            onChange={(e) => setPolicyLimitA(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      {calculateOverage(coverageA, policyLimitA) > 0 && (
                        <div className="ml-20 text-red-600 text-sm font-medium">
                          Over Limit: ${calculateOverage(coverageA, policyLimitA).toFixed(2)}
                        </div>
                      )}
                    </div>

                    {/* Collapsible Sub-limits for Coverage A */}
                    <div className="ml-4">
                      <Collapsible 
                        open={openSections.coverageASubLimits} 
                        onOpenChange={() => toggleSection('coverageASubLimits')}
                      >
                        <CollapsibleTrigger className="flex items-center gap-2 w-full p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border-l-2 border-gray-200">
                          <ChevronDown className={cn("h-3 w-3 transition-transform", openSections.coverageASubLimits && "rotate-180")} />
                          <span className="text-sm font-medium text-gray-600">Coverage A Sub-limits</span>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-4 space-y-3 mt-3 border-l-2 border-gray-200">
                          {/* Screen Enclosure Sub-limit */}
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="screen-enclosure-sub-limit"
                                checked={checkedItems.screenEnclosureSubLimit}
                                onCheckedChange={(checked) => handleCheckboxChange('screenEnclosureSubLimit', checked as boolean)}
                              />
                              <Input
                                type="text"
                                value={screenEnclosureSubLimitDescription}
                                onChange={(e) => setScreenEnclosureSubLimitDescription(e.target.value)}
                                className="text-sm flex-1"
                                placeholder="Sub-limit name"
                              />
                            </div>
                            {checkedItems.screenEnclosureSubLimit && (
                              <div className="ml-6 space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">$</span>
                                  <Input
                                    type="text"
                                    placeholder="Enter sub-limit amount"
                                    value={screenEnclosureSubLimit}
                                    onChange={(e) => setScreenEnclosureSubLimit(e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <Label className="text-sm text-gray-600 w-20">Policy Limit</Label>
                                  <span className="text-sm">$</span>
                                  <Input
                                    type="text"
                                    placeholder="0.00"
                                    value={screenEnclosureSubLimitPolicy}
                                    onChange={(e) => setScreenEnclosureSubLimitPolicy(e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                                {calculateOverage(screenEnclosureSubLimit, screenEnclosureSubLimitPolicy) > 0 && (
                                  <div className="ml-20 text-red-600 text-sm font-medium">
                                    Over Limit: ${calculateOverage(screenEnclosureSubLimit, screenEnclosureSubLimitPolicy).toFixed(2)}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Mold Sub-limit */}
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="mold-sub-limit"
                                checked={checkedItems.moldSubLimit}
                                onCheckedChange={(checked) => handleCheckboxChange('moldSubLimit', checked as boolean)}
                              />
                              <Input
                                type="text"
                                value={moldSubLimitDescription}
                                onChange={(e) => setMoldSubLimitDescription(e.target.value)}
                                className="text-sm flex-1"
                                placeholder="Sub-limit name"
                              />
                            </div>
                            {checkedItems.moldSubLimit && (
                              <div className="ml-6 space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">$</span>
                                  <Input
                                    type="text"
                                    placeholder="Enter sub-limit amount"
                                    value={moldSubLimit}
                                    onChange={(e) => setMoldSubLimit(e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <Label className="text-sm text-gray-600 w-20">Policy Limit</Label>
                                  <span className="text-sm">$</span>
                                  <Input
                                    type="text"
                                    placeholder="0.00"
                                    value={moldSubLimitPolicy}
                                    onChange={(e) => setMoldSubLimitPolicy(e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                                {calculateOverage(moldSubLimit, moldSubLimitPolicy) > 0 && (
                                  <div className="ml-20 text-red-600 text-sm font-medium">
                                    Over Limit: ${calculateOverage(moldSubLimit, moldSubLimitPolicy).toFixed(2)}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Water Mitigation Sub-limit */}
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="water-mitigation-sub-limit"
                                checked={checkedItems.waterMitigationSubLimit}
                                onCheckedChange={(checked) => handleCheckboxChange('waterMitigationSubLimit', checked as boolean)}
                              />
                              <Input
                                type="text"
                                value={waterMitigationSubLimitDescription}
                                onChange={(e) => setWaterMitigationSubLimitDescription(e.target.value)}
                                className="text-sm flex-1"
                                placeholder="Sub-limit name"
                              />
                            </div>
                            {checkedItems.waterMitigationSubLimit && (
                              <div className="ml-6 space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">$</span>
                                  <Input
                                    type="text"
                                    placeholder="Enter sub-limit amount"
                                    value={waterMitigationSubLimit}
                                    onChange={(e) => setWaterMitigationSubLimit(e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <Label className="text-sm text-gray-600 w-20">Policy Limit</Label>
                                  <span className="text-sm">$</span>
                                  <Input
                                    type="text"
                                    placeholder="0.00"
                                    value={waterMitigationSubLimitPolicy}
                                    onChange={(e) => setWaterMitigationSubLimitPolicy(e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                                {calculateOverage(waterMitigationSubLimit, waterMitigationSubLimitPolicy) > 0 && (
                                  <div className="ml-20 text-red-600 text-sm font-medium">
                                    Over Limit: ${calculateOverage(waterMitigationSubLimit, waterMitigationSubLimitPolicy).toFixed(2)}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Matching Sub-limit */}
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="matching-sub-limit"
                                checked={checkedItems.matchingSubLimit}
                                onCheckedChange={(checked) => handleCheckboxChange('matchingSubLimit', checked as boolean)}
                              />
                              <Input
                                type="text"
                                value={matchingSubLimitDescription}
                                onChange={(e) => setMatchingSubLimitDescription(e.target.value)}
                                className="text-sm flex-1"
                                placeholder="Sub-limit name"
                              />
                            </div>
                            {checkedItems.matchingSubLimit && (
                              <div className="ml-6 space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">$</span>
                                  <Input
                                    type="text"
                                    placeholder="Enter sub-limit amount"
                                    value={matchingSubLimit}
                                    onChange={(e) => setMatchingSubLimit(e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <Label className="text-sm text-gray-600 w-20">Policy Limit</Label>
                                  <span className="text-sm">$</span>
                                  <Input
                                    type="text"
                                    placeholder="0.00"
                                    value={matchingSubLimitPolicy}
                                    onChange={(e) => setMatchingSubLimitPolicy(e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                                {calculateOverage(matchingSubLimit, matchingSubLimitPolicy) > 0 && (
                                  <div className="ml-20 text-red-600 text-sm font-medium">
                                    Over Limit: ${calculateOverage(matchingSubLimit, matchingSubLimitPolicy).toFixed(2)}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Ordinance & Law Sub-limit */}
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="ordinance-law-sub-limit"
                                checked={checkedItems.ordinanceLawSubLimit}
                                onCheckedChange={(checked) => handleCheckboxChange('ordinanceLawSubLimit', checked as boolean)}
                              />
                              <Input
                                type="text"
                                value={ordinanceLawSubLimitDescription}
                                onChange={(e) => setOrdinanceLawSubLimitDescription(e.target.value)}
                                className="text-sm flex-1"
                                placeholder="Sub-limit name"
                              />
                            </div>
                            {checkedItems.ordinanceLawSubLimit && (
                              <div className="ml-6 space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">$</span>
                                  <Input
                                    type="text"
                                    placeholder="Enter sub-limit amount"
                                    value={ordinanceLawSubLimit}
                                    onChange={(e) => setOrdinanceLawSubLimit(e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <Label className="text-sm text-gray-600 w-20">Policy Limit</Label>
                                  <span className="text-sm">$</span>
                                  <Input
                                    type="text"
                                    placeholder="0.00"
                                    value={ordinanceLawSubLimitPolicy}
                                    onChange={(e) => setOrdinanceLawSubLimitPolicy(e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                                {calculateOverage(ordinanceLawSubLimit, ordinanceLawSubLimitPolicy) > 0 && (
                                  <div className="ml-20 text-red-600 text-sm font-medium">
                                    Over Limit: ${calculateOverage(ordinanceLawSubLimit, ordinanceLawSubLimitPolicy).toFixed(2)}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </div>

                  {/* Right Column - Coverages B, C, and D */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="coverage-b" className="text-sm font-medium w-20">
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
                        <Label className="text-sm font-medium w-20 text-gray-600">
                          Policy Limit
                        </Label>
                        <div className="flex items-center gap-1 flex-1">
                          <span className="text-sm">$</span>
                          <Input
                            type="text"
                            placeholder="0.00"
                            value={policyLimitB}
                            onChange={(e) => setPolicyLimitB(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      {calculateOverage(coverageB, policyLimitB) > 0 && (
                        <div className="ml-20 text-red-600 text-sm font-medium">
                          Over Limit: ${calculateOverage(coverageB, policyLimitB).toFixed(2)}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="coverage-c" className="text-sm font-medium w-20">
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
                        <Label className="text-sm font-medium w-20 text-gray-600">
                          Policy Limit
                        </Label>
                        <div className="flex items-center gap-1 flex-1">
                          <span className="text-sm">$</span>
                          <Input
                            type="text"
                            placeholder="0.00"
                            value={policyLimitC}
                            onChange={(e) => setPolicyLimitC(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      {calculateOverage(coverageC, policyLimitC) > 0 && (
                        <div className="ml-20 text-red-600 text-sm font-medium">
                          Over Limit: ${calculateOverage(coverageC, policyLimitC).toFixed(2)}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="coverage-d" className="text-sm font-medium w-20">
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
                      <div className="flex items-center gap-2">
                        <Label className="text-sm font-medium w-20 text-gray-600">
                          Policy Limit
                        </Label>
                        <div className="flex items-center gap-1 flex-1">
                          <span className="text-sm">$</span>
                          <Input
                            type="text"
                            placeholder="0.00"
                            value={policyLimitD}
                            onChange={(e) => setPolicyLimitD(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      {calculateOverage(coverageD, policyLimitD) > 0 && (
                        <div className="ml-20 text-red-600 text-sm font-medium">
                          Over Limit: ${calculateOverage(coverageD, policyLimitD).toFixed(2)}
                        </div>
                      )}
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

            {/* Repairs by Contractor */}
            <Collapsible 
              open={openSections.repairsByContractor} 
              onOpenChange={() => toggleSection('repairsByContractor')}
            >
              <CollapsibleTrigger className="flex items-center gap-2 w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.repairsByContractor && "rotate-180")} />
                <span className="font-medium">Repairs by Contractor</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 space-y-4">
                {/* Roof */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="roof"
                      checked={checkedItems.roof}
                      onCheckedChange={(checked) => handleCheckboxChange('roof', checked as boolean)}
                    />
                    <Label htmlFor="roof" className="text-sm">
                      Roof
                    </Label>
                  </div>
                  {checkedItems.roof && (
                    <div className="ml-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm w-20">Squares (including recommended waste):</Label>
                        <Input
                          type="text"
                          placeholder="Enter squares"
                          value={roofSquares}
                          onChange={(e) => setRoofSquares(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm w-20">Total Cost:</Label>
                        <span className="text-sm">$</span>
                        <Input
                          type="text"
                          placeholder="Enter total cost"
                          value={roofTotalCost}
                          onChange={(e) => setRoofTotalCost(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm w-20">Cost/Square:</Label>
                        <span className="text-sm">$</span>
                        <Input
                          type="text"
                          value={calculateCostPerSquare(roofTotalCost, roofSquares)}
                          readOnly
                          className="flex-1 bg-gray-100"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Roof */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="additional-roof"
                      checked={checkedItems.additionalRoof}
                      onCheckedChange={(checked) => handleCheckboxChange('additionalRoof', checked as boolean)}
                    />
                    <Label htmlFor="additional-roof" className="text-sm">
                      Additional Roof
                    </Label>
                  </div>
                  {checkedItems.additionalRoof && (
                    <div className="ml-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm w-20">Squares:</Label>
                        <Input
                          type="text"
                          placeholder="Enter squares"
                          value={additionalRoofSquares}
                          onChange={(e) => setAdditionalRoofSquares(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm w-20">Total Cost:</Label>
                        <span className="text-sm">$</span>
                        <Input
                          type="text"
                          placeholder="Enter total cost"
                          value={additionalRoofTotalCost}
                          onChange={(e) => setAdditionalRoofTotalCost(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm w-20">Cost/Square:</Label>
                        <span className="text-sm">$</span>
                        <Input
                          type="text"
                          value={calculateCostPerSquare(additionalRoofTotalCost, additionalRoofSquares)}
                          readOnly
                          className="flex-1 bg-gray-100"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Gutters */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="gutters"
                      checked={checkedItems.gutters}
                      onCheckedChange={(checked) => handleCheckboxChange('gutters', checked as boolean)}
                    />
                    <Label htmlFor="gutters" className="text-sm">
                      Gutters
                    </Label>
                  </div>
                  {checkedItems.gutters && (
                    <div className="ml-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm w-20">Linear Feet:</Label>
                        <Input
                          type="text"
                          placeholder="Enter linear feet"
                          value={guttersLinearFeet}
                          onChange={(e) => setGuttersLinearFeet(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm w-20">Total Cost:</Label>
                        <span className="text-sm">$</span>
                        <Input
                          type="text"
                          placeholder="Enter total cost"
                          value={guttersTotalCost}
                          onChange={(e) => setGuttersTotalCost(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm w-20">Cost/Foot:</Label>
                        <span className="text-sm">$</span>
                        <Input
                          type="text"
                          value={calculateCostPerLinearFoot(guttersTotalCost, guttersLinearFeet)}
                          readOnly
                          className="flex-1 bg-gray-100"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Solar */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="solar"
                      checked={checkedItems.solar}
                      onCheckedChange={(checked) => handleCheckboxChange('solar', checked as boolean)}
                    />
                    <Label htmlFor="solar" className="text-sm">
                      Solar
                    </Label>
                  </div>
                  {checkedItems.solar && (
                    <div className="ml-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm w-20">Panels:</Label>
                        <Input
                          type="text"
                          placeholder="Enter number of panels"
                          value={solarPanels}
                          onChange={(e) => setSolarPanels(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm w-20">Total Cost:</Label>
                        <span className="text-sm">$</span>
                        <Input
                          type="text"
                          placeholder="Enter total cost"
                          value={solarTotalCost}
                          onChange={(e) => setSolarTotalCost(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm w-20">Cost/Panel:</Label>
                        <span className="text-sm">$</span>
                        <Input
                          type="text"
                          value={calculateCostPerPanel(solarTotalCost, solarPanels)}
                          readOnly
                          className="flex-1 bg-gray-100"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Soffit */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="soffit"
                      checked={checkedItems.soffit}
                      onCheckedChange={(checked) => handleCheckboxChange('soffit', checked as boolean)}
                    />
                    <Label htmlFor="soffit" className="text-sm">
                      Soffit
                    </Label>
                  </div>
                  {checkedItems.soffit && (
                    <div className="ml-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm w-20">Linear Feet:</Label>
                        <Input
                          type="text"
                          placeholder="Enter linear feet"
                          value={soffitLinearFeet}
                          onChange={(e) => setSoffitLinearFeet(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm w-20">Total Cost:</Label>
                        <span className="text-sm">$</span>
                        <Input
                          type="text"
                          placeholder="Enter total cost"
                          value={soffitTotalCost}
                          onChange={(e) => setSoffitTotalCost(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm w-20">Cost/Foot:</Label>
                        <span className="text-sm">$</span>
                        <Input
                          type="text"
                          value={calculateCostPerLinearFoot(soffitTotalCost, soffitLinearFeet)}
                          readOnly
                          className="flex-1 bg-gray-100"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Fascia */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="fascia"
                      checked={checkedItems.fascia}
                      onCheckedChange={(checked) => handleCheckboxChange('fascia', checked as boolean)}
                    />
                    <Label htmlFor="fascia" className="text-sm">
                      Fascia
                    </Label>
                  </div>
                  {checkedItems.fascia && (
                    <div className="ml-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm w-20">Linear Feet:</Label>
                        <Input
                          type="text"
                          placeholder="Enter linear feet"
                          value={fasciaLinearFeet}
                          onChange={(e) => setFasciaLinearFeet(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm w-20">Total Cost:</Label>
                        <span className="text-sm">$</span>
                        <Input
                          type="text"
                          placeholder="Enter total cost"
                          value={fasciaTotalCost}
                          onChange={(e) => setFasciaTotalCost(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm w-20">Cost/Foot:</Label>
                        <span className="text-sm">$</span>
                        <Input
                          type="text"
                          value={calculateCostPerLinearFoot(fasciaTotalCost, fasciaLinearFeet)}
                          readOnly
                          className="flex-1 bg-gray-100"
                        />
                      </div>
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

import React, { useState, useEffect } from 'react';
import { PrintPreview } from '@/components/PrintPreview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Moon, Sun, Plus, Printer } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

const Index = () => {
  const { theme, setTheme } = useTheme();
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


  // Optional deduction amounts
  const [recoverableDepreciationAmount, setRecoverableDepreciationAmount] = useState('');
  const [nonRecoverableDepreciationAmount, setNonRecoverableDepreciationAmount] = useState('');
  const [paidWhenIncurredAmount, setPaidWhenIncurredAmount] = useState('');
  const [ordinanceLawAmount, setOrdinanceLawAmount] = useState('');

  // UI state for expandable sections
  const [isDeductibleExpanded, setIsDeductibleExpanded] = useState(false);

  // Dynamic payment deductions
  const [customPaymentDeductions, setCustomPaymentDeductions] = useState([]);

  // Prior payments amounts - now supports multiple payments
  const [priorPayments, setPriorPayments] = useState([
    {
      id: 1,
      amount: '',
      description: '',
      paFeesChecked: false,
      paFeesPercent: '10',
      paFeesAmount: '0.00'
    }
  ]);

  // Payments without fees - now supports multiple payments
  const [paymentsWithoutFees, setPaymentsWithoutFees] = useState([
    {
      id: 1,
      type: 'legalFees',
      typeName: 'Legal Fees',
      amount: '',
      checked: false
    },
    {
      id: 2,
      type: 'paidIncurred',
      typeName: 'Paid/Incurred',
      amount: '',
      checked: false
    }
  ]);

  // Repairs by the Insured amounts
  const [interiorRepairsAmount, setInteriorRepairsAmount] = useState('');
  const [exteriorRepairsAmount, setExteriorRepairsAmount] = useState('');
  const [fencesAmount, setFencesAmount] = useState('');
  const [screenEnclosureAmount, setScreenEnclosureAmount] = useState('');
  
  // Custom repairs by insured (dynamic)
  const [customInsuredRepairs, setCustomInsuredRepairs] = useState<Array<{
    id: number;
    description: string;
    amount: string;
    checked: boolean;
  }>>([]);

  // Dynamic sub-limits for Coverage A
  const [customSubLimits, setCustomSubLimits] = useState<Array<{
    id: number;
    type: string;
    amount: string;
    policyLimit: string;
    checked: boolean;
  }>>([]);

  // Print preview state
  const [showPrintPreview, setShowPrintPreview] = useState(false);

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
  
  // Custom repairs by contractor (dynamic)
  const [customContractorRepairs, setCustomContractorRepairs] = useState<Array<{
    id: number;
    description: string;
    amount: string;
    checked: boolean;
  }>>([]);

  // PA fee percentages (editable, default to 10%)
  const [coverageAFeePercent, setCoverageAFeePercent] = useState('10');
  const [coverageBFeePercent, setCoverageBFeePercent] = useState('10');
  const [coverageCFeePercent, setCoverageCFeePercent] = useState('10');
  const [coverageDFeePercent, setCoverageDFeePercent] = useState('10');
  const [priorCCSFeePercent, setPriorCCSFeePercent] = useState('10');

  // Overage applied to deductible tracking
  const [overageAppliedToDeductible, setOverageAppliedToDeductible] = useState<{[key: string]: boolean}>({
    coverageA: false,
    coverageB: false,
    coverageC: false,
    coverageD: false
  });

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
    const screenEnc = parseFloat(screenEnclosureAmount) || 0;
    const b = parseFloat(coverageB) || 0;
    const c = parseFloat(coverageC) || 0;
    const d = parseFloat(coverageD) || 0;
    
    const limitA = parseFloat(policyLimitA) || 0;
    const limitB = parseFloat(policyLimitB) || 0;
    const limitC = parseFloat(policyLimitC) || 0;
    const limitD = parseFloat(policyLimitD) || 0;
    
    // Use min(claim amount, policy limit) for each coverage
    const cappedA = limitA > 0 ? Math.min(a, limitA) : a;
    const cappedB = limitB > 0 ? Math.min(b, limitB) : b;
    const cappedC = limitC > 0 ? Math.min(c, limitC) : c;
    const cappedD = limitD > 0 ? Math.min(d, limitD) : d;
    
    console.log('Coverage calculation:', { a, screenEnc, b, c, d, cappedA, cappedB, cappedC, cappedD, limitD });
    const total = cappedA + screenEnc + cappedB + cappedC + cappedD;
    console.log('Total coverage:', total);
    
    return total;
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
    
    // Add custom payment deductions
    customPaymentDeductions.forEach(deduction => {
      if (deduction.checked) {
        deductions += parseFloat(deduction.amount) || 0;
      }
    });
    
    return deductions;
  };

  // Calculate total overage applied to deductible
  const calculateOverageAppliedToDeductible = () => {
    let totalOverageApplied = 0;
    
    if (overageAppliedToDeductible.coverageA) {
      totalOverageApplied += calculateOverage(coverageA, policyLimitA);
    }
    if (overageAppliedToDeductible.coverageB) {
      totalOverageApplied += calculateOverage(coverageB, policyLimitB);
    }
    if (overageAppliedToDeductible.coverageC) {
      totalOverageApplied += calculateOverage(coverageC, policyLimitC);
    }
    if (overageAppliedToDeductible.coverageD) {
      totalOverageApplied += calculateOverage(coverageD, policyLimitD);
    }
    
    // Add dynamic sub-limit overages
    customSubLimits.forEach(subLimit => {
      if (overageAppliedToDeductible[`customSubLimit${subLimit.id}`] && subLimit.checked) {
        totalOverageApplied += calculateOverage(subLimit.amount, subLimit.policyLimit);
      }
    });
    
    return totalOverageApplied;
  };

  const calculatePriorPayments = () => {
    let payments = 0;
    
    if (checkedItems.priorPayments) {
      payments = priorPayments.reduce((sum, payment) => {
        return sum + (parseFloat(payment.amount) || 0);
      }, 0);
    }
    
    return payments;
  };

  const calculatePaymentsWithoutFees = () => {
    return paymentsWithoutFees.reduce((sum, payment) => {
      if (payment.checked) {
        return sum + (parseFloat(payment.amount) || 0);
      }
      return sum;
    }, 0);
  };
  
  // Calculate total PA fees based on total coverage (always)
  const calculateTotalPAFees = () => {
    const a = parseFloat(coverageA) || 0;
    const b = parseFloat(coverageB) || 0;
    const c = parseFloat(coverageC) || 0;
    const d = parseFloat(coverageD) || 0;
    
    const aFee = a * ((parseFloat(coverageAFeePercent) || 0) / 100);
    const bFee = b * ((parseFloat(coverageBFeePercent) || 0) / 100);
    const cFee = c * ((parseFloat(coverageCFeePercent) || 0) / 100);
    const dFee = d * ((parseFloat(coverageDFeePercent) || 0) / 100);
    
    return aFee + bFee + cFee + dFee;
  };

  // Calculate prior PA fees already paid
  const calculatePriorPAFees = () => {
    if (!checkedItems.priorPayments) return 0;
    
    return priorPayments.reduce((total, payment) => {
      if (payment.paFeesChecked) {
        return total + (parseFloat(payment.paFeesAmount) || 0);
      }
      return total;
    }, 0);
  };

  // Calculate remaining PA fees due
  const calculateRemainingPAFees = () => {
    const totalPAFees = calculateTotalPAFees();
    const priorPAFees = calculatePriorPAFees();
    return Math.max(0, totalPAFees - priorPAFees);
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
  const totalOverageApplied = calculateOverageAppliedToDeductible();
  
  // Calculate effective deductible (reduced by applied overage)
  const effectiveDeductible = Math.max(0, (parseFloat(deductible) || 0) - totalOverageApplied);
  
  // Calculate balance: Total Coverage - Deductions - Prior Payments - Payments without fees - Effective Deductible
  const balanceAfterDeductible = totalCoverage - totalDeductions - totalPriorPayments - totalPaymentsWithoutFees - effectiveDeductible;
  
  // Calculate remaining PA fees due (total PA fees - prior PA fees already paid)
  const remainingPAFees = calculateRemainingPAFees();
  
  // Final balance after remaining PA fees
  const finalBalance = balanceAfterDeductible - remainingPAFees;

  // Balance plus deductible for repairs (using effective deductible)
  const balancePlusDeductible = finalBalance + effectiveDeductible;

  // Calculate total repair costs (Repairs by Insured + Repairs by Contractor)
  const calculateTotalRepairCosts = () => {
    let repairCosts = 0;
    
    // Repairs by Insured
    if (checkedItems.interiorRepairs) {
      repairCosts += parseFloat(interiorRepairsAmount) || 0;
    }
    if (checkedItems.exteriorRepairs) {
      repairCosts += parseFloat(exteriorRepairsAmount) || 0;
    }
    if (checkedItems.fences) {
      repairCosts += parseFloat(fencesAmount) || 0;
    }
    if (checkedItems.screenEnclosure) {
      repairCosts += parseFloat(screenEnclosureAmount) || 0;
    }
    
    // Custom repairs by insured
    customInsuredRepairs.forEach(repair => {
      if (repair.checked) {
        repairCosts += parseFloat(repair.amount) || 0;
      }
    });
    
    // Repairs by Contractor
    if (checkedItems.roof) {
      repairCosts += parseFloat(roofTotalCost) || 0;
    }
    if (checkedItems.additionalRoof) {
      repairCosts += parseFloat(additionalRoofTotalCost) || 0;
    }
    if (checkedItems.gutters) {
      repairCosts += parseFloat(guttersTotalCost) || 0;
    }
    if (checkedItems.solar) {
      repairCosts += parseFloat(solarTotalCost) || 0;
    }
    if (checkedItems.soffit) {
      repairCosts += parseFloat(soffitTotalCost) || 0;
    }
    if (checkedItems.fascia) {
      repairCosts += parseFloat(fasciaTotalCost) || 0;
    }
    
    // Custom repairs by contractor
    customContractorRepairs.forEach(repair => {
      if (repair.checked) {
        repairCosts += parseFloat(repair.amount) || 0;
      }
    });
    
    return repairCosts;
  };

  const totalRepairCosts = calculateTotalRepairCosts();
  const finalBalanceAfterRepairs = balancePlusDeductible - totalRepairCosts;

  // Auto-calculate PA Fees for each payment when amount or percentage changes
  useEffect(() => {
    setPriorPayments(prevPayments => 
      prevPayments.map(payment => {
        if (payment.paFeesChecked && payment.amount) {
          const amount = parseFloat(payment.amount) || 0;
          const percent = parseFloat(payment.paFeesPercent) || 0;
          const calculatedFee = (amount * percent / 100).toFixed(2);
          return { ...payment, paFeesAmount: calculatedFee };
        }
        return { ...payment, paFeesAmount: '0.00' };
      })
    );
  }, [priorPayments]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src="/lovable-uploads/d8102e62-174d-41ec-8e54-53ba66b1e02d.png" 
                  alt="Coastal Claims Services Logo" 
                  className="h-12 w-auto"
                />
                <CardTitle className="text-2xl font-semibold" style={{ color: '#1e3a8a' }}>
                  Claim Breakdown Calculator
                </CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPrintPreview(true)}
                  className="flex items-center gap-2"
                >
                  <Printer className="h-4 w-4" />
                  Print Preview
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Total Coverage Amount - Sum of A+B+C+D only */}
            <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#1e3a8a', color: 'white' }}>
              <Label htmlFor="total-coverage" className="text-sm font-medium" style={{ color: 'white' }}>
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
              <CollapsibleTrigger className="flex items-center gap-2 w-full p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
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
                        <Label className="text-sm font-medium w-20 text-muted-foreground">
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
                         <div className="ml-20 flex items-center gap-2">
                           <div className="text-red-600 text-sm font-medium bg-yellow-100 px-2 py-1 rounded">
                             Over Limit: ${calculateOverage(coverageA, policyLimitA).toFixed(2)}
                           </div>
                           <Button
                             variant="outline"
                             size="sm"
                             onClick={() => setOverageAppliedToDeductible(prev => ({
                               ...prev,
                               coverageA: !prev.coverageA
                             }))}
                             className={cn(
                               "h-6 w-6 p-0",
                               overageAppliedToDeductible.coverageA && "bg-green-100 border-green-500"
                             )}
                           >
                             <Plus className="h-3 w-3" />
                           </Button>
                           {overageAppliedToDeductible.coverageA && (
                             <span className="text-green-600 text-xs">Applied to deductible</span>
                           )}
                         </div>
                       )}
                    </div>

                    {/* Collapsible Sub-limits for Coverage A */}
                    <div className="ml-4">
                      <Collapsible 
                        open={openSections.coverageASubLimits} 
                        onOpenChange={() => toggleSection('coverageASubLimits')}
                      >
                        <CollapsibleTrigger className="flex items-center gap-2 w-full p-2 bg-muted/50 rounded-lg hover:bg-muted transition-colors border-l-2 border-border">
                          <ChevronDown className={cn("h-3 w-3 transition-transform", openSections.coverageASubLimits && "rotate-180")} />
                          <span className="text-sm font-medium text-muted-foreground">Coverage A Sub-limits</span>
                          <button
                            onClick={() => {
                              const newId = Date.now();
                              setCustomSubLimits([...customSubLimits, {
                                id: newId,
                                type: 'Screen Enclosure',
                                amount: '',
                                policyLimit: '',
                                checked: false
                              }]);
                            }}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 ml-auto"
                          >
                            + Add Sub Limit
                          </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-4 space-y-3 mt-3 border-l-2 border-border">
                          {/* Dynamic Custom Sub-limits */}
                          {customSubLimits.map((subLimit, index) => (
                            <div key={subLimit.id} className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`custom-sub-limit-${subLimit.id}`}
                                  checked={subLimit.checked}
                                  onCheckedChange={(checked) => {
                                    const newSubLimits = [...customSubLimits];
                                    newSubLimits[index].checked = checked as boolean;
                                    setCustomSubLimits(newSubLimits);
                                  }}
                                />
                                <Select
                                  value={subLimit.type}
                                  onValueChange={(value) => {
                                    const newSubLimits = [...customSubLimits];
                                    newSubLimits[index].type = value;
                                    setCustomSubLimits(newSubLimits);
                                  }}
                                >
                                  <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Select sub-limit type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Screen Enclosure">Screen Enclosure</SelectItem>
                                    <SelectItem value="Mold">Mold</SelectItem>
                                    <SelectItem value="Water Mitigation">Water Mitigation</SelectItem>
                                    <SelectItem value="Matching Ordinance and Law">Matching Ordinance and Law</SelectItem>
                                    <SelectItem value="Tree Debris Removal">Tree Debris Removal</SelectItem>
                                    <SelectItem value="Debris Removal">Debris Removal</SelectItem>
                                    <SelectItem value="Ordinance & Law">Ordinance & Law</SelectItem>
                                    <SelectItem value="Personal Property">Personal Property</SelectItem>
                                    <SelectItem value="Additional Living Expenses">Additional Living Expenses</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <button
                                  onClick={() => {
                                    setCustomSubLimits(customSubLimits.filter((_, i) => i !== index));
                                  }}
                                  className="text-red-500 hover:text-red-700 text-sm"
                                >
                                  ✕
                                </button>
                              </div>
                              {subLimit.checked && (
                                <div className="ml-6 space-y-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm">$</span>
                                    <Input
                                      type="text"
                                      placeholder="Enter sub-limit amount"
                                      value={subLimit.amount}
                                      onChange={(e) => {
                                        const newSubLimits = [...customSubLimits];
                                        newSubLimits[index].amount = e.target.value;
                                        setCustomSubLimits(newSubLimits);
                                      }}
                                      className="flex-1"
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Label className="text-sm text-muted-foreground w-20">Policy Limit</Label>
                                    <span className="text-sm">$</span>
                                    <Input
                                      type="text"
                                      placeholder="0.00"
                                      value={subLimit.policyLimit}
                                      onChange={(e) => {
                                        const newSubLimits = [...customSubLimits];
                                        newSubLimits[index].policyLimit = e.target.value;
                                        setCustomSubLimits(newSubLimits);
                                      }}
                                      className="flex-1"
                                    />
                                  </div>
                                  {(() => {
                                    const overage = calculateOverage(subLimit.amount, subLimit.policyLimit);
                                    return overage > 0 && (
                                      <div className="ml-20 flex items-center gap-2">
                                        <span className="text-red-600 text-sm font-medium">
                                          Over Limit: ${overage.toFixed(2)}
                                        </span>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => setOverageAppliedToDeductible(prev => ({
                                            ...prev,
                                            [`customSubLimit${subLimit.id}`]: !prev[`customSubLimit${subLimit.id}`]
                                          }))}
                                          className={cn(
                                            "h-6 w-6 p-0",
                                            overageAppliedToDeductible[`customSubLimit${subLimit.id}`] && "bg-green-100 border-green-500"
                                          )}
                                        >
                                          <Plus className="h-3 w-3" />
                                        </Button>
                                        {overageAppliedToDeductible[`customSubLimit${subLimit.id}`] && (
                                          <span className="text-green-600 text-xs">Applied to deductible</span>
                                        )}
                                      </div>
                                    );
                                  })()}
                                </div>
                              )}
                            </div>
                          ))}
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
                        <Label className="text-sm font-medium w-20 text-muted-foreground">
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
                         <div className="ml-20 flex items-center gap-2">
                           <div className="text-red-600 text-sm font-medium bg-yellow-100 px-2 py-1 rounded">
                             Over Limit: ${calculateOverage(coverageB, policyLimitB).toFixed(2)}
                           </div>
                           <Button
                             variant="outline"
                             size="sm"
                             onClick={() => setOverageAppliedToDeductible(prev => ({
                               ...prev,
                               coverageB: !prev.coverageB
                             }))}
                             className={cn(
                               "h-6 w-6 p-0",
                               overageAppliedToDeductible.coverageB && "bg-green-100 border-green-500"
                             )}
                           >
                             <Plus className="h-3 w-3" />
                           </Button>
                           {overageAppliedToDeductible.coverageB && (
                             <span className="text-green-600 text-xs">Applied to deductible</span>
                           )}
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
                        <Label className="text-sm font-medium w-20 text-muted-foreground">
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
                         <div className="ml-20 flex items-center gap-2">
                           <div className="text-red-600 text-sm font-medium bg-yellow-100 px-2 py-1 rounded">
                             Over Limit: ${calculateOverage(coverageC, policyLimitC).toFixed(2)}
                           </div>
                           <Button
                             variant="outline"
                             size="sm"
                             onClick={() => setOverageAppliedToDeductible(prev => ({
                               ...prev,
                               coverageC: !prev.coverageC
                             }))}
                             className={cn(
                               "h-6 w-6 p-0",
                               overageAppliedToDeductible.coverageC && "bg-green-100 border-green-500"
                             )}
                           >
                             <Plus className="h-3 w-3" />
                           </Button>
                           {overageAppliedToDeductible.coverageC && (
                             <span className="text-green-600 text-xs">Applied to deductible</span>
                           )}
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
                        <Label className="text-sm font-medium w-20 text-muted-foreground">
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
                         <div className="ml-20 flex items-center gap-2">
                           <div className="text-red-600 text-sm font-medium bg-yellow-100 px-2 py-1 rounded">
                             Over Limit: ${calculateOverage(coverageD, policyLimitD).toFixed(2)}
                           </div>
                           <Button
                             variant="outline"
                             size="sm"
                             onClick={() => setOverageAppliedToDeductible(prev => ({
                               ...prev,
                               coverageD: !prev.coverageD
                             }))}
                             className={cn(
                               "h-6 w-6 p-0",
                               overageAppliedToDeductible.coverageD && "bg-green-100 border-green-500"
                             )}
                           >
                             <Plus className="h-3 w-3" />
                           </Button>
                           {overageAppliedToDeductible.coverageD && (
                             <span className="text-green-600 text-xs">Applied to deductible</span>
                           )}
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
              <CollapsibleTrigger className="flex items-center gap-2 w-full p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.optionalDeductions && "rotate-180")} />
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">Payment Deductions</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const newId = Math.max(...customPaymentDeductions.map(d => d.id), 0) + 1;
                      setCustomPaymentDeductions([...customPaymentDeductions, {
                        id: newId,
                        description: 'Custom Deduction',
                        amount: '',
                        checked: false
                      }]);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    + Add Payment Deduction
                  </button>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4">
                {/* 2x2 Grid Layout for Optional Deductions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Recoverable Depreciation */}
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
                          className="w-32"
                        />
                      </div>
                    )}
                  </div>

                  {/* Non-Recoverable Depreciation */}
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
                          className="w-32"
                        />
                      </div>
                    )}
                  </div>

                  {/* Paid When Incurred */}
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
                          className="w-32"
                        />
                      </div>
                    )}
                  </div>

                  {/* Ordinance & Law */}
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
                          className="w-32"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Custom Payment Deductions */}
                {customPaymentDeductions.length > 0 && (
                  <div className="mt-4 space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground">Custom Deductions</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {customPaymentDeductions.map((deduction, index) => (
                        <div key={deduction.id} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 flex-1">
                              <Checkbox 
                                checked={deduction.checked}
                                onCheckedChange={(checked) => {
                                  const updated = [...customPaymentDeductions];
                                  updated[index].checked = checked as boolean;
                                  setCustomPaymentDeductions(updated);
                                }}
                              />
                              <Input
                                type="text"
                                placeholder="Enter deduction name"
                                value={deduction.description}
                                onChange={(e) => {
                                  const updated = [...customPaymentDeductions];
                                  updated[index].description = e.target.value;
                                  setCustomPaymentDeductions(updated);
                                }}
                                className="border-none bg-transparent p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                              />
                            </div>
                            <button
                              onClick={() => {
                                setCustomPaymentDeductions(customPaymentDeductions.filter((_, i) => i !== index));
                              }}
                              className="text-red-500 hover:text-red-700 text-sm ml-2"
                            >
                              ✕
                            </button>
                          </div>
                          {deduction.checked && (
                            <div className="ml-6 flex items-center gap-2">
                              <span className="text-sm">$</span>
                              <Input
                                type="text"
                                placeholder="Enter amount"
                                value={deduction.amount}
                                onChange={(e) => {
                                  const updated = [...customPaymentDeductions];
                                  updated[index].amount = e.target.value;
                                  setCustomPaymentDeductions(updated);
                                }}
                                className="w-32"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>

            {/* Prior Payments with CCS Fees */}
            <Collapsible 
              open={openSections.priorPayments} 
              onOpenChange={() => toggleSection('priorPayments')}
            >
              <CollapsibleTrigger className="flex items-center gap-2 w-full p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.priorPayments && "rotate-180")} />
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">Prior Payments</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const newId = Math.max(...priorPayments.map(p => p.id)) + 1;
                      setPriorPayments([...priorPayments, {
                        id: newId,
                        amount: '',
                        description: '',
                        paFeesChecked: false,
                        paFeesPercent: '10',
                        paFeesAmount: '0.00'
                      }]);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    + Add Prior Payment
                  </button>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 space-y-4">
                {/* Compact 3-column layout */}
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
                    <div className="ml-6 space-y-2">
                      {/* Header Row */}
                      <div className="grid grid-cols-5 gap-4 text-xs text-muted-foreground font-medium">
                        <div>Amount</div>
                        <div>Description</div>
                        <div>PA Fees</div>
                        <div>Fee Total</div>
                        <div></div>
                      </div>
                      
                      {/* Payment Rows */}
                      {priorPayments.map((payment, index) => (
                        <div key={payment.id} className="grid grid-cols-5 gap-4 items-center">
                          {/* Amount */}
                          <div className="flex items-center gap-1">
                            <span className="text-sm">$</span>
                            <Input
                              type="text"
                              placeholder="0.00"
                              value={payment.amount}
                              onChange={(e) => {
                                const newPayments = [...priorPayments];
                                newPayments[index].amount = e.target.value;
                                setPriorPayments(newPayments);
                              }}
                              className="w-24"
                            />
                          </div>
                          
                          {/* Description */}
                          <Input
                            type="text"
                            placeholder="Check #, payment type, etc."
                            value={payment.description}
                            onChange={(e) => {
                              const newPayments = [...priorPayments];
                              newPayments[index].description = e.target.value;
                              setPriorPayments(newPayments);
                            }}
                            className="w-full"
                          />
                          
                          {/* PA Fees */}
                          <div className="flex items-center gap-1">
                            <Checkbox 
                              checked={payment.paFeesChecked}
                              onCheckedChange={(checked) => {
                                const newPayments = [...priorPayments];
                                newPayments[index].paFeesChecked = checked as boolean;
                                setPriorPayments(newPayments);
                              }}
                            />
                            <Input
                              type="text"
                              value={payment.paFeesPercent}
                              onChange={(e) => {
                                const newPayments = [...priorPayments];
                                newPayments[index].paFeesPercent = e.target.value;
                                setPriorPayments(newPayments);
                              }}
                              className="w-12 text-center text-xs"
                            />
                            <span className="text-xs">%</span>
                          </div>
                          
                          {/* Fee Total */}
                          <div className="flex items-center gap-1">
                            <span className="text-sm">$</span>
                            <Input
                              type="text"
                              value={payment.paFeesChecked ? payment.paFeesAmount : '0.00'}
                              className="w-20 bg-muted/50 text-sm"
                              readOnly
                            />
                          </div>
                          
                          {/* Delete Button */}
                          <div>
                            {priorPayments.length > 1 && (
                              <button
                                onClick={() => {
                                  setPriorPayments(priorPayments.filter((_, i) => i !== index));
                                }}
                                className="text-red-500 hover:text-red-700 text-sm"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                     </div>
                   )}
                 </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Payments without Fees */}
            <Collapsible 
              open={openSections.paymentsWithoutFees} 
              onOpenChange={() => toggleSection('paymentsWithoutFees')}
            >
              <CollapsibleTrigger className="flex items-center gap-2 w-full p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.paymentsWithoutFees && "rotate-180")} />
                <span className="font-medium">Payments without Fees</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const newId = Math.max(...paymentsWithoutFees.map(p => p.id)) + 1;
                    setPaymentsWithoutFees([...paymentsWithoutFees, {
                      id: newId,
                      type: 'custom',
                      typeName: 'Custom Payment',
                      amount: '',
                      checked: false
                    }]);
                  }}
                  className="ml-auto bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded text-sm font-medium flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add Payment
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {paymentsWithoutFees.map((payment, index) => (
                    <div key={payment.id} className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`payment-${payment.id}`}
                          checked={payment.checked}
                          onCheckedChange={(checked) => {
                            const newPayments = [...paymentsWithoutFees];
                            newPayments[index].checked = checked as boolean;
                            setPaymentsWithoutFees(newPayments);
                          }}
                        />
                        {payment.type === 'custom' ? (
                          <div className="flex items-center gap-2 flex-1">
                            <Input
                              type="text"
                              placeholder="Custom Payment"
                              value={payment.typeName}
                              onChange={(e) => {
                                const newPayments = [...paymentsWithoutFees];
                                newPayments[index].typeName = e.target.value;
                                setPaymentsWithoutFees(newPayments);
                              }}
                              className="text-sm border-none p-0 h-auto bg-transparent"
                            />
                            <button
                              onClick={() => {
                                setPaymentsWithoutFees(paymentsWithoutFees.filter((_, i) => i !== index));
                              }}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <Label htmlFor={`payment-${payment.id}`} className="text-sm">
                            {payment.typeName}
                          </Label>
                        )}
                      </div>
                      {payment.checked && (
                        <div className="ml-6 flex items-center gap-2">
                          <span className="text-sm">$</span>
                          <Input
                            type="text"
                            placeholder="Enter amount"
                            value={payment.amount}
                            onChange={(e) => {
                              const newPayments = [...paymentsWithoutFees];
                              newPayments[index].amount = e.target.value;
                              setPaymentsWithoutFees(newPayments);
                            }}
                            className="flex-1"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Deductible with Breakdown */}
            <div className="bg-muted/50 rounded-lg">
              <div 
                className="flex items-center gap-4 p-3 cursor-pointer"
                onClick={() => setIsDeductibleExpanded(!isDeductibleExpanded)}
              >
                <Label className="text-sm font-medium w-20">
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
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">$ {effectiveDeductible.toFixed(2)}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isDeductibleExpanded ? 'rotate-180' : ''}`} />
                </div>
              </div>
              
              {isDeductibleExpanded && (
                <div className="px-3 pb-3">
                  <div className="bg-white p-3 rounded border-l-4 border-blue-500">
                    <h4 className="font-medium mb-2">Deductible Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Original Deductible:</span>
                        <span>$ {(parseFloat(deductible) || 0).toFixed(2)}</span>
                      </div>
                      {totalOverageApplied > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Over Limit Applied:</span>
                          <span>- $ {totalOverageApplied.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-medium border-t pt-2">
                        <span>Effective Deductible:</span>
                        <span>$ {effectiveDeductible.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Balance after Deductible */}
            <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#1e3a8a', color: 'white' }}>
              <span className="font-medium">Balance</span>
              <span className="text-lg font-semibold">$ {balanceAfterDeductible.toFixed(2)}</span>
            </div>

            {/* CCS Fees - now expandable with individual coverage fee inputs in 2x2 grid */}
            <Collapsible 
              open={openSections.ccsFees} 
              onOpenChange={() => toggleSection('ccsFees')}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center gap-2">
                  <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.ccsFees && "rotate-180")} />
                  <span className="font-medium">CCS Fees</span>
                </div>
                <span className="text-lg font-semibold">$ {remainingPAFees.toFixed(2)}</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 space-y-6">
                {/* PA Fees Breakdown */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-4 text-gray-800">PA Fees Breakdown</h4>
                  
                  {/* Total PA Fees */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Total PA Fees</span>
                      <span className="font-medium">$ {calculateTotalPAFees().toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-500 h-3 rounded-full"
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                  </div>

                  {/* Prior PA Fees Paid */}
                  {calculatePriorPAFees() > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Prior PA Fees Already Paid</span>
                        <span className="font-medium text-red-600">- $ {calculatePriorPAFees().toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-red-500 h-3 rounded-full"
                          style={{ 
                            width: `${(calculatePriorPAFees() / calculateTotalPAFees()) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Remaining PA Fees Due */}
                  <div className="pt-3 border-t border-gray-300">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-800">Remaining PA Fees Due</span>
                      <span className="font-semibold text-green-600">$ {remainingPAFees.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full"
                        style={{ 
                          width: `${calculateTotalPAFees() > 0 ? (remainingPAFees / calculateTotalPAFees()) * 100 : 0}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

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
            <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#22c55e', color: 'white' }}>
              <span className="font-medium">Balance after PA Fees</span>
              <span className="text-lg font-semibold">$ {finalBalance.toFixed(2)}</span>
            </div>

            {/* Balance + Deductible */}
            <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#22c55e', color: 'white' }}>
              <span className="font-medium">Balance + Deductible</span>
              <span className="text-lg font-semibold">$ {balancePlusDeductible.toFixed(2)}</span>
            </div>

            {/* Repairs by the Insured */}
            <Collapsible 
              open={openSections.repairsByInsured} 
              onOpenChange={() => toggleSection('repairsByInsured')}
            >
              <CollapsibleTrigger className="flex items-center gap-2 w-full p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.repairsByInsured && "rotate-180")} />
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">Repairs by the Insured</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const newId = Math.max(...customInsuredRepairs.map(r => r.id), 0) + 1;
                      setCustomInsuredRepairs([...customInsuredRepairs, {
                        id: newId,
                        description: 'Additional Repair',
                        amount: '',
                        checked: false
                      }]);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    + Add Additional Repairs
                  </button>
                </div>
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

                {/* Custom Additional Repairs */}
                {customInsuredRepairs.map((repair, index) => (
                  <div key={repair.id} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`custom-insured-repair-${repair.id}`}
                        checked={repair.checked}
                        onCheckedChange={(checked) => {
                          const newRepairs = [...customInsuredRepairs];
                          newRepairs[index].checked = checked as boolean;
                          setCustomInsuredRepairs(newRepairs);
                        }}
                      />
                      <Input
                        type="text"
                        placeholder="Custom Repair"
                        value={repair.description}
                        onChange={(e) => {
                          const newRepairs = [...customInsuredRepairs];
                          newRepairs[index].description = e.target.value;
                          setCustomInsuredRepairs(newRepairs);
                        }}
                        className="text-sm flex-1"
                      />
                      <button
                        onClick={() => {
                          setCustomInsuredRepairs(customInsuredRepairs.filter((_, i) => i !== index));
                        }}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                    {repair.checked && (
                      <div className="ml-6 flex items-center gap-2">
                        <Label className="text-sm w-20">Amount:</Label>
                        <span className="text-sm">$</span>
                        <Input
                          type="text"
                          placeholder="Enter amount"
                          value={repair.amount}
                          onChange={(e) => {
                            const newRepairs = [...customInsuredRepairs];
                            newRepairs[index].amount = e.target.value;
                            setCustomInsuredRepairs(newRepairs);
                          }}
                          className="flex-1"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Repairs by Contractor */}
            <Collapsible 
              open={openSections.repairsByContractor} 
              onOpenChange={() => toggleSection('repairsByContractor')}
            >
              <CollapsibleTrigger className="flex items-center gap-2 w-full p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.repairsByContractor && "rotate-180")} />
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">Repairs by Contractor</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const newId = Math.max(...customContractorRepairs.map(r => r.id), 0) + 1;
                      setCustomContractorRepairs([...customContractorRepairs, {
                        id: newId,
                        description: 'Additional Repair',
                        amount: '',
                        checked: false
                      }]);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    + Add Additional Repairs
                  </button>
                </div>
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
                          className="flex-1 bg-muted/50"
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
                          className="flex-1 bg-muted/50"
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
                          className="flex-1 bg-muted/50"
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
                          className="flex-1 bg-muted/50"
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
                          className="flex-1 bg-muted/50"
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
                          className="flex-1 bg-muted/50"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Custom Additional Contractor Repairs */}
                {customContractorRepairs.map((repair, index) => (
                  <div key={repair.id} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`custom-contractor-repair-${repair.id}`}
                        checked={repair.checked}
                        onCheckedChange={(checked) => {
                          const newRepairs = [...customContractorRepairs];
                          newRepairs[index].checked = checked as boolean;
                          setCustomContractorRepairs(newRepairs);
                        }}
                      />
                      <Input
                        type="text"
                        placeholder="Custom Repair"
                        value={repair.description}
                        onChange={(e) => {
                          const newRepairs = [...customContractorRepairs];
                          newRepairs[index].description = e.target.value;
                          setCustomContractorRepairs(newRepairs);
                        }}
                        className="text-sm flex-1"
                      />
                      <button
                        onClick={() => {
                          setCustomContractorRepairs(customContractorRepairs.filter((_, i) => i !== index));
                        }}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                    {repair.checked && (
                      <div className="ml-6 space-y-3">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm w-20">Total Cost:</Label>
                          <span className="text-sm">$</span>
                          <Input
                            type="text"
                            placeholder="Enter total cost"
                            value={repair.amount}
                            onChange={(e) => {
                              const newRepairs = [...customContractorRepairs];
                              newRepairs[index].amount = e.target.value;
                              setCustomContractorRepairs(newRepairs);
                            }}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Final Balance Display */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between p-4 rounded-lg" style={{ 
              backgroundColor: '#1e3a8a',
              color: 'white'
            }}>
              <Label className="text-lg font-semibold">
                {finalBalanceAfterRepairs >= 0 
                  ? 'Final Balance' 
                  : 'Total Out of Pocket Expense After Deductible by Insured'
                }
              </Label>
              <div className="flex items-center gap-2">
                <span className={`text-xl ${finalBalanceAfterRepairs >= 0 ? 'text-white' : 'text-red-400'}`}>$</span>
                <span className={`text-xl font-bold min-w-32 text-right ${
                  finalBalanceAfterRepairs >= 0 ? 'text-white' : 'text-red-400'
                }`}>
                  {finalBalanceAfterRepairs >= 0 
                    ? finalBalanceAfterRepairs.toFixed(2)
                    : Math.abs(finalBalanceAfterRepairs).toFixed(2)
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Print Preview Modal */}
        <PrintPreview
          isOpen={showPrintPreview}
          onClose={() => setShowPrintPreview(false)}
          data={{
            claimAmount,
            deductible,
            coverageA,
            coverageB,
            coverageC,
            coverageD,
            totalCoverage,
            customSubLimits,
            priorPayments,
            paymentsWithoutFees,
            customPaymentDeductions,
            customInsuredRepairs,
            customContractorRepairs,
            finalBalance: finalBalanceAfterRepairs
          }}
        />
      </div>
    </div>
  );
};

export default Index;

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ClaimInfoPage } from '@/components/ClaimInfoPage';
import { PrintPreview } from '@/components/PrintPreview';
import { usePrint } from '@/hooks/usePrint';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'claim-info' | 'calculator'>('claim-info');
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const { printReport } = usePrint();

  // Claim info state
  const [claimInfo, setClaimInfo] = useState({
    releaseType: '',
    customReleaseTypeName: '',
    insuranceName: '',
    insuranceAddress: '',
    claimNumber: ''
  });

  const [openingStatement, setOpeningStatement] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [deductible, setDeductible] = useState('');
  const [coverageA, setCoverageA] = useState('');
  const [coverageB, setCoverageB] = useState('');
  const [coverageC, setCoverageC] = useState('');
  const [coverageD, setCoverageD] = useState('');
  
  const [customSubLimits, setCustomSubLimits] = useState([
    { id: 1, type: 'Electronics', amount: '', policyLimit: '', checked: false },
    { id: 2, type: 'Jewelry', amount: '', policyLimit: '', checked: false },
    { id: 3, type: 'Art/Collectibles', amount: '', policyLimit: '', checked: false },
    { id: 4, type: 'Business Property', amount: '', policyLimit: '', checked: false },
    { id: 5, type: 'Additional Living Expenses', amount: '', policyLimit: '', checked: false }
  ]);

  const [priorPayments, setPriorPayments] = useState([
    { id: 1, amount: '', description: '', paFeesChecked: false, paFeesPercent: '10', paFeesAmount: '' }
  ]);

  const [paymentsWithoutFees, setPaymentsWithoutFees] = useState([
    { id: 1, type: 'legalFees', typeName: 'Legal Fees', amount: '', checked: false },
    { id: 2, type: 'coastalFees', typeName: 'Coastal Claims Services Fees', amount: '', checked: false }
  ]);

  const [customPaymentDeductions, setCustomPaymentDeductions] = useState([
    { id: 1, description: '', amount: '', checked: false }
  ]);

  const [customInsuredRepairs, setCustomInsuredRepairs] = useState([
    { id: 1, description: '', amount: '', checked: false }
  ]);

  const [customContractorRepairs, setCustomContractorRepairs] = useState([
    { id: 1, description: '', amount: '', checked: false }
  ]);

  // Handler for updating claim info
  const handleUpdateClaimInfo = (field: string, value: string) => {
    setClaimInfo(prev => ({ ...prev, [field]: value }));
  };

  // Handler for proceeding to calculator
  const handleProceedToCalculator = () => {
    setCurrentPage('calculator');
  };

  // Handler for going back to claim info
  const handleBackToClaimInfo = () => {
    setCurrentPage('claim-info');
  };

  const parseAmount = (value: string): number => {
    const cleanValue = value.replace(/[^\d.-]/g, '');
    return parseFloat(cleanValue) || 0;
  };

  const totalCoverage = parseAmount(coverageA) + parseAmount(coverageB) + parseAmount(coverageC) + parseAmount(coverageD);

  const calculateTotalPriorPayments = useCallback(() => {
    return priorPayments.reduce((total, payment) => {
      const paymentAmount = parseAmount(payment.amount);
      const paFeesAmount = payment.paFeesChecked ? parseAmount(payment.paFeesAmount) : 0;
      return total + paymentAmount + paFeesAmount;
    }, 0);
  }, [priorPayments]);

  const calculateTotalPaymentsWithoutFees = useCallback(() => {
    return paymentsWithoutFees.reduce((total, payment) => {
      return payment.checked ? total + parseAmount(payment.amount) : total;
    }, 0);
  }, [paymentsWithoutFees]);

  const calculateTotalCustomPaymentDeductions = useCallback(() => {
    return customPaymentDeductions.reduce((total, payment) => {
      return payment.checked ? total + parseAmount(payment.amount) : total;
    }, 0);
  }, [customPaymentDeductions]);

  const calculateTotalInsuredRepairs = useCallback(() => {
    return customInsuredRepairs.reduce((total, repair) => {
      return repair.checked ? total + parseAmount(repair.amount) : total;
    }, 0);
  }, [customInsuredRepairs]);

  const calculateTotalContractorRepairs = useCallback(() => {
    return customContractorRepairs.reduce((total, repair) => {
      return repair.checked ? total + parseAmount(repair.amount) : total;
    }, 0);
  }, [customContractorRepairs]);

  const totalPriorPayments = calculateTotalPriorPayments();
  const totalPaymentsWithoutFees = calculateTotalPaymentsWithoutFees();
  const totalCustomPaymentDeductions = calculateTotalCustomPaymentDeductions();
  const totalInsuredRepairs = calculateTotalInsuredRepairs();
  const totalContractorRepairs = calculateTotalContractorRepairs();

  const finalBalanceAmount = totalCoverage - parseAmount(deductible) - totalPriorPayments - totalPaymentsWithoutFees - totalCustomPaymentDeductions - totalInsuredRepairs - totalContractorRepairs;

  const addPriorPayment = () => {
    const newId = Math.max(...priorPayments.map(p => p.id)) + 1;
    setPriorPayments([...priorPayments, { 
      id: newId, 
      amount: '', 
      description: '', 
      paFeesChecked: false, 
      paFeesPercent: '10', 
      paFeesAmount: '' 
    }]);
  };

  const removePriorPayment = (id: number) => {
    if (priorPayments.length > 1) {
      setPriorPayments(priorPayments.filter(p => p.id !== id));
    }
  };

  const updatePriorPayment = (id: number, field: string, value: string | boolean) => {
    setPriorPayments(priorPayments.map(payment => {
      if (payment.id === id) {
        const updatedPayment = { ...payment, [field]: value };
        
        if (field === 'amount' || field === 'paFeesPercent') {
          const amount = parseAmount(field === 'amount' ? value as string : updatedPayment.amount);
          const percent = parseFloat(field === 'paFeesPercent' ? value as string : updatedPayment.paFeesPercent) || 0;
          updatedPayment.paFeesAmount = (amount * percent / 100).toFixed(2);
        }
        
        return updatedPayment;
      }
      return payment;
    }));
  };

  const updatePaymentWithoutFees = (id: number, field: string, value: string | boolean) => {
    setPaymentsWithoutFees(paymentsWithoutFees.map(payment => 
      payment.id === id ? { ...payment, [field]: value } : payment
    ));
  };

  const addCustomPaymentDeduction = () => {
    const newId = Math.max(...customPaymentDeductions.map(p => p.id)) + 1;
    setCustomPaymentDeductions([...customPaymentDeductions, { 
      id: newId, 
      description: '', 
      amount: '', 
      checked: false 
    }]);
  };

  const removeCustomPaymentDeduction = (id: number) => {
    if (customPaymentDeductions.length > 1) {
      setCustomPaymentDeductions(customPaymentDeductions.filter(p => p.id !== id));
    }
  };

  const updateCustomPaymentDeduction = (id: number, field: string, value: string | boolean) => {
    setCustomPaymentDeductions(customPaymentDeductions.map(payment => 
      payment.id === id ? { ...payment, [field]: value } : payment
    ));
  };

  const addCustomInsuredRepair = () => {
    const newId = Math.max(...customInsuredRepairs.map(r => r.id)) + 1;
    setCustomInsuredRepairs([...customInsuredRepairs, { 
      id: newId, 
      description: '', 
      amount: '', 
      checked: false 
    }]);
  };

  const removeCustomInsuredRepair = (id: number) => {
    if (customInsuredRepairs.length > 1) {
      setCustomInsuredRepairs(customInsuredRepairs.filter(r => r.id !== id));
    }
  };

  const updateCustomInsuredRepair = (id: number, field: string, value: string | boolean) => {
    setCustomInsuredRepairs(customInsuredRepairs.map(repair => 
      repair.id === id ? { ...repair, [field]: value } : repair
    ));
  };

  const addCustomContractorRepair = () => {
    const newId = Math.max(...customContractorRepairs.map(r => r.id)) + 1;
    setCustomContractorRepairs([...customContractorRepairs, { 
      id: newId, 
      description: '', 
      amount: '', 
      checked: false 
    }]);
  };

  const removeCustomContractorRepair = (id: number) => {
    if (customContractorRepairs.length > 1) {
      setCustomContractorRepairs(customContractorRepairs.filter(r => r.id !== id));
    }
  };

  const updateCustomContractorRepair = (id: number, field: string, value: string | boolean) => {
    setCustomContractorRepairs(customContractorRepairs.map(repair => 
      repair.id === id ? { ...repair, [field]: value } : repair
    ));
  };

  const updateCustomSubLimit = (id: number, field: string, value: string | boolean) => {
    setCustomSubLimits(customSubLimits.map(subLimit => 
      subLimit.id === id ? { ...subLimit, [field]: value } : subLimit
    ));
  };

  const handlePrintPreview = () => {
    setShowPrintPreview(true);
  };

  const printData = {
    ...claimInfo,
    openingStatement,
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
    finalBalance: finalBalanceAmount
  };

  // Show claim info page first
  if (currentPage === 'claim-info') {
    return (
      <ClaimInfoPage
        claimInfo={claimInfo}
        onUpdateClaimInfo={handleUpdateClaimInfo}
        onNext={handleProceedToCalculator}
      />
    );
  }

  // Show calculator page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={handleBackToClaimInfo}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Claim Info
          </Button>
          
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/d8102e62-174d-41ec-8e54-53ba66b1e02d.png" 
              alt="Coastal Claims Services Logo" 
              className="h-12 w-auto"
            />
            <h1 className="text-3xl font-bold" style={{ color: '#1e3a8a' }}>
              Claim Breakdown Calculator
            </h1>
          </div>
        </div>

        {/* Total Coverage Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Total Coverage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Opening Statement */}
            <div className="space-y-2">
              <Label htmlFor="opening-statement">Opening Statement (Optional)</Label>
              <Input
                id="opening-statement"
                value={openingStatement}
                onChange={(e) => setOpeningStatement(e.target.value)}
                placeholder="Enter an opening statement for your claim breakdown"
              />
            </div>

            {/* Claim Amount and Deductible */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="claim-amount">Claim Amount</Label>
                <Input
                  id="claim-amount"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                  placeholder="0.00"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deductible">Deductible</Label>
                <Input
                  id="deductible"
                  value={deductible}
                  onChange={(e) => setDeductible(e.target.value)}
                  placeholder="0.00"
                  type="text"
                />
              </div>
            </div>

            {/* Coverage Amounts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="coverage-a">Coverage A</Label>
                <Input
                  id="coverage-a"
                  value={coverageA}
                  onChange={(e) => setCoverageA(e.target.value)}
                  placeholder="0.00"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverage-b">Coverage B</Label>
                <Input
                  id="coverage-b"
                  value={coverageB}
                  onChange={(e) => setCoverageB(e.target.value)}
                  placeholder="0.00"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverage-c">Coverage C</Label>
                <Input
                  id="coverage-c"
                  value={coverageC}
                  onChange={(e) => setCoverageC(e.target.value)}
                  placeholder="0.00"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverage-d">Coverage D</Label>
                <Input
                  id="coverage-d"
                  value={coverageD}
                  onChange={(e) => setCoverageD(e.target.value)}
                  placeholder="0.00"
                  type="text"
                />
              </div>
            </div>

            {/* Total Coverage Display */}
            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#1e3a8a', color: 'white' }}>
              <Label className="text-lg font-semibold">Total Coverage</Label>
              <div className="flex items-center">
                <span className="text-xl font-bold text-white">
                  ${totalCoverage.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Print Button */}
        {totalCoverage > 0 && (
          <div className="flex justify-center mt-6">
            <Button 
              onClick={handlePrintPreview}
              className="px-8 py-3 text-lg"
              style={{ backgroundColor: '#1e3a8a' }}
            >
              Print to PDF
            </Button>
          </div>
        )}

        {/* Print Preview Modal */}
        <PrintPreview
          isOpen={showPrintPreview}
          onClose={() => setShowPrintPreview(false)}
          data={printData}
        />
      </div>
    </div>
  );
};

export default Index;

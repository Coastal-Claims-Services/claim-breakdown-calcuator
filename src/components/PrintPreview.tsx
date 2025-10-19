import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Printer, X } from 'lucide-react';

interface PrintPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    releaseType: string;
    openingStatement: string;
    claimAmount: string;
    deductible: string;
    coverageA: string;
    coverageB: string;
    coverageC: string;
    coverageD: string;
    totalCoverage: number;
    customSubLimits: Array<{
      id: number;
      type: string;
      amount: string;
      policyLimit: string;
      checked: boolean;
    }>;
    priorPayments: Array<{
      id: number;
      amount: string;
      description: string;
      paFeesChecked: boolean;
      paFeesPercent: string;
      paFeesAmount: string;
    }>;
    paymentsWithoutFees: Array<{
      id: number;
      type: string;
      typeName: string;
      amount: string;
      checked: boolean;
    }>;
    customPaymentDeductions: Array<{
      id: number;
      description: string;
      amount: string;
      checked: boolean;
    }>;
    customInsuredRepairs: Array<{
      id: number;
      description: string;
      amount: string;
      checked: boolean;
    }>;
    customContractorRepairs: Array<{
      id: number;
      description: string;
      amount: string;
      checked: boolean;
    }>;
    finalBalance: number;
  };
}

export const PrintPreview: React.FC<PrintPreviewProps> = ({ isOpen, onClose, data }) => {
  const [printOptions, setPrintOptions] = useState({
    showLegalFees: true,
    showCoastalFees: true,
    showPriorPayments: true,
    showPAFees: true,
    showCustomPayments: true,
    showRepairDetails: true,
    showSubLimits: true
  });

  const handlePrint = () => {
    window.print();
  };

  const updatePrintOption = (key: keyof typeof printOptions, value: boolean) => {
    setPrintOptions(prev => ({ ...prev, [key]: value }));
  };

  // Render the print content component
  const renderPrintContent = () => (
    <div className="print-only-content">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src="/lovable-uploads/d8102e62-174d-41ec-8e54-53ba66b1e02d.png"
          alt="Coastal Claims Services Logo"
          className="h-12 w-auto"
        />
        <h1 className="text-2xl font-semibold" style={{ color: '#1e3a8a' }}>
          Claim Breakdown Calculator
        </h1>
      </div>

      {/* Basic Claim Info */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Claim Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.deductible && (
            <div className="mb-4">
              <Label className="text-sm font-medium">Deductible</Label>
              <div className="text-lg font-semibold">${data.deductible}</div>
            </div>
          )}

          <div className="bg-blue-900 text-white p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Coverage</span>
              <span className="text-lg font-semibold">${data.totalCoverage.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-sm">Coverage A</Label>
              <div>${data.coverageA || '0.00'}</div>
            </div>
            <div>
              <Label className="text-sm">Coverage B</Label>
              <div>${data.coverageB || '0.00'}</div>
            </div>
            <div>
              <Label className="text-sm">Coverage C</Label>
              <div>${data.coverageC || '0.00'}</div>
            </div>
            <div>
              <Label className="text-sm">Coverage D</Label>
              <div>${data.coverageD || '0.00'}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sub-limits */}
      {printOptions.showSubLimits && data.customSubLimits.some(sl => sl.checked) && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Coverage A Sub-limits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.customSubLimits
                .filter(subLimit => subLimit.checked)
                .map(subLimit => (
                  <div key={subLimit.id} className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm">{subLimit.type}</span>
                    <div className="text-right">
                      <div className="text-sm">${subLimit.amount || '0.00'}</div>
                      {subLimit.policyLimit && (
                        <div className="text-xs text-muted-foreground">
                          Policy Limit: ${subLimit.policyLimit}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Prior Payments */}
      {printOptions.showPriorPayments && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Prior Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.priorPayments.map(payment => (
                <div key={payment.id} className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm">{payment.description || 'Prior Payment'}</span>
                  <div className="text-right">
                    <div className="text-sm">${payment.amount || '0.00'}</div>
                    {printOptions.showPAFees && payment.paFeesChecked && (
                      <div className="text-xs text-muted-foreground">
                        PA Fees ({payment.paFeesPercent}%): ${payment.paFeesAmount}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payments Without Fees */}
      {(printOptions.showLegalFees || printOptions.showCustomPayments) && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Additional Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.paymentsWithoutFees
                .filter(payment => {
                  if (payment.type === 'legalFees' && !printOptions.showLegalFees) return false;
                  return payment.checked;
                })
                .map(payment => (
                  <div key={payment.id} className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm">{payment.typeName}</span>
                    <span className="text-sm">${payment.amount || '0.00'}</span>
                  </div>
                ))}

              {printOptions.showCustomPayments && data.customPaymentDeductions
                .filter(payment => payment.checked)
                .map(payment => (
                  <div key={payment.id} className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm">{payment.description}</span>
                    <span className="text-sm">${payment.amount || '0.00'}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Repairs */}
      {printOptions.showRepairDetails && (
        <>
          {data.customInsuredRepairs.some(repair => repair.checked) && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Repairs by the Insured</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {data.customInsuredRepairs
                    .filter(repair => repair.checked)
                    .map(repair => (
                      <div key={repair.id} className="flex justify-between items-center py-2 border-b">
                        <span className="text-sm">{repair.description}</span>
                        <span className="text-sm">${repair.amount || '0.00'}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {data.customContractorRepairs.some(repair => repair.checked) && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Repairs by Contractor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {data.customContractorRepairs
                    .filter(repair => repair.checked)
                    .map(repair => (
                      <div key={repair.id} className="flex justify-between items-center py-2 border-b">
                        <span className="text-sm">{repair.description}</span>
                        <span className="text-sm">${repair.amount || '0.00'}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Final Balance */}
      <Card>
        <CardContent className="p-6">
          <div className="bg-blue-900 text-white p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">
                {data.finalBalance >= 0 ? 'Final Balance' : 'Total Out of Pocket Expense After Deductible by Insured'}
              </span>
              <span className={`text-xl font-bold ${data.finalBalance >= 0 ? 'text-white' : 'text-red-400'}`}>
                ${data.finalBalance >= 0 ? data.finalBalance.toFixed(2) : Math.abs(data.finalBalance).toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render print content directly to body using portal
  const printPortal = isOpen && ReactDOM.createPortal(
    <div
      className="print-only-wrapper"
      style={{
        position: 'absolute',
        left: '-9999px',
        top: 0,
        width: '100%',
        backgroundColor: 'white'
      }}
    >
      <div style={{ padding: '20px' }}>
        {renderPrintContent()}
      </div>
    </div>,
    document.body
  );

  return (
    <>
      {printPortal}

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto print:hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Print Preview - Claim Breakdown Calculator
              <Button variant="outline" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          {/* Print Options Controls */}
          <div className="bg-muted/30 p-4 rounded-lg mb-4">
          <h3 className="font-medium mb-3">Print Options (Choose what to include)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="show-legal-fees"
                checked={printOptions.showLegalFees}
                onCheckedChange={(checked) => updatePrintOption('showLegalFees', checked as boolean)}
              />
              <Label htmlFor="show-legal-fees" className="text-sm">Legal Fees</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="show-coastal-fees"
                checked={printOptions.showCoastalFees}
                onCheckedChange={(checked) => updatePrintOption('showCoastalFees', checked as boolean)}
              />
              <Label htmlFor="show-coastal-fees" className="text-sm">Coastal Fees</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="show-prior-payments"
                checked={printOptions.showPriorPayments}
                onCheckedChange={(checked) => updatePrintOption('showPriorPayments', checked as boolean)}
              />
              <Label htmlFor="show-prior-payments" className="text-sm">Prior Payments</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="show-pa-fees"
                checked={printOptions.showPAFees}
                onCheckedChange={(checked) => updatePrintOption('showPAFees', checked as boolean)}
              />
              <Label htmlFor="show-pa-fees" className="text-sm">PA Fees</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="show-custom-payments"
                checked={printOptions.showCustomPayments}
                onCheckedChange={(checked) => updatePrintOption('showCustomPayments', checked as boolean)}
              />
              <Label htmlFor="show-custom-payments" className="text-sm">Custom Payments</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="show-repair-details"
                checked={printOptions.showRepairDetails}
                onCheckedChange={(checked) => updatePrintOption('showRepairDetails', checked as boolean)}
              />
              <Label htmlFor="show-repair-details" className="text-sm">Repair Details</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="show-sub-limits"
                checked={printOptions.showSubLimits}
                onCheckedChange={(checked) => updatePrintOption('showSubLimits', checked as boolean)}
              />
              <Label htmlFor="show-sub-limits" className="text-sm">Sub-limits</Label>
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={handlePrint} className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Print to PDF
            </Button>
          </div>
        </div>

          {/* Preview Content - Same as print */}
          {renderPrintContent()}
        </DialogContent>
      </Dialog>

      {/* Print-specific CSS */}
      <style>{`
        @media print {
          @page {
            margin: 0.5in;
            size: letter;
          }

          /* Hide everything except print wrapper */
          body > * {
            display: none !important;
          }

          /* Show only the print wrapper */
          body > .print-only-wrapper,
          .print-only-wrapper {
            display: block !important;
            position: static !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            visibility: visible !important;
          }

          /* Ensure all content inside is visible */
          .print-only-wrapper,
          .print-only-wrapper * {
            visibility: visible !important;
            display: revert !important;
          }

          /* Prevent page breaks inside elements */
          .print-only-wrapper > div > div {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      `}</style>
    </>
  );
};
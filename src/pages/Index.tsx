import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Moon, Sun, Plus, Calculator, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

const Index = () => {
  const { theme, setTheme } = useTheme();
  
  // Coverage state
  const [coverageA, setCoverageA] = useState({ claimAmount: 0, policyLimit: 0 });
  const [coverageB, setCoverageB] = useState({ claimAmount: 0, policyLimit: 0 });
  const [coverageC, setCoverageC] = useState({ claimAmount: 0, policyLimit: 0 });
  const [coverageD, setCoverageD] = useState({ claimAmount: 0, policyLimit: 0 });
  
  // Sub-limits state
  const [screenEnclosure, setScreenEnclosure] = useState({ claimAmount: 0, policyLimit: 0 });
  const [mold, setMold] = useState({ claimAmount: 0, policyLimit: 0 });
  const [waterMitigation, setWaterMitigation] = useState({ claimAmount: 0, policyLimit: 0 });
  const [matching, setMatching] = useState({ claimAmount: 0, policyLimit: 0 });
  const [ordinanceLaw, setOrdinanceLaw] = useState({ claimAmount: 0, policyLimit: 0 });
  
  const [deductible, setDeductible] = useState(0);
  const [inspectionFee, setInspectionFee] = useState(0);
  
  // Overage tracking
  const [applyOverageToDeductible, setApplyOverageToDeductible] = useState({
    coverageA: false,
    coverageB: false,
    coverageC: false,
    coverageD: false,
    screenEnclosure: false,
    mold: false,
    waterMitigation: false,
    matching: false,
    ordinanceLaw: false
  });

  // Calculate overage
  const calculateOverage = (claimAmount, policyLimit) => {
    return Math.max(0, claimAmount - policyLimit);
  };

  // Calculate total coverage (capped at policy limits)
  const calculateTotalCoverage = () => {
    const cappedA = Math.min(coverageA.claimAmount, coverageA.policyLimit || Infinity);
    const cappedB = Math.min(coverageB.claimAmount, coverageB.policyLimit || Infinity);
    const cappedC = Math.min(coverageC.claimAmount, coverageC.policyLimit || Infinity);
    const cappedD = Math.min(coverageD.claimAmount, coverageD.policyLimit || Infinity);
    return cappedA + cappedB + cappedC + cappedD;
  };

  const totalCoverage = calculateTotalCoverage();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Calculator className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Policy Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="deductible">Deductible Amount</Label>
              <Input
                id="deductible"
                type="number"
                value={deductible}
                onChange={(e) => setDeductible(Number(e.target.value))}
                placeholder="Enter deductible amount"
              />
            </div>
            <div>
              <Label htmlFor="inspection-fee">Inspection Fee</Label>
              <Input
                id="inspection-fee"
                type="number"
                value={inspectionFee}
                onChange={(e) => setInspectionFee(Number(e.target.value))}
                placeholder="Enter inspection fee"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <FileText className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Coverage Details</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - Coverages A through D */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Coverages A through D</h3>
              
              {/* Coverage A */}
              <div className="p-4 border rounded-lg bg-blue-50">
                <h4 className="font-medium text-blue-700 mb-3">Coverage A - Dwelling</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm text-muted-foreground">Claim Amount</Label>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">$</span>
                      <Input
                        type="number"
                        value={coverageA.claimAmount}
                        onChange={(e) => setCoverageA(prev => ({ ...prev, claimAmount: Number(e.target.value) }))}
                        placeholder="0.00"
                        className="h-8"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Policy Limit</Label>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">$</span>
                      <Input
                        type="number"
                        value={coverageA.policyLimit}
                        onChange={(e) => setCoverageA(prev => ({ ...prev, policyLimit: Number(e.target.value) }))}
                        placeholder="0.00"
                        className="h-8"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Coverage B */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3">Coverage B - Other Structures</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm text-muted-foreground">Claim Amount</Label>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">$</span>
                      <Input
                        type="number"
                        value={coverageB.claimAmount}
                        onChange={(e) => setCoverageB(prev => ({ ...prev, claimAmount: Number(e.target.value) }))}
                        placeholder="0.00"
                        className="h-8"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Policy Limit</Label>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">$</span>
                      <Input
                        type="number"
                        value={coverageB.policyLimit}
                        onChange={(e) => setCoverageB(prev => ({ ...prev, policyLimit: Number(e.target.value) }))}
                        placeholder="0.00"
                        className="h-8"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Coverage C */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3">Coverage C - Personal Property</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm text-muted-foreground">Claim Amount</Label>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">$</span>
                      <Input
                        type="number"
                        value={coverageC.claimAmount}
                        onChange={(e) => setCoverageC(prev => ({ ...prev, claimAmount: Number(e.target.value) }))}
                        placeholder="0.00"
                        className="h-8"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Policy Limit</Label>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">$</span>
                      <Input
                        type="number"
                        value={coverageC.policyLimit}
                        onChange={(e) => setCoverageC(prev => ({ ...prev, policyLimit: Number(e.target.value) }))}
                        placeholder="0.00"
                        className="h-8"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Coverage D */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3">Coverage D - Loss of Use</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm text-muted-foreground">Claim Amount</Label>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">$</span>
                      <Input
                        type="number"
                        value={coverageD.claimAmount}
                        onChange={(e) => setCoverageD(prev => ({ ...prev, claimAmount: Number(e.target.value) }))}
                        placeholder="0.00"
                        className="h-8"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Policy Limit</Label>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">$</span>
                      <Input
                        type="number"
                        value={coverageD.policyLimit}
                        onChange={(e) => setCoverageD(prev => ({ ...prev, policyLimit: Number(e.target.value) }))}
                        placeholder="0.00"
                        className="h-8"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Coverage A Sub-limits */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Coverage A Sub-limits</h3>
              
              <div className="space-y-3">
                {/* Screen Enclosure */}
                <div className="flex items-center gap-2 p-2 border rounded">
                  <Checkbox />
                  <span className="text-sm">Screen Enclosure</span>
                </div>
                
                {/* Mold */}
                <div className="flex items-center gap-2 p-2 border rounded">
                  <Checkbox />
                  <span className="text-sm">Mold</span>
                </div>
                
                {/* Water Mitigation */}
                <div className="flex items-center gap-2 p-2 border rounded">
                  <Checkbox />
                  <span className="text-sm">Water Mitigation</span>
                </div>
                
                {/* Matching */}
                <div className="flex items-center gap-2 p-2 border rounded">
                  <Checkbox />
                  <span className="text-sm">Matching</span>
                </div>
                
                {/* Ordinance & Law */}
                <div className="flex items-center gap-2 p-2 border rounded">
                  <Checkbox />
                  <span className="text-sm">Ordinance & Law</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Summary</h3>
          <div className="flex items-center justify-between p-3 bg-primary text-primary-foreground rounded">
            <span>Total Coverage:</span>
            <span className="text-xl font-bold">${totalCoverage.toFixed(2)}</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
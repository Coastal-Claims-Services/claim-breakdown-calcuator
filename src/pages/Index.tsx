import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const Index = () => {
  // State variables
  const [insuredName, setInsuredName] = useState('');
  const [claimNumber, setClaimNumber] = useState('');
  const [dateOfLoss, setDateOfLoss] = useState('');

  const [coverageA, setCoverageA] = useState('');
  const [coverageB, setCoverageB] = useState('');
  const [coverageC, setCoverageC] = useState('');
  const [coverageD, setCoverageD] = useState('');

  const [coverageAPolicyLimit, setCoverageAPolicyLimit] = useState('');
  const [coverageBPolicyLimit, setCoverageBPolicyLimit] = useState('');
  const [coverageCPolicyLimit, setCoverageCPolicyLimit] = useState('');
  const [coverageDPolicyLimit, setCoverageDPolicyLimit] = useState('');

  const [deductible, setDeductible] = useState('');
  const [depreciation, setDepreciation] = useState('');

  const [debrisRemoval, setDebrisRemoval] = useState('');
  const [matching, setMatching] = useState('');
  const [ordinanceLaw, setOrdinanceLaw] = useState('');

  const [isSubLimitsOpen, setIsSubLimitsOpen] = useState(false);

  // Add policy limit states for sub-limits
  const [subLimitPolicies, setSubLimitPolicies] = useState({
    debris: '',
    matching: '',
    ordinance: ''
  });

  // Calculation functions
  const calculateTotalCoverage = () => {
    const a = parseFloat(coverageA) || 0;
    const b = parseFloat(coverageB) || 0;
    const c = parseFloat(coverageC) || 0;
    const d = parseFloat(coverageD) || 0;
    return a + b + c + d;
  };

  const calculateRecoverableDepreciation = () => {
    const totalCoverage = calculateTotalCoverage();
    const dep = parseFloat(depreciation) || 0;
    return totalCoverage - dep;
  };

  const calculateFinalPayment = () => {
    const recoverableDepreciation = calculateRecoverableDepreciation();
    const ded = parseFloat(deductible) || 0;
    return recoverableDepreciation - ded;
  };

  const calculateOverLimit = (amount: string, policyLimit: string) => {
    const amountNum = parseFloat(amount) || 0;
    const policyNum = parseFloat(policyLimit) || 0;
    return policyNum > 0 && amountNum > policyNum ? amountNum - policyNum : 0;
  };

  // Helper function to calculate over limit for sub-limits
  const calculateSubLimitOverLimit = (amount: string, policyLimit: string) => {
    const amountNum = parseFloat(amount) || 0;
    const policyNum = parseFloat(policyLimit) || 0;
    return policyNum > 0 && amountNum > policyNum ? amountNum - policyNum : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">Insurance Claim Calculator</h1>
        
        {/* Insured Information */}
        <Card>
          <CardHeader>
            <CardTitle>Insured Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="insuredName">Insured Name</Label>
                <Input
                  id="insuredName"
                  placeholder="Enter name"
                  value={insuredName}
                  onChange={(e) => setInsuredName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="claimNumber">Claim Number</Label>
                <Input
                  id="claimNumber"
                  placeholder="Enter claim number"
                  value={claimNumber}
                  onChange={(e) => setClaimNumber(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="dateOfLoss">Date of Loss</Label>
              <Input
                id="dateOfLoss"
                type="date"
                value={dateOfLoss}
                onChange={(e) => setDateOfLoss(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Coverage Amounts */}
        <Card>
          <CardHeader>
            <CardTitle>Coverage Amounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Coverage A */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <Label htmlFor="coverageA">Coverage A - Dwelling</Label>
                  <Input
                    id="coverageA"
                    type="number"
                    placeholder="Enter amount"
                    value={coverageA}
                    onChange={(e) => setCoverageA(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="coverageAPolicyLimit">Policy Limit</Label>
                  <Input
                    id="coverageAPolicyLimit"
                    type="number"
                    placeholder="Policy limit"
                    value={coverageAPolicyLimit}
                    onChange={(e) => setCoverageAPolicyLimit(e.target.value)}
                    className="text-lg border-yellow-400"
                  />
                </div>
                {calculateOverLimit(coverageA, coverageAPolicyLimit) > 0 && (
                  <div className="text-red-600 font-semibold text-sm">
                    Over Limit: ${calculateOverLimit(coverageA, coverageAPolicyLimit).toLocaleString()}
                  </div>
                )}
              </div>

              {/* Coverage A Sub-limits */}
              <Collapsible open={isSubLimitsOpen} onOpenChange={setIsSubLimitsOpen} className="mt-4">
                <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800">
                  <ChevronDown className={`h-4 w-4 transition-transform ${isSubLimitsOpen ? 'rotate-180' : ''}`} />
                  Coverage A Sub-limits
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-3 pl-6 border-l-2 border-gray-200">
                  {/* Debris Removal */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <Label htmlFor="debrisRemoval">Debris Removal</Label>
                      <Input
                        id="debrisRemoval"
                        type="number"
                        placeholder="Enter amount"
                        value={debrisRemoval}
                        onChange={(e) => setDebrisRemoval(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="debrisPolicyLimit">Policy Limit</Label>
                      <Input
                        id="debrisPolicyLimit"
                        type="number"
                        placeholder="Policy limit"
                        value={subLimitPolicies.debris}
                        onChange={(e) => setSubLimitPolicies(prev => ({ ...prev, debris: e.target.value }))}
                        className="text-sm border-yellow-400"
                      />
                    </div>
                    {calculateSubLimitOverLimit(debrisRemoval, subLimitPolicies.debris) > 0 && (
                      <div className="text-red-600 font-semibold text-xs">
                        Over Limit: ${calculateSubLimitOverLimit(debrisRemoval, subLimitPolicies.debris).toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* Matching */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <Label htmlFor="matching">Matching</Label>
                      <Input
                        id="matching"
                        type="number"
                        placeholder="Enter amount"
                        value={matching}
                        onChange={(e) => setMatching(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="matchingPolicyLimit">Policy Limit</Label>
                      <Input
                        id="matchingPolicyLimit"
                        type="number"
                        placeholder="Policy limit"
                        value={subLimitPolicies.matching}
                        onChange={(e) => setSubLimitPolicies(prev => ({ ...prev, matching: e.target.value }))}
                        className="text-sm border-yellow-400"
                      />
                    </div>
                    {calculateSubLimitOverLimit(matching, subLimitPolicies.matching) > 0 && (
                      <div className="text-red-600 font-semibold text-xs">
                        Over Limit: ${calculateSubLimitOverLimit(matching, subLimitPolicies.matching).toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* Ordinance & Law */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <Label htmlFor="ordinanceLaw">Ordinance & Law</Label>
                      <Input
                        id="ordinanceLaw"
                        type="number"
                        placeholder="Enter amount"
                        value={ordinanceLaw}
                        onChange={(e) => setOrdinanceLaw(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ordinancePolicyLimit">Policy Limit</Label>
                      <Input
                        id="ordinancePolicyLimit"
                        type="number"
                        placeholder="Policy limit"
                        value={subLimitPolicies.ordinance}
                        onChange={(e) => setSubLimitPolicies(prev => ({ ...prev, ordinance: e.target.value }))}
                        className="text-sm border-yellow-400"
                      />
                    </div>
                    {calculateSubLimitOverLimit(ordinanceLaw, subLimitPolicies.ordinance) > 0 && (
                      <div className="text-red-600 font-semibold text-xs">
                        Over Limit: ${calculateSubLimitOverLimit(ordinanceLaw, subLimitPolicies.ordinance).toLocaleString()}
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <Separator />

            {/* Coverage B */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <Label htmlFor="coverageB">Coverage B - Other Structures</Label>
                <Input
                  id="coverageB"
                  type="number"
                  placeholder="Enter amount"
                  value={coverageB}
                  onChange={(e) => setCoverageB(e.target.value)}
                  className="text-lg"
                />
              </div>
              <div>
                <Label htmlFor="coverageBPolicyLimit">Policy Limit</Label>
                <Input
                  id="coverageBPolicyLimit"
                  type="number"
                  placeholder="Policy limit"
                  value={coverageBPolicyLimit}
                  onChange={(e) => setCoverageBPolicyLimit(e.target.value)}
                  className="text-lg border-yellow-400"
                />
              </div>
              {calculateOverLimit(coverageB, coverageBPolicyLimit) > 0 && (
                <div className="text-red-600 font-semibold text-sm">
                  Over Limit: ${calculateOverLimit(coverageB, coverageBPolicyLimit).toLocaleString()}
                </div>
              )}
            </div>

            <Separator />

            {/* Coverage C */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <Label htmlFor="coverageC">Coverage C - Personal Property</Label>
                <Input
                  id="coverageC"
                  type="number"
                  placeholder="Enter amount"
                  value={coverageC}
                  onChange={(e) => setCoverageC(e.target.value)}
                  className="text-lg"
                />
              </div>
              <div>
                <Label htmlFor="coverageCPolicyLimit">Policy Limit</Label>
                <Input
                  id="coverageCPolicyLimit"
                  type="number"
                  placeholder="Policy limit"
                  value={coverageCPolicyLimit}
                  onChange={(e) => setCoverageCPolicyLimit(e.target.value)}
                  className="text-lg border-yellow-400"
                />
              </div>
              {calculateOverLimit(coverageC, coverageCPolicyLimit) > 0 && (
                <div className="text-red-600 font-semibold text-sm">
                  Over Limit: ${calculateOverLimit(coverageC, coverageCPolicyLimit).toLocaleString()}
                </div>
              )}
            </div>

            <Separator />

            {/* Coverage D */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <Label htmlFor="coverageD">Coverage D - Loss of Use</Label>
                <Input
                  id="coverageD"
                  type="number"
                  placeholder="Enter amount"
                  value={coverageD}
                  onChange={(e) => setCoverageD(e.target.value)}
                  className="text-lg"
                />
              </div>
              <div>
                <Label htmlFor="coverageDPolicyLimit">Policy Limit</Label>
                <Input
                  id="coverageDPolicyLimit"
                  type="number"
                  placeholder="Policy limit"
                  value={coverageDPolicyLimit}
                  onChange={(e) => setCoverageDPolicyLimit(e.target.value)}
                  className="text-lg border-yellow-400"
                />
              </div>
              {calculateOverLimit(coverageD, coverageDPolicyLimit) > 0 && (
                <div className="text-red-600 font-semibold text-sm">
                  Over Limit: ${calculateOverLimit(coverageD, coverageDPolicyLimit).toLocaleString()}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Deductibles */}
        <Card>
          <CardHeader>
            <CardTitle>Deductibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="deductible">Deductible Amount</Label>
                <Input
                  id="deductible"
                  type="number"
                  placeholder="Enter deductible amount"
                  value={deductible}
                  onChange={(e) => setDeductible(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Depreciation */}
        <Card>
          <CardHeader>
            <CardTitle>Depreciation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="depreciation">Depreciation Amount</Label>
                <Input
                  id="depreciation"
                  type="number"
                  placeholder="Enter depreciation amount"
                  value={depreciation}
                  onChange={(e) => setDepreciation(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Calculation */}
        <Card>
          <CardHeader>
            <CardTitle>Final Calculation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Total Coverage Amount:</Label>
              <div className="text-lg font-semibold">${calculateTotalCoverage().toLocaleString()}</div>
            </div>
            <div>
              <Label>Recoverable Depreciation:</Label>
              <div className="text-lg font-semibold">${calculateRecoverableDepreciation().toLocaleString()}</div>
            </div>
            <div>
              <Label>Final Payment:</Label>
              <div className="text-2xl font-bold text-green-600">${calculateFinalPayment().toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;

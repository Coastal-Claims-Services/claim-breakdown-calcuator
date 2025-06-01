
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [roofChecked, setRoofChecked] = useState(false);
  const [roofSquares, setRoofSquares] = useState('');
  const [roofCost, setRoofCost] = useState('');
  const [roofPolicyLimit, setRoofPolicyLimit] = useState('');

  // Coverage A sub-limits
  const [screenEnclosureChecked, setScreenEnclosureChecked] = useState(false);
  const [screenEnclosureCost, setScreenEnclosureCost] = useState('');
  const [screenEnclosurePolicyLimit, setScreenEnclosurePolicyLimit] = useState('');

  const [moldChecked, setMoldChecked] = useState(false);
  const [moldCost, setMoldCost] = useState('');
  const [moldPolicyLimit, setMoldPolicyLimit] = useState('');

  const [waterMitigationChecked, setWaterMitigationChecked] = useState(false);
  const [waterMitigationCost, setWaterMitigationCost] = useState('');
  const [waterMitigationPolicyLimit, setWaterMitigationPolicyLimit] = useState('');

  const [matchingChecked, setMatchingChecked] = useState(false);
  const [matchingCost, setMatchingCost] = useState('');
  const [matchingPolicyLimit, setMatchingPolicyLimit] = useState('');

  const [ordinanceChecked, setOrdinanceChecked] = useState(false);
  const [ordinanceCost, setOrdinanceCost] = useState('');
  const [ordinancePolicyLimit, setOrdinancePolicyLimit] = useState('');

  const formatCurrency = (value: string) => {
    const num = parseFloat(value.replace(/[^\d.]/g, ''));
    return isNaN(num) ? '$0.00' : new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(num);
  };

  const isOverLimit = (cost: string, limit: string) => {
    const costNum = parseFloat(cost.replace(/[^\d.]/g, ''));
    const limitNum = parseFloat(limit.replace(/[^\d.]/g, ''));
    return !isNaN(costNum) && !isNaN(limitNum) && costNum > limitNum;
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Insurance Estimate Calculator</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Coverage A</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox 
              id="roof" 
              checked={roofChecked} 
              onCheckedChange={(checked) => setRoofChecked(checked === true)}
            />
            <Label htmlFor="roof" className="text-lg font-medium">Roof</Label>
          </div>
          
          {roofChecked && (
            <div className="ml-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="roofSquares">Squares with waste:</Label>
                  <Input
                    id="roofSquares"
                    type="number"
                    placeholder="Enter squares"
                    value={roofSquares}
                    onChange={(e) => setRoofSquares(e.target.value)}
                    className="w-24"
                  />
                </div>
                <div>
                  <Label htmlFor="roofCost">Total Cost:</Label>
                  <Input
                    id="roofCost"
                    type="text"
                    placeholder="Enter total cost"
                    value={roofCost}
                    onChange={(e) => setRoofCost(e.target.value)}
                  />
                  <div className="mt-1 text-sm text-gray-600">
                    {roofCost && formatCurrency(roofCost)}
                  </div>
                </div>
                <div>
                  <Label htmlFor="roofPolicyLimit">Policy Limit:</Label>
                  <Input
                    id="roofPolicyLimit"
                    type="text"
                    placeholder="Enter policy limit"
                    value={roofPolicyLimit}
                    onChange={(e) => setRoofPolicyLimit(e.target.value)}
                  />
                  <div className="mt-1 text-sm text-gray-600">
                    {roofPolicyLimit && formatCurrency(roofPolicyLimit)}
                  </div>
                  {isOverLimit(roofCost, roofPolicyLimit) && (
                    <div className="mt-1 text-sm text-red-600 font-medium">
                      Over Limit
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            <Checkbox 
              id="screenEnclosure" 
              checked={screenEnclosureChecked} 
              onCheckedChange={(checked) => setScreenEnclosureChecked(checked === true)}
            />
            <Label htmlFor="screenEnclosure" className="text-lg font-medium">Screen Enclosure</Label>
          </div>
          
          {screenEnclosureChecked && (
            <div className="ml-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="screenEnclosureCost">Coverage Amount:</Label>
                  <Input
                    id="screenEnclosureCost"
                    type="text"
                    placeholder="Enter coverage amount"
                    value={screenEnclosureCost}
                    onChange={(e) => setScreenEnclosureCost(e.target.value)}
                  />
                  <div className="mt-1 text-sm text-gray-600">
                    {screenEnclosureCost && formatCurrency(screenEnclosureCost)}
                  </div>
                </div>
                <div>
                  <Label htmlFor="screenEnclosurePolicyLimit">Policy Limit:</Label>
                  <Input
                    id="screenEnclosurePolicyLimit"
                    type="text"
                    placeholder="Enter policy limit"
                    value={screenEnclosurePolicyLimit}
                    onChange={(e) => setScreenEnclosurePolicyLimit(e.target.value)}
                  />
                  <div className="mt-1 text-sm text-gray-600">
                    {screenEnclosurePolicyLimit && formatCurrency(screenEnclosurePolicyLimit)}
                  </div>
                  {isOverLimit(screenEnclosureCost, screenEnclosurePolicyLimit) && (
                    <div className="mt-1 text-sm text-red-600 font-medium">
                      Over Limit
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <Checkbox 
              id="mold" 
              checked={moldChecked} 
              onCheckedChange={(checked) => setMoldChecked(checked === true)}
            />
            <Label htmlFor="mold" className="text-lg font-medium">Mold</Label>
          </div>
          
          {moldChecked && (
            <div className="ml-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="moldCost">Coverage Amount:</Label>
                  <Input
                    id="moldCost"
                    type="text"
                    placeholder="Enter coverage amount"
                    value={moldCost}
                    onChange={(e) => setMoldCost(e.target.value)}
                  />
                  <div className="mt-1 text-sm text-gray-600">
                    {moldCost && formatCurrency(moldCost)}
                  </div>
                </div>
                <div>
                  <Label htmlFor="moldPolicyLimit">Policy Limit:</Label>
                  <Input
                    id="moldPolicyLimit"
                    type="text"
                    placeholder="Enter policy limit"
                    value={moldPolicyLimit}
                    onChange={(e) => setMoldPolicyLimit(e.target.value)}
                  />
                  <div className="mt-1 text-sm text-gray-600">
                    {moldPolicyLimit && formatCurrency(moldPolicyLimit)}
                  </div>
                  {isOverLimit(moldCost, moldPolicyLimit) && (
                    <div className="mt-1 text-sm text-red-600 font-medium">
                      Over Limit
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <Checkbox 
              id="waterMitigation" 
              checked={waterMitigationChecked} 
              onCheckedChange={(checked) => setWaterMitigationChecked(checked === true)}
            />
            <Label htmlFor="waterMitigation" className="text-lg font-medium">Water Mitigation</Label>
          </div>
          
          {waterMitigationChecked && (
            <div className="ml-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="waterMitigationCost">Coverage Amount:</Label>
                  <Input
                    id="waterMitigationCost"
                    type="text"
                    placeholder="Enter coverage amount"
                    value={waterMitigationCost}
                    onChange={(e) => setWaterMitigationCost(e.target.value)}
                  />
                  <div className="mt-1 text-sm text-gray-600">
                    {waterMitigationCost && formatCurrency(waterMitigationCost)}
                  </div>
                </div>
                <div>
                  <Label htmlFor="waterMitigationPolicyLimit">Policy Limit:</Label>
                  <Input
                    id="waterMitigationPolicyLimit"
                    type="text"
                    placeholder="Enter policy limit"
                    value={waterMitigationPolicyLimit}
                    onChange={(e) => setWaterMitigationPolicyLimit(e.target.value)}
                  />
                  <div className="mt-1 text-sm text-gray-600">
                    {waterMitigationPolicyLimit && formatCurrency(waterMitigationPolicyLimit)}
                  </div>
                  {isOverLimit(waterMitigationCost, waterMitigationPolicyLimit) && (
                    <div className="mt-1 text-sm text-red-600 font-medium">
                      Over Limit
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <Checkbox 
              id="matching" 
              checked={matchingChecked} 
              onCheckedChange={(checked) => setMatchingChecked(checked === true)}
            />
            <Label htmlFor="matching" className="text-lg font-medium">Matching</Label>
          </div>
          
          {matchingChecked && (
            <div className="ml-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="matchingCost">Coverage Amount:</Label>
                  <Input
                    id="matchingCost"
                    type="text"
                    placeholder="Enter coverage amount"
                    value={matchingCost}
                    onChange={(e) => setMatchingCost(e.target.value)}
                  />
                  <div className="mt-1 text-sm text-gray-600">
                    {matchingCost && formatCurrency(matchingCost)}
                  </div>
                </div>
                <div>
                  <Label htmlFor="matchingPolicyLimit">Policy Limit:</Label>
                  <Input
                    id="matchingPolicyLimit"
                    type="text"
                    placeholder="Enter policy limit"
                    value={matchingPolicyLimit}
                    onChange={(e) => setMatchingPolicyLimit(e.target.value)}
                  />
                  <div className="mt-1 text-sm text-gray-600">
                    {matchingPolicyLimit && formatCurrency(matchingPolicyLimit)}
                  </div>
                  {isOverLimit(matchingCost, matchingPolicyLimit) && (
                    <div className="mt-1 text-sm text-red-600 font-medium">
                      Over Limit
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <Checkbox 
              id="ordinance" 
              checked={ordinanceChecked} 
              onCheckedChange={(checked) => setOrdinanceChecked(checked === true)}
            />
            <Label htmlFor="ordinance" className="text-lg font-medium">Ordinance & Law</Label>
          </div>
          
          {ordinanceChecked && (
            <div className="ml-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ordinanceCost">Coverage Amount:</Label>
                  <Input
                    id="ordinanceCost"
                    type="text"
                    placeholder="Enter coverage amount"
                    value={ordinanceCost}
                    onChange={(e) => setOrdinanceCost(e.target.value)}
                  />
                  <div className="mt-1 text-sm text-gray-600">
                    {ordinanceCost && formatCurrency(ordinanceCost)}
                  </div>
                </div>
                <div>
                  <Label htmlFor="ordinancePolicyLimit">Policy Limit:</Label>
                  <Input
                    id="ordinancePolicyLimit"
                    type="text"
                    placeholder="Enter policy limit"
                    value={ordinancePolicyLimit}
                    onChange={(e) => setOrdinancePolicyLimit(e.target.value)}
                  />
                  <div className="mt-1 text-sm text-gray-600">
                    {ordinancePolicyLimit && formatCurrency(ordinancePolicyLimit)}
                  </div>
                  {isOverLimit(ordinanceCost, ordinancePolicyLimit) && (
                    <div className="mt-1 text-sm text-red-600 font-medium">
                      Over Limit
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ClaimInfoPageProps {
  claimInfo: {
    releaseType: string;
    customReleaseTypeName: string;
    insuranceName: string;
    insuranceAddress: string;
    claimNumber: string;
  };
  onUpdateClaimInfo: (field: string, value: string) => void;
  onNext: () => void;
}

export const ClaimInfoPage: React.FC<ClaimInfoPageProps> = ({ 
  claimInfo, 
  onUpdateClaimInfo, 
  onNext 
}) => {
  const canProceed = claimInfo.releaseType && claimInfo.insuranceName && claimInfo.claimNumber;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/d8102e62-174d-41ec-8e54-53ba66b1e02d.png" 
            alt="Coastal Claims Services Logo" 
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#1e3a8a' }}>
            Welcome to Claim Breakdown Calculator
          </h1>
          <p className="text-gray-600">
            Let's start by gathering some basic information about your claim
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Claim Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Release Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="release-type">Release Type *</Label>
              <Select 
                value={claimInfo.releaseType} 
                onValueChange={(value) => onUpdateClaimInfo('releaseType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a release type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="partial">Partial Release</SelectItem>
                  <SelectItem value="full">Full and Final Release</SelectItem>
                  <SelectItem value="custom">Custom Release Type</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Custom Release Type Name */}
            {claimInfo.releaseType === 'custom' && (
              <div className="space-y-2">
                <Label htmlFor="custom-release-name">Custom Release Type Name</Label>
                <Input
                  id="custom-release-name"
                  value={claimInfo.customReleaseTypeName}
                  onChange={(e) => onUpdateClaimInfo('customReleaseTypeName', e.target.value)}
                  placeholder="Enter custom release type name"
                />
              </div>
            )}

            {/* Insurance Company Name */}
            <div className="space-y-2">
              <Label htmlFor="insurance-name">Insurance Company Name *</Label>
              <Input
                id="insurance-name"
                value={claimInfo.insuranceName}
                onChange={(e) => onUpdateClaimInfo('insuranceName', e.target.value)}
                placeholder="e.g., State Farm, Allstate, etc."
              />
            </div>

            {/* Insurance Company Address */}
            <div className="space-y-2">
              <Label htmlFor="insurance-address">Insurance Company Address</Label>
              <Input
                id="insurance-address"
                value={claimInfo.insuranceAddress}
                onChange={(e) => onUpdateClaimInfo('insuranceAddress', e.target.value)}
                placeholder="Enter insurance company address"
              />
            </div>

            {/* Claim Number */}
            <div className="space-y-2">
              <Label htmlFor="claim-number">Insurance Claim Number *</Label>
              <Input
                id="claim-number"
                value={claimInfo.claimNumber}
                onChange={(e) => onUpdateClaimInfo('claimNumber', e.target.value)}
                placeholder="Enter claim number"
              />
            </div>

            {/* Next Button */}
            <div className="pt-4">
              <Button 
                onClick={onNext}
                disabled={!canProceed}
                className="w-full flex items-center justify-center gap-2"
                style={{ backgroundColor: canProceed ? '#1e3a8a' : undefined }}
              >
                Continue to Coverage Calculator
                <ArrowRight className="h-4 w-4" />
              </Button>
              {!canProceed && (
                <p className="text-sm text-red-600 mt-2 text-center">
                  Please fill in all required fields (marked with *)
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

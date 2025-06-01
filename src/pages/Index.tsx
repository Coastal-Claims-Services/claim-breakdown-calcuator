import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface SubLimits {
  dwelling: boolean;
  otherStructures: boolean;
  personalProperty: boolean;
  lossOfUse: boolean;
}

interface RepairsByContractor {
  flooring: boolean;
  roofing: boolean;
  drywall: boolean;
  painting: boolean;
  electrical: boolean;
  plumbing: boolean;
  hvac: boolean;
  windows: boolean;
  doors: boolean;
  insulation: boolean;
  cabinets: boolean;
  countertops: boolean;
  appliances: boolean;
  fixtures: boolean;
}

interface PersonalProperty {
  clothing: boolean;
  furniture: boolean;
  electronics: boolean;
  appliances: boolean;
  jewelry: boolean;
  art: boolean;
  collectibles: boolean;
  sportingEquipment: boolean;
  tools: boolean;
  other: boolean;
}

interface AdditionalExpenses {
  hotel: boolean;
  meals: boolean;
  laundry: boolean;
  transportation: boolean;
  storage: boolean;
  other: boolean;
}

const Index = () => {
  const [coverageAmount, setCoverageAmount] = useState<number>(0);
  const [policyLimit, setPolicyLimit] = useState<number>(0);
  const [subLimits, setSubLimits] = useState<SubLimits>({
    dwelling: false,
    otherStructures: false,
    personalProperty: false,
    lossOfUse: false,
  });
  const [repairsByContractor, setRepairsByContractor] = useState<RepairsByContractor>({
    flooring: false,
    roofing: false,
    drywall: false,
    painting: false,
    electrical: false,
    plumbing: false,
    hvac: false,
    windows: false,
    doors: false,
    insulation: false,
    cabinets: false,
    countertops: false,
    appliances: false,
    fixtures: false,
  });
  const [personalProperty, setPersonalProperty] = useState<PersonalProperty>({
    clothing: false,
    furniture: false,
    electronics: false,
    appliances: false,
    jewelry: false,
    art: false,
    collectibles: false,
    sportingEquipment: false,
    tools: false,
    other: false,
  });
  const [additionalExpenses, setAdditionalExpenses] = useState<AdditionalExpenses>({
    hotel: false,
    meals: false,
    laundry: false,
    transportation: false,
    storage: false,
    other: false,
  });

  // Fix checkbox handlers to properly handle CheckedState
  const handleRepairContractorChange = (field: string) => (checked: boolean | "indeterminate") => {
    if (typeof checked === "boolean") {
      setRepairsByContractor(prev => ({ ...prev, [field]: checked }));
    }
  };

  const handlePersonalPropertyChange = (field: string) => (checked: boolean | "indeterminate") => {
    if (typeof checked === "boolean") {
      setPersonalProperty(prev => ({ ...prev, [field]: checked }));
    }
  };

  const handleAdditionalExpensesChange = (field: string) => (checked: boolean | "indeterminate") => {
    if (typeof checked === "boolean") {
      setAdditionalExpenses(prev => ({ ...prev, [field]: checked }));
    }
  };

  const subLimitTotal =
    (subLimits.dwelling ? coverageAmount * 0.7 : 0) +
    (subLimits.otherStructures ? coverageAmount * 0.1 : 0) +
    (subLimits.personalProperty ? coverageAmount * 0.5 : 0) +
    (subLimits.lossOfUse ? coverageAmount * 0.2 : 0);

  const repairsByContractorTotal =
    (repairsByContractor.flooring ? 5000 : 0) +
    (repairsByContractor.roofing ? 10000 : 0) +
    (repairsByContractor.drywall ? 2000 : 0) +
    (repairsByContractor.painting ? 3000 : 0) +
    (repairsByContractor.electrical ? 4000 : 0) +
    (repairsByContractor.plumbing ? 6000 : 0) +
    (repairsByContractor.hvac ? 8000 : 0) +
    (repairsByContractor.windows ? 7000 : 0) +
    (repairsByContractor.doors ? 2500 : 0) +
    (repairsByContractor.insulation ? 1500 : 0) +
    (repairsByContractor.cabinets ? 5500 : 0) +
    (repairsByContractor.countertops ? 4500 : 0) +
    (repairsByContractor.appliances ? 3500 : 0) +
    (repairsByContractor.fixtures ? 1200 : 0);

  const personalPropertyTotal =
    (personalProperty.clothing ? 1000 : 0) +
    (personalProperty.furniture ? 5000 : 0) +
    (personalProperty.electronics ? 3000 : 0) +
    (personalProperty.appliances ? 2000 : 0) +
    (personalProperty.jewelry ? 4000 : 0) +
    (personalProperty.art ? 6000 : 0) +
    (personalProperty.collectibles ? 7000 : 0) +
    (personalProperty.sportingEquipment ? 1500 : 0) +
    (personalProperty.tools ? 2500 : 0) +
    (personalProperty.other ? 3500 : 0);

  const additionalExpensesTotal =
    (additionalExpenses.hotel ? 2000 : 0) +
    (additionalExpenses.meals ? 1000 : 0) +
    (additionalExpenses.laundry ? 500 : 0) +
    (additionalExpenses.transportation ? 1500 : 0) +
    (additionalExpenses.storage ? 800 : 0) +
    (additionalExpenses.other ? 1200 : 0);

  const totalClaim = subLimitTotal + repairsByContractorTotal + personalPropertyTotal + additionalExpensesTotal;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Insurance Claim Calculator
          </h1>

          <div className="mb-6">
            <label htmlFor="coverageAmount" className="block text-sm font-medium text-gray-700">
              Coverage Amount:
            </label>
            <input
              type="number"
              id="coverageAmount"
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
              value={coverageAmount}
              onChange={(e) => setCoverageAmount(Number(e.target.value))}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="policyLimit" className="block text-sm font-medium text-gray-700">
              Policy Limit:
            </label>
            <input
              type="number"
              id="policyLimit"
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
              value={policyLimit}
              onChange={(e) => setPolicyLimit(Number(e.target.value))}
            />
          </div>

          <Tabs defaultValue="sub-limits" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="sub-limits">Sub-Limits</TabsTrigger>
              <TabsTrigger value="repairs">Repairs by Contractor</TabsTrigger>
              <TabsTrigger value="personal">Personal Property</TabsTrigger>
              <TabsTrigger value="additional">Additional Expenses</TabsTrigger>
            </TabsList>

            <TabsContent value="sub-limits" className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Sub-Limits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="dwelling" 
                    checked={subLimits.dwelling}
                    onCheckedChange={(checked) => {
                      if (typeof checked === "boolean") {
                        setSubLimits(prev => ({ ...prev, dwelling: checked }));
                      }
                    }}
                  />
                  <label htmlFor="dwelling" className="text-sm font-medium">
                    Dwelling (70% of Coverage)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="otherStructures" 
                    checked={subLimits.otherStructures}
                    onCheckedChange={(checked) => {
                      if (typeof checked === "boolean") {
                        setSubLimits(prev => ({ ...prev, otherStructures: checked }));
                      }
                    }}
                  />
                  <label htmlFor="otherStructures" className="text-sm font-medium">
                    Other Structures (10% of Coverage)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="personalPropertySub" 
                    checked={subLimits.personalProperty}
                    onCheckedChange={(checked) => {
                      if (typeof checked === "boolean") {
                        setSubLimits(prev => ({ ...prev, personalProperty: checked }));
                      }
                    }}
                  />
                  <label htmlFor="personalPropertySub" className="text-sm font-medium">
                    Personal Property (50% of Coverage)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="lossOfUse" 
                    checked={subLimits.lossOfUse}
                    onCheckedChange={(checked) => {
                      if (typeof checked === "boolean") {
                        setSubLimits(prev => ({ ...prev, lossOfUse: checked }));
                      }
                    }}
                  />
                  <label htmlFor="lossOfUse" className="text-sm font-medium">
                    Loss of Use (20% of Coverage)
                  </label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="repairs" className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Repairs by Contractor</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="flooring" 
                    checked={repairsByContractor.flooring}
                    onCheckedChange={handleRepairContractorChange('flooring')}
                  />
                  <label htmlFor="flooring" className="text-sm font-medium">
                    Flooring
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="roofing" 
                    checked={repairsByContractor.roofing}
                    onCheckedChange={handleRepairContractorChange('roofing')}
                  />
                  <label htmlFor="roofing" className="text-sm font-medium">
                    Roofing
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="drywall" 
                    checked={repairsByContractor.drywall}
                    onCheckedChange={handleRepairContractorChange('drywall')}
                  />
                  <label htmlFor="drywall" className="text-sm font-medium">
                    Drywall
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="painting" 
                    checked={repairsByContractor.painting}
                    onCheckedChange={handleRepairContractorChange('painting')}
                  />
                  <label htmlFor="painting" className="text-sm font-medium">
                    Painting
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="electrical" 
                    checked={repairsByContractor.electrical}
                    onCheckedChange={handleRepairContractorChange('electrical')}
                  />
                  <label htmlFor="electrical" className="text-sm font-medium">
                    Electrical
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="plumbing" 
                    checked={repairsByContractor.plumbing}
                    onCheckedChange={handleRepairContractorChange('plumbing')}
                  />
                  <label htmlFor="plumbing" className="text-sm font-medium">
                    Plumbing
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hvac" 
                    checked={repairsByContractor.hvac}
                    onCheckedChange={handleRepairContractorChange('hvac')}
                  />
                  <label htmlFor="hvac" className="text-sm font-medium">
                    HVAC
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="windows" 
                    checked={repairsByContractor.windows}
                    onCheckedChange={handleRepairContractorChange('windows')}
                  />
                  <label htmlFor="windows" className="text-sm font-medium">
                    Windows
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="doors" 
                    checked={repairsByContractor.doors}
                    onCheckedChange={handleRepairContractorChange('doors')}
                  />
                  <label htmlFor="doors" className="text-sm font-medium">
                    Doors
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="insulation" 
                    checked={repairsByContractor.insulation}
                    onCheckedChange={handleRepairContractorChange('insulation')}
                  />
                  <label htmlFor="insulation" className="text-sm font-medium">
                    Insulation
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cabinets" 
                    checked={repairsByContractor.cabinets}
                    onCheckedChange={handleRepairContractorChange('cabinets')}
                  />
                  <label htmlFor="cabinets" className="text-sm font-medium">
                    Cabinets
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="countertops" 
                    checked={repairsByContractor.countertops}
                    onCheckedChange={handleRepairContractorChange('countertops')}
                  />
                  <label htmlFor="countertops" className="text-sm font-medium">
                    Countertops
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="appliances" 
                    checked={repairsByContractor.appliances}
                    onCheckedChange={handleRepairContractorChange('appliances')}
                  />
                  <label htmlFor="appliances" className="text-sm font-medium">
                    Appliances
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="fixtures" 
                    checked={repairsByContractor.fixtures}
                    onCheckedChange={handleRepairContractorChange('fixtures')}
                  />
                  <label htmlFor="fixtures" className="text-sm font-medium">
                    Fixtures
                  </label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="personal" className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Personal Property</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="clothing" 
                    checked={personalProperty.clothing}
                    onCheckedChange={handlePersonalPropertyChange('clothing')}
                  />
                  <label htmlFor="clothing" className="text-sm font-medium">
                    Clothing
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="furniture" 
                    checked={personalProperty.furniture}
                    onCheckedChange={handlePersonalPropertyChange('furniture')}
                  />
                  <label htmlFor="furniture" className="text-sm font-medium">
                    Furniture
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="electronics" 
                    checked={personalProperty.electronics}
                    onCheckedChange={handlePersonalPropertyChange('electronics')}
                  />
                  <label htmlFor="electronics" className="text-sm font-medium">
                    Electronics
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="appliancesPersonal" 
                    checked={personalProperty.appliances}
                    onCheckedChange={handlePersonalPropertyChange('appliances')}
                  />
                  <label htmlFor="appliancesPersonal" className="text-sm font-medium">
                    Appliances
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="jewelry" 
                    checked={personalProperty.jewelry}
                    onCheckedChange={handlePersonalPropertyChange('jewelry')}
                  />
                  <label htmlFor="jewelry" className="text-sm font-medium">
                    Jewelry
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="art" 
                    checked={personalProperty.art}
                    onCheckedChange={handlePersonalPropertyChange('art')}
                  />
                  <label htmlFor="art" className="text-sm font-medium">
                    Art
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="collectibles" 
                    checked={personalProperty.collectibles}
                    onCheckedChange={handlePersonalPropertyChange('collectibles')}
                  />
                  <label htmlFor="collectibles" className="text-sm font-medium">
                    Collectibles
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sportingEquipment" 
                    checked={personalProperty.sportingEquipment}
                    onCheckedChange={handlePersonalPropertyChange('sportingEquipment')}
                  />
                  <label htmlFor="sportingEquipment" className="text-sm font-medium">
                    Sporting Equipment
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="tools" 
                    checked={personalProperty.tools}
                    onCheckedChange={handlePersonalPropertyChange('tools')}
                  />
                  <label htmlFor="tools" className="text-sm font-medium">
                    Tools
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="otherPersonal" 
                    checked={personalProperty.other}
                    onCheckedChange={handlePersonalPropertyChange('other')}
                  />
                  <label htmlFor="otherPersonal" className="text-sm font-medium">
                    Other
                  </label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="additional" className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Additional Expenses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hotel" 
                    checked={additionalExpenses.hotel}
                    onCheckedChange={handleAdditionalExpensesChange('hotel')}
                  />
                  <label htmlFor="hotel" className="text-sm font-medium">
                    Hotel
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="meals" 
                    checked={additionalExpenses.meals}
                    onCheckedChange={handleAdditionalExpensesChange('meals')}
                  />
                  <label htmlFor="meals" className="text-sm font-medium">
                    Meals
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="laundry" 
                    checked={additionalExpenses.laundry}
                    onCheckedChange={handleAdditionalExpensesChange('laundry')}
                  />
                  <label htmlFor="laundry" className="text-sm font-medium">
                    Laundry
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="transportation" 
                    checked={additionalExpenses.transportation}
                    onCheckedChange={handleAdditionalExpensesChange('transportation')}
                  />
                  <label htmlFor="transportation" className="text-sm font-medium">
                    Transportation
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="storage" 
                    checked={additionalExpenses.storage}
                    onCheckedChange={handleAdditionalExpensesChange('storage')}
                  />
                  <label htmlFor="storage" className="text-sm font-medium">
                    Storage
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="otherAdditional" 
                    checked={additionalExpenses.other}
                    onCheckedChange={handleAdditionalExpensesChange('other')}
                  />
                  <label htmlFor="otherAdditional" className="text-sm font-medium">
                    Other
                  </label>
                </div>
              </div>
            </TabsContent>

          </Tabs>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Calculations</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                Sub-Limits Total: <span className="font-medium">${subLimitTotal.toFixed(2)}</span>
              </p>
              <p className="text-gray-700">
                Repairs by Contractor Total: <span className="font-medium">${repairsByContractorTotal.toFixed(2)}</span>
              </p>
              <p className="text-gray-700">
                Personal Property Total: <span className="font-medium">${personalPropertyTotal.toFixed(2)}</span>
              </p>
              <p className="text-gray-700">
                Additional Expenses Total: <span className="font-medium">${additionalExpensesTotal.toFixed(2)}</span>
              </p>
              <p className="text-gray-700">
                Total Claim: <span className="font-medium">${totalClaim.toFixed(2)}</span>
              </p>
              <p className="text-gray-700">
                Amount Over Policy Limit: <span className="font-medium">${Math.max(0, totalClaim - policyLimit).toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

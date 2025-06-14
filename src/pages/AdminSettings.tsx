import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";

interface ReleaseType {
  id: string;
  name: string;
  openingStatement: string;
}

const AdminSettings = () => {
  const { toast } = useToast();
  const [releaseTypes, setReleaseTypes] = useState<ReleaseType[]>([
    {
      id: "litigated",
      name: "Litigated Release",
      openingStatement: "Enter detailed explanation, expectations, and any relevant information for this release type..."
    },
    {
      id: "mediation",
      name: "Mediation Release", 
      openingStatement: "Enter detailed explanation, expectations, and any relevant information for this release type..."
    },
    {
      id: "standard",
      name: "Standard Release",
      openingStatement: "Enter detailed explanation, expectations, and any relevant information for this release type..."
    }
  ]);

  // Load saved opening statements from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('adminReleaseTypes');
    if (saved) {
      setReleaseTypes(JSON.parse(saved));
    }
  }, []);

  const handleOpeningStatementChange = (id: string, value: string) => {
    setReleaseTypes(prev => 
      prev.map(type => 
        type.id === id ? { ...type, openingStatement: value } : type
      )
    );
  };

  const saveSettings = () => {
    localStorage.setItem('adminReleaseTypes', JSON.stringify(releaseTypes));
    toast({
      title: "Settings Saved",
      description: "Opening statements have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Calculator
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Admin Settings</h1>
          </div>
          <Button onClick={saveSettings} className="bg-primary hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>

        {/* Release Types Settings */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Opening Statement Templates</h2>
          
          {releaseTypes.map((releaseType) => (
            <Card key={releaseType.id} className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">{releaseType.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`opening-${releaseType.id}`} className="text-foreground">
                    Opening Statement / Expectations
                  </Label>
                  <Textarea
                    id={`opening-${releaseType.id}`}
                    value={releaseType.openingStatement}
                    onChange={(e) => handleOpeningStatementChange(releaseType.id, e.target.value)}
                    placeholder="Enter detailed explanation, expectations, and any relevant information for this release type..."
                    className="min-h-[120px] resize-none"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  This text will appear as the main content on page 1 of release documents for {releaseType.name.toLowerCase()}.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Save Button at Bottom */}
        <div className="flex justify-center pt-6">
          <Button onClick={saveSettings} size="lg" className="bg-primary hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
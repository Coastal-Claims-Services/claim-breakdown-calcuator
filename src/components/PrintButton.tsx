
import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { usePrint } from '@/hooks/usePrint';

interface PrintButtonProps {
  disabled?: boolean;
  className?: string;
}

const PrintButton: React.FC<PrintButtonProps> = ({ disabled = false, className }) => {
  const { printReport } = usePrint();

  return (
    <Button
      onClick={printReport}
      disabled={disabled}
      variant="outline"
      className={className}
    >
      <Printer className="mr-2 h-4 w-4" />
      Print to PDF
    </Button>
  );
};

export default PrintButton;

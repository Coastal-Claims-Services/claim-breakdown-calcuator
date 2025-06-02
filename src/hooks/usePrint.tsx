
import { useCallback } from 'react';

export const usePrint = () => {
  const printReport = useCallback(() => {
    // Trigger browser's print dialog
    window.print();
  }, []);

  return { printReport };
};


import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { PropertyFormData } from '@/types/propertyTypes';

interface MonthlyFeeStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const MonthlyFeeStep: React.FC<MonthlyFeeStepProps> = ({
  formData,
  updateFormData,
}) => {
  const [fee, setFee] = useState(formData.monthlyFee?.toString() || '');

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setFee(value);
    updateFormData({ monthlyFee: value ? parseInt(value) : null });
  };

  const presetFees = [150, 250, 350, 500];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="relative max-w-xs mx-auto">
          <Input
            type="text"
            placeholder="250"
            value={fee}
            onChange={handleFeeChange}
            className="text-center text-2xl h-16 pr-12"
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            €
          </span>
        </div>
        <p className="text-muted-foreground mt-4">
          Monatliches Hausgeld (Betriebskosten, Rücklage etc.)
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {presetFees.map((amount) => (
          <button
            key={amount}
            onClick={() => {
              setFee(amount.toString());
              updateFormData({ monthlyFee: amount });
            }}
            className={`p-3 rounded-lg border text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 ${
              parseInt(fee) === amount
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border bg-background'
            }`}
          >
            {amount} €
          </button>
        ))}
      </div>
    </div>
  );
};

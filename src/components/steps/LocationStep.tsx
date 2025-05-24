
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { PropertyFormData } from '@/types/propertyTypes';

interface LocationStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const LocationStep: React.FC<LocationStepProps> = ({
  formData,
  updateFormData,
}) => {
  const [zipCode, setZipCode] = useState(formData.zipCode || '');

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZipCode(value);
    updateFormData({ zipCode: value.length === 5 ? value : null });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Input
          type="text"
          placeholder="12345"
          value={zipCode}
          onChange={handleZipCodeChange}
          className="text-center text-2xl h-16 max-w-xs mx-auto"
          maxLength={5}
        />
        <p className="text-muted-foreground mt-4">
          Geben Sie die 5-stellige Postleitzahl ein
        </p>
      </div>

      {zipCode.length === 5 && (
        <div className="text-center">
          <p className="text-success-600 font-medium">
            ✓ Postleitzahl gültig
          </p>
        </div>
      )}
    </div>
  );
};

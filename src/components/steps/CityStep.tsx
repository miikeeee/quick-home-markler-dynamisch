
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { PropertyFormData } from '@/types/propertyTypes';

interface CityStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const CityStep: React.FC<CityStepProps> = ({
  formData,
  updateFormData,
}) => {
  const [city, setCity] = useState(formData.city || '');

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    updateFormData({ city: value.trim().length > 0 ? value.trim() : null });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Input
          type="text"
          placeholder="z.B. München"
          value={city}
          onChange={handleCityChange}
          className="text-center text-xl h-14 max-w-sm mx-auto"
        />
        <p className="text-muted-foreground mt-4">
          In welchem Ort befindet sich die Immobilie?
        </p>
      </div>
    </div>
  );
};

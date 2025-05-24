
import React from 'react';
import { ChoiceButton } from '../ChoiceButton';
import { PropertyFormData } from '@/types/propertyTypes';

interface ParkingStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const ParkingStep: React.FC<ParkingStepProps> = ({
  formData,
  updateFormData,
}) => {
  const parkingOptions = [
    { id: 'single_garage', label: 'Einzelgarage' },
    { id: 'double_garage', label: 'Doppelgarage' },
    { id: 'underground_parking', label: 'Tiefgaragenstellplatz' },
    { id: 'carport', label: 'Carport' },
    { id: 'outdoor_parking', label: 'Außenstellplatz' },
    { id: 'none', label: 'Kein Stellplatz' },
  ];

  return (
    <div className="space-y-4">
      {parkingOptions.map((option) => (
        <ChoiceButton
          key={option.id}
          title={option.label}
          selected={formData.parkingType === option.id}
          onClick={() => updateFormData({ parkingType: option.id })}
        />
      ))}
    </div>
  );
};

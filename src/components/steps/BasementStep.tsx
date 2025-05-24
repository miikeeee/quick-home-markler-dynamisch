
import React from 'react';
import { ChoiceButton } from '../ChoiceButton';
import { PropertyFormData } from '@/types/propertyTypes';

interface BasementStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const BasementStep: React.FC<BasementStepProps> = ({
  formData,
  updateFormData,
}) => {
  const basementOptions = [
    { id: 'none', label: 'Kein Keller', hasBasement: false },
    { id: 'partial', label: 'Teilunterkellert', hasBasement: true, type: 'partial' },
    { id: 'full', label: 'Vollunterkellert', hasBasement: true, type: 'full' },
  ];

  const handleBasementSelect = (option: typeof basementOptions[0]) => {
    updateFormData({ 
      hasBasement: option.hasBasement,
      basementType: option.hasBasement ? option.type : null
    });
  };

  return (
    <div className="space-y-4">
      {basementOptions.map((option) => (
        <ChoiceButton
          key={option.id}
          title={option.label}
          selected={formData.hasBasement === option.hasBasement && formData.basementType === (option.type || null)}
          onClick={() => handleBasementSelect(option)}
        />
      ))}
    </div>
  );
};

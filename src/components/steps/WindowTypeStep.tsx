
import React from 'react';
import { ChoiceButton } from '../ChoiceButton';
import { PropertyFormData } from '@/types/propertyTypes';

interface WindowTypeStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const WindowTypeStep: React.FC<WindowTypeStepProps> = ({
  formData,
  updateFormData,
}) => {
  const windowTypes = [
    { id: 'single_glazed', label: 'Einfachverglasung', description: 'Alte Fenster' },
    { id: 'double_glazed', label: 'Doppelverglasung', description: 'Standard-Isolierglas' },
    { id: 'triple_glazed', label: 'Dreifachverglasung', description: 'Moderne Wärmedämmung' },
    { id: 'mixed', label: 'Gemischt', description: 'Verschiedene Fenstertypen' },
  ];

  return (
    <div className="space-y-4">
      {windowTypes.map((type) => (
        <ChoiceButton
          key={type.id}
          title={type.label}
          description={type.description}
          selected={formData.windowType === type.id}
          onClick={() => updateFormData({ windowType: type.id })}
        />
      ))}
    </div>
  );
};

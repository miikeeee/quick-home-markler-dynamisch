
import React from 'react';
import { ChoiceButton } from '../ChoiceButton';
import { PropertyFormData } from '@/types/propertyTypes';

interface RoomCountStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const RoomCountStep: React.FC<RoomCountStepProps> = ({
  formData,
  updateFormData,
}) => {
  const roomOptions = [
    { value: 1, label: '1 Zimmer' },
    { value: 2, label: '2 Zimmer' },
    { value: 3, label: '3 Zimmer' },
    { value: 4, label: '4 Zimmer' },
    { value: 5, label: '5 Zimmer' },
    { value: 6, label: '6+ Zimmer' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {roomOptions.map((option) => (
        <ChoiceButton
          key={option.value}
          title={option.label}
          selected={formData.roomCount === option.value}
          onClick={() => updateFormData({ roomCount: option.value })}
        />
      ))}
    </div>
  );
};

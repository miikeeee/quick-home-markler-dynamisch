
import React from 'react';
import { ChoiceButton } from '../ChoiceButton';
import { PropertyFormData } from '@/types/propertyTypes';

interface EquipmentQualityStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const EquipmentQualityStep: React.FC<EquipmentQualityStepProps> = ({
  formData,
  updateFormData,
}) => {
  const qualityLevels = [
    {
      id: 'einfach',
      title: 'Einfach/Funktional',
      description: 'Grundausstattung, zweckmäßig'
    },
    {
      id: 'standard',
      title: 'Normal/Standard',
      description: 'Durchschnittliche Qualität'
    },
    {
      id: 'gehoben',
      title: 'Gehoben/Hochwertig',
      description: 'Überdurchschnittliche Ausstattung'
    },
    {
      id: 'luxus',
      title: 'Luxuriös',
      description: 'Premium-Ausstattung'
    }
  ];

  return (
    <div className="space-y-4">
      {qualityLevels.map((level) => (
        <ChoiceButton
          key={level.id}
          title={level.title}
          description={level.description}
          selected={formData.equipmentQuality === level.id}
          onClick={() => updateFormData({ equipmentQuality: level.id })}
        />
      ))}
    </div>
  );
};


import React from 'react';
import { ChoiceButton } from '../ChoiceButton';
import { PropertyFormData } from '@/types/propertyTypes';

interface ConditionStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const ConditionStep: React.FC<ConditionStepProps> = ({
  formData,
  updateFormData,
}) => {
  const conditions = [
    {
      id: 'neuwertig',
      title: 'Neuwertig/Erstbezug',
      description: 'Wie neu, keine Mängel erkennbar'
    },
    {
      id: 'gepflegt',
      title: 'Gepflegt & modernisiert',
      description: 'Gut erhalten, regelmäßig instand gehalten'
    },
    {
      id: 'renovierungsbedarf',
      title: 'Renovierungsbedarf',
      description: 'Einige Bereiche benötigen Auffrischung'
    },
    {
      id: 'sanierungsbedarf',
      title: 'Umfassender Sanierungsbedarf',
      description: 'Größere Renovierungsarbeiten erforderlich'
    }
  ];

  return (
    <div className="space-y-4">
      {conditions.map((condition) => (
        <ChoiceButton
          key={condition.id}
          title={condition.title}
          description={condition.description}
          selected={formData.conditionGeneral === condition.id}
          onClick={() => updateFormData({ conditionGeneral: condition.id })}
        />
      ))}
    </div>
  );
};


import React from 'react';
import { Home, Building2 } from 'lucide-react';
import { ChoiceButton } from '../ChoiceButton';
import { PropertyFormData } from '@/types/propertyTypes';

interface PropertyTypeStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const PropertyTypeStep: React.FC<PropertyTypeStepProps> = ({
  formData,
  updateFormData,
}) => {
  const choices = [
    {
      id: 'house',
      icon: Home,
      title: 'Haus verkaufen',
      description: 'Einfamilienhaus, Doppelhaushälfte, Reihenhaus, Bungalow oder Villa'
    },
    {
      id: 'apartment',
      icon: Building2,
      title: 'Wohnung verkaufen',
      description: 'Eigentumswohnung in einem Mehrfamilienhaus oder Wohnkomplex'
    }
  ];

  return (
    <div className="space-y-4">
      {choices.map((choice) => (
        <ChoiceButton
          key={choice.id}
          icon={choice.icon}
          title={choice.title}
          description={choice.description}
          selected={formData.propertyType === choice.id}
          onClick={() => updateFormData({ propertyType: choice.id as 'house' | 'apartment' })}
        />
      ))}
    </div>
  );
};

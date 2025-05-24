
import React from 'react';
import { ChoiceButton } from '../ChoiceButton';
import { PropertyFormData } from '@/types/propertyTypes';

interface UserIntentStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const UserIntentStep: React.FC<UserIntentStepProps> = ({
  formData,
  updateFormData,
}) => {
  const intentOptions = [
    {
      id: 'sell_soon',
      title: 'Verkauf in Kürze geplant',
      description: 'Ich plane einen Verkauf in den nächsten Monaten'
    },
    {
      id: 'sell_future',
      title: 'Zukünftige Verkaufsplanung',
      description: 'Ich möchte den Wert für spätere Verkaufsplanung kennen'
    },
    {
      id: 'curiosity',
      title: 'Neugier/Vermögensübersicht',
      description: 'Aus reiner Neugier oder für die Vermögensübersicht'
    },
    {
      id: 'buying_interest',
      title: 'Kaufinteresse',
      description: 'Ich interessiere mich für einen Kauf und möchte den Preis prüfen'
    }
  ];

  return (
    <div className="space-y-4">
      {intentOptions.map((option) => (
        <ChoiceButton
          key={option.id}
          title={option.title}
          description={option.description}
          selected={formData.userIntent === option.id}
          onClick={() => updateFormData({ userIntent: option.id })}
        />
      ))}
    </div>
  );
};

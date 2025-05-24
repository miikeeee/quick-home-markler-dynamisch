
import React from 'react';
import { ChoiceButton } from '../ChoiceButton';
import { PropertyFormData } from '@/types/propertyTypes';

interface ElevatorStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const ElevatorStep: React.FC<ElevatorStepProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ChoiceButton
        title="Ja, Aufzug vorhanden"
        description="Das Gebäude verfügt über einen Aufzug"
        selected={formData.hasElevator === true}
        onClick={() => updateFormData({ hasElevator: true })}
      />
      <ChoiceButton
        title="Nein, kein Aufzug"
        description="Kein Aufzug im Gebäude"
        selected={formData.hasElevator === false}
        onClick={() => updateFormData({ hasElevator: false })}
      />
    </div>
  );
};

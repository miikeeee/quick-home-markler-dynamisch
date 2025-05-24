
import React from 'react';
import { ChoiceButton } from '../ChoiceButton';
import { PropertyFormData } from '@/types/propertyTypes';

interface HeatingTypeStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const HeatingTypeStep: React.FC<HeatingTypeStepProps> = ({
  formData,
  updateFormData,
}) => {
  const heatingTypes = [
    { id: 'gas_central', label: 'Gas-Zentralheizung' },
    { id: 'oil_central', label: 'Öl-Zentralheizung' },
    { id: 'heat_pump_air', label: 'Wärmepumpe (Luft/Wasser)' },
    { id: 'heat_pump_ground', label: 'Wärmepumpe (Erdwärme)' },
    { id: 'district_heating', label: 'Fernwärme' },
    { id: 'wood_pellet', label: 'Holz-/Pelletheizung' },
    { id: 'electric', label: 'Elektroheizung/Nachtspeicher' },
    { id: 'floor_heating', label: 'Etagenheizung' },
  ];

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {heatingTypes.map((type) => (
        <ChoiceButton
          key={type.id}
          title={type.label}
          selected={formData.heatingType === type.id}
          onClick={() => updateFormData({ heatingType: type.id })}
        />
      ))}
    </div>
  );
};

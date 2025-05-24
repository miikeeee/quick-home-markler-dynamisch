
import React from 'react';
import { Home, Building, Crown } from 'lucide-react';
import { ChoiceButton } from '../ChoiceButton';
import { PropertyFormData } from '@/types/propertyTypes';

interface HouseTypeStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const HouseTypeStep: React.FC<HouseTypeStepProps> = ({
  formData,
  updateFormData,
}) => {
  const houseTypes = [
    {
      id: 'detached_house',
      icon: Home,
      title: 'Einfamilienhaus freistehend',
      description: 'Freistehendes Haus mit eigenem Grundstück'
    },
    {
      id: 'semi_detached',
      icon: Building,
      title: 'Doppelhaushälfte',
      description: 'Haus, das mit einem anderen Haus eine Wand teilt'
    },
    {
      id: 'terraced_middle',
      icon: Building,
      title: 'Reihenmittelhaus',
      description: 'Haus in der Mitte einer Häuserreihe'
    },
    {
      id: 'terraced_end',
      icon: Building,
      title: 'Reihenendhaus',
      description: 'Haus am Ende einer Häuserreihe'
    },
    {
      id: 'bungalow',
      icon: Home,
      title: 'Bungalow',
      description: 'Einstöckiges Haus ohne Obergeschoss'
    },
    {
      id: 'villa',
      icon: Crown,
      title: 'Villa',
      description: 'Großzügiges, hochwertiges Wohnhaus'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {houseTypes.map((type) => (
        <ChoiceButton
          key={type.id}
          icon={type.icon}
          title={type.title}
          description={type.description}
          selected={formData.houseType === type.id}
          onClick={() => updateFormData({ houseType: type.id })}
        />
      ))}
    </div>
  );
};

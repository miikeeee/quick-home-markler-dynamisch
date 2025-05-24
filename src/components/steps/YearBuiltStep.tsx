
import React from 'react';
import { ChoiceButton } from '../ChoiceButton';
import { PropertyFormData } from '@/types/propertyTypes';

interface YearBuiltStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const YearBuiltStep: React.FC<YearBuiltStepProps> = ({
  formData,
  updateFormData,
}) => {
  const yearRanges = [
    { id: 'vor_1949', label: 'vor 1949', description: 'Historische Bausubstanz' },
    { id: '1950_1969', label: '1950-1969', description: 'Nachkriegszeit' },
    { id: '1970_1989', label: '1970-1989', description: '70er/80er Jahre' },
    { id: '1990_2009', label: '1990-2009', description: '90er/2000er Jahre' },
    { id: '2010_heute', label: '2010-heute', description: 'Neubau/sehr modern' },
  ];

  return (
    <div className="space-y-4">
      {yearRanges.map((range) => (
        <ChoiceButton
          key={range.id}
          title={range.label}
          description={range.description}
          selected={formData.yearBuilt === range.id}
          onClick={() => updateFormData({ yearBuilt: range.id })}
        />
      ))}
    </div>
  );
};

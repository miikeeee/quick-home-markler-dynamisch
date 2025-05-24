
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PropertyFormData } from '@/types/propertyTypes';

interface OutdoorFeaturesStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const OutdoorFeaturesStep: React.FC<OutdoorFeaturesStepProps> = ({
  formData,
  updateFormData,
}) => {
  const isHouse = formData.propertyType === 'house';
  
  const houseOptions = [
    { id: 'garden', label: 'Garten' },
    { id: 'terrace', label: 'Terrasse' },
    { id: 'balcony', label: 'Balkon' },
    { id: 'roof_terrace', label: 'Dachterrasse' },
  ];

  const apartmentOptions = [
    { id: 'balcony', label: 'Balkon' },
    { id: 'terrace', label: 'Terrasse (EG)' },
    { id: 'roof_terrace', label: 'Dachterrasse' },
    { id: 'shared_garden', label: 'Gemeinschaftsgarten' },
  ];

  const options = isHouse ? houseOptions : apartmentOptions;
  const selectedFeatures = formData.outdoorFeatures || [];

  const handleFeatureToggle = (featureId: string) => {
    const updatedFeatures = selectedFeatures.includes(featureId)
      ? selectedFeatures.filter(id => id !== featureId)
      : [...selectedFeatures, featureId];
    
    updateFormData({ outdoorFeatures: updatedFeatures });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-muted-foreground mb-4">
          Wählen Sie alle vorhandenen Außenbereiche aus (Mehrfachauswahl möglich)
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {options.map((option) => (
            <label key={option.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFeatures.includes(option.id)}
                onChange={() => handleFeatureToggle(option.id)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="font-medium">{option.label}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-4">
          <label className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFeatures.length === 0}
              onChange={() => updateFormData({ outdoorFeatures: [] })}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="font-medium text-muted-foreground">Keine Außenbereiche</span>
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

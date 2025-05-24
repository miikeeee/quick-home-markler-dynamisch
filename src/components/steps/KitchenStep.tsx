
import React from 'react';
import { ChoiceButton } from '../ChoiceButton';
import { Card, CardContent } from '@/components/ui/card';
import { PropertyFormData } from '@/types/propertyTypes';

interface KitchenStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const KitchenStep: React.FC<KitchenStepProps> = ({
  formData,
  updateFormData,
}) => {
  const hasKitchen = formData.kitchenDetails?.included;

  const conditionOptions = [
    { id: 'new', label: 'Neuwertig (unter 5 Jahre)' },
    { id: 'good', label: 'Gut erhalten (5-10 Jahre)' },
    { id: 'older', label: 'Älter/Renovierungsbedürftig' },
  ];

  const handleKitchenToggle = (included: boolean) => {
    updateFormData({ 
      kitchenDetails: { 
        included, 
        condition: included ? undefined : undefined 
      } 
    });
  };

  const handleConditionSelect = (condition: string) => {
    updateFormData({ 
      kitchenDetails: { 
        included: true, 
        condition 
      } 
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Ist eine Einbauküche vorhanden und im Preis inbegriffen?
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <ChoiceButton
            title="Ja, Einbauküche vorhanden"
            selected={hasKitchen === true}
            onClick={() => handleKitchenToggle(true)}
          />
          <ChoiceButton
            title="Nein, keine Einbauküche"
            selected={hasKitchen === false}
            onClick={() => handleKitchenToggle(false)}
          />
        </div>
      </div>

      {hasKitchen === true && (
        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium mb-4">
              Wie würden Sie Alter und Zustand der Küche beschreiben?
            </h4>
            <div className="space-y-3">
              {conditionOptions.map((option) => (
                <ChoiceButton
                  key={option.id}
                  title={option.label}
                  selected={formData.kitchenDetails?.condition === option.id}
                  onClick={() => handleConditionSelect(option.id)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

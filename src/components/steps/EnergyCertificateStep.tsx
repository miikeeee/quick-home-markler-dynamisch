
import React from 'react';
import { ChoiceButton } from '../ChoiceButton';
import { Card, CardContent } from '@/components/ui/card';
import { PropertyFormData } from '@/types/propertyTypes';

interface EnergyCertificateStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const EnergyCertificateStep: React.FC<EnergyCertificateStepProps> = ({
  formData,
  updateFormData,
}) => {
  const hasCertificate = formData.energyCertificate?.available;

  const energyClasses = [
    { id: 'A+', label: 'A+' },
    { id: 'A', label: 'A' },
    { id: 'B', label: 'B' },
    { id: 'C', label: 'C' },
    { id: 'D', label: 'D' },
    { id: 'E', label: 'E' },
    { id: 'F', label: 'F' },
    { id: 'G', label: 'G' },
    { id: 'H', label: 'H' },
    { id: 'unknown', label: 'Wert nicht bekannt' },
  ];

  const handleCertificateToggle = (available: boolean) => {
    updateFormData({ 
      energyCertificate: { 
        available, 
        class: available ? undefined : undefined 
      } 
    });
  };

  const handleClassSelect = (energyClass: string) => {
    updateFormData({ 
      energyCertificate: { 
        available: true, 
        class: energyClass 
      } 
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Liegt ein aktueller Energieausweis vor?
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <ChoiceButton
            title="Ja, Energieausweis vorhanden"
            selected={hasCertificate === true}
            onClick={() => handleCertificateToggle(true)}
          />
          <ChoiceButton
            title="Nein, kein Energieausweis"
            selected={hasCertificate === false}
            onClick={() => handleCertificateToggle(false)}
          />
        </div>
      </div>

      {hasCertificate === true && (
        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium mb-4">
              Welche Energieeffizienzklasse ist angegeben?
            </h4>
            <div className="grid gap-2 grid-cols-5 md:grid-cols-10">
              {energyClasses.slice(0, -1).map((energyClass) => (
                <ChoiceButton
                  key={energyClass.id}
                  title={energyClass.label}
                  selected={formData.energyCertificate?.class === energyClass.id}
                  onClick={() => handleClassSelect(energyClass.id)}
                  className="text-center"
                />
              ))}
            </div>
            <div className="mt-4">
              <ChoiceButton
                title="Wert nicht bekannt"
                selected={formData.energyCertificate?.class === 'unknown'}
                onClick={() => handleClassSelect('unknown')}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

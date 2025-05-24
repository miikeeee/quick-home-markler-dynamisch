
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PropertyFormData } from '@/types/propertyTypes';

interface FlooringTypeStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const FlooringTypeStep: React.FC<FlooringTypeStepProps> = ({
  formData,
  updateFormData,
}) => {
  const flooringOptions = [
    { id: 'parquet', label: 'Parkett' },
    { id: 'laminate', label: 'Laminat' },
    { id: 'tiles', label: 'Fliesen' },
    { id: 'carpet', label: 'Teppichboden' },
    { id: 'vinyl', label: 'Vinyl/PVC' },
    { id: 'concrete', label: 'Estrich/Beton' },
  ];

  const selectedFlooring = formData.flooringType || [];

  const handleFlooringToggle = (flooringId: string) => {
    const updatedFlooring = selectedFlooring.includes(flooringId)
      ? selectedFlooring.filter(id => id !== flooringId)
      : [...selectedFlooring, flooringId];
    
    updateFormData({ flooringType: updatedFlooring });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-muted-foreground mb-4">
          Wählen Sie alle vorhandenen Bodenbeläge aus (Mehrfachauswahl möglich)
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {flooringOptions.map((option) => (
            <label key={option.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFlooring.includes(option.id)}
                onChange={() => handleFlooringToggle(option.id)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="font-medium">{option.label}</span>
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

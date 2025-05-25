
import React, { useState } from 'react';
import { ChoiceButton } from '../ChoiceButton';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyFormData } from '@/types/propertyTypes';

interface RenovationStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const RenovationStep: React.FC<RenovationStepProps> = ({
  formData,
  updateFormData,
}) => {
  const [hasRenovations, setHasRenovations] = useState<boolean | null>(
    formData.renovations ? Object.values(formData.renovations).some(r => r.done) : null
  );

  const renovationAreas = [
    { id: 'roof', label: 'Dach' },
    { id: 'windows', label: 'Fenster' },
    { id: 'heating', label: 'Heizungsanlage' },
    { id: 'bathroom', label: 'Badezimmer/Sanitär' },
    { id: 'electrical', label: 'Elektrik' },
    { id: 'facade', label: 'Fassade/Außendämmung' },
    { id: 'plumbing', label: 'Wasser-/Abwasserleitungen' },
  ];

  const periodOptions = [
    { value: 'last_5_years', label: 'In den letzten 5 Jahren' },
    { value: '6_10_years', label: 'Vor 6-10 Jahren' },
    { value: '11_15_years', label: 'Vor 11-15 Jahren' },
    { value: '16_20_years', label: 'Vor 16-20 Jahren' },
  ];

  const extentOptions = [
    { value: 'teilweise', label: 'Teilweise' },
    { value: 'umfänglich', label: 'Umfänglich' },
  ];

  const handleRenovationToggle = (renovated: boolean) => {
    setHasRenovations(renovated);
    if (!renovated) {
      updateFormData({ renovations: null });
    } else {
      const initialRenovations = renovationAreas.reduce((acc, area) => {
        acc[area.id] = { done: false };
        return acc;
      }, {} as any);
      updateFormData({ renovations: initialRenovations });
    }
  };

  const handleAreaToggle = (areaId: string, done: boolean) => {
    const currentRenovations = formData.renovations || {};
    const updatedRenovations = {
      ...currentRenovations,
      [areaId]: { 
        done, 
        period: done ? currentRenovations[areaId]?.period : undefined,
        extent: done ? currentRenovations[areaId]?.extent : undefined
      }
    };
    updateFormData({ renovations: updatedRenovations });
  };

  const handlePeriodChange = (areaId: string, period: string) => {
    const currentRenovations = formData.renovations || {};
    const updatedRenovations = {
      ...currentRenovations,
      [areaId]: { 
        ...currentRenovations[areaId],
        period 
      }
    };
    updateFormData({ renovations: updatedRenovations });
  };

  const handleExtentChange = (areaId: string, extent: string) => {
    const currentRenovations = formData.renovations || {};
    const updatedRenovations = {
      ...currentRenovations,
      [areaId]: { 
        ...currentRenovations[areaId],
        extent 
      }
    };
    updateFormData({ renovations: updatedRenovations });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Wurden in den letzten 20 Jahren wesentliche Sanierungen durchgeführt?
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <ChoiceButton
            title="Ja"
            description="Es wurden Sanierungen durchgeführt"
            selected={hasRenovations === true}
            onClick={() => handleRenovationToggle(true)}
          />
          <ChoiceButton
            title="Nein"
            description="Keine größeren Sanierungen"
            selected={hasRenovations === false}
            onClick={() => handleRenovationToggle(false)}
          />
        </div>
      </div>

      {hasRenovations === true && (
        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium mb-4">
              Welche Bereiche wurden saniert?
            </h4>
            <div className="space-y-4">
              {renovationAreas.map((area) => {
                const renovation = formData.renovations?.[area.id];
                const isDone = renovation?.done || false;

                return (
                  <div key={area.id} className="flex items-center gap-4">
                    <label className="flex items-center space-x-3 flex-1">
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={(e) => handleAreaToggle(area.id, e.target.checked)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm font-medium">{area.label}</span>
                    </label>
                    
                    {isDone && (
                      <div className="flex gap-2">
                        <div className="w-44">
                          <Select
                            value={renovation?.period || ''}
                            onValueChange={(value) => handlePeriodChange(area.id, value)}
                          >
                            <SelectTrigger className="text-sm">
                              <SelectValue placeholder="Zeitraum wählen" />
                            </SelectTrigger>
                            <SelectContent>
                              {periodOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-32">
                          <Select
                            value={renovation?.extent || ''}
                            onValueChange={(value) => handleExtentChange(area.id, value)}
                          >
                            <SelectTrigger className="text-sm">
                              <SelectValue placeholder="Umfang" />
                            </SelectTrigger>
                            <SelectContent>
                              {extentOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

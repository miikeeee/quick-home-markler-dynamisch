
import React from 'react';
import { ChoiceButton } from '../ChoiceButton';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PropertyFormData } from '@/types/propertyTypes';

interface RentalStatusStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const RentalStatusStep: React.FC<RentalStatusStepProps> = ({
  formData,
  updateFormData,
}) => {
  const isRented = formData.currentlyRented;

  const handleRentalToggle = (rented: boolean) => {
    updateFormData({ 
      currentlyRented: rented,
      annualRent: rented ? formData.annualRent : null
    });
  };

  const handleRentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    updateFormData({ annualRent: value ? parseInt(value) : null });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Ist die Immobilie aktuell vermietet?
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <ChoiceButton
            title="Ja, vermietet"
            description="Die Immobilie ist aktuell vermietet"
            selected={isRented === true}
            onClick={() => handleRentalToggle(true)}
          />
          <ChoiceButton
            title="Nein, nicht vermietet"
            description="Eigennutzung oder leer stehend"
            selected={isRented === false}
            onClick={() => handleRentalToggle(false)}
          />
        </div>
      </div>

      {isRented === true && (
        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium mb-4">
              Wie hoch ist die jährliche Nettokaltmiete?
            </h4>
            <div className="text-center">
              <div className="relative max-w-xs mx-auto">
                <Input
                  type="text"
                  placeholder="12000"
                  value={formData.annualRent?.toString() || ''}
                  onChange={handleRentChange}
                  className="text-center text-xl h-14 pr-12"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  € / Jahr
                </span>
              </div>
              <p className="text-muted-foreground text-sm mt-2">
                Nettokaltmiete ohne Nebenkosten
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

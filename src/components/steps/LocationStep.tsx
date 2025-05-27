import { config } from "@/config";
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { PropertyFormData } from '@/types/propertyTypes';
import { ConfigType } from "@/types/ConfigType";

interface LocationStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
  config: ConfigType;
}

export const LocationStep: React.FC<LocationStepProps> = ({
  formData,
  updateFormData,
  config
}) => {
  const [zipCode, setZipCode] = useState(formData.zipCode || '');
  const [city, setCity] = useState(formData.city || '');
  const [street, setStreet] = useState(formData.street || '');

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZipCode(value);
    updateFormData({ zipCode: value.length === 5 ? value : null });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    updateFormData({ city: value.trim().length > 0 ? value.trim() : null });
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStreet(value);
    updateFormData({ street: value.trim().length > 0 ? value.trim() : null });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-6">Standort der Immobilie</h3>
        
        <div className="space-y-6 max-w-md mx-auto">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Postleitzahl *
            </label>
            <Input
              type="text"
              placeholder={config?.officeZip ||"12345"}
              value={zipCode}
              onChange={handleZipCodeChange}
              className="text-center text-xl h-14"
              maxLength={5}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Stadt/Ort *
            </label>
            <Input
              type="text"
              placeholder={config?.officeCity || "z.B. München"}
              value={city}
              onChange={handleCityChange}
              className="text-center text-xl h-14"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Straße (optional)
            </label>
            <Input
              type="text"
              placeholder={config?.officeStreet || "z.B. Musterstraße 123"}
              value={street}
              onChange={handleStreetChange}
              className="text-center text-lg h-12"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Die Angabe der Straße macht die Bewertung genauer
            </p>
          </div>
        </div>
      </div>

      {zipCode.length === 5 && city.length > 0 && (
        <div className="text-center">
          <p className="text-success-600 font-medium">
            ✓ Standortangaben vollständig
          </p>
        </div>
      )}
    </div>
  );
};

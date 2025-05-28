
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

  console.log("Config in LocationStep:", JSON.stringify(config, null, 2));
  console.log("config?.bueroPLZ:", config?.bueroPLZ);
  console.log("config?.bueroStadt:", config?.bueroStadt);
  console.log("config?.bueroStrasse:", config?.bueroStrasse);

  
  // Büro-Placeholder aus config:
  const bueroPLZPlaceholder = config?.bueroPLZ || "12345";       
  const bueroStadtPlaceholder = config?.bueroStadt || "z.B. München"; 
  const bueroStrassePlaceholder = config?.bueroStrasse || "z.B. Musterstraße 123";

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
              placeholder={bueroPLZPlaceholder}
              value={formData.zipCode || ""}
              onChange={e =>
                updateFormData({
                  zipCode: e.target.value.replace(/\D/g, '').slice(0, 5)
                })
              }
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
              placeholder={bueroStadtPlaceholder}
              value={formData.city || ""}
              onChange={e =>
                updateFormData({
                  city: e.target.value.trim()
                })
              }
              className="text-center text-xl h-14"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Straße (optional)
            </label>
            <Input
              type="text"
              placeholder={bueroStrassePlaceholder}
              value={formData.street || ""}
              onChange={e =>
                updateFormData({
                  street: e.target.value.trim()
                })
              }
              className="text-center text-lg h-12"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Die Angabe der Straße macht die Bewertung genauer
            </p>
          </div>
        </div>
      </div>

      {(formData.zipCode?.length === 5 && formData.city) && (
        <div className="text-center">
          <p className="text-success-600 font-medium">
            ✓ Standortangaben vollständig
          </p>
        </div>
      )}
    </div>
  );
};

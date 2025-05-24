
import React from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { ChoiceButton } from '../ChoiceButton';
import { PropertyFormData } from '@/types/propertyTypes';

interface ApartmentSizeStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const ApartmentSizeStep: React.FC<ApartmentSizeStepProps> = ({
  formData,
  updateFormData,
}) => {
  const livingAreaValue = formData.livingArea || 80;

  const handleLivingAreaChange = (value: number[]) => {
    updateFormData({ livingArea: value[0] });
  };

  const handleLivingAreaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 25 && value <= 200) {
      updateFormData({ livingArea: value });
    }
  };

  const floorOptions = [
    { id: 'erdgeschoss', label: 'Erdgeschoss' },
    { id: '1', label: '1. Obergeschoss' },
    { id: '2', label: '2. Obergeschoss' },
    { id: '3', label: '3. Obergeschoss' },
    { id: '4', label: '4. Obergeschoss' },
    { id: '5plus', label: '5. OG oder höher' },
    { id: 'dachgeschoss', label: 'Dachgeschoss' },
  ];

  return (
    <div className="space-y-12">
      {/* Wohnfläche */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Wohnfläche</h3>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-baseline gap-2 mb-4"
          >
            <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-success-600 bg-clip-text text-transparent">
              {livingAreaValue}
            </span>
            <span className="text-xl md:text-2xl text-muted-foreground font-medium">
              m²
            </span>
          </motion.div>
        </div>

        <div className="px-4">
          <Slider
            value={[livingAreaValue]}
            onValueChange={handleLivingAreaChange}
            min={25}
            max={200}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>25 m²</span>
            <span>200 m²</span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-32">
            <Input
              type="number"
              min="25"
              max="200"
              value={livingAreaValue}
              onChange={handleLivingAreaInputChange}
              className="text-center text-lg font-semibold"
              placeholder="m²"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[50, 70, 90, 120].map((area) => (
            <button
              key={area}
              onClick={() => updateFormData({ livingArea: area })}
              className={`p-3 rounded-lg border text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 ${
                livingAreaValue === area 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-border bg-background'
              }`}
            >
              {area} m²
            </button>
          ))}
        </div>
      </div>

      {/* Etage */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-center">In welcher Etage befindet sich die Wohnung?</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {floorOptions.map((option) => (
            <ChoiceButton
              key={option.id}
              title={option.label}
              selected={formData.floorLevel === option.id}
              onClick={() => updateFormData({ floorLevel: option.id })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

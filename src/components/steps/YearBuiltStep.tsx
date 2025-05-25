
import React from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { PropertyFormData } from '@/types/propertyTypes';

interface YearBuiltStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const YearBuiltStep: React.FC<YearBuiltStepProps> = ({
  formData,
  updateFormData,
}) => {
  // Store actual year instead of range
  const currentYear = formData.yearBuilt ? parseInt(formData.yearBuilt) : 1990;

  const handleYearChange = (value: number[]) => {
    const year = value[0];
    updateFormData({ yearBuilt: year.toString() });
  };

  const handleYearInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value);
    if (!isNaN(year) && year >= 1850 && year <= 2026) {
      updateFormData({ yearBuilt: year.toString() });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-baseline gap-2 mb-4"
        >
          <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-success-600 bg-clip-text text-transparent">
            {currentYear}
          </span>
        </motion.div>
        <p className="text-muted-foreground text-lg">
          Baujahr der Immobilie
        </p>
      </div>

      <div className="px-4">
        <Slider
          value={[currentYear]}
          onValueChange={handleYearChange}
          min={1850}
          max={2026}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>1850</span>
          <span>2026</span>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-32">
          <Input
            type="number"
            min="1850"
            max="2026"
            value={currentYear}
            onChange={handleYearInputChange}
            className="text-center text-lg font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Jahr"
          />
        </div>
      </div>
    </div>
  );
};

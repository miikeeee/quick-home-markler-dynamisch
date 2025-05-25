
import React, { useState } from 'react';
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
  const currentYear = new Date().getFullYear();
  const yearBuiltValue = formData.yearBuilt ? parseInt(formData.yearBuilt) : 1990;
  
  // Local state for input field to allow intermediate values
  const [yearBuiltInput, setYearBuiltInput] = useState(yearBuiltValue.toString());

  const handleYearBuiltChange = (value: number[]) => {
    const newValue = value[0];
    updateFormData({ yearBuilt: newValue.toString() });
    setYearBuiltInput(newValue.toString());
  };

  const handleYearBuiltInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setYearBuiltInput(value);
    
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 1850 && numValue <= 2026) {
      updateFormData({ yearBuilt: numValue.toString() });
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
            {yearBuiltValue}
          </span>
        </motion.div>
        <p className="text-muted-foreground">
          Baujahr der Immobilie
        </p>
      </div>

      <div className="px-4">
        <Slider
          value={[yearBuiltValue]}
          onValueChange={handleYearBuiltChange}
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
            value={yearBuiltInput}
            onChange={handleYearBuiltInputChange}
            className="text-center text-lg font-semibold"
            placeholder="Jahr"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[1970, 1990, 2000, 2010].map((year) => (
          <button
            key={year}
            onClick={() => {
              updateFormData({ yearBuilt: year.toString() });
              setYearBuiltInput(year.toString());
            }}
            className={`p-3 rounded-lg border text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 ${
              yearBuiltValue === year 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border bg-background'
            }`}
          >
            {year}
            </button>
          ))}
        </div>
      </div>
    );
};

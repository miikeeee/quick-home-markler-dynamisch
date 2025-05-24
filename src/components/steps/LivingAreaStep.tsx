
import React from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { PropertyFormData } from '@/types/propertyTypes';

interface LivingAreaStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const LivingAreaStep: React.FC<LivingAreaStepProps> = ({
  formData,
  updateFormData,
}) => {
  const currentValue = formData.livingArea || 100;

  const handleValueChange = (value: number[]) => {
    updateFormData({ livingArea: value[0] });
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
          <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary to-success-600 bg-clip-text text-transparent">
            {currentValue}
          </span>
          <span className="text-2xl md:text-3xl text-muted-foreground font-medium">
            m²
          </span>
        </motion.div>
        <p className="text-muted-foreground">
          Bewegen Sie den Schieberegler, um die Wohnfläche anzugeben
        </p>
      </div>

      <div className="px-4">
        <Slider
          value={[currentValue]}
          onValueChange={handleValueChange}
          min={40}
          max={500}
          step={5}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>40 m²</span>
          <span>500 m²</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[80, 120, 150, 200].map((area) => (
          <button
            key={area}
            onClick={() => updateFormData({ livingArea: area })}
            className={`p-3 rounded-lg border text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 ${
              currentValue === area 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border bg-background'
            }`}
          >
            {area} m²
          </button>
        ))}
      </div>
    </div>
  );
};

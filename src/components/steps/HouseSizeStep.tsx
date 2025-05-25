
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { PropertyFormData } from '@/types/propertyTypes';

interface HouseSizeStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const HouseSizeStep: React.FC<HouseSizeStepProps> = ({
  formData,
  updateFormData,
}) => {
  const livingAreaValue = formData.livingArea || 120;
  const plotAreaValue = formData.plotArea || 400;
  
  // Local state for input fields to allow intermediate values
  const [livingAreaInput, setLivingAreaInput] = useState(livingAreaValue.toString());
  const [plotAreaInput, setPlotAreaInput] = useState(plotAreaValue.toString());

  const handleLivingAreaChange = (value: number[]) => {
    const newValue = value[0];
    updateFormData({ livingArea: newValue });
    setLivingAreaInput(newValue.toString());
  };

  const handlePlotAreaChange = (value: number[]) => {
    const newValue = value[0];
    updateFormData({ plotArea: newValue });
    setPlotAreaInput(newValue.toString());
  };

  const handleLivingAreaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLivingAreaInput(value);
    
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 40 && numValue <= 500) {
      updateFormData({ livingArea: numValue });
    }
  };

  const handlePlotAreaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPlotAreaInput(value);
    
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 100 && numValue <= 2000) {
      updateFormData({ plotArea: numValue });
    }
  };

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
            min={40}
            max={500}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>40 m²</span>
            <span>500 m²</span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-32">
            <Input
              type="number"
              min="40"
              max="500"
              value={livingAreaInput}
              onChange={handleLivingAreaInputChange}
              className="text-center text-lg font-semibold"
              placeholder="m²"
            />
          </div>
        </div>
      </div>

      {/* Grundstücksfläche */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Grundstücksfläche</h3>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-baseline gap-2 mb-4"
          >
            <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-success-600 bg-clip-text text-transparent">
              {plotAreaValue}
            </span>
            <span className="text-xl md:text-2xl text-muted-foreground font-medium">
              m²
            </span>
          </motion.div>
        </div>

        <div className="px-4">
          <Slider
            value={[plotAreaValue]}
            onValueChange={handlePlotAreaChange}
            min={100}
            max={2000}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>100 m²</span>
            <span>2000 m²</span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-32">
            <Input
              type="number"
              min="100"
              max="2000"
              value={plotAreaInput}
              onChange={handlePlotAreaInputChange}
              className="text-center text-lg font-semibold"
              placeholder="m²"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { living: 100, plot: 300 },
          { living: 140, plot: 500 },
          { living: 180, plot: 700 },
          { living: 220, plot: 900 }
        ].map((preset) => (
          <button
            key={`${preset.living}-${preset.plot}`}
            onClick={() => {
              updateFormData({ livingArea: preset.living, plotArea: preset.plot });
              setLivingAreaInput(preset.living.toString());
              setPlotAreaInput(preset.plot.toString());
            }}
            className={`p-3 rounded-lg border text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 ${
              livingAreaValue === preset.living && plotAreaValue === preset.plot
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border bg-background'
            }`}
          >
            {preset.living}m² / {preset.plot}m²
          </button>
        ))}
      </div>
    </div>
  );
};

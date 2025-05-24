
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
  // Convert string ranges back to years for slider
  const getYearFromRange = (range: string | null): number => {
    switch (range) {
      case 'vor_1949': return 1940;
      case '1950_1969': return 1960;
      case '1970_1989': return 1980;
      case '1990_2009': return 2000;
      case '2010_heute': return 2020;
      default: return 1990;
    }
  };

  // Convert year to range string
  const getRangeFromYear = (year: number): string => {
    if (year < 1950) return 'vor_1949';
    if (year < 1970) return '1950_1969';
    if (year < 1990) return '1970_1989';
    if (year < 2010) return '1990_2009';
    return '2010_heute';
  };

  const getRangeLabel = (range: string): string => {
    switch (range) {
      case 'vor_1949': return 'vor 1949';
      case '1950_1969': return '1950-1969';
      case '1970_1989': return '1970-1989';
      case '1990_2009': return '1990-2009';
      case '2010_heute': return '2010-heute';
      default: return '1990-2009';
    }
  };

  const currentYear = getYearFromRange(formData.yearBuilt);
  const currentRange = formData.yearBuilt || '1990_2009';

  const handleYearChange = (value: number[]) => {
    const year = value[0];
    const range = getRangeFromYear(year);
    updateFormData({ yearBuilt: range });
  };

  const handleYearInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value);
    if (!isNaN(year) && year >= 1900 && year <= 2024) {
      const range = getRangeFromYear(year);
      updateFormData({ yearBuilt: range });
    }
  };

  const yearRanges = [
    { id: 'vor_1949', label: 'vor 1949', description: 'Historische Bausubstanz' },
    { id: '1950_1969', label: '1950-1969', description: 'Nachkriegszeit' },
    { id: '1970_1989', label: '1970-1989', description: '70er/80er Jahre' },
    { id: '1990_2009', label: '1990-2009', description: '90er/2000er Jahre' },
    { id: '2010_heute', label: '2010-heute', description: 'Neubau/sehr modern' },
  ];

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
          {getRangeLabel(currentRange)}
        </p>
      </div>

      <div className="px-4">
        <Slider
          value={[currentYear]}
          onValueChange={handleYearChange}
          min={1900}
          max={2024}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>1900</span>
          <span>2024</span>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-32">
          <Input
            type="number"
            min="1900"
            max="2024"
            value={currentYear}
            onChange={handleYearInputChange}
            className="text-center text-lg font-semibold"
            placeholder="Jahr"
          />
        </div>
      </div>

      <div className="space-y-3">
        {yearRanges.map((range) => (
          <button
            key={range.id}
            onClick={() => updateFormData({ yearBuilt: range.id })}
            className={`w-full p-4 rounded-lg border text-left transition-all hover:border-primary hover:bg-primary/5 ${
              formData.yearBuilt === range.id
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border bg-background'
            }`}
          >
            <div className="font-medium">{range.label}</div>
            <div className="text-sm text-muted-foreground">{range.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

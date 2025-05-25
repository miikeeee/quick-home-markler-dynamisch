
import React from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { PropertyFormData } from '@/types/propertyTypes';

interface RoomCountStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

export const RoomCountStep: React.FC<RoomCountStepProps> = ({
  formData,
  updateFormData,
}) => {
  const roomCountValue = formData.roomCount || 3;

  const handleRoomCountChange = (value: number[]) => {
    updateFormData({ roomCount: value[0] });
  };

  const handleRoomCountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      return; // Allow empty field while typing
    }
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 15) {
      updateFormData({ roomCount: numValue });
    }
  };

  const getRoomLabel = (count: number) => {
    if (count === 1) return '1 Zimmer';
    if (count >= 10) return `${count}+ Zimmer`;
    return `${count} Zimmer`;
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
            {roomCountValue}
          </span>
          <span className="text-xl md:text-2xl text-muted-foreground font-medium">
            {roomCountValue === 1 ? 'Zimmer' : 'Zimmer'}
          </span>
        </motion.div>
        <p className="text-muted-foreground">
          {getRoomLabel(roomCountValue)}
        </p>
      </div>

      <div className="px-4">
        <Slider
          value={[roomCountValue]}
          onValueChange={handleRoomCountChange}
          min={1}
          max={15}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>1 Zimmer</span>
          <span>15+ Zimmer</span>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-24">
          <Input
            type="number"
            min="1"
            max="15"
            value={roomCountValue}
            onChange={handleRoomCountInputChange}
            className="text-center text-lg font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

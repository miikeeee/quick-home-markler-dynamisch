
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
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 10) {
      updateFormData({ roomCount: value });
    }
  };

  const getRoomLabel = (count: number) => {
    if (count === 1) return '1 Zimmer';
    if (count >= 6) return `${count}+ Zimmer`;
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
          max={10}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>1 Zimmer</span>
          <span>10+ Zimmer</span>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-24">
          <Input
            type="number"
            min="1"
            max="10"
            value={roomCountValue}
            onChange={handleRoomCountInputChange}
            className="text-center text-lg font-semibold"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6].map((rooms) => (
          <button
            key={rooms}
            onClick={() => updateFormData({ roomCount: rooms })}
            className={`p-3 rounded-lg border text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 ${
              roomCountValue === rooms 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border bg-background'
            }`}
          >
            {getRoomLabel(rooms)}
          </button>
        ))}
      </div>
    </div>
  );
};


import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  className = "",
}) => {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className={`w-full ${className}`}>
      {/* Progress bar */}
      <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden mb-4">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-success-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      {/* Step counter */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-success-500" />
          Schritt {currentStep} von {totalSteps}
        </span>
        <span className="font-medium">
          {Math.round(progress)}% abgeschlossen
        </span>
      </div>
    </div>
  );
};

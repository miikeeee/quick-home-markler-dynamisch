
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface LoadingScreenProps {
  isVisible: boolean;
}

const loadingSteps = [
  "Ihre Angaben werden verarbeitet...",
  "Marktdaten werden analysiert...",
  "Vergleichsobjekte werden gesucht...",
  "Bewertung wird erstellt...",
  "Ergebnis wird finalisiert..."
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 90) {
          return prev + Math.random() * 5;
        }
        return prev;
      });
    }, 100);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex items-center justify-center z-50"
    >
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        {/* Animated Circle */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 mx-auto border-4 border-primary/20 border-t-primary rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 w-24 h-24 mx-auto border-2 border-success-500/30 rounded-full"
          />
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <Progress value={progress} className="w-full h-2" />
          <p className="text-sm text-muted-foreground">
            {Math.round(progress)}% abgeschlossen
          </p>
        </div>

        {/* Loading Text */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-2"
        >
          <h2 className="text-xl font-semibold text-primary">
            Bewertung wird erstellt
          </h2>
          <p className="text-muted-foreground">
            {loadingSteps[currentStep]}
          </p>
        </motion.div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

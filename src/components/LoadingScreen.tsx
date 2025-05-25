
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface LoadingScreenProps {
  isVisible: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "Ihre Angaben werden verarbeitet...",
    "Marktdaten werden analysiert...",
    "Vergleichsobjekte werden ermittelt...",
    "Bewertung wird berechnet...",
    "Ergebnis wird vorbereitet..."
  ];

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      setCurrentMessage(0);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 3 + 1; // Slower, more realistic progression
      });
    }, 200);

    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center space-y-8">
          {/* Animated Logo/Icon */}
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 w-16 h-16 mx-auto bg-gradient-to-r from-primary/20 to-success-600/20 rounded-full"
            />
          </div>

          {/* Progress Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Progress value={progress} className="h-3 bg-muted" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{Math.round(progress)}%</span>
                <span>Bewertung läuft...</span>
              </div>
            </div>

            {/* Dynamic Message */}
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-lg font-medium text-foreground min-h-[28px]"
            >
              {messages[currentMessage]}
            </motion.div>
          </div>

          {/* Additional Info */}
          <div className="text-sm text-muted-foreground">
            <p>Dies kann einen Moment dauern...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

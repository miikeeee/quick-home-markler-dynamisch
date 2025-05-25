
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, MapPin, Calculator, BarChart3, CheckCircle2 } from 'lucide-react';

interface LoadingScreenProps {
  isVisible: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    {
      text: "Ihre Angaben werden verarbeitet...",
      icon: Calculator,
      color: "text-blue-500"
    },
    {
      text: "Marktdaten werden analysiert...",
      icon: TrendingUp,
      color: "text-green-500"
    },
    {
      text: "Vergleichsobjekte werden ermittelt...",
      icon: MapPin,
      color: "text-purple-500"
    },
    {
      text: "Bewertung wird berechnet...",
      icon: BarChart3,
      color: "text-orange-500"
    },
    {
      text: "Ergebnis wird vorbereitet...",
      icon: CheckCircle2,
      color: "text-emerald-500"
    }
  ];

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      setCurrentMessage(0);
      return;
    }

    // Langsamere, realistische Progression
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        
        // Langsamere Progression mit variierenden Geschwindigkeiten
        let increment = 0.8;
        if (prev < 20) increment = 1.5; // Schneller am Anfang
        else if (prev < 60) increment = 1; // Mittlere Geschwindigkeit
        else if (prev < 90) increment = 0.5; // Langsamer am Ende
        else increment = 0.3; // Sehr langsam kurz vor Ende
        
        return Math.min(prev + increment + Math.random() * 0.5, 100);
      });
    }, 150);

    // Nachrichten wechseln basierend auf Progress
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => {
        const nextMessage = (prev + 1) % messages.length;
        return nextMessage;
      });
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const currentIcon = messages[currentMessage].icon;
  const CurrentIcon = currentIcon;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50/95 via-blue-50/95 to-emerald-50/95 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="max-w-lg w-full mx-auto p-8">
        <div className="text-center space-y-8">
          {/* Hauptanimation mit verbessertem Design */}
          <div className="relative">
            {/* Äußerer rotierender Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 mx-auto border-4 border-primary/20 border-t-primary rounded-full"
            />
            
            {/* Innerer pulsierender Kreis */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 w-24 h-24 mx-auto bg-gradient-to-r from-primary/10 to-success-600/10 rounded-full"
            />
            
            {/* Zentrales Icon */}
            <motion.div
              key={currentMessage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <CurrentIcon className={`w-8 h-8 ${messages[currentMessage].color}`} />
            </motion.div>
          </div>

          {/* Progress Sektion mit verbessertem Design */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Progress 
                value={progress} 
                className="h-4 bg-muted shadow-inner rounded-full overflow-hidden"
              />
              <div className="flex justify-between text-sm font-medium">
                <span className="text-muted-foreground">{Math.round(progress)}%</span>
                <span className="text-primary">Bewertung läuft...</span>
              </div>
            </div>

            {/* Dynamische Nachricht mit Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center gap-3 min-h-[32px]"
              >
                <CurrentIcon className={`w-5 h-5 ${messages[currentMessage].color}`} />
                <span className="text-lg font-medium text-foreground">
                  {messages[currentMessage].text}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Zusätzliche Info mit Animation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="space-y-2"
          >
            <p className="text-sm text-muted-foreground">
              Wir analysieren über 1.000 Datenpunkte für Ihre Bewertung
            </p>
            <div className="flex justify-center space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: i * 0.5 
                  }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

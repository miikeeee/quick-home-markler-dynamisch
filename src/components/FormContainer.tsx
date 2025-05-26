import React from 'react';
import { motion } from 'framer-motion';
import { ProgressIndicator } from './ProgressIndicator';

interface FormContainerProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  maklerName?: string; // <--- NEU
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  currentStep,
  totalSteps,
  title,
  subtitle,
  maklerName, // <--- NEU
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-success-600 bg-clip-text text-transparent mb-2"
          >
            Immobilien-Bewertungstool
            {maklerName ? ` von ${maklerName}` : ""}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Erhalten Sie eine professionelle Erstbewertung Ihrer Immobilie
          </motion.p>
        </div>

        {/* Progress */}
        <div className="max-w-md mx-auto mb-8">
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div className="step-card">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {title}
              </h2>
              {subtitle && (
                <p className="text-muted-foreground text-lg mb-8">
                  {subtitle}
                </p>
              )}
              
              <div className="animate-fade-in-up">
                {children}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProgressIndicator } from './ProgressIndicator';

interface FormContainerProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  maklerName?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  currentStep,
  totalSteps,
  title,
  subtitle,
  maklerName,
}) => {
  const [showImpressum, setShowImpressum] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 relative">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-success-600 bg-clip-text text-transparent mb-2"
          >
            Immobilien-Bewertungstool
            {maklerName && (
              <>
                <br />
                <span className="text-xl font-medium">{`von ${maklerName}`}</span>
              </>
            )}
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
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
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
                <p className="text-muted-foreground text-lg mb-8">{subtitle}</p>
              )}

              <div className="animate-fade-in-up">{children}</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Impressum Link unten rechts */}
      <button
        onClick={() => setShowImpressum(true)}
        className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-xl shadow-md px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition z-50"
        aria-label="Impressum anzeigen"
      >
        Impressum
      </button>

      {/* Impressum Modal */}
      {showImpressum && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
              onClick={() => setShowImpressum(false)}
              aria-label="Impressum schließen"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2">Impressum</h2>
            <p className="mb-1 font-semibold">Angaben gemäß § 5 TMG:</p>
            <p>Mike Mildenberger<br />Musterstraße 1<br />53604 Bad Honnef</p>
            <p className="mt-2">Telefon: 0173 8376392<br />E-Mail: mike@nocodestud.io</p>
            {/* Optional: Mehr Impressumstext ergänzen */}
          </div>
        </div>
      )}
    </div>
  );
};


import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
  loading?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBack,
  onNext,
  nextLabel = "Weiter",
  nextDisabled = false,
  showBack = true,
  loading = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex justify-between items-center mt-8 pt-6 border-t border-border/50"
    >
      {showBack && onBack ? (
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Zurück
        </Button>
      ) : (
        <div />
      )}

      {onNext && (
        <Button
          onClick={onNext}
          disabled={nextDisabled || loading}
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-success-600 hover:from-primary/90 hover:to-success-600/90 text-white px-8 py-3 text-lg font-medium"
          size="lg"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              Wird verarbeitet...
            </>
          ) : (
            <>
              {nextLabel}
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      )}
    </motion.div>
  );
};

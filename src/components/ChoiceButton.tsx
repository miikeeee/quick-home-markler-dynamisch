

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChoiceButtonProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  selected?: boolean;
  onClick: () => void;
  className?: string;
}

export const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  icon: Icon,
  title,
  description,
  selected = false,
  onClick,
  className = "",
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "choice-button group w-full text-left",
        selected && "selected",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className={cn(
            "flex-shrink-0 p-3 rounded-xl transition-colors",
            selected 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
          )}>
            <Icon className="h-6 w-6" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-semibold text-lg transition-colors",
            selected ? "text-primary" : "text-foreground"
          )}>
            {title}
          </h3>
          {description && (
            <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-white rounded-full" />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
};


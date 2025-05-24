
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormContainer } from './FormContainer';
import { NavigationButtons } from './NavigationButtons';
import { PropertyTypeStep } from './steps/PropertyTypeStep';
import { HouseTypeStep } from './steps/HouseTypeStep';
import { LivingAreaStep } from './steps/LivingAreaStep';
import { PropertyFormData, FormStep, WebhookResponseData } from '@/types/propertyTypes';
import { useToast } from '@/hooks/use-toast';

const initialFormData: PropertyFormData = {
  propertyType: null,
  houseType: null,
  livingArea: null,
  plotArea: null,
  roomCount: null,
  yearBuilt: null,
  floorLevel: null,
  hasElevator: null,
  zipCode: null,
  city: null,
  conditionGeneral: null,
  renovations: null,
  equipmentQuality: null,
  heatingType: null,
  kitchenDetails: null,
  outdoorFeatures: null,
  parkingType: null,
  energyCertificate: null,
  userIntent: null,
};

interface FormWizardProps {
  onComplete: (data: WebhookResponseData) => void;
}

export const FormWizard: React.FC<FormWizardProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<PropertyFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const allSteps: FormStep[] = [
    {
      id: 'property_type',
      title: 'Was für eine Immobilie möchten Sie bewerten lassen?',
      subtitle: 'Wählen Sie den Typ Ihrer Immobilie aus',
      component: PropertyTypeStep,
    },
    {
      id: 'house_type',
      title: 'Um welche Art von Haus handelt es sich?',
      subtitle: 'Spezifizieren Sie den Haustyp für eine genauere Bewertung',
      component: HouseTypeStep,
      isApplicable: (data) => data.propertyType === 'house',
    },
    {
      id: 'living_area',
      title: 'Wie groß ist die Wohnfläche?',
      subtitle: 'Geben Sie die ungefähre Wohnfläche in Quadratmetern an',
      component: LivingAreaStep,
    },
  ];

  const applicableSteps = useMemo(() => {
    return allSteps.filter(step => 
      !step.isApplicable || step.isApplicable(formData)
    );
  }, [formData]);

  const updateFormData = (newData: Partial<PropertyFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const canProceed = () => {
    const currentStep = applicableSteps[currentStepIndex];
    
    switch (currentStep.id) {
      case 'property_type':
        return formData.propertyType !== null;
      case 'house_type':
        return formData.houseType !== null;
      case 'living_area':
        return formData.livingArea !== null;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (currentStepIndex < applicableSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      console.log('Submitting form data:', formData);
      
      // Simulate webhook call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock response data
      const mockResponse: WebhookResponseData = {
        estimated_property_value_eur: 485000,
        value_range_min_eur: 460000,
        value_range_max_eur: 510000,
        price_per_sqm_avg_eur: formData.livingArea ? Math.round(485000 / formData.livingArea) : 3500,
        valuation_confidence: 'hoch',
        key_positive_value_drivers: [
          'Moderne Ausstattung',
          'Gute Lage',
          'Gepflegter Zustand'
        ],
        key_negative_value_drivers: [
          'Renovierungsbedarf bei der Heizung'
        ],
        local_market_trend_info: 'Stabile Nachfrage in der Region',
        comparable_properties_nearby: [
          {
            id: '1',
            address_snippet: 'Musterstadt, Hauptstraße',
            property_type_display: 'Einfamilienhaus',
            living_area_sqm: 120,
            plot_area_sqm: 500,
            year_built_display: 'Baujahr 1995',
            estimated_value_eur: 475000,
            price_per_sqm_eur: 3958,
          }
        ]
      };

      onComplete(mockResponse);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Fehler',
        description: 'Es gab einen Fehler bei der Verarbeitung. Bitte versuchen Sie es erneut.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStep = applicableSteps[currentStepIndex];
  const StepComponent = currentStep.component;

  return (
    <FormContainer
      currentStep={currentStepIndex + 1}
      totalSteps={applicableSteps.length}
      title={currentStep.title}
      subtitle={currentStep.subtitle}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <StepComponent
            formData={formData}
            updateFormData={updateFormData}
          />
        </motion.div>
      </AnimatePresence>

      <NavigationButtons
        onBack={currentStepIndex > 0 ? handleBack : undefined}
        onNext={handleNext}
        nextLabel={currentStepIndex === applicableSteps.length - 1 ? 'Bewertung erhalten' : 'Weiter'}
        nextDisabled={!canProceed()}
        showBack={currentStepIndex > 0}
        loading={isSubmitting}
      />
    </FormContainer>
  );
};

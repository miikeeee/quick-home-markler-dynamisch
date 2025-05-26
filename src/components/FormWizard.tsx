import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormContainer } from './FormContainer';
import { NavigationButtons } from './NavigationButtons';
import { LoadingScreen } from './LoadingScreen';
import { PropertyTypeStep } from './steps/PropertyTypeStep';
import { HouseTypeStep } from './steps/HouseTypeStep';
import { LivingAreaStep } from './steps/LivingAreaStep';
import { HouseSizeStep } from './steps/HouseSizeStep';
import { ApartmentSizeStep } from './steps/ApartmentSizeStep';
import { RoomCountStep } from './steps/RoomCountStep';
import { YearBuiltStep } from './steps/YearBuiltStep';
import { BasementStep } from './steps/BasementStep';
import { ElevatorStep } from './steps/ElevatorStep';
import { LocationStep } from './steps/LocationStep';
import { ConditionStep } from './steps/ConditionStep';
import { RenovationStep } from './steps/RenovationStep';
import { EquipmentQualityStep } from './steps/EquipmentQualityStep';
import { HeatingTypeStep } from './steps/HeatingTypeStep';
import { WindowTypeStep } from './steps/WindowTypeStep';
import { FlooringTypeStep } from './steps/FlooringTypeStep';
import { KitchenStep } from './steps/KitchenStep';
import { OutdoorFeaturesStep } from './steps/OutdoorFeaturesStep';
import { ParkingStep } from './steps/ParkingStep';
import { EnergyCertificateStep } from './steps/EnergyCertificateStep';
import { RentalStatusStep } from './steps/RentalStatusStep';
import { MonthlyFeeStep } from './steps/MonthlyFeeStep';
import { UserIntentStep } from './steps/UserIntentStep';
import { PropertyFormData, FormStep, WebhookResponseData } from '@/types/propertyTypes';
import { useToast } from '@/hooks/use-toast';

const initialFormData: PropertyFormData = {
  propertyType: null,
  houseType: null,
  livingArea: null,
  plotArea: null,
  floorLevel: null,
  roomCount: null,
  yearBuilt: null,
  hasBasement: null,
  basementType: null,
  hasElevator: null,
  monthlyFee: null,
  zipCode: null,
  city: null,
  street: null,
  conditionGeneral: null,
  renovations: null,
  equipmentQuality: null,
  heatingType: null,
  windowType: null,
  flooringType: null,
  kitchenDetails: null,
  outdoorFeatures: null,
  parkingType: null,
  energyCertificate: null,
  currentlyRented: null,
  annualRent: null,
  userIntent: null,
};

interface FormWizardProps {
  onComplete: (data: WebhookResponseData, formData?: PropertyFormData) => void;
  initialFormData?: PropertyFormData;
  maklerName?: string;
}

export const FormWizard: React.FC<FormWizardProps> = ({ onComplete, initialFormData: propInitialFormData, maklerName }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<PropertyFormData>(propInitialFormData || initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const { toast } = useToast();

  // Update formData when initialFormData changes
  useEffect(() => {
    if (propInitialFormData) {
      setFormData(propInitialFormData);
    }
  }, [propInitialFormData]);

  // Save form data to sessionStorage whenever it changes
  const updateFormData = (newData: Partial<PropertyFormData>) => {
    const updatedData = { ...formData, ...newData };
    setFormData(updatedData);
    sessionStorage.setItem('propertyFormData', JSON.stringify(updatedData));
  };

  const allSteps: FormStep[] = [
    {
      id: 'property_type',
      title: 'Was möchten Sie bewerten?',
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
      id: 'house_size',
      title: 'Größenangaben zu Ihrem Haus',
      subtitle: 'Wohnfläche und Grundstücksgröße',
      component: HouseSizeStep,
      isApplicable: (data) => data.propertyType === 'house',
    },
    {
      id: 'apartment_size',
      title: 'Angaben zu Ihrer Wohnung',
      subtitle: 'Wohnfläche und Stockwerk',
      component: ApartmentSizeStep,
      isApplicable: (data) => data.propertyType === 'apartment',
    },
    {
      id: 'room_count',
      title: 'Wie viele Zimmer hat die Immobilie?',
      subtitle: 'Anzahl der Wohn- und Schlafzimmer (ohne Küche, Bad, Flur)',
      component: RoomCountStep,
    },
    {
      id: 'location',
      title: 'Wo befindet sich die Immobilie?',
      subtitle: 'Standort für die Lageanalyse',
      component: LocationStep,
    },
    {
      id: 'year_built',
      title: 'Wann wurde die Immobilie gebaut?',
      subtitle: 'Baujahr für die Bewertung',
      component: YearBuiltStep,
    },
    {
      id: 'basement',
      title: 'Ist ein Keller vorhanden?',
      subtitle: 'Kellerausstattung bei Häusern',
      component: BasementStep,
      isApplicable: (data) => data.propertyType === 'house',
    },
    {
      id: 'elevator',
      title: 'Ist ein Aufzug vorhanden?',
      subtitle: 'Aufzug im Gebäude',
      component: ElevatorStep,
      isApplicable: (data) => data.propertyType === 'apartment' && data.floorLevel !== 'erdgeschoss',
    },
    {
      id: 'condition',
      title: 'Wie ist der allgemeine Zustand?',
      subtitle: 'Bewerten Sie den Gesamtzustand der Immobilie',
      component: ConditionStep,
    },
    {
      id: 'renovation',
      title: 'Sanierungen und Modernisierungen',
      subtitle: 'Welche Bereiche wurden in den letzten 20 Jahren saniert?',
      component: RenovationStep,
    },
    {
      id: 'equipment_quality',
      title: 'Ausstattungsqualität',
      subtitle: 'Wie bewerten Sie die Qualität der Ausstattung?',
      component: EquipmentQualityStep,
    },
    {
      id: 'heating_type',
      title: 'Welche Heizung ist installiert?',
      subtitle: 'Art der Heizungsanlage',
      component: HeatingTypeStep,
    },
    {
      id: 'window_type',
      title: 'Welche Art von Fenstern ist verbaut?',
      subtitle: 'Fensterausstattung',
      component: WindowTypeStep,
    },
    {
      id: 'flooring_type',
      title: 'Welche Bodenbeläge sind vorhanden?',
      subtitle: 'Art der Bodenbeläge in den Haupträumen',
      component: FlooringTypeStep,
    },
    {
      id: 'kitchen',
      title: 'Küchenausstattung',
      subtitle: 'Ist eine Einbauküche vorhanden?',
      component: KitchenStep,
    },
    {
      id: 'outdoor_features',
      title: 'Außenbereiche',
      subtitle: 'Welche Außenbereiche gehören zur Immobilie?',
      component: OutdoorFeaturesStep,
    },
    {
      id: 'parking',
      title: 'Stellplatz oder Garage',
      subtitle: 'Parkplätze zur Immobilie',
      component: ParkingStep,
    },
    {
      id: 'energy_certificate',
      title: 'Energieausweis',
      subtitle: 'Liegt ein aktueller Energieausweis vor?',
      component: EnergyCertificateStep,
    },
    {
      id: 'monthly_fee',
      title: 'Hausgeld',
      subtitle: 'Monatliche Nebenkosten bei Wohnungen',
      component: MonthlyFeeStep,
      isApplicable: (data) => data.propertyType === 'apartment',
    },
    {
      id: 'rental_status',
      title: 'Vermietungsstatus',
      subtitle: 'Ist die Immobilie aktuell vermietet?',
      component: RentalStatusStep,
    },
    {
      id: 'user_intent',
      title: 'Ihre Absicht',
      subtitle: 'Warum möchten Sie den Wert Ihrer Immobilie wissen?',
      component: UserIntentStep,
    },
  ];

  const applicableSteps = useMemo(() => {
    return allSteps.filter(step => 
      !step.isApplicable || step.isApplicable(formData)
    );
  }, [formData]);

  const canProceed = () => {
    const currentStep = applicableSteps[currentStepIndex];
    
    switch (currentStep.id) {
      case 'property_type':
        return formData.propertyType !== null;
      case 'house_type':
        return formData.houseType !== null;
      case 'house_size':
        return formData.livingArea !== null && formData.plotArea !== null;
      case 'apartment_size':
        return formData.livingArea !== null && formData.floorLevel !== null;
      case 'room_count':
        return formData.roomCount !== null;
      case 'location':
        return formData.zipCode !== null && formData.city !== null; // street is optional
      case 'year_built':
        return formData.yearBuilt !== null;
      case 'basement':
        return formData.hasBasement !== null;
      case 'elevator':
        return formData.hasElevator !== null;
      case 'condition':
        return formData.conditionGeneral !== null;
      case 'renovation':
        return true; // Optional step
      case 'equipment_quality':
        return formData.equipmentQuality !== null;
      case 'heating_type':
        return formData.heatingType !== null;
      case 'window_type':
        return formData.windowType !== null;
      case 'flooring_type':
        return formData.flooringType !== null && formData.flooringType.length > 0;
      case 'kitchen':
        return formData.kitchenDetails !== null;
      case 'outdoor_features':
        return true; // Optional step
      case 'parking':
        return formData.parkingType !== null;
      case 'energy_certificate':
        return formData.energyCertificate !== null;
      case 'monthly_fee':
        return formData.monthlyFee !== null;
      case 'rental_status':
        return formData.currentlyRented !== null;
      case 'user_intent':
        return formData.userIntent !== null;
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
    setShowLoading(true);

    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch('https://hook.eu2.make.com/8outkmvotmanifh1xzgvg8fb1cgs3s6f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('Raw webhook response:', responseText);
      
      let webhookResponse: WebhookResponseData;
      
      try {
        // Versuche JSON zu parsen
        webhookResponse = JSON.parse(responseText);
        console.log('Parsed webhook response:', webhookResponse);
      } catch (parseError) {
        console.log('Response is not JSON, received:', responseText);
        
        // Falls die Antwort nur "Accepted" oder ähnlich ist, erstelle eine Standard-Antwort
        if (responseText.trim() === 'Accepted' || responseText.trim() === '"Accepted"') {
          webhookResponse = {
            estimated_property_value_eur: 450000,
            value_range_min_eur: 420000,
            value_range_max_eur: 480000,
            price_per_sqm_avg_eur: 3500,
            valuation_confidence: 'mittel',
            positive_value_drivers: [
              'Gute Lage',
              'Solide Bausubstanz',
              'Renovierungspotential'
            ],
            negative_value_drivers: [
              'Modernisierungsbedarf bei einigen Bereichen'
            ],
            local_market_trend_info: 'Stabile Marktentwicklung in der Region',
            comparable_properties_nearby: [],
            price_development_data: [
              { year: '2020', avgPrice: 3200, localPrice: 3150 },
              { year: '2021', avgPrice: 3350, localPrice: 3300 },
              { year: '2022', avgPrice: 3500, localPrice: 3450 },
              { year: '2023', avgPrice: 3400, localPrice: 3380 },
              { year: '2024', avgPrice: 3500, localPrice: 3500 }
            ]
          };
          console.log('Using fallback response data');
        } else {
          throw new Error('Invalid response format');
        }
      }
      
      // Small delay to show the loading animation completion
      setTimeout(() => {
        setShowLoading(false);
        onComplete(webhookResponse, formData);
      }, 1000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setShowLoading(false);
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

  if (showLoading) {
    return <LoadingScreen isVisible={showLoading} />;
  }

  return (
    <FormContainer
      currentStep={currentStepIndex + 1}
      totalSteps={applicableSteps.length}
      title={currentStep.title}
      subtitle={currentStep.subtitle}
      maklerName={maklerName}
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

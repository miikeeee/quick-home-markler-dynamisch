import React, { useState, useEffect } from 'react';
import { FormWizard } from '@/components/FormWizard';
import { ResultsPage } from '@/components/ResultsPage';
import { WebhookResponseData, PropertyFormData } from '@/types/propertyTypes';
import { ConfigType } from '@/types/ConfigType';

type IndexProps = {
  config: ConfigType;
};

const Index: React.FC<IndexProps> = ({ config }) => {
  const [currentView, setCurrentView] = useState<'form' | 'results'>('form');
  const [resultsData, setResultsData] = useState<WebhookResponseData | null>(null);
  const [originalFormData, setOriginalFormData] = useState<PropertyFormData | null>(null);

  useEffect(() => {
    const savedFormData = sessionStorage.getItem('propertyFormData');
    const savedResultsData = sessionStorage.getItem('propertyResultsData');
    if (savedFormData) {
      try { setOriginalFormData(JSON.parse(savedFormData)); } catch {}
    }
    if (savedResultsData) {
      try {
        setResultsData(JSON.parse(savedResultsData));
        setCurrentView('results');
      } catch {}
    }
  }, []);

  const handleFormComplete = (data: WebhookResponseData, formData?: PropertyFormData) => {
    setResultsData(data);
    if (formData) {
      setOriginalFormData(formData);
      sessionStorage.setItem('propertyFormData', JSON.stringify(formData));
    }
    sessionStorage.setItem('propertyResultsData', JSON.stringify(data));
    setCurrentView('results');
  };

  const handleBackToForm = () => {
    sessionStorage.removeItem('propertyResultsData');
    setCurrentView('form');
  };

  const handleEditForm = () => {
    sessionStorage.removeItem('propertyResultsData');
    setCurrentView('form');
  };

  if (currentView === 'results' && resultsData) {
    return (
      <ResultsPage
        data={resultsData}
        onBack={handleBackToForm}
        onEdit={handleEditForm}
        originalFormData={originalFormData || undefined}
        config={config}
      />
    );
  }

  return (
    <FormWizard 
      onComplete={handleFormComplete}
      initialFormData={originalFormData || undefined}
      maklerName={config.maklerName} // <--- Wichtig!
    />
  );
};

export default Index;

import React, { useState, useEffect } from 'react';
import { FormWizard } from '@/components/FormWizard';
import { ResultsPage } from '@/components/ResultsPage';
import { WebhookResponseData, PropertyFormData } from '@/types/propertyTypes';

const Index = () => {
  const [currentView, setCurrentView] = useState<'form' | 'results'>('form');
  const [resultsData, setResultsData] = useState<WebhookResponseData | null>(null);
  const [originalFormData, setOriginalFormData] = useState<PropertyFormData | null>(null);

  // Load form data from sessionStorage on component mount
  useEffect(() => {
    const savedFormData = sessionStorage.getItem('propertyFormData');
    const savedResultsData = sessionStorage.getItem('propertyResultsData');
    
    if (savedFormData) {
      try {
        setOriginalFormData(JSON.parse(savedFormData));
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
    
    if (savedResultsData) {
      try {
        setResultsData(JSON.parse(savedResultsData));
        setCurrentView('results');
      } catch (error) {
        console.error('Error parsing saved results data:', error);
      }
    }
  }, []);

  const handleFormComplete = (data: WebhookResponseData, formData?: PropertyFormData) => {
    setResultsData(data);
    if (formData) {
      setOriginalFormData(formData);
      // Save to sessionStorage for persistence
      sessionStorage.setItem('propertyFormData', JSON.stringify(formData));
    }
    // Save results to sessionStorage
    sessionStorage.setItem('propertyResultsData', JSON.stringify(data));
    setCurrentView('results');
  };

  const handleBackToForm = () => {
    // Clear results from sessionStorage but keep form data
    sessionStorage.removeItem('propertyResultsData');
    setCurrentView('form');
  };

  const handleEditForm = () => {
    // Clear results from sessionStorage but keep form data
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
      />
    );
  }

  return (
    <FormWizard 
      onComplete={handleFormComplete}
      initialFormData={originalFormData || undefined}
    />
  );
};

export default Index;


import React, { useState } from 'react';
import { FormWizard } from '@/components/FormWizard';
import { ResultsPage } from '@/components/ResultsPage';
import { WebhookResponseData } from '@/types/propertyTypes';

const Index = () => {
  const [currentView, setCurrentView] = useState<'form' | 'results'>('form');
  const [resultsData, setResultsData] = useState<WebhookResponseData | null>(null);

  const handleFormComplete = (data: WebhookResponseData) => {
    setResultsData(data);
    setCurrentView('results');
  };

  const handleBackToForm = () => {
    setCurrentView('form');
  };

  const handleEditForm = () => {
    setCurrentView('form');
  };

  if (currentView === 'results' && resultsData) {
    return (
      <ResultsPage
        data={resultsData}
        onBack={handleBackToForm}
        onEdit={handleEditForm}
      />
    );
  }

  return (
    <FormWizard onComplete={handleFormComplete} />
  );
};

export default Index;

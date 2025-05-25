
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Download, 
  Edit3, 
  TrendingUp, 
  MapPin, 
  Calendar,
  Square,
  CheckCircle2,
  AlertCircle,
  Star,
  Settings,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { LoadingScreen } from './LoadingScreen';
import { ComparisonForm } from './ComparisonForm';
import { WebhookResponseData, PropertyFormData, ComparisonProperty } from '@/types/propertyTypes';
import { useToast } from '@/hooks/use-toast';

interface ResultsPageProps {
  data: WebhookResponseData;
  onBack: () => void;
  onEdit: () => void;
  originalFormData?: PropertyFormData;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ 
  data, 
  onBack, 
  onEdit, 
  originalFormData 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [comparisonDialogOpen, setComparisonDialogOpen] = useState(false);
  const [addComparisonDialogOpen, setAddComparisonDialogOpen] = useState(false);
  const [isLoadingComparison, setIsLoadingComparison] = useState(false);
  const [additionalComparisons, setAdditionalComparisons] = useState<ComparisonProperty[]>([]);
  const [comparisonParams, setComparisonParams] = useState({
    livingArea: originalFormData?.livingArea || 120,
    location: '',
    condition: 'good'
  });
  const { toast } = useToast();

  const formatCurrency = (amount: number | null) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getConfidenceBadgeColor = (confidence: string | null) => {
    switch (confidence) {
      case 'hoch': return 'bg-success-100 text-success-800 border-success-200';
      case 'mittel': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'gering': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleComparisonUpdate = async () => {
    setIsLoadingComparison(true);
    try {
      console.log('Updating comparison with:', comparisonParams);
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setComparisonDialogOpen(false);
      toast({
        title: 'Vergleich aktualisiert',
        description: 'Die Bewertung wurde mit den neuen Parametern aktualisiert.',
      });
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Fehler beim Aktualisieren des Vergleichs.',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingComparison(false);
    }
  };

  const handleAddComparison = async (comparisonData: Partial<PropertyFormData>) => {
    setIsLoadingComparison(true);
    
    try {
      console.log('Adding new comparison with data:', comparisonData);
      
      const response = await fetch('https://hook.eu2.make.com/8outkmvotmanifh1xzgvg8fb1cgs3s6f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...comparisonData,
          comparison_request: true,
          original_property: originalFormData
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      let webhookResponse: WebhookResponseData;
      
      try {
        webhookResponse = JSON.parse(responseText);
      } catch (parseError) {
        // Fallback for demo
        webhookResponse = {
          estimated_property_value_eur: 420000,
          value_range_min_eur: 400000,
          value_range_max_eur: 440000,
          price_per_sqm_avg_eur: 3200,
          valuation_confidence: 'mittel',
          positive_value_drivers: ['Gute Verkehrsanbindung'],
          negative_value_drivers: ['Andere Lage'],
          local_market_trend_info: 'Stabiler Markt',
          comparable_properties_nearby: [
            {
              id: 'comp-new-1',
              address_snippet: `${comparisonData.zipCode} ${comparisonData.city}`,
              property_type_display: originalFormData?.propertyType === 'house' ? 'Einfamilienhaus' : 'Eigentumswohnung',
              living_area_sqm: comparisonData.livingArea || 120,
              year_built_display: comparisonData.yearBuilt || 'unbekannt',
              estimated_value_eur: 420000,
              price_per_sqm_eur: 3200
            }
          ]
        };
      }

      // Add new comparison properties to the list
      if (webhookResponse.comparable_properties_nearby) {
        setAdditionalComparisons(prev => [
          ...prev,
          ...webhookResponse.comparable_properties_nearby!
        ]);
      }

      setAddComparisonDialogOpen(false);
      toast({
        title: 'Vergleich hinzugefügt',
        description: 'Das neue Vergleichsobjekt wurde erfolgreich erstellt.',
      });
    } catch (error) {
      console.error('Error adding comparison:', error);
      toast({
        title: 'Fehler',
        description: 'Fehler beim Erstellen des Vergleichsobjekts.',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingComparison(false);
    }
  };

  const allComparableProperties = [
    ...(data.comparable_properties_nearby || []),
    ...additionalComparisons
  ];

  if (isLoadingComparison) {
    return <LoadingScreen isVisible={true} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-success-600 bg-clip-text text-transparent mb-2">
              Ihre Immobilien-Erstbewertung
            </h1>
            <p className="text-muted-foreground text-lg">
              Basierend auf Ihren Angaben und aktuellen Marktdaten
            </p>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Zurück
            </Button>
            <Button variant="outline" onClick={onEdit} className="flex items-center gap-2">
              <Edit3 className="h-4 w-4" />
              Bearbeiten
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Als PDF
            </Button>
          </div>
        </motion.div>

        {/* Main Value Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-white to-primary/5 border-primary/20">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-muted-foreground font-normal">
                Geschätzter Marktwert
              </CardTitle>
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-success-600 bg-clip-text text-transparent">
                {formatCurrency(data.estimated_property_value_eur)}
              </div>
              {data.value_range_min_eur && data.value_range_max_eur && (
                <p className="text-muted-foreground text-lg">
                  Wertspanne: {formatCurrency(data.value_range_min_eur)} - {formatCurrency(data.value_range_max_eur)}
                </p>
              )}
              {data.valuation_confidence && (
                <div className="flex justify-center mt-4">
                  <Badge className={getConfidenceBadgeColor(data.valuation_confidence)}>
                    Vertrauen: {data.valuation_confidence}
                  </Badge>
                </div>
              )}
            </CardHeader>
          </Card>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Übersicht</TabsTrigger>
              <TabsTrigger value="details">Wertdetails</TabsTrigger>
              <TabsTrigger value="comparison">Vergleiche</TabsTrigger>
              <TabsTrigger value="next-steps">Nächste Schritte</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Key Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Kennzahlen
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Preis pro m²</span>
                      <span className="font-semibold">{formatCurrency(data.price_per_sqm_avg_eur)}/m²</span>
                    </div>
                    {data.local_market_trend_info && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 inline mr-1" />
                          {data.local_market_trend_info}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Value Drivers */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Werttreiber
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {data.positive_value_drivers && (
                      <div>
                        <h4 className="font-medium text-success-700 mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Positive Faktoren
                        </h4>
                        <ul className="space-y-1">
                          {data.positive_value_drivers.map((driver, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              • {driver}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {data.negative_value_drivers && data.negative_value_drivers.length > 0 && (
                      <div>
                        <h4 className="font-medium text-orange-700 mb-2 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Verbesserungspotential
                        </h4>
                        <ul className="space-y-1">
                          {data.negative_value_drivers.map((driver, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              • {driver}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details" className="space-y-6">
              {/* Preisentwicklungsdiagramm */}
              <PriceDevelopmentChart />
              
              <Card>
                <CardHeader>
                  <CardTitle>Detaillierte Wertanalyse</CardTitle>
                  <CardDescription>
                    Umfassende Aufschlüsselung der Bewertungsfaktoren
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Value Range Visualization */}
                    <div>
                      <h4 className="font-medium mb-4">Wertspanne</h4>
                      <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-success-500/20" />
                        <div 
                          className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-white shadow"
                          style={{ 
                            left: `${data.value_range_min_eur && data.value_range_max_eur && data.estimated_property_value_eur
                              ? ((data.estimated_property_value_eur - data.value_range_min_eur) / (data.value_range_max_eur - data.value_range_min_eur)) * 100
                              : 50}%` 
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>{formatCurrency(data.value_range_min_eur)}</span>
                        <span>{formatCurrency(data.value_range_max_eur)}</span>
                      </div>
                    </div>

                    {/* Additional Analysis */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h5 className="font-medium mb-2">Bewertungsgenauigkeit</h5>
                        <p className="text-sm text-muted-foreground">
                          Die Bewertung basiert auf aktuellen Marktdaten und Vergleichsobjekten in Ihrer Region.
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h5 className="font-medium mb-2">Marktentwicklung</h5>
                        <p className="text-sm text-muted-foreground">
                          {data.local_market_trend_info || 'Stabile Marktlage in der Region'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Comparison Tab */}
            <TabsContent value="comparison" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">Vergleichsobjekte</h3>
                  <p className="text-muted-foreground">Ähnliche Immobilien in Ihrer Umgebung</p>
                </div>
                <div className="flex gap-2">
                  <Dialog open={addComparisonDialogOpen} onOpenChange={setAddComparisonDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Vergleich hinzufügen
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Neues Vergleichsobjekt erstellen</DialogTitle>
                        <DialogDescription>
                          Geben Sie die Daten für ein weiteres Vergleichsobjekt ein
                        </DialogDescription>
                      </DialogHeader>
                      {originalFormData && (
                        <ComparisonForm
                          baseData={originalFormData}
                          onSubmit={handleAddComparison}
                          onCancel={() => setAddComparisonDialogOpen(false)}
                          isLoading={isLoadingComparison}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog open={comparisonDialogOpen} onOpenChange={setComparisonDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Parameter anpassen
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Vergleichsparameter anpassen</DialogTitle>
                        <DialogDescription>
                          Ändern Sie die Parameter für eine aktualisierte Bewertung
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="living-area">Wohnfläche: {comparisonParams.livingArea} m²</Label>
                          <Slider
                            id="living-area"
                            min={50}
                            max={300}
                            step={10}
                            value={[comparisonParams.livingArea]}
                            onValueChange={(value) => setComparisonParams(prev => ({ ...prev, livingArea: value[0] }))}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Anderer Ort (optional)</Label>
                          <Input
                            id="location"
                            placeholder="z.B. München"
                            value={comparisonParams.location}
                            onChange={(e) => setComparisonParams(prev => ({ ...prev, location: e.target.value }))}
                          />
                        </div>
                        <Button 
                          onClick={handleComparisonUpdate} 
                          className="w-full"
                          disabled={isLoadingComparison}
                        >
                          {isLoadingComparison ? 'Wird aktualisiert...' : 'Aktualisierte Bewertung erhalten'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <AnimatePresence>
                    {allComparableProperties.length > 0 ? (
                      <div className="grid gap-4">
                        {allComparableProperties.map((property, index) => (
                          <motion.div
                            key={property.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium">{property.property_type_display}</h4>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {property.address_snippet}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-lg">
                                  {formatCurrency(property.estimated_value_eur)}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {formatCurrency(property.price_per_sqm_eur)}/m²
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Square className="h-3 w-3" />
                                {property.living_area_sqm} m²
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {property.year_built_display}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>Keine Vergleichsobjekte verfügbar</p>
                        <p className="text-sm mt-2">Fügen Sie ein neues Vergleichsobjekt hinzu, um mehr Daten zu erhalten.</p>
                      </div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Next Steps Tab */}
            <TabsContent value="next-steps" className="space-y-6">
              <div className="grid gap-6">
                <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                  <CardHeader>
                    <CardTitle className="text-primary">Umfassender Bewertungsreport</CardTitle>
                    <CardDescription>
                      Erhalten Sie eine detaillierte Analyse mit Markteinschätzung und Verkaufstipps
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success-500" />
                        Detaillierte Objektanalyse
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success-500" />
                        Umfangreiche Vergleichsobjekte
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success-500" />
                        Marktprognose und Verkaufstipps
                      </li>
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-primary to-success-600 hover:from-primary/90 hover:to-success-600/90">
                      Detaillierten Report für 29€ kaufen
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Kostenlose Expertenberatung</CardTitle>
                    <CardDescription>
                      Lassen Sie sich von einem zertifizierten Gutachter oder Makler beraten
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Für eine präzise Vor-Ort-Bewertung oder professionelle Verkaufsbegleitung
                      stehen Ihnen lokale Experten zur Verfügung.
                    </p>
                    <Button variant="outline" className="w-full">
                      Kostenlose Expertenanfrage starten
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <p className="text-xs text-muted-foreground">
                      <strong>Disclaimer:</strong> Diese Bewertung ist eine automatisierte Ersteinschätzung (AVM) 
                      und ersetzt keine rechtsverbindliche Verkehrswertermittlung oder ein Gutachten durch einen 
                      zertifizierten Sachverständigen.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

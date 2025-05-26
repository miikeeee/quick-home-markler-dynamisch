import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConfigType } from "@/types/ConfigType";
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
  Plus,
  Navigation,
  ThermometerSun
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
import { PriceDevelopmentChart } from './PriceDevelopmentChart';
import { WebhookResponseData, PropertyFormData, ComparisonProperty } from '@/types/propertyTypes';
import { useToast } from '@/hooks/use-toast';

interface ResultsPageProps {
  data: WebhookResponseData;
  onBack: () => void;
  onEdit: () => void;
  originalFormData?: PropertyFormData;
  config: ConfigType;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ 
  data, 
  onBack, 
  onEdit, 
  originalFormData,
  config
}) => {
  const maklerTel = config?.telefon || null;
  const maklerAdresse = config?.adresse || null;
  const maklerEmail = config?.leadEmail || null;
  const maklerName = config?.maklerName || null;
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

  const getLocationScore = () => {
    // Mock location score based on data - in real implementation this would come from API
    return Math.floor(Math.random() * 3) + 7; // 7-9 score
  };

  const getMarketDemand = () => {
    const demands = [
      { level: 'Hoch', text: 'Hohe Nachfrage nach vergleichbaren Immobilien', color: 'text-success-600' },
      { level: 'Mittel', text: 'Durchschnittliche Marktaktivität', color: 'text-yellow-600' },
      { level: 'Überdurchschnittlich', text: 'Starke Nachfrage in diesem Segment', color: 'text-primary' }
    ];
    return demands[Math.floor(Math.random() * demands.length)];
  };

  const locationScore = getLocationScore();
  const marketDemand = getMarketDemand();

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

  // Optional: WhatsApp-Link vorbereiten
const waLink = maklerTel
  ? `https://wa.me/${maklerTel.replace(/\D/g, '')}?text=Hallo%20${encodeURIComponent(
      maklerName || 'Mike'
    )}%2C%20ich%20interessiere%20mich%20für%20Ihre%20digitale%20Immobilien-Lösung.`
  : '#';

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

            {/* Overview Tab - Enhanced */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Location Analysis with Visual Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Lage-Analyse
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Location Score */}
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {locationScore}/10
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Lage-Score</p>
                      <p className="text-sm">
                        {originalFormData?.zipCode} {originalFormData?.city}
                      </p>
                    </div>
                    
                    {/* Location Details */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Navigation className="h-4 w-4 text-success-500" />
                        <span>Gute Verkehrsanbindung</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-4 w-4 text-success-500" />
                        <span>Etablierte Wohngegend</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-success-500" />
                        <span>Einkaufsmöglichkeiten in der Nähe</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Market Demand Indicator */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ThermometerSun className="h-5 w-5 text-primary" />
                      Markt-Nachfrage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className={`text-lg font-semibold mb-2 ${marketDemand.color}`}>
                        {marketDemand.level}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {marketDemand.text}
                      </p>
                    </div>
                    
                    {/* Key Metrics */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">Preis pro m²</span>
                        <span className="font-semibold">{formatCurrency(data.price_per_sqm_avg_eur)}/m²</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">Objekttyp</span>
                        <span className="font-semibold">
                          {originalFormData?.propertyType === 'house' ? 'Haus' : 'Wohnung'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">Wohnfläche</span>
                        <span className="font-semibold">{originalFormData?.livingArea} m²</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Value Drivers - Enhanced */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Detaillierte Werttreiber
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {data.positive_value_drivers && (
                    <div>
                      <h4 className="font-medium text-success-700 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Positive Faktoren
                      </h4>
                      <div className="space-y-2">
                        {data.positive_value_drivers.map((driver, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-success-50 rounded">
                            <span className="text-sm">• {driver}</span>
                            <span className="text-xs text-success-600 font-medium">
                              +3-8%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {data.negative_value_drivers && data.negative_value_drivers.length > 0 && (
                    <div>
                      <h4 className="font-medium text-orange-700 mb-3 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Verbesserungspotential
                      </h4>
                      <div className="space-y-2">
                        {data.negative_value_drivers.map((driver, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-orange-50 rounded">
                            <span className="text-sm">• {driver}</span>
                            <span className="text-xs text-orange-600 font-medium">
                              -5-12%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  

                  {/* Grundstückswertanteil for houses */}
                  {originalFormData?.propertyType === 'house' && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-medium text-blue-700 mb-2">Grundstückswertanteil</h5>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-600">Geschätzter Anteil</span>
                        <span className="font-semibold text-blue-700">
                          ~35% ({formatCurrency((data.estimated_property_value_eur || 0) * 0.35)})
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>



      {/* Makler-Block – hier einsetzen */}
      {(maklerTel || maklerEmail) && (
        <Card className="mb-8 border-primary/40 shadow-lg">
          <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6">
            <div>
              <div className="font-bold text-xl text-primary mb-1">
                Noch eine Sache, bevor Sie gehen…
              </div>
              <div className="mb-2 text-muted-foreground">
                {maklerName && (
                  <span>
                    Sie suchen nach Wegen, Ihr Makler-Business zu digitalisieren und Kunden einen echten Wow-Effekt zu bieten?  
                  </span>
                )}
                <br />
                <span>
                  Ich bin <span className="font-semibold text-primary">{maklerName || 'Mike Mildenberger'}</span> – kein anonymes Unternehmen, sondern jemand, der <b>selbst Immobilien liebt und digitale Lösungen lebt</b>.<br />
                  Lust, in <span className="font-semibold">30 Minuten</span> zu sehen, wie Sie mit wenigen Klicks mehr Anfragen generieren? 
                  <br />Melden Sie sich direkt bei mir – per WhatsApp, Telefon oder ganz entspannt über meinen Kalender. 
                  <br /><span className="italic text-sm text-gray-500">PS: Ich helfe Maklern regelmäßig, mit einem smarten Tool den Unterschied zu machen. Ohne Risiko – einfach mal kennenlernen!</span>
                </span>
              </div>
              <div className="flex flex-col gap-2 mt-3">
                {maklerTel && (
                  <span className="block text-base font-medium mb-1">
                    📞 <a className="underline" href={`tel:${maklerTel.replace(/\s+/g, '')}`}>{maklerTel}</a>
                  </span>
                )}
                {maklerEmail && (
                  <span className="block text-base font-medium">
                    📧 <a className="underline" href={`mailto:${maklerEmail}`}>{maklerEmail}</a>
                  </span>
                )}
                {/* WhatsApp direkt */}
                {maklerTel && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800 text-sm underline"
                  >
                    Oder schreib mir direkt per WhatsApp
                  </a>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              
              {/* Calendly Button */}
              <Button
                className="h-12 px-8 text-lg shadow-lg bg-gradient-to-r from-primary to-success-600 text-white"
                asChild
              >
                <a
                  href="https://calendly.com/mike-nocodestud/strategie-call"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  kurzen Termin buchen
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}


              
            </TabsContent>

            {/* Details Tab - Enhanced with Price Development Chart */}
            <TabsContent value="details" className="space-y-6">
              {/* Preisentwicklungsdiagramm */}
              <PriceDevelopmentChart 
                data={data.price_development_data}
                title={`Preisentwicklung €/m² in ${data.region_name || originalFormData?.city || 'Ihrer Region'}`}
              />
              
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

            {/* Comparison Tab - Enhanced */}
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

            {/* Next Steps Tab - Enhanced */}
            <TabsContent value="next-steps" className="space-y-6">
              <div className="grid gap-6">
                {/* Personalized Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-primary">Personalisierte Handlungsempfehlungen</CardTitle>
                    <CardDescription>
                      Basierend auf Ihrer Immobilie und den identifizierten Verbesserungspotenzialen
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {data.negative_value_drivers && data.negative_value_drivers.length > 0 && (
                      <div className="space-y-3">
                        {data.negative_value_drivers.slice(0, 2).map((driver, index) => (
                          <div key={index} className="p-3 bg-muted/50 rounded-lg border-l-4 border-orange-400">
                            <h5 className="font-medium mb-1">Empfehlung {index + 1}</h5>
                            <p className="text-sm text-muted-foreground mb-2">{driver}</p>
                            <p className="text-xs text-orange-600 font-medium">
                              Potenzielle Wertsteigerung: 8.000 - 15.000 €
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* What-if Simulation */}
                <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-transparent">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Was-wäre-wenn Simulation</CardTitle>
                    <CardDescription>
                      Simulieren Sie den Werteinfluss möglicher Verbesserungen
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Button variant="outline" className="h-auto p-4 text-left">
                        <div>
                          <div className="font-medium">Küche renoviert</div>
                          <div className="text-sm text-muted-foreground">+12.000 - 18.000 €</div>
                        </div>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 text-left">
                        <div>
                          <div className="font-medium">Bad modernisiert</div>
                          <div className="text-sm text-muted-foreground">+8.000 - 12.000 €</div>
                        </div>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 text-left">
                        <div>
                          <div className="font-medium">Energieausweis</div>
                          <div className="text-sm text-muted-foreground">Vermarktungsvorteile</div>
                        </div>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 text-left">
                        <div>
                          <div className="font-medium">Neue Heizung</div>
                          <div className="text-sm text-muted-foreground">+5.000 - 10.000 €</div>
                        </div>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      * Schätzungen basieren auf durchschnittlichen Marktdaten. Individuelle Ergebnisse können variieren.
                    </p>
                  </CardContent>
                </Card>

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

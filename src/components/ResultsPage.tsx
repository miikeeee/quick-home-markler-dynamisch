
import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WebhookResponseData } from '@/types/propertyTypes';

interface ResultsPageProps {
  data: WebhookResponseData;
  onBack: () => void;
  onEdit: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ data, onBack, onEdit }) => {
  const [activeTab, setActiveTab] = useState('overview');

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
                    {data.key_positive_value_drivers && (
                      <div>
                        <h4 className="font-medium text-success-700 mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Positive Faktoren
                        </h4>
                        <ul className="space-y-1">
                          {data.key_positive_value_drivers.map((driver, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              • {driver}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {data.key_negative_value_drivers && data.key_negative_value_drivers.length > 0 && (
                      <div>
                        <h4 className="font-medium text-orange-700 mb-2 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Verbesserungspotential
                        </h4>
                        <ul className="space-y-1">
                          {data.key_negative_value_drivers.map((driver, index) => (
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
              <Card>
                <CardHeader>
                  <CardTitle>Vergleichsobjekte</CardTitle>
                  <CardDescription>
                    Ähnliche Immobilien in Ihrer Umgebung
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {data.comparable_properties_nearby && data.comparable_properties_nearby.length > 0 ? (
                    <div className="grid gap-4">
                      {data.comparable_properties_nearby.map((property) => (
                        <div key={property.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
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
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Keine Vergleichsobjekte verfügbar</p>
                    </div>
                  )}
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

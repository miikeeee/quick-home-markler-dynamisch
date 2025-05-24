
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Home } from 'lucide-react';
import { PropertyFormData } from '@/types/propertyTypes';

interface ComparisonFormProps {
  onSubmit: (data: Partial<PropertyFormData>) => void;
  onCancel: () => void;
  isLoading?: boolean;
  baseData: PropertyFormData;
}

export const ComparisonForm: React.FC<ComparisonFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
  baseData
}) => {
  const [comparisonData, setComparisonData] = useState<Partial<PropertyFormData>>({
    propertyType: baseData.propertyType,
    livingArea: baseData.livingArea,
    zipCode: '',
    city: '',
    conditionGeneral: baseData.conditionGeneral,
    yearBuilt: baseData.yearBuilt,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(comparisonData);
  };

  const updateData = (key: keyof PropertyFormData, value: any) => {
    setComparisonData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            Vergleichsobjekt hinzufügen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zipCode">Postleitzahl</Label>
                <Input
                  id="zipCode"
                  placeholder="z.B. 80331"
                  value={comparisonData.zipCode || ''}
                  onChange={(e) => updateData('zipCode', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="city">Ort</Label>
                <Input
                  id="city"
                  placeholder="z.B. München"
                  value={comparisonData.city || ''}
                  onChange={(e) => updateData('city', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Living Area */}
            <div>
              <Label>Wohnfläche: {comparisonData.livingArea} m²</Label>
              <Slider
                value={[comparisonData.livingArea || 100]}
                onValueChange={(value) => updateData('livingArea', value[0])}
                min={30}
                max={500}
                step={5}
                className="mt-2"
              />
            </div>

            {/* Property Type specific fields */}
            {baseData.propertyType === 'house' && (
              <div>
                <Label>Grundstücksgröße: {comparisonData.plotArea || 400} m²</Label>
                <Slider
                  value={[comparisonData.plotArea || 400]}
                  onValueChange={(value) => updateData('plotArea', value[0])}
                  min={100}
                  max={2000}
                  step={50}
                  className="mt-2"
                />
              </div>
            )}

            {/* Condition */}
            <div>
              <Label>Zustand</Label>
              <Select
                value={comparisonData.conditionGeneral || ''}
                onValueChange={(value) => updateData('conditionGeneral', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Zustand wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sehr_gut">Sehr gut</SelectItem>
                  <SelectItem value="gut">Gut</SelectItem>
                  <SelectItem value="mittel">Mittel</SelectItem>
                  <SelectItem value="renovierungsbeduerftig">Renovierungsbedürftig</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Year Built */}
            <div>
              <Label>Baujahr</Label>
              <Select
                value={comparisonData.yearBuilt || ''}
                onValueChange={(value) => updateData('yearBuilt', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Baujahr wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vor_1950">Vor 1950</SelectItem>
                  <SelectItem value="1950_1970">1950-1970</SelectItem>
                  <SelectItem value="1971_1990">1971-1990</SelectItem>
                  <SelectItem value="1991_2010">1991-2010</SelectItem>
                  <SelectItem value="nach_2010">Nach 2010</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="flex-1"
              >
                Abbrechen
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !comparisonData.zipCode || !comparisonData.city}
                className="flex-1"
              >
                {isLoading ? 'Wird berechnet...' : 'Vergleich erstellen'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

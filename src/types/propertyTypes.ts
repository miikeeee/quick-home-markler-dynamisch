
export interface PropertyFormData {
  // Basic Info
  propertyType: 'house' | 'apartment' | null;
  houseType?: string | null;
  livingArea: number | null;
  plotArea?: number | null; // Only for houses
  floorLevel?: string | null; // Only for apartments
  roomCount: number | null;
  yearBuilt: string | null;
  
  // House specific
  hasBasement?: boolean | null;
  basementType?: string | null;
  
  // Apartment specific
  hasElevator?: boolean | null;
  monthlyFee?: number | null; // Hausgeld
  
  // Location
  zipCode: string | null;
  city: string | null;
  
  // Condition & Features
  conditionGeneral: string | null;
  renovations: {
    [key: string]: {
      done: boolean;
      period?: string;
    };
  } | null;
  equipmentQuality: string | null;
  heatingType: string | null;
  windowType: string | null;
  flooringType: string[] | null;
  kitchenDetails: {
    included: boolean;
    condition?: string;
  } | null;
  outdoorFeatures: string[] | null;
  parkingType: string | null;
  energyCertificate: {
    available: boolean;
    class?: string;
  } | null;
  
  // Rental Info
  currentlyRented: boolean | null;
  annualRent?: number | null;
  
  // User Intent
  userIntent: string | null;
}

export interface ComparisonProperty {
  id: string;
  image_url?: string | null;
  address_snippet: string;
  property_type_display: string;
  living_area_sqm: number;
  plot_area_sqm?: number | null;
  year_built_display: string;
  estimated_value_eur: number;
  price_per_sqm_eur: number;
}

export interface WebhookResponseData {
  estimated_property_value_eur: number | null;
  value_range_min_eur: number | null;
  value_range_max_eur: number | null;
  price_per_sqm_avg_eur: number | null;
  valuation_confidence: 'hoch' | 'mittel' | 'gering' | null;
  positive_value_drivers: string[] | null;
  negative_value_drivers: string[] | null;
  local_market_trend_info: string | null;
  comparable_properties_nearby?: ComparisonProperty[] | null;
}

export interface FormStep {
  id: string;
  title: string;
  subtitle?: string;
  component: React.ComponentType<any>;
  isApplicable?: (formData: PropertyFormData) => boolean;
}

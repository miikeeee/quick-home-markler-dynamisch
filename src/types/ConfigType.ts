// src/types/ConfigType.ts

export type ConfigType = {
  logo: string;          // Pfad zum Logo
  farbe: string;         // Hauptfarbe der Anwendung (Hex-Code)
  anrede: string;        // Allgemeine Anrede, z.B. auf der Startseite
  maklerName?: string;    // Name des Maklerbüros (optional, falls nicht immer benötigt)
  leadEmail: string;     // E-Mail-Adresse für Leads/Anfragen

  // Kontaktinformationen des Maklerbüros (allgemein)
  telefon?: string;
  adresse?: string;      // Komplette Adresse des Maklers (für Impressum etc.)

  // Spezifische Felder für die Placeholder der Büro-Adresse in Formularen
  bueroStrasse?: string; // Straße des Büros für Placeholder
  bueroPLZ?: string;     // PLZ des Büros für Placeholder
  bueroStadt?: string;   // Stadt des Büros für Placeholder
};

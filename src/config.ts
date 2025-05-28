// src/config.ts (oder wo auch immer deine Datei liegt, z.B. public/configs/config.ts, wenn du sie so lädst)

import { ConfigType } from "@/types/ConfigType";

export const config: ConfigType = {
  // Standardwerte oder Werte aus deiner "Master"-Konfiguration
  logo: "/logo-default.png", // Standard-Logo
  farbe: "#0B70A9",          // Ein Beispiel für eine Standardfarbe (dunkleres Blau)
  anrede: "Herzlich Willkommen zur Immobilienbewertung",
  maklerName: "Ihr Immobilienexperte", // Standard-Maklername
  leadEmail: "kontakt@ihre-domain.de",
  telefon: "+49 123 4567890",
  adresse: "Hauptstraße 1, 12345 Beispielstadt", // Allgemeine Adresse

  // Spezifische Placeholder für die Büro-Adresse,
  // diese könnten später durch eine spezifische wind.json überschrieben/ergänzt werden
  // Hier als Beispiel die Werte, die du in deiner wind.json hattest:
  bueroStrasse: "Siebengebirgsstr. 59",
  bueroPLZ: "53639",
  bueroStadt: "Königswinter"
};

// HINWEIS:
// Wenn du später planst, diese Werte dynamisch pro Makler (z.B. aus einer wind.json)
// zu laden und diese Standard-config.ts nur als Fallback oder Basis dient,
// dann musst du eine Logik implementieren, die diese Objekte "merged" (zusammenführt).
// Zum Beispiel: const aktuelleConfig = { ...defaultConfigAusTS, ...geladeneConfigAusJSON };
// Und dann `aktuelleConfig` an deine Komponenten übergeben.
// Für den Moment gehen wir davon aus, dass DIESE config.ts die ist, die deine LocationStep Komponente erhält.

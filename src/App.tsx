import React, { useState, useEffect } from "react"; // React importieren
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ConfigType } from "./types/ConfigType";
import { getSubdomain } from "./utils/getSubdomain";
import { config as defaultConfig } from "./config"; // <-- IMPORTIERE DEINE DEFAULT-CONFIG

const queryClient = new QueryClient();

const App = () => {
  // Starte mit der defaultConfig, damit immer eine Basis vorhanden ist
  // und TypeScript mit dem Typ zufrieden ist, auch während des Ladens.
  const [effectiveConfig, setEffectiveConfig] = useState<ConfigType>(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    const loadAppConfig = async () => {
      const subdomain = getSubdomain();
      let finalConfig = defaultConfig; // Beginne immer mit der Default-Konfiguration

      if (subdomain) {
        try {
          console.log(`Versuche Konfiguration für Subdomain zu laden: /configs/${subdomain}.json`);
          const response = await fetch(`/configs/${subdomain}.json`);

          if (!response.ok) {
            console.warn(
              `Spezifische Konfiguration für Subdomain "${subdomain}" nicht gefunden oder Fehler (${response.status}). Fallback auf Default-Config.`
            );
            // finalConfig bleibt defaultConfig
          } else {
            const specificConfigData: Partial<ConfigType> = await response.json(); // Partial, da nicht alle Felder überschrieben werden müssen
            console.log("Geladene spezifische Config:", specificConfigData);

            // Mergen: Werte aus specificConfigData überschreiben/ergänzen die aus defaultConfig
            finalConfig = {
              ...defaultConfig,
              ...specificConfigData,
            };
            console.log("Gemergte Config:", finalConfig);
          }
        } catch (error) {
          console.error(
            `Fehler beim Laden der spezifischen Konfiguration für Subdomain "${subdomain}":`,
            error
          );
          // finalConfig bleibt defaultConfig
          setConfigError(`Fehler beim Laden der Konfiguration für ${subdomain}.`);
        }
      } else {
        console.log("Keine Subdomain erkannt, verwende Default-Konfiguration.");
        // finalConfig ist bereits defaultConfig
      }

      setEffectiveConfig(finalConfig);
      setLoading(false);
    };

    loadAppConfig();
  }, []); // Leeres Dependency Array, um nur einmal beim Mounten auszuführen

  // Debugging-Log, um zu sehen, was tatsächlich an Index übergeben wird
  console.log("EffectiveConfig in App.tsx (wird an Index übergeben):", JSON.stringify(effectiveConfig, null, 2));
  console.log("effectiveConfig.bueroPLZ (in App.tsx):", effectiveConfig?.bueroPLZ);


  if (loading) {
    return <div>Lädt Konfiguration...</div>;
  }

  // Hier könntest du entscheiden, ob du die "Konfiguration nicht gefunden" Seite
  // zeigst, wenn `configError` gesetzt ist, oder ob die App immer mit
  // der `defaultConfig` laufen soll, falls die spezifische nicht geladen werden kann.
  // Für den Moment: Wenn es einen Ladefehler für eine spezifische Config gab UND die
  // defaultConfig vielleicht nicht ausreicht, könntest du hier eine Fehlermeldung zeigen.
  // Oder du entscheidest, dass die defaultConfig immer gut genug als Fallback ist.

  // Wenn wir hier ankommen, haben wir *immer* eine `effectiveConfig`
  // (entweder die gemergte oder die Default-Config).
  // Die Prüfung `if (!config)` von vorher ist nicht mehr nötig, wenn `effectiveConfig`
  // mit `defaultConfig` initialisiert wird.

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Übergebe die effectiveConfig an deine Index-Seite */}
            <Route path="/" element={<Index config={effectiveConfig} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

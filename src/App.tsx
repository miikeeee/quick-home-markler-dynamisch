import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ConfigType } from "./types/ConfigType";
import { getSubdomain } from "./utils/getSubdomain";

const queryClient = new QueryClient();

const App = () => {
  const [config, setConfig] = useState<ConfigType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subdomain = getSubdomain();
    if (subdomain) {
      fetch(`/configs/${subdomain}.json`)
        .then((res) => {
          if (!res.ok) throw new Error("Config not found");
          return res.json();
        })
        .then((data) => setConfig(data))
        .catch(() => setConfig(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (!config) {
    return (
      <div>
        <h2>Konfiguration nicht gefunden</h2>
        <p>
          Für diese Subdomain wurde keine Konfiguration gefunden.<br />
          Bitte wenden Sie sich an den Support.
        </p>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index config={config} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

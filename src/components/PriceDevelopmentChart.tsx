
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface PriceDevelopmentData {
  year: string;
  avgPrice: number;
  localPrice: number;
}

interface PriceDevelopmentChartProps {
  data?: PriceDevelopmentData[];
  title?: string;
}

export const PriceDevelopmentChart: React.FC<PriceDevelopmentChartProps> = ({
  data = [],
  title = "Preisentwicklung"
}) => {
  // Fallback data if none provided
  const chartData = data.length > 0 ? data : [
    { year: '2019', avgPrice: 3200, localPrice: 3150 },
    { year: '2020', avgPrice: 3350, localPrice: 3300 },
    { year: '2021', avgPrice: 3650, localPrice: 3580 },
    { year: '2022', avgPrice: 3850, localPrice: 3780 },
    { year: '2023', avgPrice: 3950, localPrice: 3900 },
    { year: '2024', avgPrice: 4100, localPrice: 4050 }
  ];

  const chartConfig = {
    avgPrice: {
      label: "Durchschnittspreis",
      color: "hsl(var(--primary))"
    },
    localPrice: {
      label: "Lokaler Preis",
      color: "hsl(var(--success-600))"
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Entwicklung der Quadratmeterpreise in den letzten Jahren
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="year" 
                className="text-muted-foreground"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-muted-foreground"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(1)}k€`}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-medium mb-2">{label}</p>
                        {payload.map((entry, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-muted-foreground">
                              {entry.name === 'avgPrice' ? 'Durchschnitt' : 'Lokal'}:
                            </span>
                            <span className="font-medium">
                              {entry.value?.toLocaleString()}€/m²
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="avgPrice" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="localPrice" 
                stroke="hsl(var(--success-600))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--success-600))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--success-600))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Durchschnittspreis</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success-600" />
            <span className="text-sm text-muted-foreground">Lokaler Preis</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend
} from 'recharts';

interface PredictionResult {
  predicted_sales: number;
  confidence: number;
  similar_scenarios: {
    scenario: string;
    sales: number;
  }[];
  sales_forecast: {
    quarter: string;
    sales: number;
  }[];
}

interface ResultsSectionProps {
  result: PredictionResult | null;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

const ResultsSection: React.FC<ResultsSectionProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="animate-fade-in">
      <Card className="p-6 shadow-soft rounded-2xl bg-white overflow-hidden mb-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center justify-center bg-blue-50 text-primary text-xs font-medium px-2.5 py-1 rounded-full mb-3">
            Prediction
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
            {formatCurrency(result.predicted_sales)}
          </h2>
          <p className="text-muted-foreground mt-2">
            Estimated next quarter sales with {result.confidence}% confidence
          </p>
        </div>

        <Card className="bg-secondary/40 p-6 rounded-xl mb-8">
          <h3 className="text-lg font-medium mb-4">Similar Scenarios</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={result.similar_scenarios}
                margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="scenario" 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value/1000}k`}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={false}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', 
                    padding: '8px 12px' 
                  }}
                />
                <Bar 
                  dataKey="sales" 
                  fill="rgba(59, 130, 246, 0.8)" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-secondary/40 p-6 rounded-xl">
          <h3 className="text-lg font-medium mb-4">Sales Forecast</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={result.sales_forecast}
                margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="quarter" 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value/1000}k`}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={false}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', 
                    padding: '8px 12px' 
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3b82f6" 
                  fill="rgba(59, 130, 246, 0.2)" 
                  strokeWidth={2}
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default ResultsSection;


import { toast } from 'sonner';

interface SalesPredictionRequest {
  marketing_spend: number;
  social_media_presence: number;
  competitor_activity: number;
  seasonal_factor: string;
  previous_quarter_sales: number;
}

interface SalesPredictionResponse {
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

// The base URL of the FastAPI backend
const API_URL = 'http://localhost:8000';

export const predictSales = async (data: SalesPredictionRequest): Promise<SalesPredictionResponse> => {
  try {
    // In a real application, we would call the actual API
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to predict sales');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Error:', error);
    
    // Fallback mock response if API is not available
    toast.error('API connection failed. Using mock data instead.');
    
    // Generate mock data
    const predictedSales = data.previous_quarter_sales * 1.1 * 
      (1 + (data.marketing_spend / 10000) * 0.2) * 
      (1 + (data.social_media_presence / 10) * 0.15) *
      (1 - (data.competitor_activity / 10) * 0.1);
    
    const mockResponse: SalesPredictionResponse = {
      predicted_sales: Math.round(predictedSales * 100) / 100,
      confidence: 85 + Math.floor(Math.random() * 10),
      similar_scenarios: [
        { scenario: "Higher Marketing", sales: predictedSales * 1.1 },
        { scenario: "Lower Competition", sales: predictedSales * 1.05 },
        { scenario: "Higher Social Media", sales: predictedSales * 1.08 },
        { scenario: "Previous Quarter", sales: data.previous_quarter_sales },
        { scenario: "Different Season", sales: predictedSales * 0.9 }
      ],
      sales_forecast: []
    };
    
    // Generate sales forecast
    const currentDate = new Date();
    const currentQuarter = Math.floor((currentDate.getMonth() / 3)) + 1;
    const currentYear = currentDate.getFullYear();
    
    let forecastSales = data.previous_quarter_sales;
    for (let i = 0; i < 6; i++) {
      let quarter = currentQuarter + i;
      let year = currentYear;
      
      if (quarter > 4) {
        quarter = quarter % 4 || 4;
        year += Math.floor((currentQuarter + i - 1) / 4);
      }
      
      const growthFactor = 1 + (Math.random() * 0.1 - 0.02);
      forecastSales *= growthFactor;
      
      mockResponse.sales_forecast.push({
        quarter: `${year}-Q${quarter}`,
        sales: Math.round(forecastSales * 100) / 100
      });
    }
    
    return mockResponse;
  }
};

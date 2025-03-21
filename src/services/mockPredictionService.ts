
import { toast } from 'sonner';

interface PredictionRequest {
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  yearBuilt: number;
}

interface PredictionResponse {
  predictedPrice: number;
  confidence: number;
  comparableProperties: {
    type: string;
    price: number;
  }[];
  priceHistory: {
    year: number;
    price: number;
  }[];
}

// This simulates a machine learning model's prediction
export const predictHomePrice = async (data: PredictionRequest): Promise<PredictionResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  try {
    // Simple linear model simulation
    // In a real application, this would be a call to a backend API with a trained model
    
    // Base price
    let basePrice = 150000;
    
    // Square feet has significant impact
    basePrice += data.squareFeet * 100;
    
    // Bedrooms add value
    basePrice += data.bedrooms * 15000;
    
    // Bathrooms add value
    basePrice += data.bathrooms * 12500;
    
    // Location factors
    const locationMultiplier = {
      'urban': 1.2,
      'suburban': 1.0,
      'rural': 0.8
    }[data.location] || 1.0;
    
    // Age depreciation (newer homes are worth more)
    const currentYear = new Date().getFullYear();
    const age = currentYear - data.yearBuilt;
    const ageFactor = Math.max(0.7, 1 - (age * 0.005)); // Limits depreciation to 30%
    
    // Calculate final price
    const predictedPrice = basePrice * locationMultiplier * ageFactor;
    
    // Generate comparable properties
    const comparableProperties = [
      { type: 'Similar', price: predictedPrice * (0.9 + Math.random() * 0.2) },
      { type: 'Smaller', price: predictedPrice * (0.7 + Math.random() * 0.15) },
      { type: 'Larger', price: predictedPrice * (1.1 + Math.random() * 0.2) },
      { type: 'Newer', price: predictedPrice * (1.05 + Math.random() * 0.15) },
      { type: 'Older', price: predictedPrice * (0.85 + Math.random() * 0.1) }
    ];
    
    // Generate price history (fictitious for this mock)
    const startYear = Math.max(data.yearBuilt, currentYear - 10);
    const priceHistory = [];
    let historicalPrice = predictedPrice * 0.7; // Start at 70% of current value
    
    for (let year = startYear; year <= currentYear; year++) {
      priceHistory.push({
        year,
        price: historicalPrice
      });
      
      // Random yearly appreciation between 1-8%
      historicalPrice *= (1 + (0.01 + Math.random() * 0.07));
    }
    
    // Adjust the last entry to match our prediction
    if (priceHistory.length > 0) {
      priceHistory[priceHistory.length - 1].price = predictedPrice;
    }
    
    const result = {
      predictedPrice: Math.round(predictedPrice),
      confidence: Math.round(85 + Math.random() * 10), // Random confidence between 85-95%
      comparableProperties,
      priceHistory
    };
    
    return result;
  } catch (error) {
    toast.error('Error calculating home price');
    console.error('Prediction error:', error);
    throw error;
  }
};

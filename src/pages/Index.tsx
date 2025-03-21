
import React, { useState } from 'react';
import Header from '@/components/Header';
import PredictionForm from '@/components/PredictionForm';
import ResultsSection from '@/components/ResultsSection';
import Feature from '@/components/Feature';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { predictSales } from '@/services/predictionService';
import { toast } from 'sonner';

// Icons as JSX
const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
    <path d="M8 13V17M12 9V17M16 5V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const AIIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
    <path d="M12 2L15.1372 8.48619L22.3105 9.59549L17.1552 14.6139L18.2746 21.7695L12 18.377L5.72541 21.7695L6.84476 14.6139L1.68951 9.59549L8.86284 8.48619L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
    <path d="M21 21H3M21 7L15 7M21 11L12 11M21 15L18 15M17 3L17 15M13 3L13 11M9 3L9 21M5 3L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Main page component
const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<any>(null);

  const handlePrediction = async (formData: any) => {
    setIsLoading(true);
    
    try {
      const result = await predictSales(formData);
      setPredictionResult(result);
      toast.success('Sales prediction calculated successfully!');
    } catch (error) {
      toast.error('Failed to calculate sales prediction');
      console.error('Error during prediction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center justify-center bg-blue-50 text-primary text-sm font-medium px-3 py-1 rounded-full mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              AI-Powered Sales Prediction
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Predict Your Business Sales<br className="hidden md:block" /> With ML Precision
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              Our machine learning model analyzes your business metrics to give you accurate quarterly sales forecasts.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="md:col-span-1 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <PredictionForm onSubmit={handlePrediction} isLoading={isLoading} />
              </div>
              <div className="md:col-span-1 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <ResultsSection result={predictionResult} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Machine Learning Technology</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our proprietary algorithms bring cutting-edge AI to business forecasting
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Feature 
                icon={<ChartIcon />}
                title="Data-Driven Analysis"
                description="Our model analyzes historical sales data and business metrics to identify patterns and trends."
                className="animate-slide-up"
              />
              <Feature 
                icon={<AIIcon />}
                title="Predictive Intelligence"
                description="Advanced machine learning algorithms that continuously improve forecasting accuracy over time."
                className="animate-slide-up" 
                style={{ animationDelay: '0.1s' }}
              />
              <Feature 
                icon={<AnalyticsIcon />}
                title="Business Insights"
                description="Gain valuable insights into how different factors affect your sales performance."
                className="animate-slide-up" 
                style={{ animationDelay: '0.2s' }}
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for an accurate sales forecast?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get started with our AI-powered sales prediction tool today. No registration required.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-primary text-white px-8 py-3 rounded-xl shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-300"
            >
              Try It Now
            </button>
          </div>
        </section>
      </main>
      
      <Separator />
      <Footer />
    </div>
  );
};

export default Index;

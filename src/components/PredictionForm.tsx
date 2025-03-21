
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface FormData {
  marketing_spend: number;
  social_media_presence: number;
  competitor_activity: number;
  seasonal_factor: string;
  previous_quarter_sales: number;
}

interface PredictionFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<FormData>({
    marketing_spend: 5000,
    social_media_presence: 7,
    competitor_activity: 5,
    seasonal_factor: 'summer',
    previous_quarter_sales: 100000
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'marketing_spend' || name === 'previous_quarter_sales' ? 
        parseFloat(value) || 0 : 
        name === 'social_media_presence' || name === 'competitor_activity' ? 
          parseInt(value) || 0 : value
    }));
  };

  const handleSeasonChange = (value: string) => {
    setFormData(prev => ({ ...prev, seasonal_factor: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (formData.marketing_spend < 0) {
      toast.error("Marketing spend cannot be negative");
      return;
    }
    
    if (formData.social_media_presence < 1 || formData.social_media_presence > 10) {
      toast.error("Social media presence must be between 1-10");
      return;
    }
    
    if (formData.competitor_activity < 1 || formData.competitor_activity > 10) {
      toast.error("Competitor activity must be between 1-10");
      return;
    }
    
    if (formData.previous_quarter_sales <= 0) {
      toast.error("Previous quarter sales must be greater than 0");
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <Card className="p-6 bg-white shadow-soft rounded-2xl animate-slide-up">
      <h2 className="text-xl font-medium mb-6">Sales Prediction Inputs</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="marketing_spend">Marketing Budget ($)</Label>
          <Input
            id="marketing_spend"
            name="marketing_spend"
            type="number"
            placeholder="e.g., 5000"
            value={formData.marketing_spend}
            onChange={handleChange}
            className="h-11 rounded-xl"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="social_media_presence">Social Media Presence (1-10)</Label>
            <Input
              id="social_media_presence"
              name="social_media_presence"
              type="number"
              placeholder="e.g., 7"
              value={formData.social_media_presence}
              onChange={handleChange}
              min="1"
              max="10"
              className="h-11 rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="competitor_activity">Competitor Activity (1-10)</Label>
            <Input
              id="competitor_activity"
              name="competitor_activity"
              type="number"
              placeholder="e.g., 5"
              value={formData.competitor_activity}
              onChange={handleChange}
              min="1"
              max="10"
              className="h-11 rounded-xl"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="seasonal_factor">Season</Label>
          <Select
            value={formData.seasonal_factor}
            onValueChange={handleSeasonChange}
          >
            <SelectTrigger id="seasonal_factor" className="h-11 rounded-xl">
              <SelectValue placeholder="Select season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spring">Spring</SelectItem>
              <SelectItem value="summer">Summer</SelectItem>
              <SelectItem value="fall">Fall</SelectItem>
              <SelectItem value="winter">Winter</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="previous_quarter_sales">Previous Quarter Sales ($)</Label>
          <Input
            id="previous_quarter_sales"
            name="previous_quarter_sales"
            type="number"
            placeholder="e.g., 100000"
            value={formData.previous_quarter_sales}
            onChange={handleChange}
            className="h-11 rounded-xl"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full rounded-xl py-6 text-base mt-6 bg-primary hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? 'Calculating...' : 'Predict Sales'}
        </Button>
      </form>
    </Card>
  );
};

export default PredictionForm;

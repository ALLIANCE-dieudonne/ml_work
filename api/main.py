
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import random
from typing import List, Dict, Any, Optional
import numpy as np
from datetime import datetime, timedelta

app = FastAPI(title="Prediction API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SalesRequest(BaseModel):
    marketing_spend: float
    social_media_presence: int
    competitor_activity: int
    seasonal_factor: str
    previous_quarter_sales: float

class PredictionResponse(BaseModel):
    predicted_sales: float
    confidence: float
    similar_scenarios: List[Dict[str, Any]]
    sales_forecast: List[Dict[str, Any]]

# Simple mock ML prediction function
def predict_sales(data: SalesRequest) -> float:
    # Base prediction
    base_prediction = data.previous_quarter_sales * 1.1
    
    # Adjust based on marketing spend (assume higher spend = higher sales)
    marketing_factor = 1 + (data.marketing_spend / 10000) * 0.2
    
    # Social media impact
    social_factor = 1 + (data.social_media_presence / 10) * 0.15
    
    # Competitor impact (higher competition might reduce sales)
    competitor_factor = 1 - (data.competitor_activity / 10) * 0.1
    
    # Seasonal factors
    seasonal_multiplier = {
        "spring": 1.05,
        "summer": 1.15,
        "fall": 1.1,
        "winter": 0.9
    }.get(data.seasonal_factor.lower(), 1.0)
    
    # Calculate final prediction
    prediction = base_prediction * marketing_factor * social_factor * competitor_factor * seasonal_multiplier
    
    # Add some randomness to make it interesting
    prediction *= random.uniform(0.95, 1.05)
    
    return round(prediction, 2)

@app.post("/predict", response_model=PredictionResponse)
async def predict(data: SalesRequest):
    try:
        # Get the predicted sales
        predicted_sales = predict_sales(data)
        
        # Generate confidence (random for demo purposes)
        confidence = random.randint(80, 95)
        
        # Generate similar scenarios
        similar_scenarios = [
            {"scenario": "Higher Marketing", "sales": predict_sales(SalesRequest(
                marketing_spend=data.marketing_spend * 1.2,
                social_media_presence=data.social_media_presence,
                competitor_activity=data.competitor_activity,
                seasonal_factor=data.seasonal_factor,
                previous_quarter_sales=data.previous_quarter_sales
            ))},
            {"scenario": "Lower Competition", "sales": predict_sales(SalesRequest(
                marketing_spend=data.marketing_spend,
                social_media_presence=data.social_media_presence,
                competitor_activity=max(1, data.competitor_activity - 2),
                seasonal_factor=data.seasonal_factor,
                previous_quarter_sales=data.previous_quarter_sales
            ))},
            {"scenario": "Higher Social Media", "sales": predict_sales(SalesRequest(
                marketing_spend=data.marketing_spend,
                social_media_presence=min(10, data.social_media_presence + 2),
                competitor_activity=data.competitor_activity,
                seasonal_factor=data.seasonal_factor,
                previous_quarter_sales=data.previous_quarter_sales
            ))},
            {"scenario": "Previous Quarter", "sales": data.previous_quarter_sales},
            {"scenario": "Different Season", "sales": predict_sales(SalesRequest(
                marketing_spend=data.marketing_spend,
                social_media_presence=data.social_media_presence,
                competitor_activity=data.competitor_activity,
                seasonal_factor="summer" if data.seasonal_factor.lower() != "summer" else "winter",
                previous_quarter_sales=data.previous_quarter_sales
            ))}
        ]
        
        # Generate future sales forecast
        now = datetime.now()
        sales_forecast = []
        current_sales = data.previous_quarter_sales
        
        for i in range(6):  # Next 6 quarters
            quarter_date = (now + timedelta(days=90 * i)).strftime("%Y-Q%q").replace("%q", str((now.month-1)//3 + 1 + i) % 4 + 1)
            # Apply some growth and randomness
            growth_factor = 1 + random.uniform(-0.05, 0.15)
            current_sales *= growth_factor
            sales_forecast.append({
                "quarter": quarter_date,
                "sales": round(current_sales, 2)
            })
            
        return PredictionResponse(
            predicted_sales=predicted_sales,
            confidence=confidence,
            similar_scenarios=similar_scenarios,
            sales_forecast=sales_forecast
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Sales Prediction API is running"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

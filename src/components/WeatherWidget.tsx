"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  rainfall: number;
  uvIndex: number;
  soilMoisture: number;
}

interface CropSuggestion {
  name: string;
  suitability: "Excellent" | "Good" | "Fair";
  reason: string;
  icon: string;
}

export function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    location: "Delhi, India",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 8,
    rainfall: 12.5,
    uvIndex: 7,
    soilMoisture: 45
  });

  const [selectedView, setSelectedView] = useState<"weather" | "crops">("weather");

  const cropSuggestions: CropSuggestion[] = [
    {
      name: "Rice",
      suitability: "Excellent", 
      reason: "High humidity ideal for rice cultivation",
      icon: "🌾"
    },
    {
      name: "Corn",
      suitability: "Good",
      reason: "Moderate temperature and soil moisture",
      icon: "🌽"
    },
    {
      name: "Cotton",
      suitability: "Fair",
      reason: "Requires higher temperature for optimal growth",
      icon: "🌱"
    },
    {
      name: "Sugarcane",
      suitability: "Excellent",
      reason: "Perfect humidity and rainfall levels",
      icon: "🎋"
    },
    {
      name: "Wheat",
      suitability: "Fair",
      reason: "Temperature slightly high for wheat season",
      icon: "🌾"
    },
    {
      name: "Vegetables",
      suitability: "Good",
      reason: "Good conditions for leafy vegetables",
      icon: "🥬"
    }
  ];

  // Simulate weather data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherData(prev => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 10)),
        windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 3)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case "Excellent": return "bg-green-100 text-green-800";
      case "Good": return "bg-yellow-100 text-yellow-800";
      case "Fair": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm border-blue-200 shadow-lg">
      <div className="space-y-4">
        {/* Header with Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Weather & Crop Insights</h2>
            <p className="text-sm text-gray-600">{weatherData.location}</p>
          </div>
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <Button
              variant={selectedView === "weather" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedView("weather")}
              className={selectedView === "weather" ? "bg-blue-600 text-white" : ""}
            >
              Weather
            </Button>
            <Button
              variant={selectedView === "crops" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedView("crops")}
              className={selectedView === "crops" ? "bg-green-600 text-white" : ""}
            >
              Crops
            </Button>
          </div>
        </div>

        {/* Weather View */}
        {selectedView === "weather" && (
          <div className="space-y-4">
            {/* Current Weather */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">☁️</div>
                <div>
                  <div className="text-3xl font-bold text-blue-900">
                    {Math.round(weatherData.temperature)}°C
                  </div>
                  <div className="text-blue-700">{weatherData.condition}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Last updated</div>
                <div className="text-sm font-medium">{new Date().toLocaleTimeString()}</div>
              </div>
            </div>

            {/* Weather Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">💧</div>
                <div className="text-sm text-gray-600">Humidity</div>
                <div className="font-semibold">{Math.round(weatherData.humidity)}%</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">💨</div>
                <div className="text-sm text-gray-600">Wind Speed</div>
                <div className="font-semibold">{Math.round(weatherData.windSpeed)} km/h</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">🌧️</div>
                <div className="text-sm text-gray-600">Rainfall</div>
                <div className="font-semibold">{weatherData.rainfall} mm</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">🌱</div>
                <div className="text-sm text-gray-600">Soil Moisture</div>
                <div className="font-semibold">{weatherData.soilMoisture}%</div>
              </div>
            </div>
          </div>
        )}

        {/* Crop Suggestions View */}
        {selectedView === "crops" && (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-3">
              Based on current weather conditions:
            </div>
            <div className="grid gap-3">
              {cropSuggestions.map((crop, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{crop.icon}</span>
                    <div>
                      <div className="font-medium text-gray-800">{crop.name}</div>
                      <div className="text-sm text-gray-600">{crop.reason}</div>
                    </div>
                  </div>
                  <Badge className={getSuitabilityColor(crop.suitability) as string}>
                    {crop.suitability}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
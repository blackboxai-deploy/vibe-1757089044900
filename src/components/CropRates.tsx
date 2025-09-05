"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CropRate {
  id: string;
  name: string;
  category: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  market: string;
  lastUpdated: string;
  trend: "up" | "down" | "stable";
  changePercent: number;
}

export function CropRates() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMarket, setSelectedMarket] = useState<string>("all");
  
  const [cropRates] = useState<CropRate[]>([
    {
      id: "1",
      name: "Wheat",
      category: "grains",
      currentPrice: 2150,
      previousPrice: 2100,
      unit: "per quintal",
      market: "Delhi Mandi",
      lastUpdated: "2 hours ago",
      trend: "up",
      changePercent: 2.4
    },
    {
      id: "2", 
      name: "Rice (Basmati)",
      category: "grains",
      currentPrice: 4500,
      previousPrice: 4600,
      unit: "per quintal",
      market: "Karnal Mandi",
      lastUpdated: "1 hour ago",
      trend: "down",
      changePercent: -2.2
    },
    {
      id: "3",
      name: "Cotton",
      category: "cash_crops",
      currentPrice: 6800,
      previousPrice: 6750,
      unit: "per quintal",
      market: "Gujarat Mandi",
      lastUpdated: "3 hours ago",
      trend: "up",
      changePercent: 0.7
    },
    {
      id: "4",
      name: "Tomato",
      category: "vegetables",
      currentPrice: 25,
      previousPrice: 30,
      unit: "per kg",
      market: "Local Market",
      lastUpdated: "30 min ago",
      trend: "down",
      changePercent: -16.7
    },
    {
      id: "5",
      name: "Onion",
      category: "vegetables",
      currentPrice: 18,
      previousPrice: 16,
      unit: "per kg",
      market: "Nashik Mandi",
      lastUpdated: "45 min ago",
      trend: "up",
      changePercent: 12.5
    },
    {
      id: "6",
      name: "Sugarcane",
      category: "cash_crops",
      currentPrice: 350,
      previousPrice: 340,
      unit: "per quintal",
      market: "UP Mandi",
      lastUpdated: "1 hour ago", 
      trend: "up",
      changePercent: 2.9
    },
    {
      id: "7",
      name: "Mustard",
      category: "oilseeds",
      currentPrice: 5200,
      previousPrice: 5200,
      unit: "per quintal",
      market: "Rajasthan Mandi",
      lastUpdated: "2 hours ago",
      trend: "stable",
      changePercent: 0
    },
    {
      id: "8",
      name: "Potato",
      category: "vegetables",
      currentPrice: 12,
      previousPrice: 14,
      unit: "per kg",
      market: "Punjab Mandi",
      lastUpdated: "1 hour ago",
      trend: "down",
      changePercent: -14.3
    }
  ]);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "grains", label: "Grains" },
    { value: "vegetables", label: "Vegetables" },
    { value: "cash_crops", label: "Cash Crops" },
    { value: "oilseeds", label: "Oilseeds" }
  ];

  const markets = [
    { value: "all", label: "All Markets" },
    { value: "Delhi Mandi", label: "Delhi Mandi" },
    { value: "Karnal Mandi", label: "Karnal Mandi" },
    { value: "Gujarat Mandi", label: "Gujarat Mandi" },
    { value: "Local Market", label: "Local Market" },
    { value: "Nashik Mandi", label: "Nashik Mandi" },
    { value: "UP Mandi", label: "UP Mandi" },
    { value: "Rajasthan Mandi", label: "Rajasthan Mandi" },
    { value: "Punjab Mandi", label: "Punjab Mandi" }
  ];

  const filteredRates = cropRates.filter(crop => {
    return (selectedCategory === "all" || crop.category === selectedCategory) &&
           (selectedMarket === "all" || crop.market === selectedMarket);
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return "📈";
      case "down": return "📉"; 
      case "stable": return "➡️";
      default: return "➡️";
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-green-600";
      case "down": return "text-red-600";
      case "stable": return "text-gray-600";
      default: return "text-gray-600";
    }
  };

  const getBadgeColor = (trend: string) => {
    switch (trend) {
      case "up": return "bg-green-100 text-green-800";
      case "down": return "bg-red-100 text-red-800";
      case "stable": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm border-orange-200 shadow-lg">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Market Rates</h3>
            <p className="text-sm text-gray-600">Live crop pricing across markets</p>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span>Live Updates</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select value={selectedMarket} onValueChange={setSelectedMarket}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select market" />
              </SelectTrigger>
              <SelectContent>
                {markets.map(market => (
                  <SelectItem key={market.value} value={market.value}>
                    {market.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Crop Rates List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredRates.map((crop) => (
            <div 
              key={crop.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getTrendIcon(crop.trend)}</div>
                <div>
                  <div className="font-medium text-gray-800">{crop.name}</div>
                  <div className="text-sm text-gray-600">{crop.market}</div>
                  <div className="text-xs text-gray-500">{crop.lastUpdated}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <div className="text-lg font-bold text-gray-800">
                    ₹{crop.currentPrice.toLocaleString()}
                  </div>
                  <Badge className={getBadgeColor(crop.trend)}>
                    {crop.changePercent > 0 ? '+' : ''}{crop.changePercent.toFixed(1)}%
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">{crop.unit}</div>
                <div className={`text-xs ${getTrendColor(crop.trend)}`}>
                  from ₹{crop.previousPrice.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {filteredRates.filter(crop => crop.trend === 'up').length}
            </div>
            <div className="text-xs text-gray-600">Price Up</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {filteredRates.filter(crop => crop.trend === 'down').length}
            </div>
            <div className="text-xs text-gray-600">Price Down</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {filteredRates.filter(crop => crop.trend === 'stable').length}
            </div>
            <div className="text-xs text-gray-600">Stable</div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="text-center pt-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              // Future: Refresh market data
              console.log("Refreshing market rates...");
            }}
          >
            🔄 Refresh Rates
          </Button>
        </div>
      </div>
    </Card>
  );
}
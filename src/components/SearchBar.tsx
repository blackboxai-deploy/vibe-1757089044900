"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsTyping(true);
    
    // Simulate typing animation
    setTimeout(() => setIsTyping(false), 1000);
  };

  const handleSearch = () => {
    if (query.trim()) {
      // Placeholder for future search functionality
      console.log("Searching for:", query);
      // Future: Integrate with AI/search API
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const suggestedQueries = [
    "Best crops for monsoon season",
    "Wheat market prices today", 
    "Government subsidy for irrigation",
    "Pest control for tomatoes",
    "Organic farming techniques"
  ];

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm border-green-200 shadow-lg">
      <div className="space-y-4">
        {/* Main Search Bar */}
        <div className="relative">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Ask me anything about farming, weather, crops, schemes..."
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="pr-12 h-12 text-base border-green-300 focus:border-green-500 focus:ring-green-500"
              />
              {isTyping && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              )}
            </div>
            <Button 
              onClick={handleSearch}
              className="h-12 px-6 bg-green-600 hover:bg-green-700 text-white"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </Button>
          </div>
        </div>

        {/* Suggested Queries */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 font-medium">Suggested queries:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setQuery(suggestion)}
                className="px-3 py-1.5 text-xs bg-green-100 hover:bg-green-200 text-green-700 rounded-full transition-colors duration-200 border border-green-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Preview (for demo) */}
        {query && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border-l-4 border-green-500">
            <p className="text-sm text-gray-600 italic">
              🔍 Search functionality will be implemented with AI integration. 
              Current query: "{query}"
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
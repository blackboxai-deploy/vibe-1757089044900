"use client";

import { SearchBar } from "@/components/SearchBar";
import { WeatherWidget } from "@/components/WeatherWidget";
import { VoiceInput } from "@/components/VoiceInput";
import { CropRates } from "@/components/CropRates";
import { GovernmentSchemes } from "@/components/GovernmentSchemes";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                AgroAssist
              </h1>
              <p className="text-gray-600 text-sm mt-1">Your Smart Farming Companion</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Data</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weather Widget - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <WeatherWidget />
          </div>
          
          {/* Voice Input Widget */}
          <div className="lg:col-span-1">
            <VoiceInput />
          </div>
        </div>

        {/* Second Row - Crop Rates and Government Schemes */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Crop Rates */}
          <div className="xl:col-span-1">
            <CropRates />
          </div>
          
          {/* Government Schemes */}
          <div className="xl:col-span-1">
            <GovernmentSchemes />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-green-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>© 2024 AgroAssist - Empowering Farmers with Smart Technology</p>
            <p className="mt-1">Prototype for Hackathon Demo</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
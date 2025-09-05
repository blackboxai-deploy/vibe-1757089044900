"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface GovernmentScheme {
  id: string;
  title: string;
  category: string;
  description: string;
  benefits: string[];
  eligibility: string[];
  documents: string[];
  deadline: string;
  status: "Active" | "Coming Soon" | "Limited Time";
  applicationProcess: string;
  contactInfo: string;
  beneficiaryCount?: string;
}

export function GovernmentSchemes() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedScheme, setExpandedScheme] = useState<string>("");

  const schemes: GovernmentScheme[] = [
    {
      id: "1",
      title: "PM-KISAN Samman Nidhi",
      category: "Direct Benefit",
      description: "Direct income support of ₹6,000 per year to small and marginal farmer families.",
      benefits: [
        "₹6,000 annual direct transfer",
        "Paid in 3 equal installments of ₹2,000",
        "Direct bank transfer"
      ],
      eligibility: [
        "Small and marginal farmers",
        "Land ownership less than 2 hectares",
        "Valid Aadhaar card required"
      ],
      documents: [
        "Aadhaar Card",
        "Bank Account Details", 
        "Land Ownership Documents"
      ],
      deadline: "Open enrollment",
      status: "Active",
      applicationProcess: "Online application through PM-KISAN portal or CSC centers",
      contactInfo: "Helpline: 155261",
      beneficiaryCount: "11+ Crore"
    },
    {
      id: "2",
      title: "Pradhan Mantri Fasal Bima Yojana",
      category: "Insurance",
      description: "Crop insurance scheme providing financial support to farmers in case of crop loss.",
      benefits: [
        "Up to ₹2 lakh insurance coverage",
        "Premium subsidy by government",
        "Coverage for natural calamities"
      ],
      eligibility: [
        "All farmers (sharecroppers and tenant farmers included)",
        "Notification crops in notified areas",
        "Premium payment within due date"
      ],
      documents: [
        "Aadhaar Card",
        "Bank Account Details",
        "Sowing Certificate",
        "Land Records"
      ],
      deadline: "Before sowing season",
      status: "Active",
      applicationProcess: "Through banks, insurance companies or online portal",
      contactInfo: "Toll-free: 14447",
      beneficiaryCount: "5.5 Crore"
    },
    {
      id: "3",
      title: "Kisan Credit Card (KCC)",
      category: "Credit",
      description: "Credit facility for farmers to meet their agricultural and allied expenses.",
      benefits: [
        "Flexible credit limit up to ₹3 lakh",
        "4% interest rate with subsidy",
        "No processing fee",
        "Insurance coverage"
      ],
      eligibility: [
        "Farmers with land ownership",
        "Tenant farmers with lease agreement",
        "Self Help Group members"
      ],
      documents: [
        "Application Form",
        "Identity Proof",
        "Land Documents",
        "Income Proof"
      ],
      deadline: "Year-round application",
      status: "Active",
      applicationProcess: "Apply at nearest bank branch",
      contactInfo: "Contact local bank branch",
      beneficiaryCount: "7 Crore+"
    },
    {
      id: "4",
      title: "National Agriculture Market (e-NAM)",
      category: "Marketing",
      description: "Online trading platform for agricultural commodities with transparent price discovery.",
      benefits: [
        "Better price realization",
        "Transparent auctions",
        "Reduced transaction costs",
        "Quality assurance"
      ],
      eligibility: [
        "Registered farmers",
        "Licensed traders",
        "Commission agents"
      ],
      documents: [
        "Registration Certificate",
        "Identity Proof",
        "Bank Account Details"
      ],
      deadline: "Ongoing registration",
      status: "Active",
      applicationProcess: "Online registration on e-NAM portal",
      contactInfo: "Helpline: 1800-270-0224",
      beneficiaryCount: "1.7 Crore"
    },
    {
      id: "5",
      title: "PM Micro Irrigation Scheme",
      category: "Infrastructure",
      description: "Financial assistance for micro irrigation systems to enhance water use efficiency.",
      benefits: [
        "55% subsidy for small farmers",
        "45% subsidy for other farmers",
        "Water saving technology",
        "Increased productivity"
      ],
      eligibility: [
        "All category farmers",
        "Minimum 0.5 hectare land",
        "Water source availability"
      ],
      documents: [
        "Application Form",
        "Land Records",
        "Water Source Certificate",
        "Technical Report"
      ],
      deadline: "March 31, 2024",
      status: "Limited Time",
      applicationProcess: "Through State Agriculture Department",
      contactInfo: "State Agriculture Office",
      beneficiaryCount: "42 Lakh"
    },
    {
      id: "6",
      title: "Soil Health Card Scheme",
      category: "Advisory",
      description: "Soil testing and health cards to promote judicious use of fertilizers.",
      benefits: [
        "Free soil testing",
        "Customized fertilizer recommendations",
        "Soil health status",
        "Crop-wise advisory"
      ],
      eligibility: [
        "All farmers",
        "No land size restriction"
      ],
      documents: [
        "Land Records",
        "Identity Proof"
      ],
      deadline: "Ongoing",
      status: "Active",
      applicationProcess: "Contact local agriculture extension officer",
      contactInfo: "District Agriculture Office",
      beneficiaryCount: "22 Crore"
    }
  ];

  const categories = [
    { value: "all", label: "All Schemes" },
    { value: "Direct Benefit", label: "Direct Benefits" },
    { value: "Insurance", label: "Insurance" },
    { value: "Credit", label: "Credit & Loans" },
    { value: "Marketing", label: "Marketing" },
    { value: "Infrastructure", label: "Infrastructure" },
    { value: "Advisory", label: "Advisory Services" }
  ];

  const filteredSchemes = schemes.filter(scheme => 
    selectedCategory === "all" || scheme.category === selectedCategory
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Coming Soon": return "bg-blue-100 text-blue-800"; 
      case "Limited Time": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Direct Benefit": return "💰";
      case "Insurance": return "🛡️";
      case "Credit": return "🏦";
      case "Marketing": return "📊";
      case "Infrastructure": return "🚜";
      case "Advisory": return "📋";
      default: return "📄";
    }
  };

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm border-indigo-200 shadow-lg">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Government Schemes</h3>
            <p className="text-sm text-gray-600">Agricultural support programs</p>
          </div>
          <Badge className="bg-indigo-100 text-indigo-800">
            {filteredSchemes.length} Available
          </Badge>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
              className={
                selectedCategory === category.value 
                  ? "bg-indigo-600 hover:bg-indigo-700" 
                  : "hover:bg-indigo-50"
              }
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Schemes List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredSchemes.map((scheme) => (
            <Collapsible 
              key={scheme.id}
              open={expandedScheme === scheme.id}
              onOpenChange={(isOpen) => setExpandedScheme(isOpen ? scheme.id : "")}
            >
              <CollapsibleTrigger className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getCategoryIcon(scheme.category)}</span>
                      <div className="text-left">
                        <div className="font-medium text-gray-800">{scheme.title}</div>
                        <div className="text-sm text-gray-600">{scheme.category}</div>
                        {scheme.beneficiaryCount && (
                          <div className="text-xs text-gray-500">
                            {scheme.beneficiaryCount} beneficiaries
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(scheme.status)}>
                        {scheme.status}
                      </Badge>
                      <div className="text-gray-400">
                        {expandedScheme === scheme.id ? '−' : '+'}
                      </div>
                    </div>
                  </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="mt-2">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
                  {/* Description */}
                  <p className="text-gray-700">{scheme.description}</p>
                  
                  {/* Benefits */}
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Key Benefits:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {scheme.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-green-600 mt-0.5">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Eligibility & Documents Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Eligibility:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {scheme.eligibility.map((criteria, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-blue-600 mt-0.5">•</span>
                            <span>{criteria}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Required Documents:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {scheme.documents.map((doc, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-orange-600 mt-0.5">📄</span>
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Application Details */}
                  <div className="border-t pt-3 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
                      <span><strong>Deadline:</strong> {scheme.deadline}</span>
                      <span><strong>Contact:</strong> {scheme.contactInfo}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>Application Process:</strong> {scheme.applicationProcess}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                      Apply Now
                    </Button>
                    <Button size="sm" variant="outline">
                      More Details
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </Card>
  );
}
'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { toast } from 'react-hot-toast';

export default function ProcurementWinWins() {
  const [clientName, setClientName] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [contractNature, setContractNature] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [promptText, setPromptText] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch prompt when inputs change (with debounce)
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Clear prompt if required fields are missing
    if (!clientName.trim() || !supplierName.trim() || !contractNature.trim()) {
      setPromptText("");
      return;
    }

    setIsLoading(true);
    
    // Debounce the API call to avoid too many requests
    timerRef.current = setTimeout(async () => {
      try {
        const response = await fetch('/api/fetch-prompt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            promptName: 'procurement-win-wins', 
            buyer: clientName,
            seller: supplierName,
            contract: contractNature
          }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch prompt');
        }
        
        setPromptText(data.prompt);
      } catch (error) {
        console.error('Error fetching prompt:', error);
        toast.error('Failed to fetch prompt');
        setPromptText("");
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [clientName, supplierName, contractNature]);

  const handleCopy = () => {
    if (!promptText) {
      toast.error('No prompt to copy');
      return;
    }
    
    try {
      navigator.clipboard.writeText(promptText);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error('Copy failed:', error);
      toast.error('Failed to copy. Please try again.');
    }
  };

  return (
    <main>
      <div className="mb-8">
        <Link 
          href="/"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white inline-flex items-center"
        >
          <span className="mr-2">←</span>
          Back to Menu
        </Link>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm whitespace-nowrap">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Deep Research
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-8">Procurement Win-Wins Generator</h1>
      
      <div className="max-w-2xl">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200">
            Generate a comprehensive analysis of non-price negotiation points that could create mutual value for both buyer and supplier in contract negotiations.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label 
              htmlFor="clientName" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Client Name (Buyer):
            </label>
            <input
              type="text"
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter client name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label 
              htmlFor="supplierName" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Supplier Name (Seller):
            </label>
            <input
              type="text"
              id="supplierName"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              placeholder="Enter supplier name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label 
              htmlFor="contractNature" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Nature of Contract:
            </label>
            <input
              type="text"
              id="contractNature"
              value={contractNature}
              onChange={(e) => setContractNature(e.target.value)}
              placeholder="Enter contract nature (e.g., 'advanced processor fabrication')"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleCopy}
            disabled={isLoading || !promptText}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading Prompt...
              </span>
            ) : "Copy Prompt"}
          </button>

          {showNotification && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
              Prompt copied to clipboard!
            </div>
          )}
        </div>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Paste the generated prompt into the Deep Research LLM to analyze potential win-win negotiation points.
        </p>
      </div>
    </main>
  );
} 
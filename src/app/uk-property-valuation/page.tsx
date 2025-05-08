'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { toast } from 'react-hot-toast';

export default function UKPropertyValuation() {
  const [address, setAddress] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [promptText, setPromptText] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch prompt when address changes (with debounce)
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Clear prompt if address is missing
    if (!address.trim()) {
      setPromptText("");
      return;
    }

    setIsLoading(true);
    
    // Debounce the API call to avoid too many requests
    timerRef.current = setTimeout(async () => {
      try {
        // Get today's date formatted as YYYY-MM-DD
        const today = new Date().toISOString().split('T')[0];
        
        const response = await fetch('/api/fetch-prompt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            promptName: 'uk-property-valuation', 
            address: address.trim(),
            date: today
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
  }, [address]);

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

      <h1 className="text-4xl font-bold mb-8">UK Residential Property Valuation</h1>
      
      <div className="max-w-2xl">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Enter a UK street address and click Copy Prompt to generate a professional property valuation prompt for first‑charge mortgage underwriting.
        </p>

        <div className="space-y-4">
          <div>
            <label 
              htmlFor="address" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Property Address:
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter full UK property address"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <button
            onClick={handleCopy}
            disabled={isLoading || !promptText}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
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

        <div className="mt-8 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">About this prompt:</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>Creates a RICS-compliant residential property valuation</li>
            <li>Includes comprehensive data acquisition methodology</li>
            <li>Provides comparable analysis and triangulation checks</li>
            <li>Delivers complete risk assessment and lender recommendations</li>
            <li>Follows Red Book 2025 standards and UK financial regulations</li>
          </ul>
        </div>
      </div>
    </main>
  );
} 
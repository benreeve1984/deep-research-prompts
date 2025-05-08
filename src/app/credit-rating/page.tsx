'use client';

/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { toast } from 'react-hot-toast';

export default function CreditRating() {
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch prompt when company name changes (with debounce)
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (!companyName.trim()) {
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
            promptName: 'credit-rating', 
            company: companyName 
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
  }, [companyName]);

  const handleCopyPrompt = () => {
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

      <h1 className="text-4xl font-bold mb-8">Credit Rating Prompt Generator</h1>
      
      <div className="max-w-2xl">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Enter the company name and click "Copy Prompt" to copy a fully formatted Markdown prompt to your clipboard.
        </p>

        <div className="space-y-4">
          <div>
            <label 
              htmlFor="companyName" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Company Name:
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Entity Name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleCopyPrompt}
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

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Open the Deep Research LLM, paste the prompt, and let it generate the detailed rating analysis.
        </p>
      </div>
    </main>
  );
} 
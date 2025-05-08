'use client';

import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import Link from "next/link";
import { toast } from 'react-hot-toast';

export default function NewClientPrep() {
  const [companyName, setCompanyName] = useState("");
  const [clientRole, setClientRole] = useState("");
  const [clientDepartment, setClientDepartment] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [promptText, setPromptText] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const sourceOptions = [
    "Company Website",
    "Annual Reports",
    "Quarterly Earnings Reports",
    "Press Releases",
    "Investor Day Transcripts",
    "Analyst Reports",
    "News Articles",
    "Social Media Sentiment",
    "Industry Reports",
    "Competitor Analysis",
    "Regulatory Filings",
    "Market Research Reports"
  ];

  const handleSourceChange = (source: string) => {
    setSources(prev => {
      if (prev.includes(source)) {
        return prev.filter(s => s !== source);
      } else {
        return [...prev, source];
      }
    });
  };

  // Fetch prompt when inputs change (with debounce)
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Clear prompt if required fields are missing
    if (!companyName.trim() || !clientRole.trim() || !clientDepartment.trim() || sources.length === 0) {
      setPromptText("");
      return;
    }

    setIsLoading(true);
    
    // Debounce the API call to avoid too many requests
    timerRef.current = setTimeout(async () => {
      try {
        // Format sources as a string
        const sourcesText = sources.map(source => `- ${source}`).join('\n');
        
        const response = await fetch('/api/fetch-prompt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            promptName: 'new-client-prep', 
            company: companyName,
            role: clientRole,
            department: clientDepartment,
            sources: sourcesText
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
  }, [companyName, clientRole, clientDepartment, sources]);

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
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Deep Research
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-8">New Client Prep</h1>

      <div className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Client Role
          </label>
          <input
            type="text"
            value={clientRole}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setClientRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="e.g., CEO, CFO, Director"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Client Department
          </label>
          <input
            type="text"
            value={clientDepartment}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setClientDepartment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="e.g., Finance, Operations, Strategy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Data Sources
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sourceOptions.map((source) => (
              <label key={source} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sources.includes(source)}
                  onChange={() => handleSourceChange(source)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{source}</span>
              </label>
            ))}
          </div>
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
    </main>
  );
} 
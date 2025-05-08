'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { toast } from 'react-hot-toast';

export default function PC3PartAnalysis() {
  const [targetCompany, setTargetCompany] = useState("");
  const [isLoading, setIsLoading] = useState({
    target: false,
    market: false,
    acquirers: false,
    summary: false
  });
  const [prompts, setPrompts] = useState({
    target: "",
    market: "",
    acquirers: "",
    summary: ""
  });
  const [notificationText, setNotificationText] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch prompts when company name changes (with debounce)
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (!targetCompany.trim()) {
      setPrompts({
        target: "",
        market: "",
        acquirers: "",
        summary: ""
      });
      return;
    }

    setIsLoading({
      target: true,
      market: true,
      acquirers: true,
      summary: true
    });
    
    // Debounce the API calls to avoid too many requests
    timerRef.current = setTimeout(async () => {
      try {
        // Get today's date for the summary prompt
        const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        
        // Fetch target prompt
        const targetResponse = await fetch('/api/fetch-prompt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            promptName: 'pc-detailed-target', 
            company: targetCompany 
          }),
        });
        const targetData = await targetResponse.json();
        
        // Fetch market scan prompt
        const marketResponse = await fetch('/api/fetch-prompt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            promptName: 'pc-market-scan', 
            company: targetCompany 
          }),
        });
        const marketData = await marketResponse.json();
        
        // Fetch acquirers prompt
        const acquirersResponse = await fetch('/api/fetch-prompt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            promptName: 'pc-acquirers', 
            company: targetCompany 
          }),
        });
        const acquirersData = await acquirersResponse.json();
        
        // Fetch summary prompt
        const summaryResponse = await fetch('/api/fetch-prompt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            promptName: 'pc-summary-teaser', 
            company: targetCompany,
            date: today
          }),
        });
        const summaryData = await summaryResponse.json();
        
        setPrompts({
          target: targetData.prompt || "",
          market: marketData.prompt || "",
          acquirers: acquirersData.prompt || "",
          summary: summaryData.prompt || ""
        });
      } catch (error) {
        console.error('Error fetching prompts:', error);
        toast.error('Failed to fetch one or more prompts');
      } finally {
        setIsLoading({
          target: false,
          market: false,
          acquirers: false,
          summary: false
        });
      }
    }, 500);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [targetCompany]);

  const generateTargetPrompt = () => {
    if (!prompts.target) {
      toast.error('No prompt to copy');
      return;
    }
    
    try {
      navigator.clipboard.writeText(prompts.target);
      setNotificationText("Detailed Target Report prompt copied!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error('Copy failed:', error);
      toast.error('Failed to copy. Please try again.');
    }
  };

  const generateMarketScanPrompt = () => {
    if (!prompts.market) {
      toast.error('No prompt to copy');
      return;
    }
    
    try {
      navigator.clipboard.writeText(prompts.market);
      setNotificationText("Detailed Market Scan prompt copied!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error('Copy failed:', error);
      toast.error('Failed to copy. Please try again.');
    }
  };

  const generateAcquirerPrompt = () => {
    if (!prompts.acquirers) {
      toast.error('No prompt to copy');
      return;
    }
    
    try {
      navigator.clipboard.writeText(prompts.acquirers);
      setNotificationText("Potential Acquirer Report prompt copied!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error('Copy failed:', error);
      toast.error('Failed to copy. Please try again.');
    }
  };

  const generateSummaryPrompt = () => {
    if (!prompts.summary) {
      toast.error('No prompt to copy');
      return;
    }
    
    try {
      navigator.clipboard.writeText(prompts.summary);
      setNotificationText("Summary Teaser Report prompt copied!");
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

      <h1 className="text-4xl font-bold mb-8">Private Capital 3-Part Analysis</h1>
      
      <div className="max-w-4xl">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200">
            A comprehensive 3-part analysis package for private capital investments, including target report, market scan, potential acquirers, and executive summary.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <label 
              htmlFor="targetCompany" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Target Company Name:
            </label>
            <input
              type="text"
              id="targetCompany"
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              placeholder="Enter target company name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Recommended Workflow:</h3>
          <ol className="list-decimal pl-5 text-yellow-800 dark:text-yellow-200 space-y-2">
            <li>Start with the <strong>Detailed Target Report</strong> and <strong>Detailed Market Scan</strong> (use Deep Research)</li>
            <li>Save these reports (this might take some time—maybe grab a cup of tea while waiting)</li>
            <li>For the <strong>Potential Acquirer Report</strong>, copy the prompt and <strong>paste your target report below the line</strong> in Deep Research</li>
            <li>For the <strong>Summary Teaser</strong>, use ChatGPT with the o1 model and attach all three previous reports as Word documents or paste them in the context window</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Step 1: Deep Research Reports</h3>
            <div className="space-y-4">
              <button
                onClick={generateTargetPrompt}
                disabled={isLoading.target || !prompts.target}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading.target ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </span>
                ) : "Copy Detailed Target Report Prompt"}
              </button>

              <button
                onClick={generateMarketScanPrompt}
                disabled={isLoading.market || !prompts.market}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading.market ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </span>
                ) : "Copy Detailed Market Scan Prompt"}
              </button>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Use with Deep Research LLM directly
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Step 2: Advanced Analysis</h3>
            <div className="space-y-4">
              <div>
                <button
                  onClick={generateAcquirerPrompt}
                  disabled={isLoading.acquirers || !prompts.acquirers}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading.acquirers ? (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </span>
                  ) : "Copy Potential Acquirer Report Prompt"}
                </button>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Use with Deep Research LLM + paste target report
                </div>
              </div>
              <div>
                <button
                  onClick={generateSummaryPrompt}
                  disabled={isLoading.summary || !prompts.summary}
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading.summary ? (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </span>
                  ) : "Copy Summary Teaser Prompt"}
                </button>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Use with ChatGPT o3 model + attach all 3 reports
                </div>
              </div>
            </div>
          </div>
        </div>

        {showNotification && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            {notificationText}
          </div>
        )}
      </div>
    </main>
  );
} 
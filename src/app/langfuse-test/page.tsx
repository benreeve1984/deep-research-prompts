'use client';

import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

export default function LangFuseTest() {
  const [companyName, setCompanyName] = useState('');
  const [promptText, setPromptText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch prompt when company name changes (with debounce)
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (!companyName.trim()) {
      setPromptText('');
      return;
    }

    setIsLoading(true);
    
    // Debounce the API call to avoid too many requests
    timerRef.current = setTimeout(async () => {
      try {
        const response = await fetch('/api/fetch-prompt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ company: companyName }),
        });
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch prompt');
        }
        
        setPromptText(data.prompt);
      } catch (error) {
        console.error('Error fetching prompt:', error);
        toast.error('Failed to fetch prompt');
        setPromptText('');
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

  // Handle the copy action - this will be triggered directly by user click
  const handleCopyToClipboard = () => {
    if (!promptText) {
      toast.error('No prompt to copy');
      return;
    }

    try {
      navigator.clipboard.writeText(promptText);
      toast.success('Prompt copied to clipboard!');
    } catch (error) {
      console.error('Copy failed:', error);
      toast.error('Failed to copy. Please select the text and copy manually.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            LangFuse Test
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-8">LangFuse Test Prompt Generator</h1>
        
        <div className="max-w-2xl">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <p className="text-blue-800 dark:text-blue-200">
              Fetches the production prompt from Langfuse, replaces <code>{`{{company}}`}</code> with your input, and copies the result.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter company name"
              />
            </div>

            {isLoading && (
              <div className="flex justify-center py-4">
                <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}

            {promptText && !isLoading && (
              <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300">Generated Prompt:</h3>
                  <button
                    onClick={handleCopyToClipboard}
                    className="flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy
                  </button>
                </div>
                <pre className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700 text-sm font-mono text-gray-800 dark:text-gray-200 max-h-60 overflow-y-auto">
                  {promptText}
                </pre>
              </div>
            )}

            {!promptText && !isLoading && companyName.trim() && (
              <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-center">
                No prompt generated yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
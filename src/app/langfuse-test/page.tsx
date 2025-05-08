'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function LangFuseTest() {
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [showManualCopy, setShowManualCopy] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          const success = document.execCommand('copy');
          return success;
        } finally {
          textArea.remove();
        }
      }
    } catch (err) {
      console.error('Copy failed:', err);
      return false;
    }
  };

  const handleCopyPrompt = async () => {
    if (!companyName.trim()) {
      toast.error('Please enter a company name');
      return;
    }
    
    setLoading(true);
    setShowManualCopy(false);
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
      
      // Save the prompt text for manual copy if needed
      setPromptText(data.prompt);
      
      // Try to copy to clipboard
      const copySuccess = await copyToClipboard(data.prompt);
      if (copySuccess) {
        toast.success('Prompt copied to clipboard!');
      } else {
        // Show manual copy option
        setShowManualCopy(true);
        toast('Please use the textarea below to copy manually', { 
          icon: '📋',
          duration: 5000
        });
      }
    } catch (error) {
      toast.error('Failed to copy prompt');
      console.error('Error copying prompt:', error);
    } finally {
      setLoading(false);
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

            <button
              onClick={handleCopyPrompt}
              disabled={loading}
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Prompt
                </>
              )}
            </button>
            
            {showManualCopy && promptText && (
              <div className="mt-6 p-4 border border-amber-300 dark:border-amber-700 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                <h3 className="text-amber-800 dark:text-amber-200 font-medium mb-2">
                  Automatic clipboard copy failed in this browser
                </h3>
                <p className="text-amber-700 dark:text-amber-300 text-sm mb-3">
                  Please copy the text manually from the box below:
                </p>
                <div className="relative">
                  <textarea
                    value={promptText}
                    readOnly
                    onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-mono text-sm"
                    rows={6}
                  ></textarea>
                  <button
                    onClick={() => {
                      try {
                        // This is a direct user action so may work in Safari
                        navigator.clipboard.writeText(promptText);
                        toast.success('Copied!');
                      } catch (e) {
                        // Do nothing, user will copy manually
                      }
                    }}
                    className="absolute top-2 right-2 p-2 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-700"
                    title="Try copy again"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
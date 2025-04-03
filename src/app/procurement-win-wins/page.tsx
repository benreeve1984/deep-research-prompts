'use client';

/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Link from "next/link";

export default function ProcurementWinWins() {
  const [clientName, setClientName] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [contractNature, setContractNature] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const generatePrompt = () => {
    const client = clientName.trim() || "Buyer";
    const supplier = supplierName.trim() || "Seller";
    const nature = contractNature.trim() || "contract";
    
    const promptTemplate = `
Please conduct a deep examination of non-price negotiation points ${client} (as Buyer) could pursue with ${supplier} (as Seller) for ${nature}.

1. **Contextual Research:**  
   - Investigate ${client}–${supplier} historical contracts, strategic supplier relationships, and typical industry practices.  
   - Focus on common non-price considerations such as supply chain reliability, exclusivity, capacity planning, R&D collaborations, IP/patent strategies, sustainability, etc.

2. **Negotiation Levers:**  
   - Brainstorm potential negotiation levers that are non-contentious and avoid direct price discounts.  
   - For each lever, estimate:  
     - **Mutual Value** (how beneficial it is to ${client} and ${supplier} combined)  
     - **Difficulty/Cost to Deliver** for each party  
     - **Overall Ranking** or Score  
     - **Rationale** (1–2 sentences on why this lever is beneficial or feasible)

3. **Structured Output:**  
   - Create a table or list with columns or subheadings:  
     - Negotiation Point  
     - Description / Value Proposition  
     - Mutual Value Score (e.g., High / Medium / Low)  
     - Difficulty to Deliver for ${client} (High / Medium / Low)  
     - Difficulty to Deliver for ${supplier} (High / Medium / Low)  
     - Brief Rationale  

4. **Depth & Clarity:**  
   - Support your reasoning with relevant industry examples or references to known practices.  
   - Emphasize clarity and completeness—avoid superficial bullet points.  
   - Provide an overall conclusion, summarizing which levers appear most mutually beneficial at relatively low difficulty.

Generate your analysis now.`;

    navigator.clipboard.writeText(promptTemplate);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
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
            onClick={generatePrompt}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Copy Prompt
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
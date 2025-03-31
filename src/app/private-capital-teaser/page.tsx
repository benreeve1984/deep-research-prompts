'use client';

/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Link from "next/link";

export default function PrivateCapitalTeaser() {
  const [companyName, setCompanyName] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const generatePrompt = () => {
    const name = companyName.trim() || "Target Company";
    
    const promptTemplate = `
Role & Context
You are an advanced large language model with the capability for deep business and market analysis. Your task is to produce a comprehensive "teaser" document about ${name} for potential acquirers or investors. This document should strike a balance between breadth (to spark interest) and detail (to provide tangible data points and insights).

⸻

Objectives
1. Assess ${name}'s recent performance, including topline growth trends over a 3–5-year horizon (or longer if relevant).
2. Identify & Contrast the company's product or service portfolio, highlighting established offerings vs. newer initiatives.
3. Analyze the broader market environment: key trends, drivers of demand and supply, and regulatory or technological factors.
4. Map the competitive landscape in the regions or sectors where ${name} operates, identifying main competitors or archetypes.
5. Outline potential growth opportunities for ${name} and the strategic rationale behind each.
6. Highlight positive attributes ("What We Like") and potential concerns ("Potential Risks" or "Areas for Due Diligence") to help guide deeper investigation.

⸻

Research & Analysis Requirements
1. Historical & Current Performance
• Provide revenue growth or other relevant performance metrics (actual or reliable estimates) for the last few years.
• Identify and discuss the main drivers behind these trends (e.g., product launches, expansions, partnerships).
• Contrast multiple data sources (e.g., company press releases, industry reports, financial statements, reputable media outlets).
2. Core Offerings & Innovations
• Describe the primary products/services, including their target markets and degree of maturity.
• Highlight any recent or upcoming products/offerings that demonstrate innovation or potential for future growth.
• Include details on market reception or adoption rates when available.
3. Market Overview & Trends
• Summarize macro trends affecting the industry or sector (demand-side changes, regulatory shifts, technological advances, etc.).
• Explain supply-side dynamics (key competitors, supply chain complexities, partnership ecosystems).
• Reference market reports, expert commentary, or data-driven forecasts to provide context.
4. Competitive Landscape
• Segment major competitors by archetype (e.g., pure-play specialists, large diversified incumbents, emerging disruptors).
• Name key players and compare them briefly against ${name} in terms of strengths, weaknesses, or strategic focus.
• Identify any noteworthy regional nuances if the company operates in multiple geographies.
5. Growth Opportunities
• Present 3–5 growth vectors or strategic opportunities (e.g., product line extensions, geographic expansion, M&A, partnerships).
• For each, provide supporting rationale, potential scale of impact, and references to comparable success stories if available.
• Discuss any technical, operational, or market prerequisites needed to realize these opportunities.
6. Key Positives and Possible Concerns
• Summarize "What We Like" about ${name} (unique assets, strong brand, market share, proprietary IP, etc.).
• Pinpoint "Potential Risks" or aspects warranting deeper due diligence (e.g., regulatory hurdles, competitive threats, financial sustainability, cultural fit).
• Offer balanced insights, pulling from multiple sources or expert opinions.
7. Conclusion & Due Diligence Path
• Recap the main takeaways about ${name} and why it might be an attractive target.
• List the key areas or hypotheses for deeper investigation (e.g., customer concentration, product scalability, management quality).
• Suggest possible next steps for an acquirer or investor, such as engaging with company leadership, requesting detailed financial data, or analyzing recent deal activity.

⸻

Writing Style & Depth
• Extensive & Factually Grounded: Provide ample detail and concrete data wherever possible, with references or short footnotes.
• Balanced: Incorporate both positive attributes and potential red flags. If data sources differ, indicate discrepancies and possible reasons.
• Hypothesis-Oriented: Where direct data is limited, state clear assumptions or hypotheses for further testing in due diligence.
• Concise Professional Tone: Aim for an informative, investor-friendly style—clear headings, bullet points for key data, and well-structured analysis.

⸻

Final Instruction

Generate a detailed, well-organized "teaser" report about ${name} according to the objectives and structure outlined above. Use credible references (reports, filings, public announcements) to bolster the analysis, and ensure the final output features clear "What We Like" vs. "Potential Concerns" points that can guide further investigation.`;

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

      <h1 className="text-4xl font-bold mb-8">Private Capital Teaser Generator</h1>
      
      <div className="max-w-2xl">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200">
            Generate a comprehensive "teaser" document for potential acquirers or investors, providing both breadth to spark interest and detail to offer tangible insights about a target company.
          </p>
        </div>

        <div className="space-y-6">
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
              placeholder="Enter company name"
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
          Paste the generated prompt into the Deep Research LLM to create your detailed teaser report.
        </p>
      </div>
    </main>
  );
} 
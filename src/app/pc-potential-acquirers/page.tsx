'use client';

/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Link from "next/link";

export default function PCPotentialAcquirers() {
  const [companyName, setCompanyName] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const generatePrompt = () => {
    const name = companyName.trim() || "Target Company";
    
    const promptTemplate = `
Role & Context
You are an advanced large language model with extensive experience in M&A research and financial analysis. You have access to a detailed teaser report on ${name}, including its market positioning, product lines, financial trajectory, and competitive landscape. Your objective is to leverage that report's insights—and your broader knowledge base—to identify an initial set of potential acquirers who would have a strategic or financial interest in ${name}. The end goal is to help our Private Capital Team prioritize whom to approach first for potential discussions and due diligence.

⸻

Key Objectives
1. Identify Likely Acquirers
• Propose 5–10 organizations (or more, if justified) with a high strategic or financial fit for ${name}.
• Include both strategic acquirers (industry peers, adjacent players, or corporates looking to expand) and financial sponsors (private equity, venture capital, or family offices with relevant sector focus).
2. Provide Rationale & Fit
• For each potential acquirer, explain the specific synergy or strategic rationale (e.g., product adjacency, regional expansion, technological complement, etc.).
• Reference data points or inferences from the teaser report (e.g., ${name}'s market segment, financial metrics, product capabilities) to justify the match.
3. Prioritize & Categorize
• Group the list into logical categories (e.g., "High-Fit Strategic," "High-Fit Financial," "Longer-Shot/Opportunistic Acquirers").
• Offer a ranked or tiered view, highlighting who the Private Capital Team should approach first vs. subsequently.
4. Outline Potential Outreach Strategy
• Recommend messaging angles or value propositions that could resonate with each acquirer type.
• Note any known constraints or critical sensitivities (e.g., regulatory considerations, existing partnerships or competitor relationships).

⸻

Research & Analysis Requirements
1. Strategic Acquirer Profiles
• Look for complementary product lines, overlapping target markets, or an established M&A track record in ${name}'s sector.
• Leverage recent press releases, financial statements, and other public disclosures to validate that these acquirers are actively seeking acquisitions.
2. Financial Sponsor Profiles
• Include private equity and growth funds with relevant sector focus or known interest in companies at ${name}'s revenue/EBITDA scale.
• Highlight funds' typical deal size range and past investments in related markets.
3. Synergy & Value-Add
• Match each acquirer's strategic goals or investment thesis (where public) with the capabilities, IP, or customer base of ${name}.
• Explain how an acquirer could add value (e.g., cross-selling, global distribution, operational expertise).
4. Feasibility & Potential Constraints
• Note any known red flags or constraints (e.g., potential overlap with a competitor, anti-trust issues, significant difference in corporate cultures).
• Indicate if recent news or financial challenges might accelerate or deter a transaction.

⸻

Output Structure

When generating your response:
1. Executive Summary
• A concise overview of the top recommended acquirers and why they are prioritized.
2. Detailed Acquirer Profiles
• Acquirer Name & Category (Strategic or Financial).
• Brief Description (sector, primary business lines, market cap or AUM if relevant).
• Key Synergy Points with ${name} (technology, market adjacency, distribution channels, etc.).
• Recent M&A or Investment Activity (if publicly known or reported).
• Recommended Outreach Angle (how best to pique their interest, potential next steps).
3. Tiered Priority & Roadmap
• Label each acquirer as Tier 1, Tier 2, or Opportunistic based on the strategic fit and likelihood of interest.
• Provide a suggested initial outreach plan (e.g., immediate calls, warm introductions, partnership pitch).
4. Additional Notes & Risks
• Caveats or uncertainties that might affect interest or negotiation leverage.
• Potential competitive sensitivities among the listed acquirers.
5. Conclusion & Next Steps
• Summarize the recommended short-list of acquirers and the immediate action plan for the Private Capital Team.
• Suggest how to further refine the list (e.g., direct communication with the target's management, analysis of confidentiality constraints).

⸻

Final Instruction

Utilize the details from the ${name} teaser report and your broader knowledge of M&A patterns to compile a well-reasoned, actionable list of potential acquirers. Ensure your output is data-driven, references verifiable sources or market signals, and presents a clear rationale for each recommendation. Identify high-priority leads and outline a feasible outreach strategy so that our Private Capital Team can begin engaging acquirers quickly and effectively.

--- IMPORTANT: PASTE THE FULL TEASER REPORT ABOUT ${name} BELOW THIS LINE ---

`;

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

      <h1 className="text-4xl font-bold mb-8">PC Potential Acquirers</h1>
      
      <div className="max-w-2xl">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200">
            Generate a list of potential acquirers for a target company. <span className="font-bold">Important:</span> After copying this prompt, you must paste the full teaser report about the target company at the end of the prompt for the Deep Research LLM to analyze.
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

        <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2">
            Two-Step Process:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-yellow-700 dark:text-yellow-300">
            <li>First, use the <Link href="/private-capital-teaser" className="underline">Private Capital Teaser</Link> to generate a detailed report about your target company</li>
            <li>Then use this prompt and paste the teaser report at the end before submitting to Deep Research LLM</li>
          </ol>
        </div>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Paste the generated prompt into the Deep Research LLM, add the teaser report at the end, and submit to get a list of potential acquirers.
        </p>
      </div>
    </main>
  );
} 
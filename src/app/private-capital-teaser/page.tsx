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
You are an advanced large language model tasked with producing a factually grounded "teaser" document on ${name} for potential acquirers or investors. You must thoroughly validate data, cross-check sources, and explicitly acknowledge any data limitations or conflicting information. Use only publicly available, reputable sources, and if contradictory data is encountered, note the discrepancies and provide plausible explanations or disclaimers.

⸻

Objectives
	1.	Assess ${name}'s recent performance (e.g., revenue, growth rates, customer metrics) over 3–5 years, citing multiple sources to confirm numbers.
	2.	Identify & Contrast ${name}'s offerings (products/services), indicating which are established vs. newly launched and validating each with data points or source references.
	3.	Analyze the broader market environment—covering demand- and supply-side trends, technology enablers, and regulatory considerations—using cross-checked information from at least two reputable references where possible.
	4.	Map the competitive landscape, segmenting major players by archetype and referencing consistent, verifiable data to support claims about market positioning.
	5.	Outline potential growth opportunities, referencing comparable market cases or success stories, while clarifying any assumptions or uncertain data points.
	6.	Highlight both "What We Like" and "Potential Risks / Areas for Due Diligence" for ${name}, ensuring each claim is justified with data or flagged as hypothetical.

⸻

Data Validation & Source Requirements
	1.	Data Cross-Checking
	•	Obtain revenue and growth figures from multiple public sources (financial statements, recognized databases, credible news outlets, investor reports, or official filings).
	•	For each key metric, indicate the data source (e.g., footnotes, inline citations) and note if the data differs across sources.
	•	If discrepancies exist, explain potential reasons (e.g., different fiscal calendars, preliminary vs. final reports, currency fluctuations).
	2.	Handling Uncertain or Conflicting Information
	•	Do not fabricate data. If exact figures are unavailable or conflicting, provide a range or an estimate that is clearly labeled as such, citing the origin of the estimate.
	•	Include disclaimers about the reliability of estimates where necessary (e.g., "Estimates vary from $X to $Y based on different reporting standards").
	3.	Self-Awareness & Recent Developments
	•	For any commentary on expansions, partnerships, market entries, or organizational changes, cross-check at least two sources (press releases, company announcements, credible industry news).
	•	If only one source is available, mention that the information is based on a single, unverified source.
	•	If you find no legitimate confirmation, omit or label it as "unverified rumor/claim."

⸻

Report Structure
	1.	Executive Summary
	•	Brief overview of ${name}'s positioning and a high-level snapshot of its recent performance (with key metrics and source references).
	2.	Detailed Performance Review
	•	3–5-year revenue trend, growth rates, and other relevant KPIs.
	•	For each number, include the source and any conflicting data from alternative sources.
	•	Discuss underlying growth drivers with citations (e.g., new product lines, market expansions, acquisition synergies).
	3.	Product/Service Portfolio Analysis
	•	Categorize offerings into "Established" vs. "Recent/Emerging," providing launch timelines and documentation or public records supporting each claim.
	•	If adoption metrics are available (market share, user base, etc.), cite them properly.
	4.	Market Environment & Trends
	•	Identify demand-side drivers (shifts in customer behavior, compliance regulations, industry digital transformation).
	•	Discuss supply-side factors (competitive intensity, barriers to entry, technological developments).
	•	Where possible, mention at least two corroborating sources for major trends.
	5.	Competitive Landscape
	•	Segment competitors by archetype (e.g., specialized providers, large incumbents, disruptive startups).
	•	Reference specific, verifiable data (market share estimates, user adoption) and explain any variations in reported figures.
	6.	Growth Opportunities
	•	Present 3–5 strategic areas (e.g., new product lines, partnerships, M&A).
	•	Reference comparable market cases or success stories, citing where you derived those comparisons.
	•	Acknowledge any assumptions or data gaps (e.g., if no direct competitor data is available).
	7.	What We Like vs. Potential Concerns
	•	Summarize key positive attributes (e.g., strong customer retention, unique IP, favorable brand perception).
	•	Outline risks or areas needing due diligence (e.g., questionable financial disclosures, over-reliance on a single market, uncertain regulatory compliance).
	•	For each point, provide a brief reference to data sources or label as an informed hypothesis if precise data is scarce.
	8.	Conclusion & Next Steps
	•	High-level takeaways on ${name}'s investment merits.
	•	Specific due diligence questions or areas to investigate (financial audits, customer/partner calls, regulatory risk assessments).
	•	Reference any data points that were insufficiently verified and could be a priority in due diligence.

⸻

Writing Style & Accuracy Protocol
	•	Neutral, Fact-Based Tone: Focus on verifiable facts and label speculation or estimates accordingly.
	•	Citations & Transparency: Each key metric or statement should either link to a credible source or include a footnote describing how the data was derived.
	•	Conflicting Data Handling: Always acknowledge the existence of conflicting data or rumors, explaining plausible reasons for the discrepancy.
	•	No Hallucinations: If certain data or details can't be confirmed, state "unavailable" or "uncertain." Avoid making definitive claims without evidence.
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
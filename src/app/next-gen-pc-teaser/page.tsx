'use client';

import React, { useState } from "react";
import Link from "next/link";

export default function NextGenPCTeaser() {
  const [targetCompany, setTargetCompany] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const generateTargetPrompt = () => {
    const name = targetCompany.trim() || "TARGET COMPANY";
    
    const promptTemplate = `
Role & Context

You are an advanced large language model tasked with producing a factually grounded teaser document on ${name} for potential acquirers or investors. You have internet-enabled deep research capabilities and must thoroughly validate data, cross-check sources, and explicitly acknowledge any data limitations or conflicting information. Use only reputable public sources (official filings, trusted media, industry reports) and, if contradictory data is encountered, note it, providing plausible explanations or disclaimers.

Objectives
	1.	Accurate Financials, Including Parent-Company Metrics
	•	Provide ${name}'s recent performance (revenue, growth rates, EBITDA, customer metrics) over 3–5 years.
	•	If ${name} is owned by a parent, report that entity's key financials (including revenue, investment timeline, etc.) where publicly available.
	•	Explicitly note any missing or conflicting data and give best estimates with sources.
	2.	Product/Service Portfolio & Validation
	•	Identify and contrast core offerings, splitting them into "Established" vs. "New".
	•	Provide launch timelines, relevant usage metrics, or market share estimates, citing each data source.
	3.	Competitive Landscape (Immediate)
	•	Focus on the closest direct competitors to ${name}.
	•	Segment these competitors by archetype (e.g., trust/fund corporate providers vs. independent specialists, or other relevant buckets) with clear rationale for why they fit each archetype.
	•	Include or exclude companies appropriately based on ownership changes (e.g., if COMPANY X was acquired by COMPANY Y, reflect that in the text).
	•	Highlight any major missing players that are often in the conversation but do not appear in ${name}'s direct competition.
	4.	Growth Opportunities & Strategic Moves
	•	Outline potential growth avenues (new products, M&A targets, expansions).
	•	Cross-reference comparable case studies and success stories.
	•	Call out assumptions or data gaps (e.g., if expansions are rumored but not confirmed).
	5.	Key Strengths vs. Potential Risks
	•	Summarize what investors might find appealing (e.g., robust EBITDA margins, strong brand, etc.).
	•	Identify areas needing due diligence (reliance on a single region/client, pending regulatory questions, uncertain data).
	•	Flag any data points that come from only one source or are unverified.

Data Validation & Source Requirements
	•	Cross-Checking
	•	For revenue and growth figures, use multiple reputable sources—official filings, databases, investor reports, etc.
	•	Note any discrepancies (e.g., different fiscal calendars, currency conversions).
	•	Handle Uncertain/Conflicting Data Carefully
	•	Provide ranges or estimates with disclaimers if exact figures cannot be confirmed.
	•	Explain plausible reasons for conflicts (e.g., older data from press releases vs. updated interviews).
	•	Source Citations & Transparency
	•	List or footnote each major claim with an identified source, or clearly mark if it is an "internal assumption" based on partial data.
	•	No Fabrications
	•	If data is missing, say so. Do not create numbers.
	•	Parent/Ownership Context
	•	Clearly state parent-company relationships if relevant and provide parent financials, including date ranges for those figures.

Report Structure
	1.	Executive Summary
	•	High-level snapshot of ${name}'s performance, ownership, and market position.
	•	Include key financial metrics and disclaimers where needed.
	2.	Detailed Financial & Operational Review
	•	3–5-year revenue, EBITDA, growth rates.
	•	Parent-company data, if applicable.
	•	Discussion of drivers behind financial trends.
	3.	Product/Service Portfolio
	•	Split offerings into "Established" vs. "New."
	•	Validate each with date of launch, adoption rates, or user counts where available.
	4.	Immediate Competitive Set
	•	Archetype-based segmentation (trust/fund providers, independent specialists, fintech entrants, etc.).
	•	Note any newly acquired or defunct players.
	•	Mention missing or lesser-known players if relevant.
	5.	Growth Paths & Comparables
	•	Summarize realistic growth strategies (geographic expansion, partnerships, vertical integration).
	•	Reference similar cases in the industry to illustrate potential outcomes.
	6.	Risks / Areas for Diligence
	•	Potential vulnerabilities (regulatory, single-client exposure, market concentration).
	•	Uncertain data points or conflicting metrics.
	7.	Conclusion & Next Steps
	•	Overall investment thesis, plus open questions for deeper due diligence.
	•	Pinpoint any data that remains unverified or approximate.`;

    navigator.clipboard.writeText(promptTemplate);
    setNotificationText("Target Report prompt copied to clipboard!");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const generateMarketScanPrompt = () => {
    const name = targetCompany.trim() || "TARGET COMPANY";
    
    const promptTemplate = `
Role & Context

You are an advanced large language model generating a comprehensive market scan for the sector in which ${name} operates. Your goal is to map the entire market, including major archetypes of competitors, TAM/SAM sizing, and growth rates, using publicly accessible, reputable data. Cross-verify all major claims and highlight any conflicting figures with disclaimers.

Objectives
	1.	Market Segmentation & Archetypes
	•	Provide a high-level taxonomy of the market (e.g., corporate service providers, independent capital market specialists, niche fintechs, etc.).
	•	List key players in each archetype (ensure missing or newly acquired entities are correctly listed).
	•	Explicitly include major  names in this market.
	2.	Market Sizing: TAM & SAM
	•	Differentiate between Total Addressable Market (TAM) and the Serviceable Addressable Market (SAM).
	•	Offer numerical estimates (ranges are acceptable if sources conflict).
	•	Cite sources (industry reports, government data, reputable financial/research databases).
	•	Note disclaimers if you find only partial data.
	3.	Market Growth Rates & Dynamics
	•	Provide recent and projected CAGR or year-over-year growth figures for the industry.
	•	Cross-check from at least two independent sources (e.g., industry associations, market analysts, financial statements of major players).
	•	Indicate known or suspected regional variations (e.g., specific growth drivers in Southern Europe vs. North America).
	4.	Regulatory & Technological Trends
	•	Outline major regulatory frameworks or licenses relevant to this sector (especially if they affect entry or growth).
	•	Highlight tech-driven changes (digitization, AI solutions, data security requirements).
	•	Provide examples of how these trends have impacted actual market participants.
	5.	Competitive Intensity & Key Differentiators
	•	Discuss how competition is structured (e.g., pricing, brand, specialized capabilities).
	•	Note if any segments are consolidated or if M&A is active (any recent mergers or buyouts).
	•	Highlight unique differentiators for certain archetypes (e.g., trust providers with global footprints, fintechs with advanced automation).
	6.	Emerging Opportunities & Threats
	•	Identify potential growth frontiers in the market (e.g., new customer segments, tech integration).
	•	Call out major threats (e.g., regulatory upheaval, cybersecurity risks, economic headwinds).
	•	If possible, quantify these where data permits.

Data Validation & Source Requirements
	•	Multisource Verification
	•	For market size/growth rates, reference 2–3 major industry reports or statistical databases.
	•	For competitor listings, use credible directories or recognized industry-specific publications.
	•	Updates & Historical Perspective
	•	Provide at least 3–5 years of historical market data if available, plus short-term forecasts (next 2–3 years).
	•	Cite any region-specific analysis if relevant (e.g., EMEA vs. Americas vs. APAC).
	•	Handling Conflicts
	•	When sources differ, present both viewpoints, explaining potential reasons (methodology differences, sampling bias, etc.).
	•	No Fabrications
	•	If market estimates for certain regions are not publicly disclosed, mark them as "unknown" or "unavailable".
	•	Provide best estimates or analysis from partial data only if labeled as such.

Report Structure
	1.	Executive Overview
	•	Broad landscape summary: top-level market size, overall growth rate, major segments.
	•	Brief mention of which archetypes dominate.
	2.	Detailed Market Segmentation
	•	Break down each archetype (trust/fund corporate providers, independents, fintech entrants, etc.).
	•	List key players in each, referencing any ownership changes or brand consolidations.
	3.	TAM & SAM Analysis
	•	Present numeric estimates or ranges for total market size, then the serviceable subset.
	•	Footnote each figure with source references (e.g., "Industry Report 2024," "S&P Global Market Intelligence").
	4.	Growth Rates & Drivers
	•	Provide historical and projected growth data.
	•	Highlight key regional or segment-level growth drivers (e.g., adoption of digital solutions, regulatory changes).
	5.	Regulatory & Tech Trends
	•	Summarize relevant compliance requirements (licensing, state vs. federal regulations).
	•	Outline major technological shifts shaping the market (e.g., automation, data analytics).
	6.	Competitive Intensity
	•	Comment on M&A trends, market consolidation, and whether competition is driven by price, service differentiation, or niche specialization.
	•	Identify any emerging challengers or innovative newcomers.
	7.	Opportunities & Threats
	•	Potential expansions (new geographies, segments).
	•	Market saturation risk, regulatory crackdowns, or macroeconomic factors impacting demand.
	•	Label any data-based or anecdotal items with relevant sources or disclaimers.
	8.	Conclusion & Key Takeaways
	•	Summarize the most critical insights (market trajectory, key archetypes, main risk factors).
	•	Note any data insufficiencies and suggest areas for further specialized research.`;

    navigator.clipboard.writeText(promptTemplate);
    setNotificationText("Market Scan prompt copied to clipboard!");
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

      <h1 className="text-4xl font-bold mb-8">Next-Gen PC Teaser Generator</h1>
      
      <div className="max-w-2xl">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200">
            Generate comprehensive target-focused teaser and market scan documents for potential acquirers or investors.
          </p>
        </div>

        <div className="space-y-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={generateTargetPrompt}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Copy Target Report Prompt
            </button>

            <button
              onClick={generateMarketScanPrompt}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Copy Market Scan Prompt
            </button>
          </div>

          {showNotification && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
              {notificationText}
            </div>
          )}
        </div>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Paste the generated prompts into the Deep Research LLM to analyze the target company and its market.
        </p>
      </div>
    </main>
  );
} 
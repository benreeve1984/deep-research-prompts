'use client';

/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Link from "next/link";

export default function PC3PartAnalysis() {
  const [targetCompany, setTargetCompany] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const generateTargetPrompt = () => {
    const company = targetCompany.trim() || "COMPANY";
    
    const promptTemplate = `
Role & Context
You are an advanced large language model tasked with producing a factually grounded "teaser" document on ${company} for potential acquirers or investors. You must thoroughly validate data, cross-check sources, and explicitly acknowledge any data limitations or conflicting information. Use only publicly available, reputable sources, and if contradictory data is encountered, note the discrepancies and provide plausible explanations or disclaimers.

⸻

Objectives
	1.	Assess ${company}'s recent performance (e.g., revenue, growth rates, customer metrics) over 3–5 years, citing multiple sources to confirm numbers.
	2.	Identify & Contrast ${company}'s offerings (products/services), indicating which are established vs. newly launched and validating each with data points or source references.
	3.	Analyze the broader market environment—covering demand- and supply-side trends, technology enablers, and regulatory considerations—using cross-checked information from at least two reputable references where possible.
	4.	Map the competitive landscape, segmenting major players by archetype and referencing consistent, verifiable data to support claims about market positioning.
	5.	Outline potential growth opportunities, referencing comparable market cases or success stories, while clarifying any assumptions or uncertain data points.
	6.	Highlight both "What We Like" and "Potential Risks / Areas for Due Diligence" for ${company}, ensuring each claim is justified with data or flagged as hypothetical.

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
	•	Brief overview of ${company}'s positioning and a high-level snapshot of its recent performance (with key metrics and source references).
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
	•	High-level takeaways on ${company}'s investment merits.
	•	Specific due diligence questions or areas to investigate (financial audits, customer/partner calls, regulatory risk assessments).
	•	Reference any data points that were insufficiently verified and could be a priority in due diligence.

⸻

Writing Style & Accuracy Protocol
	•	Neutral, Fact-Based Tone: Focus on verifiable facts and label speculation or estimates accordingly.
	•	Citations & Transparency: Each key metric or statement should either link to a credible source or include a footnote describing how the data was derived.
	•	Conflicting Data Handling: Always acknowledge the existence of conflicting data or rumors, explaining plausible reasons for the discrepancy.
	•	No Hallucinations: If certain data or details can't be confirmed, state "unavailable" or "uncertain." Avoid making definitive claims without evidence.`;

    navigator.clipboard.writeText(promptTemplate);
    setNotificationText("Detailed Target Report prompt copied!");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const generateMarketScanPrompt = () => {
    const company = targetCompany.trim() || "COMPANY";
    
    const promptTemplate = `
Role & Context

You are an advanced large language model generating a comprehensive market scan for the sector in which ${company} operates. Your goal is to map the entire market, including major archetypes of competitors, TAM/SAM sizing, and growth rates, using publicly accessible, reputable data. Cross-verify all major claims and highlight any conflicting figures with disclaimers.

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
    setNotificationText("Detailed Market Scan prompt copied!");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const generateAcquirerPrompt = () => {
    const company = targetCompany.trim() || "COMPANY";
    
    const promptTemplate = `
Role & Context
You are an advanced large language model with extensive experience in M&A research and financial analysis. You have access to a detailed teaser report on ${company}, including its market positioning, product lines, financial trajectory, and competitive landscape. Your objective is to leverage that report's insights—and your broader knowledge base—to identify an initial set of potential acquirers who would have a strategic or financial interest in ${company}. The end goal is to help our Private Capital Team prioritize whom to approach first for potential discussions and due diligence.

⸻

Key Objectives
1. Identify Likely Acquirers
• Propose 5–10 organizations (or more, if justified) with a high strategic or financial fit for ${company}.
• Include both strategic acquirers (industry peers, adjacent players, or corporates looking to expand) and financial sponsors (private equity, venture capital, or family offices with relevant sector focus).
2. Provide Rationale & Fit
• For each potential acquirer, explain the specific synergy or strategic rationale (e.g., product adjacency, regional expansion, technological complement, etc.).
• Reference data points or inferences from the teaser report (e.g., ${company}'s market segment, financial metrics, product capabilities) to justify the match.
3. Prioritize & Categorize
• Group the list into logical categories (e.g., "High-Fit Strategic," "High-Fit Financial," "Longer-Shot/Opportunistic Acquirers").
• Offer a ranked or tiered view, highlighting who the Private Capital Team should approach first vs. subsequently.
4. Outline Potential Outreach Strategy
• Recommend messaging angles or value propositions that could resonate with each acquirer type.
• Note any known constraints or critical sensitivities (e.g., regulatory considerations, existing partnerships or competitor relationships).

⸻

Research & Analysis Requirements
1. Strategic Acquirer Profiles
• Look for complementary product lines, overlapping target markets, or an established M&A track record in ${company}'s sector.
• Leverage recent press releases, financial statements, and other public disclosures to validate that these acquirers are actively seeking acquisitions.
2. Financial Sponsor Profiles
• Include private equity and growth funds with relevant sector focus or known interest in companies at ${company}'s revenue/EBITDA scale.
• Highlight funds' typical deal size range and past investments in related markets.
3. Synergy & Value-Add
• Match each acquirer's strategic goals or investment thesis (where public) with the capabilities, IP, or customer base of ${company}.
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
• Key Synergy Points with ${company} (technology, market adjacency, distribution channels, etc.).
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

Utilize the details from the ${company} teaser report and your broader knowledge of M&A patterns to compile a well-reasoned, actionable list of potential acquirers. Ensure your output is data-driven, references verifiable sources or market signals, and presents a clear rationale for each recommendation. Identify high-priority leads and outline a feasible outreach strategy so that our Private Capital Team can begin engaging acquirers quickly and effectively.

--- IMPORTANT: PASTE THE FULL TEASER REPORT ABOUT ${company} BELOW THIS LINE ---`;

    navigator.clipboard.writeText(promptTemplate);
    setNotificationText("Potential Acquirer Report prompt copied!");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const generateSummaryPrompt = () => {
    const company = targetCompany.trim() || "COMPANY";
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    const promptTemplate = `
It is ${today}. Provide a concise, executive-level summary of ${company} that a private capital partner can absorb quickly.
	1.	Data Sources & Constraints
	•	Use only verifiable facts from the attached target scan, market scan, and acquirers report.
	•	Do not introduce external or speculative information; stick to what's in the reports.
	2.	Scope of Analysis
	•	Target Overview: Core business model, key products/services, financial highlights, and strategic positioning.
	•	Market Context: Size, growth trends, major competitors, and distinctive market dynamics influencing the target.
	•	Risk Factors: Any operational, financial, or market-related risks highlighted in the materials.
	•	Potential Acquirers: List relevant strategic or financial buyers, explaining why they might be interested.
	3.	Format & Style
	•	Begin with an executive summary (1–2 paragraphs max) capturing the most critical insights.
	•	Provide bullet-pointed sections for easy scanning (covering target overview, market context, risks, and acquirers).
	•	Use concise language, avoiding long-winded paragraphs or generic statements.
	4.	Actionable Insights
	•	Highlight specific advantages, red flags, and synergy opportunities.
	•	Emphasize why these points matter for a private capital partner's due diligence process.
	5.	Time-Sensitive Context
	•	Incorporate any mention of pressing timelines, key inflection points, or upcoming decision milestones noted in the reports.

Goal:
Deliver a short report (around 3-4 pages) that equips the partner with immediate, high-value takeaways and impresses potential acquirers with the depth of insight—again, using only the attached materials.`;

    navigator.clipboard.writeText(promptTemplate);
    setNotificationText("Summary Teaser Report prompt copied!");
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
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Copy Detailed Target Report Prompt
              </button>
              <button
                onClick={generateMarketScanPrompt}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Copy Detailed Market Scan Prompt
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
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  Copy Potential Acquirer Report Prompt
                </button>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Use with Deep Research LLM + paste target report
                </div>
              </div>
              <div>
                <button
                  onClick={generateSummaryPrompt}
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  Copy Summary Teaser Prompt
                </button>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Use with ChatGPT GPT-4.5 model + attach all 3 reports
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
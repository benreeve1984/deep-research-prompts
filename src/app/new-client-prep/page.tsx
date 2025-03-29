'use client';

import React, { useState, ChangeEvent } from "react";
import Link from "next/link";

export default function NewClientPrep() {
  const [companyName, setCompanyName] = useState("");
  const [clientRole, setClientRole] = useState("");
  const [clientDepartment, setClientDepartment] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);

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

  const generatePrompt = () => {
    const sourcesText = sources.map(source => `- ${source}`).join('\n');
    
    return `# DEEP RESEARCH PROMPT

You are a highly advanced research assistant tasked with **analyzing a target firm's strategic challenges, market position, and investment priorities.** Your goal is to produce actionable insights and preliminary hypotheses that a management consultant can use in an upcoming client meeting.

---

## 1. Context

- **Company Name:** ${companyName}
- **Client Role / Department:** ${clientRole}, ${clientDepartment}
- **Meeting Objective:** I am meeting with a representative from ${companyName} for the first time to understand their firm's top strategic priorities, market challenges, and potential gaps or opportunities.

---

## 2. Potential Data Sources

Please assume we have access to the following sources. Where appropriate, reference direct quotes, summaries, or key data from each:

${sourcesText}

---

## 3. Research Goals

1. **Identify Key Strategic Issues**  
   - Summarize the firm's publicly known challenges, strategic themes, and performance trends.  
   - Note any particular market, operational, or regulatory pressures highlighted in the sources.

2. **Compare to Market/Peers**  
   - Determine how these issues align with or differ from industry peers and benchmarks.  
   - Note specific areas where the firm may be off-market or lagging competitors.

3. **Outline Growth & Investment Priorities**  
   - Identify the firm's announced or rumored investment priorities.  
   - Suggest where additional focus or investment might be needed, based on industry trends and peer comparisons.

4. **Formulate Preliminary Hypotheses**  
   - Propose 2–3 broad hypotheses on the firm's likely near-term strategic moves.  
   - Explain the reasoning, potential risks, and implications of each hypothesis.

---

## 4. Research Methodology

1. **Data Compilation**  
   - Collect relevant excerpts, data points, and quotes from each source listed above.  
   - Highlight any consistent themes or discrepancies across sources.

2. **Analysis & Synthesis**  
   - For each critical insight, describe the business implications, possible root causes, and strategic significance.  
   - Cross-check findings against peer or competitor data to determine relative positioning.

3. **Conclusion & Next Steps**  
   - Summarize the top 2–3 takeaways from the research.  
   - Link each takeaway to a suggested line of inquiry or potential action item for the upcoming client meeting.

---

## 5. Output Requirements

Please structure your research output as follows:

1. **Executive Summary (2–3 bullet points)**  
   - A concise overview of the most urgent or impactful strategic concerns facing the firm.

2. **Detailed Analysis**  
   - Organize by topic (e.g., "Market Trends," "Financial Indicators," "Organizational Capabilities," "Digital Transformation," etc.).  
   - Present facts from the sources, along with your interpretation or commentary.

3. **Peer Comparison**  
   - Briefly outline how the firm stacks up against direct competitors or industry benchmarks.

4. **Hypotheses & Potential Next Steps**  
   - List 2–3 actionable hypotheses for potential strategic moves.  
   - Mention key risks, resource requirements, or success factors.

5. **References**  
   - Provide citations (e.g., "Source: [press release, date]") where relevant, so we can trace conclusions back to original materials.

---

## 6. Style & Tone

- **Concise and Business-Focused**: Use short paragraphs, bullet points, and clear headers.  
- **Evidence-Driven**: Include direct quotes or data references to support key points.  
- **Action-Oriented**: Emphasize why each finding matters and how it may inform the client's decision-making.

---

## 7. Final Instructions

1. Conduct a thorough review of the listed sources to extract key information.  
2. Synthesize the findings into an **insightful, executive-level analysis**.  
3. Present concrete, hypothesis-driven recommendations that the management consultant can bring to the client meeting.

---

**Please produce a comprehensive research report in Markdown format, following the structure above.**`;
  };

  const handleCopy = () => {
    const prompt = generatePrompt();
    navigator.clipboard.writeText(prompt);
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
    </main>
  );
} 
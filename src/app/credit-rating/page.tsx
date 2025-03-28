'use client';

/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Link from "next/link";

export default function CreditRating() {
  const [companyName, setCompanyName] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const generatePrompt = () => {
    const name = companyName.trim() || "Sample Company";
    
    const promptTemplate = `
**Polished Prompt for Deep Research LLM (${name} Credit Rating Analysis)**

---

**Role & Task**  
You are a senior credit analyst at a leading credit rating agency, tasked with preparing a detailed and professional credit rating report for **${name}'s senior unsecured debt**. Your ultimate goal is to determine and clearly articulate a single credit rating (e.g., 'BBB-', 'Ba1', etc.) through rigorous and comprehensive research.

### Research Requirements
Conduct an exhaustive, internet-based research exercise covering, but not limited to:

1. **Company Documentation**
   - Annual reports, audited financial statements, interim reports, investor presentations, and any regulatory filings for **${name}**.
   - Company website and official disclosures.

2. **External Sources**
   - Relevant industry and sector analysis reports.
   - Credible news articles, press releases, and coverage related to financial performance, strategic decisions, and key management developments.
   - Third-party analyst coverage, commentary, ratings, or opinions.

**Source Verification & Handling**
- Prioritize primary sources (audited financials, regulatory filings, direct company disclosures).
- Clearly document and evaluate credibility and reliability of secondary sources.
- Explicitly indicate how discrepancies or conflicting information have been assessed and reconciled.

### Final Report Format & Sections
Your report should emulate best-in-class standards from major rating agencies (S&P, Moody's, Scope Ratings, Fitch). Clearly segment your analysis into these exact sections:

1. **Executive Summary & Final Rating**
   - Provide your recommended single, definitive credit rating.
   - Briefly summarize your rationale and key rating factors.

2. **Rating Rationale**
   - Clearly explain the primary reasons for your assigned rating.
   - Outline influential macroeconomic, industry-specific, and company-specific factors.

3. **Company Overview & Industry Analysis**
   - Brief history, ownership structure, business model, product/service offerings, and strategic direction.
   - Industry trends, competitive landscape, market position, growth prospects, and regulatory environment relevant to ${name}.

4. **Business Risk Assessment**
   - Analyze competitive advantages, market share, revenue stability, and diversification.
   - Highlight key risks such as competitive pressures, regulatory changes, or economic volatility.

5. **Financial Risk Assessment**
   - Provide comprehensive evaluation of financial metrics (revenue growth, EBITDA margins, net margins, leverage, liquidity, etc.).
   - Discuss historical financial stability and forward-looking projections.

6. **Capital Structure & Liquidity Analysis**
   - Detail the senior unsecured debt's position within ${name}'s capital structure.
   - Evaluate debt maturities, refinancing risk, credit facilities, and overall liquidity.
   - Examine covenants or protective terms influencing creditworthiness.

7. **Key Rating Drivers & Rating Sensitivities**
   - Clearly outline factors that support the rating (stable income, solid balance sheet, etc.).
   - Discuss potential triggers for an upgrade or downgrade (increased leverage, liquidity issues, industry disruptions, etc.).

8. **Environmental, Social, and Governance (ESG) Considerations**
   - Analyze how ESG factors might impact ${name}'s credit profile (governance structures, regulatory compliance, sustainability initiatives).

9. **Peer Group Analysis**
   - Compare ${name}'s metrics and risk profile against peers in the same sector.

10. **Conclusion & Outlook**
    - Restate your recommended credit rating.
    - Summarize the outlook (stable, positive, negative) and the major drivers behind it.

11. **References**
    - List all references, ensuring clarity and traceability for external verification.

### Style, Tone & Constraints
- **Professional & Formal Tone**: Maintain objectivity, clarity, and conciseness in line with major credit rating agency reports.
- **Data Handling & Assumptions**: Label assumptions where data gaps exist. Note how they may affect the rating conclusion.
- **Reconciliation of Conflicting Data**: Describe how sources were prioritized or discrepancies were resolved.

---

### Concise Explanation of Prompt Effectiveness
1. **Role and Scope**: Defines you as a seasoned credit analyst, focusing on a formal agency-style approach.
2. **Structured Format**: Ensures a standardized, section-by-section deep dive covering key elements of creditworthiness.
3. **Research Rigor**: Demands thorough source verification and transparency, enhancing credibility.
4. **Definitive Outcome**: Calls for a single, final credit rating, preventing ambiguity.
5. **Professional Tone**: Minimizes extraneous commentary and keeps the analysis focused.

---`;

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

      <h1 className="text-4xl font-bold mb-8">Credit Rating Prompt Generator</h1>
      
      <div className="max-w-2xl">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Enter the company name and click "Copy Prompt" to copy a fully formatted Markdown prompt to your clipboard.
        </p>

        <div className="space-y-4">
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
              placeholder="4Most Group Holdings Limited"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={generatePrompt}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
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
          Open the Deep Research LLM, paste the prompt, and let it generate the detailed rating analysis.
        </p>
      </div>
    </main>
  );
} 
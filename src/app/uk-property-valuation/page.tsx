'use client';

import React, { useState } from "react";
import Link from "next/link";

export default function UKPropertyValuation() {
  const [address, setAddress] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const generatePrompt = () => {
    const propertyAddress = address.trim() || "123 Sample Street, London, UK";
    const today = new Date().toISOString().split('T')[0];
    
    const promptTemplate = `
████ SYSTEM ROLE (immutable) ████
You are "Deep‑Valuer‑LLM", a professional UK residential valuation analyst.  
Your work must comply with:  
• RICS Valuation – Global Standards (Red Book) 2025 + UK National Supplement.  
• RICS PS "Bank Lending Valuations & Mortgage Lending Value" (2022).  
• UK Finance Lenders' Handbook, FCA MCOB 4.4A, PRA SS20/15.  

Outputs must be:  
1. Factual, transparent, fully sourced (author‑year inline → numbered Bibliography).  
2. In British English & metric units.  
3. Structured exactly as per the *Deliverables Template* below.  
4. Explicit about every assumption, data limit, and confidence rating.  

If critical data cannot be obtained, refuse with a **Data Deficiency Alert** suggesting a full RICS inspection.

████ USER TASK ████
Value the following property for first‑charge mortgage underwriting:

    Address: ${propertyAddress}  
    Valuation date: ${today}

Assume the commissioning client is a major UK retail bank; their LTV policy is unknown, so provide full risk commentary and lender conditions.

████ DELIVERABLES TEMPLATE ████
Return a single Markdown file with:

| # | Section | Key contents |
|---|---------|--------------|
| 0 | Executive Digest | Headline Market Value; ± % confidence; top‑3 risks & mitigations. |
| 1 | Scope & Compliance | Statement of Red‑Book compliance; basis of value; special assumptions; independence & PI clause. |
| 2 | Property Profile | Title/tenure, UPRN, coordinates, age, construction, accommodation, gross internal area (GIA), EPC rating. |
| 3 | Data Log & Methodology | Table logging every dataset (name, query, timestamp, row‑count, coverage score). Include shell/API commands where practical. |
| 4 | Comparable Analysis | ≥ 5 sales comps (≤ 12 m; radius ≤ 1 km if possible); full adjustment grid; weighting algorithm; outlier justification. |
| 5 | Triangulation Checks | (a) £/m² vs postcode deciles; (b) AVM estimate(s) + confidence; (c) hedonic regression on ≥ 30 local sales; (d) HPI‑indexed older comp. Show maths. |
| 6 | Risk & Uncertainty | Score at least six risk factors (probability × impact heat‑map); include ESG/climate, data sparsity, hidden defects. |
| 7 | Valuer's Opinion & Lender Conditions | Final Market Value (nearest £1 000); uncertainty band; recommended lender actions (e.g. retention, EWS1, reduced LTV). |
| 8 | Bibliography | Numbered list of every source cited. |
| A | Appendices | A1 raw comps CSV; A2 code snippets; A3 imagery/map links; A4 diagnostic plots (optional). |

████ METHOD WORKFLOW ████
1. **Initialisation**  
   – Resolve UPRN & coordinates (ONS AddressBase / gov‑UK API).  
   – Set valuation date (today if none supplied).

2. **Data Acquisition (log each)**  
   a. **EPC Register** → floor area, rating, construction.  
   b. **HM Land Registry Price Paid Data** → ≤ 24 m sales within 1 km, same property type.  
   c. **Property portal scrape/API** (Rightmove/Zoopla) → current & archived listings; photos, floorplans.  
   d. **Google Maps & Street View** → exterior imagery; note imagery date.  
   e. **Environment Agency & BGS** → flood, subsidence, radon layers.  
   f. **Third‑party AVM** (e.g. Hometrack widget value + confidence).  
   g. **ONS/UK HPI** → time‑adjustment indices.  
   h. Optional: LiDAR roofprint check; school‑quality or crime layers for locational nuance.

3. **Data Cleansing**  
   – Remove sale‑price outliers (IQR × 1.5 or 3 σ).  
   – Standardise attributes; impute missing GIA via EPC or regression.  
   – Flag data scarcity (< 5 comps in 12 m) → ↑ uncertainty.

4. **Comparable Selection & Adjustment**  
   – Compute Mahalanobis distance on (age, beds, GIA, geo).  
   – Select ≥ 5 closest; adjust for: date (HPI), size (€/m² elasticity), quality (photo‑based), parking, outdoor space, tenure.  
   – Weight by 1 / (adjustment%²); present grid.

5. **Triangulation / Cross‑Checks**  
   – **Hedonic model**: OLS on ≥ 30 local sales; features = log(GIA), beds, EPC, geohash. Report predicted £ + RMSE.  
   – **AVM**: record value; compute delta vs comp‑based.  
   – **£/m² sanity** against postcode‑sector deciles & IQR.  
   – **Manual override rule**: if any method diverges > 15 % explain why and adjust reconciliation weights.

6. **Reconciliation**  
   – Default weights: comps 60 %, hedonic 20 %, AVM 15 %, sanity 5 %.  
   – Modify weights if justified (e.g. low comp count → decrease comps weight).  
   – Produce final Market Value; provide ± (> max{RMSE, 5 %}) confidence.

7. **Risk Assessment**  
   – Score each factor 1‑5 (probability) × 1‑5 (impact) → heat‑map.  
   – Mandatory factors: market volatility; physical unseen issues; ESG/energy; legal/title; data quality; neighbourhood externalities; construction type; climate/flood.  
   – Recommend lender mitigations (LTV cap, retention, specialist reports).

8. **Output Assembly**  
   – Compile sections 0‑8 precisely.  
   – Insert fenced code/CSV blocks.  
   – Include Red‑Book "material valuation uncertainty" clause if volatility or data gap justifies.  
   – End with valuer signature placeholder and liability wording.

████ STYLE & CITATION RULES ████
• Analytical, direct prose; no marketing adjectives.  
• Inline citations (Author Year §Section) – match to Bibliography numbers.  
• Use SI units; numbers with thousands‑separator.  
• Headings: ##, ###, #### hierarchy exactly.  

████ SAFETY ████
If any critical investigative step fails (e.g. EPC record missing, no comps), stop and issue **Data Deficiency Alert** with recommended next action (drive‑by, full inspection, structural engineer).

████ END OF PROMPT ████`;

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

      <h1 className="text-4xl font-bold mb-8">UK Residential Property Valuation</h1>
      
      <div className="max-w-2xl">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Enter a UK street address and click Copy Prompt to generate a professional property valuation prompt for first‑charge mortgage underwriting.
        </p>

        <div className="space-y-4">
          <div>
            <label 
              htmlFor="address" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Property Address:
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter full UK property address"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
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

        <div className="mt-8 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">About this prompt:</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>Creates a RICS-compliant residential property valuation</li>
            <li>Includes comprehensive data acquisition methodology</li>
            <li>Provides comparable analysis and triangulation checks</li>
            <li>Delivers complete risk assessment and lender recommendations</li>
            <li>Follows Red Book 2025 standards and UK financial regulations</li>
          </ul>
        </div>
      </div>
    </main>
  );
} 
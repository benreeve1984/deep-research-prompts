import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl font-bold mb-8">Ben&apos;s Deep Research Prompts</h1>
      
      <div className="space-y-4">
        {/* Meta Prompt mode hidden from navigation but still accessible via direct URL */}
        
        <Link 
          href="/credit-rating" 
          className="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-semibold">Credit Rating</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Deep Research
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Generate a professional credit rating analysis prompt for any entity
          </p>
        </Link>

        <Link 
          href="/new-client-prep" 
          className="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-semibold">New Client Prep</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm whitespace-nowrap">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Deep Research
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Generate a comprehensive research prompt for preparing for a new client meeting
          </p>
        </Link>

        <Link
          href="/procurement-win-wins"
          className="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-semibold">Procurement Win-Wins</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm whitespace-nowrap">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Deep Research
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Identify non-contentious win-win negotiation points for buyer-supplier contracts.
          </p>
        </Link>

        <Link
          href="/pc-3part-analysis"
          className="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-semibold">Private Capital 3-Part Analysis</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm whitespace-nowrap">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Deep Research
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Complete multi-part analysis workflow with target report, market scan, potential acquirers, and executive summary.
          </p>
        </Link>

        <Link
          href="/uk-property-valuation"
          className="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-semibold">UK Residential Property Valuation</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm whitespace-nowrap">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Deep Research
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Generate a RICS-compliant residential property valuation for mortgage underwriting.
          </p>
        </Link>
      </div>

      <div className="mt-8 text-center">
        <a 
          href="mailto:ben.reeve@oliverwyman.com?subject=Request%20New%20Template"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Request New Template
        </a>
      </div>
    </main>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl font-bold mb-8">Ben&apos;s Deep Research Prompts</h1>
      
      <div className="space-y-4">
        <Link 
          href="/meta-prompt" 
          className="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-semibold">Meta Prompt Generator</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full text-sm whitespace-nowrap">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              o1-Pro
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <p className="text-purple-800 dark:text-purple-200">
              Create a prompt for o1-Pro that will generate a custom prompt for the Deep Research LLM. This tool helps you design the perfect research prompt through a two-step process: first, it generates a prompt for o1-Pro, and then o1-Pro will create a specialized prompt for the Deep Research LLM.
            </p>
          </div>
        </Link>

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
          href="/private-capital-teaser" 
          className="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-semibold">Private Capital Teaser</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm whitespace-nowrap">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Deep Research
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Generate a comprehensive teaser document for private capital investors about a target company
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

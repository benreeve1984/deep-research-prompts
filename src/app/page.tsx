import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl font-bold mb-8">Ben's Deep Research Prompts</h1>
      
      <div className="space-y-4">
        <Link 
          href="/credit-rating" 
          className="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-2">Credit Rating</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Generate a professional credit rating analysis prompt for any entity
          </p>
        </Link>
      </div>
    </main>
  );
}

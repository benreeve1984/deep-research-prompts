'use client';

/* eslint-disable react/no-unescaped-entities */
import React, { useState, ChangeEvent } from "react";
import Link from "next/link";

export default function MetaPrompt() {
  const [formData, setFormData] = useState({
    researchQuestion: "",
    sources: "",
    reportFormat: "",
    constraints: "",
    tone: "formal",
    role: "",
    sections: "",
    examples: "",
  });

  const [showNotification, setShowNotification] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePrompt = () => {
    const promptTemplate = `
You are a world-class prompt engineer with decades of experience designing prompts that harness the internet-trawling and in-depth research capabilities of an advanced LLM.

Your task:
1. Understand my overarching research question: ${formData.researchQuestion || "What are the latest developments in quantum computing?"}
2. Identify necessary or optional sources: ${formData.sources || "You can decide which sources would be most relevant and credible for this research."}
3. Determine the report format: ${formData.reportFormat || "You can decide the most appropriate format to present the findings clearly and effectively."}
4. Include constraints or special instructions: ${formData.constraints || "You can decide any additional constraints or special instructions that would enhance the research quality."}

Deliverables for THIS (regular) LLM:
- Produce a single, cohesive prompt that can be directly pasted into the Deep Research LLM.
- The prompt must instruct the Deep Research LLM to:
  - Conduct thorough internet-based research.
  - Verify source credibility.
  - Provide citations or references.
  - Format the final report according to my requirements.
  - Adhere to any constraints or style guidelines.
- Optionally include a brief rationale or tips for how the Deep Research LLM should handle conflicting information, data reliability, etc.

Constraints / Style Preferences:
- The final prompt should be detailed enough so that minimal follow-up is required.
- The tone should be ${formData.tone}.
- Output should be in plain text or Markdown, suitable for copy-pasting.

${formData.role ? `Optional Elements:
- Indicate any specific roles, e.g. "${formData.role}"` : ""}

${formData.sections ? `- Include step-by-step instructions or sections, e.g. "${formData.sections}"` : ""}

${formData.examples ? `- Provide examples or test cases to confirm the prompt is well-tailored:
${formData.examples}` : ""}

Finally, provide me with that polished prompt—plus a **concise explanation** for why it's effective.`;

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
        <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          o1-Pro
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-4">Meta Prompt Generator</h1>
      
      <div className="max-w-2xl">
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-6">
          <p className="text-purple-800 dark:text-purple-200">
            This tool helps you create a prompt for o1-Pro or o3. When you paste this prompt into o1-Pro / o3, it will generate a custom prompt that you can then use with the Deep Research LLM. Fill in the sections below to customize your meta-prompt template. Leave any section blank to use the default text.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label 
              htmlFor="researchQuestion" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Research Question:
            </label>
            <textarea
              id="researchQuestion"
              name="researchQuestion"
              value={formData.researchQuestion}
              onChange={handleInputChange}
              placeholder="What are the latest developments in quantum computing?"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
            />
          </div>

          <div>
            <label 
              htmlFor="sources" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Sources:
            </label>
            <textarea
              id="sources"
              name="sources"
              value={formData.sources}
              onChange={handleInputChange}
              placeholder="List any preferred websites, journals, or domain experts to consult. Also specify any sources to avoid if relevant."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
            />
          </div>

          <div>
            <label 
              htmlFor="reportFormat" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Report Format:
            </label>
            <textarea
              id="reportFormat"
              name="reportFormat"
              value={formData.reportFormat}
              onChange={handleInputChange}
              placeholder="Specify how you want the Deep Research LLM to structure its findings (e.g., bullet points, executive summary, references included, etc.)"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
            />
          </div>

          <div>
            <label 
              htmlFor="constraints" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Constraints:
            </label>
            <textarea
              id="constraints"
              name="constraints"
              value={formData.constraints}
              onChange={handleInputChange}
              placeholder="Any constraints on length, reading level, tone, disclaimers, or additional context that must be considered."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
            />
          </div>

          <div>
            <label 
              htmlFor="tone" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Tone:
            </label>
            <select
              id="tone"
              name="tone"
              value={formData.tone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="formal">Formal</option>
              <option value="academic">Academic</option>
              <option value="casual">Casual</option>
              <option value="technical">Technical</option>
            </select>
          </div>

          <div>
            <label 
              htmlFor="role" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Role (Optional):
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="e.g., 'Act as a cybersecurity analyst' or 'Assume the perspective of a market researcher'"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label 
              htmlFor="sections" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Sections (Optional):
            </label>
            <input
              type="text"
              id="sections"
              name="sections"
              value={formData.sections}
              onChange={handleInputChange}
              placeholder="e.g., 'Introduction,' 'Methods,' 'Findings,' 'Conclusion,' 'References'"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label 
              htmlFor="examples" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Examples (Optional):
            </label>
            <textarea
              id="examples"
              name="examples"
              value={formData.examples}
              onChange={handleInputChange}
              placeholder="Provide examples or test cases to confirm the prompt is well-tailored"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
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
          Paste the generated prompt into the Deep Research LLM to create your custom research prompt.
        </p>
      </div>
    </main>
  );
} 
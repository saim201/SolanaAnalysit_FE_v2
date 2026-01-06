
interface ProjectHighlightsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectHighlightsModal({ isOpen, onClose }: ProjectHighlightsModalProps) {
  if (!isOpen) return null;

  const agents = [
    {
      name: "Technical Analyst",
      weight: "40%",
      role: "Processes real-time candlestick data, momentum indicators, volume patterns, and historical trends. Uses structured reasoning to identify high-probability trade setups with defined entry and exit conditions and levels(if available) ."
    },
    {
      name: "Sentiment Analyst",
      weight: "30%",
      role: "Combines real-time Fear & Greed Index with news sentiment analysis to identify market psychology, catalysts, and risk events that could impact price action."
    },
    {
      name: "Reflection Analyst",
      weight: "30%",
      role: "Reviews insights from Technical and Sentiment analysts to identify conflicting signals, potential blind spots, contradictions, and overlooked risks before making its final recommendation."
    },
    {
      name: "Trader Analyst",
      weight: "Final",
      role: "Synthesises all analysts insights into actionable trading recommendations with clear reasoning, confidence levels, and risk warnings."
    }
  ];

  const techStack = [
    { category: "Backend", items: ["Python", "FastAPI", "LangGraph", "Claude AI", "PostgreSQL"] },
    { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
    { category: "APIs", items: ["Binance", "CFGI", "RSS Feeds", "RESTful Architecture"] }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-gray-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Project Overview
              </h2>
              {/* <p className="text-sm text-gray-600 mt-1">
                Multi-Agent Solana Trading Analysis System
              </p> */}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Project Summary */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Project</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              A multi-agent trading analysis system built with LangGraph that processes real-time Solana market data through four specialiaed LLM agents (analysts). 
              Each agent uses chain-of-thought prompting to show its reasoning at every step. The system tries to solve the black-box problem in AI trading by making every decision traceable and explainable.
            </p>
          </section>

          {/* Agent Flow */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Agent Pipeline Flow</h3>
            <div className="space-y-3">
              {agents.map((agent, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{agent.name}</h4>
                      {/* <span className="text-xs font-medium px-2 py-1 bg-gray-900 text-white rounded">
                        {agent.weight}
                      </span> */}
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{agent.role}</p>
                  </div>
                  {idx < agents.length - 1 && (
                    <div className="flex justify-center my-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Technology Stack</h3>
            <div className="grid grid-cols-3 gap-3">
              {techStack.map((stack, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 text-xs mb-2">{stack.category}</h4>
                  <ul className="space-y-1">
                    {stack.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-xs text-gray-600 flex items-center gap-1">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Key Features */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <ul className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Real-time market data
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Chain-of-thought reasoning
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Risk-first decision logic
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Complete audit trail
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Weighted consensus
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Sentiment analysis
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm rounded-lg transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}


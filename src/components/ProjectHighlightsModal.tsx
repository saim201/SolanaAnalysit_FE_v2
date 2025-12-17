
interface ProjectHighlightsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectHighlightsModal({ isOpen, onClose }: ProjectHighlightsModalProps) {
  if (!isOpen) return null;

  const highlights = [
    {
      title: "Multi-Agent AI Trading System",
      description: "Built a sophisticated 4-agent AI pipeline using LangGraph for sequential decision-making. Each agent specializes in different analysis domains (Technical, News, Reflection, Trading) with weighted consensus.",
      impact: "Demonstrates advanced AI orchestration and multi-agent system design"
    },
    {
      title: "Real-Time Market Data Integration",
      description: "Integrated Binance API and RSS feeds for live market data. Implemented PostgreSQL database with optimized schema for candlestick data, indicators, and news articles.",
      impact: "Handles real-time data processing with efficient database architecture"
    },
    {
      title: "Chain-of-Thought Reasoning",
      description: "Each agent uses structured reasoning frameworks (6-step for Technical, 5-step for News, 4-step for Trader) with full transparency into decision-making process.",
      impact: "Provides explainable AI with complete audit trail for trading decisions"
    },
    {
      title: "Risk-First Trading Logic",
      description: "Implemented volume validation, confidence thresholds, and risk flag detection. System defaults to HOLD when signals conflict, prioritizing capital preservation.",
      impact: "Shows understanding of risk management in algorithmic trading"
    },
    {
      title: "Modern Full-Stack Architecture",
      description: "FastAPI backend with TypeScript React frontend. Clean separation of concerns with agent-based architecture, database models, and RESTful API design.",
      impact: "Production-ready codebase following best practices"
    }
  ];

  const techStack = {
    backend: [
      "Python 3.12",
      "FastAPI",
      "LangGraph (Multi-Agent Orchestration)",
      "Anthropic Claude (LLM)",
      "PostgreSQL",
      "SQLAlchemy ORM",
      "Pydantic (Data Validation)",
      "Binance API Integration",
      "RSS Feed Parsing"
    ],
    frontend: [
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Vite",
      "Modern UI/UX Design"
    ],
    architecture: [
      "Multi-Agent System Design",
      "Sequential Pipeline Execution",
      "RESTful API Architecture",
      "Database-First Approach",
      "Real-Time Data Processing"
    ]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Project Highlights
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Solana Trading Analysis System - Technical Overview
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Key Highlights */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400">✨</span>
              Key Highlights & Impact
            </h3>
            <div className="space-y-4">
              {highlights.map((highlight, idx) => (
                <div key={idx} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                  <h4 className="font-semibold text-white mb-2">{highlight.title}</h4>
                  <p className="text-sm text-gray-400 mb-2">{highlight.description}</p>
                  <p className="text-xs text-purple-400 font-medium">
                    💡 Impact: {highlight.impact}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400">🛠️</span>
              Technology Stack
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <h4 className="font-semibold text-white mb-3 text-sm">Backend</h4>
                <ul className="space-y-2">
                  {techStack.backend.map((tech, idx) => (
                    <li key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                      <span className="text-green-400 mt-1">▸</span>
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <h4 className="font-semibold text-white mb-3 text-sm">Frontend</h4>
                <ul className="space-y-2">
                  {techStack.frontend.map((tech, idx) => (
                    <li key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                      <span className="text-blue-400 mt-1">▸</span>
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <h4 className="font-semibold text-white mb-3 text-sm">Architecture</h4>
                <ul className="space-y-2">
                  {techStack.architecture.map((tech, idx) => (
                    <li key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                      <span className="text-purple-400 mt-1">▸</span>
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* System Architecture */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-yellow-400">🏗️</span>
              System Architecture
            </h3>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-gray-300">Data Flow:</span>
                  <p className="text-gray-400 mt-1">
                    Binance API + RSS Feeds → RefreshManager → PostgreSQL → Agent Pipeline → Trading Decision
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-gray-300">Agent Pipeline:</span>
                  <p className="text-gray-400 mt-1">
                    Technical Agent (40% weight) → News Agent (30% weight) → Reflection Agent (30% weight) → Trader Agent (Final Decision)
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-gray-300">Key Features:</span>
                  <ul className="text-gray-400 mt-1 space-y-1 ml-4">
                    <li>• Volume-first validation approach</li>
                    <li>• Confidence-weighted consensus</li>
                    <li>• Blind spot detection through debate</li>
                    <li>• Complete audit trail in database</li>
                    <li>• Risk-first decision logic</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 bg-gray-900/50">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Built with modern AI/ML technologies and best practices
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function SystemBanner() {
  return (
    <div className="glass-header border-b border-gray-300/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="text-base font-bold text-gray-900 mb-2">
              How It Works
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              This system uses <span className="font-bold text-gray-900">4 specialised AI agents</span> right now working sequentially to analyse Solana (SOL/USDT).
              <span className="text-gray-800 font-semibold"> Technical Agent</span> analyses candlestick patterns & indicators,
              <span className="text-gray-800 font-semibold"> News Agent</span> evaluates market sentiment,
              <span className="text-gray-800 font-semibold"> Reflection Agent</span> debates bull vs bear cases,
              and <span className="text-gray-800 font-semibold">Trader Agent</span> synthesizes all insights into a final decision with confidence weighting.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-600 font-medium">
              <span>Real-time Binance data</span>
              <span>•</span>
              <span>Confidence-weighted consensus</span>
              <span>•</span>
              <span>Full reasoning transparency</span>
              <span>•</span>
              <span>Historical performance tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


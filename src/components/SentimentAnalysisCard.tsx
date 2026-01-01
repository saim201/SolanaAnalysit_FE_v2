import type { SentimentAnalysis } from '../types';
import CollapsibleCard from './CollapsibleCard';
import CollapsibleSection from './CollapsibleSection';

interface SentimentAnalysisCardProps {
  analysis: SentimentAnalysis;
  isExpanded?: boolean;
  onToggle?: () => void;
  timestamp?: string;
}

export default function SentimentAnalysisCard({ analysis, isExpanded, onToggle, timestamp }: SentimentAnalysisCardProps) {

  console.log("sentiment analysis: ",analysis)
  const getSignalColor = (signal: string) => {
    const upperSignal = signal?.toUpperCase() || '';
    if (upperSignal.includes('BULLISH') || upperSignal.includes('BUY')) return 'text-green-600';
    if (upperSignal.includes('BEARISH') || upperSignal.includes('SELL')) return 'text-red-600';
    return 'text-gray-600';
  };


  const getCFGIColor = (score: number) => {
    if (score < 20) return 'bg-red-500';  // Extreme Fear
    if (score < 40) return 'bg-orange-500';  // Fear
    if (score < 60) return 'bg-yellow-500';  // Neutral
    if (score < 80) return 'bg-lime-500';  // Greed
    return 'bg-green-500';  // Extreme Greed
  };

  return (
    <CollapsibleCard
      title="Sentiment Analyst"
      functionalities="Fear & Greed Index • News sentiment • Risk detection"
      lastUpdated={analysis.timestamp || timestamp}
      defaultExpanded={false}
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">

          {/* Left Column */}
          <div className="space-y-6">

            {/* CFGI Fear & Greed Index */}
            {analysis.market_fear_greed && (
              <div className="space-y-1">
                <h3 className="text-sm font-medium tracking-wide">
                  Fear & Greed Index (Solana)
                </h3>
                <div className="glass-section p-4 rounded-xl">
                  {/* CFGI Score Display */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">CFGI Score</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getCFGIColor(analysis.market_fear_greed.score)}`}></div>
                      <span className="text-xl font-bold">{analysis.market_fear_greed.score?.toFixed(0)}/100</span>
                    </div>
                  </div>

                  {/* Classification */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-600">Classification:</span>
                    <span className="text-xs font-semibold">{analysis.market_fear_greed.classification}</span>
                  </div>

                  {/* Sub-metrics */}
                  {(analysis.market_fear_greed.social !== null || analysis.market_fear_greed.whales !== null || analysis.market_fear_greed.trends !== null) && (
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-200">
                      {analysis.market_fear_greed.social !== null && analysis.market_fear_greed.social !== undefined && (
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Social</div>
                          <div className="text-sm font-semibold">{analysis.market_fear_greed.social.toFixed(0)}</div>
                        </div>
                      )}
                      {analysis.market_fear_greed.whales !== null && analysis.market_fear_greed.whales !== undefined && (
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Whales</div>
                          <div className="text-sm font-semibold">{analysis.market_fear_greed.whales.toFixed(0)}</div>
                        </div>
                      )}
                      {analysis.market_fear_greed.trends !== null && analysis.market_fear_greed.trends !== undefined && (
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Trends</div>
                          <div className="text-sm font-semibold">{analysis.market_fear_greed.trends.toFixed(0)}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Interpretation */}
                  {analysis.market_fear_greed.interpretation && (
                    <div className="mt-3 pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-700 leading-relaxed italic">
                        {analysis.market_fear_greed.interpretation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Key Events */}
            {analysis.key_events && analysis.key_events.length > 0 && (
              <div className="space-y-1">
                <h3 className="text-sm font-medium">
                  Recent News & Events
                </h3>
                <div className="glass-section p-4 rounded-xl h-67 overflow-y-auto">
                  {[...analysis.key_events]
                    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
                    .map((event, idx) => (
                    <div
                      key={idx}
                      className="flex gap-3 pb-3 mb-3 last:pb-0 last:mb-0"
                    >
                      <div className="flex flex-col items-center pt-1">
                        <div className={`w-2 h-2 rounded-full mb-1 ${
                          event.impact === 'BULLISH' ? 'bg-green-500' :
                          event.impact === 'BEARISH' ? 'bg-red-500' :
                          'bg-gray-400'
                        }`}></div>
                        <div className="w-0.5 flex-1 bg-gradient-to-b from-gray-300 to-transparent"></div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">
                            {new Date(event.published_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          <span className={`text-xs font-semibold ${
                            event.impact === 'BULLISH' ? 'text-green-600' :
                            event.impact === 'BEARISH' ? 'text-red-600' :
                            'text-gray-600'
                          }`}>
                            {event.impact}
                          </span>
                        </div>
                        {event.url ? (
                          <a
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block font-semibold text-gray-900 hover:text-blue-700 transition-colors mb-1 text-sm leading-tight"
                          >
                            {event.title}
                          </a>
                        ) : (
                          <h4 className="font-semibold text-gray-900 mb-1 text-sm leading-tight">{event.title}</h4>
                        )}

                        {event.reasoning && (
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {event.reasoning}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Watch for */}
            {analysis.what_to_watch && analysis.what_to_watch.length > 0 && (
              <div className="space-y-1">
                <h3 className="text-sm font-semibold tracking-wide">
                  Watch for
                </h3>
                <div className="glass-section p-3 rounded-xl">
                  <ul className="list-disc list-inside space-y-1">
                    {analysis.what_to_watch.map((item, idx) => (
                      <li key={idx} className="text-sm leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>


          {/* Right Column */}
          <div className="space-y-6">

            {/* Overall Signal */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium tracking-wide">
                Overall Signal
              </h3>
              <div className="glass-section p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Signal</span>
                  <div className={`text-lg font-bold ${getSignalColor(analysis.signal)}`}>
                    {analysis.signal}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-700 font-medium">Confidence:</span>
                  <span className="text-xs text-gray-800 font-semibold">{(analysis.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            {/* News Sentiment Details */}
            {analysis.news_sentiment && (
              <div className="space-y-1">
                <h3 className="text-sm font-medium tracking-wide">
                  News Sentiment
                </h3>
                <div className="glass-section p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Sentiment Score</span>
                    <div className="text-lg font-semibold">
                      {(analysis.news_sentiment.score * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs">Label:</span>
                    <span className="text-xs font-medium">{analysis.news_sentiment.label}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-xs text-green-600">Catalysts</div>
                      <div className="text-sm font-bold text-green-700">{analysis.news_sentiment.catalysts_count}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-red-600">Risks</div>
                      <div className="text-sm font-bold text-red-700">{analysis.news_sentiment.risks_count}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Summary */}
            {analysis.summary && (
              <div className="space-y-1">
                <h3 className="text-sm font-medium tracking-wide">
                  Summary
                </h3>
                <div className="glass-section p-4 rounded-xl">
                  <p className="text-sm leading-relaxed">{analysis.summary}</p>
                </div>
              </div>
            )}

            {/* Risk Flags */}
            {analysis.risk_flags && analysis.risk_flags.length > 0 && (
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-red-800 tracking-wide">
                  Risk Flags
                </h3>
                <div className="glass-section p-3 rounded-xl border-l-4 border-red-500">
                  <ul className="list-disc list-inside space-y-1">
                    {analysis.risk_flags.map((risk, idx) => (
                      <li key={idx} className="text-sm text-red-700 leading-relaxed">
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Suggested Timeframe */}
            {analysis.suggested_timeframe && (
              <div className="glass-section p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 font-semibold">Suggested Timeframe</span>
                  <span className="text-sm font-bold text-gray-900">{analysis.suggested_timeframe}</span>
                </div>
              </div>
            )}

            {/* Invalidation */}
            {analysis.invalidation && (
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-red-800 tracking-wide">
                  Invalidation Condition
                </h3>
                <div className="glass-section p-4 rounded-xl border-l-4 border-red-500">
                  <p className="text-sm text-gray-800 leading-relaxed font-medium">{analysis.invalidation}</p>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Detailed Analysis (Collapsible) */}
        {analysis.thinking && (
          <CollapsibleSection title="Chain-of-Thought Process">
            <div className="glass-section p-4 rounded-xl">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                {analysis.thinking}
              </pre>
            </div>
          </CollapsibleSection>
        )}
      </div>
    </CollapsibleCard>
  );
}

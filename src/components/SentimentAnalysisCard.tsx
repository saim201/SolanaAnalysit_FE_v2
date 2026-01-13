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


  const getCFGITextColor = (score: number) => {
    if (score < 20) return 'text-red-600';  // Extreme Fear
    if (score < 40) return 'text-orange-600';  // Fear
    if (score < 60) return 'text-yellow-600';  // Neutral
    if (score < 80) return 'text-lime-600';  // Greed
    return 'text-green-600';  // Extreme Greed
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

        {/* Market Overview Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div className="glass-section p-2 rounded-lg text-center">
            <div className="text-[10px] text-gray-500 mb-0.5">Recommendation</div>
            <div className={`text-sm font-bold ${
              analysis.recommendation_signal === 'BUY' ? 'text-green-600' :
              analysis.recommendation_signal === 'SELL' ? 'text-red-600' :
              analysis.recommendation_signal === 'WAIT' ? 'text-amber-600' :
              'text-gray-600'
            }`}>{analysis.recommendation_signal}</div>
          </div>
          <div className="glass-section p-2 rounded-lg text-center">
            <div className="text-[10px] text-gray-500 mb-0.5">Market Condition</div>
            <div className={`text-xs font-semibold ${getSignalColor(analysis.market_condition)}`}>{analysis.market_condition.replace(/_/g, ' ')}</div>
          </div>
          <div className="glass-section p-2 rounded-lg text-center">
            <div className="text-[10px] text-gray-500 mb-0.5">Confidence</div>
            <div className="text-sm font-bold">{(analysis.confidence.score * 100).toFixed(0)}%</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">

          {/* Left Column */}
          <div className="space-y-6">

            {/* CFGI Fear & Greed Index */}
            {analysis.market_fear_greed && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Fear & Greed Index
                </h3>
                <div className="glass-section p-5 rounded-xl">
                  {/* Main Score Display */}
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 border-4 border-white shadow-sm mb-3">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900 mb-1">
                          {analysis.market_fear_greed.score?.toFixed(0)}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">Score</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className={`text-sm font-semibold`}>
                        The current sol market is 
                        <span className={`${getCFGITextColor(analysis.market_fear_greed.score)}`}> {analysis.market_fear_greed.classification} </span>
                      </span>
                    </div>
                  </div>

                  {/* Classification Scale */}
                  <div className="mb-5">
                    <div className="flex rounded-lg overflow-hidden h-2 mb-2">
                      <div className="flex-1 bg-red-500"></div>
                      <div className="flex-1 bg-orange-500"></div>
                      <div className="flex-1 bg-yellow-500"></div>
                      <div className="flex-1 bg-lime-500"></div>
                      <div className="flex-1 bg-green-500"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-500">
                      <span>Extreme Fear</span>
                      <span>Fear</span>
                      <span>Neutral</span>
                      <span>Greed</span>
                      <span>Extreme Greed</span>
                    </div>
                    <div className="flex justify-between text-[9px] text-gray-400 mt-0.5">
                      <span>0-20</span>
                      <span>20-40</span>
                      <span>40-60</span>
                      <span>60-80</span>
                      <span>80-100</span>
                    </div>
                  </div>

                  {/* Breakdown Metrics - Circular Indicators */}
                  {(analysis.market_fear_greed.social !== null || analysis.market_fear_greed.whales !== null || analysis.market_fear_greed.trends !== null) && (
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-700 mb-3">Breakdown</div>

                      <div className="grid grid-cols-3 gap-3">
                        {analysis.market_fear_greed.social !== null && analysis.market_fear_greed.social !== undefined && (
                          <div className="flex flex-col items-center">
                            <div className="relative w-16 h-16 mb-2">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle
                                  cx="32"
                                  cy="32"
                                  r="28"
                                  stroke="#e5e7eb"
                                  strokeWidth="6"
                                  fill="none"
                                />
                                <circle
                                  cx="32"
                                  cy="32"
                                  r="28"
                                  stroke="#3b82f6"
                                  strokeWidth="6"
                                  fill="none"
                                  strokeDasharray={`${2 * Math.PI * 28}`}
                                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - analysis.market_fear_greed.social / 100)}`}
                                  strokeLinecap="round"
                                  className="transition-all duration-700 ease-out"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-bold text-gray-900">{analysis.market_fear_greed.social.toFixed(0)}</span>
                              </div>
                            </div>
                            <span className="text-xs text-gray-600 font-medium">Social</span>
                          </div>
                        )}

                        {analysis.market_fear_greed.whales !== null && analysis.market_fear_greed.whales !== undefined && (
                          <div className="flex flex-col items-center">
                            <div className="relative w-16 h-16 mb-2">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle
                                  cx="32"
                                  cy="32"
                                  r="28"
                                  stroke="#e5e7eb"
                                  strokeWidth="6"
                                  fill="none"
                                />
                                <circle
                                  cx="32"
                                  cy="32"
                                  r="28"
                                  stroke="#a855f7"
                                  strokeWidth="6"
                                  fill="none"
                                  strokeDasharray={`${2 * Math.PI * 28}`}
                                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - analysis.market_fear_greed.whales / 100)}`}
                                  strokeLinecap="round"
                                  className="transition-all duration-700 ease-out"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-bold text-gray-900">{analysis.market_fear_greed.whales.toFixed(0)}</span>
                              </div>
                            </div>
                            <span className="text-xs text-gray-600 font-medium">Whales</span>
                          </div>
                        )}

                        {analysis.market_fear_greed.trends !== null && analysis.market_fear_greed.trends !== undefined && (
                          <div className="flex flex-col items-center">
                            <div className="relative w-16 h-16 mb-2">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle
                                  cx="32"
                                  cy="32"
                                  r="28"
                                  stroke="#e5e7eb"
                                  strokeWidth="6"
                                  fill="none"
                                />
                                <circle
                                  cx="32"
                                  cy="32"
                                  r="28"
                                  stroke="#10b981"
                                  strokeWidth="6"
                                  fill="none"
                                  strokeDasharray={`${2 * Math.PI * 28}`}
                                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - analysis.market_fear_greed.trends / 100)}`}
                                  strokeLinecap="round"
                                  className="transition-all duration-700 ease-out"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-bold text-gray-900">{analysis.market_fear_greed.trends.toFixed(0)}</span>
                              </div>
                            </div>
                            <span className="text-xs text-gray-600 font-medium">Trends</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Interpretation */}
                  {analysis.market_fear_greed.interpretation && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {analysis.market_fear_greed.interpretation}.
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
                <div className="glass-section p-4 rounded-xl overflow-y-auto">
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

                        <p className="text-xs text-gray-600 leading-relaxed">
                          {event.source} • {new Date(event.published_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


          </div>


          {/* Right Column */}
          <div className="space-y-6">

            {/* News Sentiment Details */}
            {analysis.news_sentiment && (
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-gray-900">
                  News Sentiment
                </h3>
                <div className="glass-section p-4 rounded-xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Sentiment</div>
                      <div className="text-sm font-bold text-gray-900">
                        {analysis.news_sentiment.sentiment.replace(/_/g, ' ')}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 pt-4">
                      <div className='text-sm text-gray-500 '> Confidence: </div>
                      <div className="text-sm font-bold">
                        {(analysis.news_sentiment.confidence * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>

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

            {/* Risk Flags & Invalidation */}
            {((analysis.risk_flags && analysis.risk_flags.length > 0) || analysis.invalidation) && (
              <div className="space-y-1">
                <h3 className="text-sm font-semibold tracking-wide">
                  Risk Alerts
                </h3>
                <div className="glass-section p-4 rounded-xl border-l-4 border-red-500">
                  {analysis.risk_flags && analysis.risk_flags.length > 0 && (
                    <div className="mb-3">
                      <ul className="space-y-1">
                        {analysis.risk_flags.map((risk, idx) => (
                          <li key={idx} className="text-xs text-gray-900 leading-relaxed flex items-start gap-2">
                            <span className="text-red-500">•</span>
                            <span className="flex-1">{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysis.invalidation && (
                    <div className={analysis.risk_flags && analysis.risk_flags.length > 0 ? "pt-3 border-t border-red-200" : ""}>
                      <div className="text-sm font-semibold text-gray-900 mb-2">Invalidation Triggers</div>
                      <p className="text-xs text-gray-900 leading-relaxed">{analysis.invalidation}</p>
                    </div>
                  )}
                </div>
              </div>
            )}



            {/* Suggested Timeframe */}
            {analysis.suggested_timeframe && (
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-gray-900">
                  Suggested Timeframe
                </h3>
                <div className="glass-section p-4 rounded-xl">
                  <p className="text-xs text-gray-900 leading-relaxed">{analysis.suggested_timeframe}</p>
                </div>
              </div>
            )}


            {/* Summary */}
            {analysis.confidence.reasoning && (
              <div className="space-y-1">
                <h3 className="text-sm font-medium tracking-wide">
                  Confidence Reasoning
                </h3>
                <div className="glass-section p-4 rounded-xl">
                  <p className="text-xs leading-relaxed">{analysis.confidence.reasoning}</p>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Detailed Analysis (Collapsible) */}
        {analysis.thinking && (
          <CollapsibleSection title="Chain-of-thought reasoning">
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

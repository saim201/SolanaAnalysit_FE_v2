import type { NewsAnalysis } from '../types';
import CollapsibleCard from './CollapsibleCard';
import CollapsibleSection from './CollapsibleSection';

interface NewsAnalysisCardProps {
  analysis: NewsAnalysis;
  isExpanded?: boolean;
  onToggle?: () => void;
  timestamp?: string;
}

export default function NewsAnalysisCard({ analysis, isExpanded, onToggle, timestamp }: NewsAnalysisCardProps) {
  // console.log("News Analysis: ", analysis)

  return (
    <CollapsibleCard
      title="Sentiment Analyst"
      functionalities="Event classification • Sentiment scoring • Risk detection"
      lastUpdated={analysis.timestamp || timestamp}
      defaultExpanded={false}
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">

          <div className="space-y-6">

            {/* Key Events */}
            {analysis.key_events && analysis.key_events.length > 0 && (
              <div className="space-y-1">
                <h3 className="text- font-medium ">
                  Recent News & Events 
                </h3>
                <div className="glass-section p-4 rounded-xl h-67 overflow-y-auto ">
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
                          {event.reasoning}
                        </p>
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

            {/* Risk Flags */}
            {/* {analysis.risk_flags && analysis.risk_flags.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-red-800 tracking-wide">
                  Risk Flags
                </h3>
                <div className="space-y-2">
                  {analysis.risk_flags.map((risk, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-red-50/80 rounded-lg border border-red-200/60 backdrop-blur-sm hover:bg-red-100/80 transition-all shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-red-600 mt-0.5 text-xs">⚠</span>
                        <span className="text-sm text-red-800 leading-relaxed flex-1 font-semibold">{risk}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </div>


          {/* Right Column */}
          <div className="space-y-6">

            {/* Stance */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium tracking-wide">
                Market Stance
              </h3>
              <div className="glass-section p-4 rounded-xl">
                <p className="text-sm  leading-relaxed ">{analysis.stance}</p>
              </div>
            </div>

            {/* Suggested Timeframe */}
            {/* {analysis.suggested_timeframe && (
              <div className="glass-section p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 font-semibold">Suggested Timeframe</span>
                  <span className="text-sm font-bold text-gray-900">{analysis.suggested_timeframe}</span>
                </div>
              </div>
            )} */}

            

            {/* Invalidation */}
            {/* {analysis.invalidation && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-red-800 tracking-wide">
                  Invalidation Condition
                </h3>
                <div className="glass-section p-4 rounded-xl border-l-4 border-red-500">
                  <p className="text-sm text-gray-800 leading-relaxed font-medium">{analysis.invalidation}</p>
                </div>
              </div>
            )} */}

            {/* Recommendation */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium tracking-wide">
                Recommendation
              </h3>
              <div className="glass-section p-4 rounded-xl">
                <p className="text-sm leading-relaxed ">{analysis.recommendation_summary}</p>
              </div>
            </div>


            {/* Overall Sentiment */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium tracking-wide">
                Overall Sentiment
              </h3>
              <div className="glass-section p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm ">Sentiment Score</span>
                  <div className={`text-lg  `}>
                    {(analysis.overall_sentiment * 100).toFixed(0)}%
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs ">Label:</span>
                  <span className="text-xs ">{analysis.sentiment_label}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-700 font-medium">Confidence:</span>
                  <span className="text-xs text-gray-800 font-semibold">{(analysis.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
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

import type { ReflectionAnalysis } from '../types';
import CollapsibleCard from './CollapsibleCard';
import CollapsibleSection from './CollapsibleSection';

interface ReflectionAnalysisCardProps {
  analysis: ReflectionAnalysis;
  isExpanded?: boolean;
  onToggle?: () => void;
  timestamp?: string;
}

export default function ReflectionAnalysisCard({ analysis, isExpanded, onToggle, timestamp }: ReflectionAnalysisCardProps) {
  return (
    <CollapsibleCard
      title="Reflection Analyst"
      functionalities="Agreement analysis • Blind spot detection • Risk assessment"
      lastUpdated={analysis.timestamp || timestamp}
      defaultExpanded={false}
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="space-y-3">

        {/* Confidence Overview Strip */}
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
            <div className="text-[10px] text-gray-500 mb-0.5">Confidence</div>
            <div className="text-sm font-bold ">{(analysis.confidence.score * 100).toFixed(0)}%</div>
          </div>
          <div className="glass-section p-2 rounded-lg text-center">
            <div className="text-[10px] text-gray-500 mb-0.5">Alignment Score</div>
            <div className="text-sm font-bold ">{(analysis.agent_alignment.alignment_score * 100).toFixed(0)}%</div>
          </div>
        </div>

        {/* Confidence Reasoning */}
        <div className="glass-section p-2.5 rounded-lg bg-gray-50/50">
          <p className="text-[11px] text-gray-700 leading-relaxed italic">{analysis.confidence.reasoning}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

          {/* LEFT COLUMN */}
          <div className="space-y-3">

            {/* Agreement Analysis */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold tracking-wide text-gray-800">Agent Alignment</h3>
              <div className="glass-section p-2.5 rounded-lg space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-[10px] font-semibold text-blue-700 mb-0.5">Technical Says</div>
                    <p className="text-[11px] text-gray-700 leading-relaxed">{analysis.agent_alignment.technical_says}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold text-purple-700 mb-0.5">Sentiment Says</div>
                    <p className="text-[11px] text-gray-700 leading-relaxed">{analysis.agent_alignment.sentiment_says}</p>
                  </div>
                </div>
                <div className="pt-1 border-t border-gray-200">
                  <div className="text-[10px] font-semibold text-gray-700 mb-0.5">Synthesis</div>
                  <p className="text-[11px] text-gray-700 leading-relaxed">{analysis.agent_alignment.synthesis}</p>
                </div>
              </div>
            </div>

            {/* Blind Spots */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold tracking-wide text-gray-800">Blind Spots</h3>
              <div className="glass-section p-2.5 rounded-lg space-y-2">
                {analysis.blind_spots.technical_missed && (
                  <div>
                    <div className="text-[11px] font-semibold text-blue-700 mb-1">Technical Missed</div>
                    <p className="text-[11px] text-gray-700 leading-relaxed">{analysis.blind_spots.technical_missed}</p>
                  </div>
                )}

                {analysis.blind_spots.sentiment_missed && (
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-[11px] font-semibold text-purple-700 mb-1">Sentiment Missed</div>
                    <p className="text-[11px] text-gray-700 leading-relaxed">{analysis.blind_spots.sentiment_missed}</p>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-200">
                  <div className="text-[11px] font-semibold text-amber-700 mb-1">Critical Insight</div>
                  <p className="text-[11px] text-gray-700 leading-relaxed">{analysis.blind_spots.critical_insight}</p>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold tracking-wide text-gray-800">Primary Risk</h3>
              <div className="glass-section p-2.5 rounded-lg bg-red-50/50">
                <p className="text-[11px] text-gray-700 leading-relaxed">{analysis.primary_risk}</p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-3">

            {/* Monitoring */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold tracking-wide text-gray-800">Monitoring (Next 24h)</h3>
              <div className="glass-section p-2.5 rounded-lg">
                <div className="space-y-0.5">
                  {analysis.monitoring.watch_next_24h.map((item, idx) => (
                    <div key={idx} className="text-[11px] text-gray-700 flex items-start gap-1">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span className="flex-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Invalidation Triggers */}
            {analysis.monitoring?.invalidation_triggers && analysis.monitoring.invalidation_triggers.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <h3 className="text-xs font-semibold tracking-wide text-gray-800">Invalidation Triggers</h3>
                  <div className="group relative">
                    <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="invisible group-hover:visible absolute left-0 top-4 z-10 w-48 p-2 bg-gray-700 text-white text-[10px] rounded-lg shadow-lg">
                      <div className="absolute -top-1 left-1 w-2 h-2 bg-gray-700 rotate-45"></div>
                      Conditions that kill the thesis - exit immediately
                    </div>
                  </div>
                </div>
                <div className="glass-section p-2.5 rounded-lg bg-red-50/50">
                  <div className="space-y-0.5">
                    {analysis.monitoring.invalidation_triggers.map((trigger, idx) => (
                      <div key={idx} className="text-[11px] text-gray-700 flex items-start gap-1">
                        <span className="text-red-500 mt-0.5">•</span>
                        <span className="flex-1">{trigger}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Final Reasoning */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold tracking-wide text-gray-800">Final Synthesis</h3>
              <div className="glass-section p-2.5 rounded-lg border-l-4 border-purple-500">
                <p className="text-[11px] text-gray-700 leading-relaxed">{analysis.final_reasoning}</p>
              </div>
            </div>

            {/* Calculated Metrics */}
            {/* {analysis.calculated_metrics && (
              <div className="space-y-1">
                <h3 className="text-xs font-semibold tracking-wide text-gray-800">Calculated Metrics</h3>
                <div className="glass-section p-2.5 rounded-lg space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-gray-500">Bayesian Confidence</span>
                    <span className="text-[11px] font-semibold">{(analysis.calculated_metrics.bayesian_confidence * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-gray-500">Risk Level</span>
                    <span className={`text-[11px] font-semibold ${
                      analysis.calculated_metrics.risk_level === 'HIGH' ? 'text-red-600' :
                      analysis.calculated_metrics.risk_level === 'MEDIUM' ? 'text-amber-600' :
                      'text-green-600'
                    }`}>{analysis.calculated_metrics.risk_level}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-gray-500">Confidence Deviation</span>
                    <span className="text-[11px] font-semibold">{analysis.calculated_metrics.confidence_deviation.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )} */}

          </div>
        </div>

        {/* Chain-of-Thought */}
        {analysis.thinking && (
          <CollapsibleSection title="Chain-of-thought reasoning">
            <div className="glass-section p-2.5 rounded-lg">
              <pre className="text-[11px] text-gray-700 whitespace-pre-wrap leading-relaxed font-mono">
                {analysis.thinking}
              </pre>
            </div>
          </CollapsibleSection>
        )}
      </div>
    </CollapsibleCard>
  );
}

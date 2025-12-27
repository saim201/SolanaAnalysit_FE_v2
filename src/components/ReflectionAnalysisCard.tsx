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
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">

          {/* Left Column */}
          <div className="space-y-6">

            {/* Agreement Analysis */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium tracking-wide">
                Agreement Status
              </h3>
              <div className="glass-section p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Status</span>
                  <span className={`text-sm font-semibold ${
                    analysis.agreement_analysis.alignment_status === 'ALIGNED' ? 'text-green-600' :
                    analysis.agreement_analysis.alignment_status === 'CONFLICTED' ? 'text-red-600' :
                    'text-amber-600'
                  }`}>
                    {analysis.agreement_analysis.alignment_status}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm">Alignment Score</span>
                  <span className="text-sm font-semibold">
                    {(analysis.agreement_analysis.alignment_score * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {analysis.agreement_analysis.explanation}
                </p>
              </div>
            </div>

            {/* Blind Spots */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium tracking-wide">
                Blind Spots
              </h3>
              <div className="glass-section p-4 rounded-xl space-y-3">
                {analysis.blind_spots.technical_missed && analysis.blind_spots.technical_missed.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-gray-700 mb-2">Technical Analyst Missed:</div>
                    <ul className="space-y-1">
                      {analysis.blind_spots.technical_missed.map((spot, idx) => (
                        <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                          <span className="text-gray-500 mt-0.5">•</span>
                          <span className="leading-relaxed">{spot}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {analysis.blind_spots.news_missed && analysis.blind_spots.news_missed.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-gray-700 mb-2">News Analyst Missed:</div>
                    <ul className="space-y-1">
                      {analysis.blind_spots.news_missed.map((spot, idx) => (
                        <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                          <span className="text-gray-500 mt-0.5">•</span>
                          <span className="leading-relaxed">{spot}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium tracking-wide">
                Risk Assessment
              </h3>
              <div className="glass-section p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Risk Level</span>
                  <span className={`text-sm font-semibold ${
                    analysis.risk_assessment.risk_level === 'HIGH' ? 'text-red-600' :
                    analysis.risk_assessment.risk_level === 'MEDIUM' ? 'text-amber-600' :
                    'text-green-600'
                  }`}>
                    {analysis.risk_assessment.risk_level}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm">Risk Score</span>
                  <span className="text-sm font-semibold">
                    {(analysis.risk_assessment.risk_score * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {analysis.risk_assessment.primary_risk}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Monitoring */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium tracking-wide">
                Monitoring (Next 24h)
              </h3>
              <div className="glass-section p-4 rounded-xl">
                <ul className="space-y-2 mb-3">
                  {analysis.monitoring.watch_next_24h.map((item, idx) => (
                    <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                      <span className="text-gray-500 mt-0.5">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-gray-300/50">
                  <p className="text-xs font-semibold text-gray-700 mb-1">Invalidation Trigger:</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {analysis.monitoring.invalidation_trigger}
                  </p>
                </div>
              </div>
            </div>

            {/* Confidence Calculation */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium tracking-wide">
                Confidence Calculation
              </h3>
              <div className="glass-section p-4 rounded-xl">
                <div className="space-y-1 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span>Starting Confidence</span>
                    <span className="font-semibold">
                      {(analysis.confidence_calculation.starting_confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Alignment Bonus</span>
                    <span className={`font-semibold ${analysis.confidence_calculation.alignment_bonus >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {analysis.confidence_calculation.alignment_bonus >= 0 ? '+' : ''}
                      {(analysis.confidence_calculation.alignment_bonus * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Risk Penalty</span>
                    <span className={`font-semibold ${analysis.confidence_calculation.risk_penalty >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {(analysis.confidence_calculation.risk_penalty * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-300/50">
                    <span className="font-semibold">Final Confidence</span>
                    <span className="font-bold">
                      {(analysis.confidence_calculation.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {analysis.confidence_calculation.reasoning}
                </p>
              </div>
            </div>

            {/* Final Reasoning */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium tracking-wide">
                Assessment
              </h3>
              <div className="glass-section p-4 rounded-xl">
                <p className="text-sm text-gray-800 leading-relaxed">{analysis.reasoning}</p>
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

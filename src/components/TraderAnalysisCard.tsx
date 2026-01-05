import type { TraderAnalysis } from '../types';
import CollapsibleCard from './CollapsibleCard';
import CollapsibleSection from './CollapsibleSection';

interface TraderAnalysisCardProps {
  analysis: TraderAnalysis;
  isExpanded?: boolean;
  onToggle?: () => void;
  timestamp?: string;
}

export default function TraderAnalysisCard({ analysis, isExpanded, onToggle, timestamp }: TraderAnalysisCardProps) {
  return (
    <CollapsibleCard
      title="Trading Analyst"
      functionalities="3-agent synthesis • Confidence weighting • Trade execution"
      lastUpdated={analysis.timestamp || timestamp}
      defaultExpanded={false}
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">

          {/* Left Column */}
          <div className="space-y-6">

            {/* Agent Synthesis */}
            {analysis.agent_synthesis && (
              <div className="space-y-1">
                <h3 className="text-sm font-medium tracking-wide">
                  Agent Synthesis
                </h3>
                <div className="glass-section p-4 rounded-xl">
                  {analysis.agent_synthesis.weighted_confidence !== undefined && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Weighted Confidence</span>
                      <span className="text-sm font-semibold">
                        {(analysis.agent_synthesis.weighted_confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  )}
                  <div className="space-y-2 mb-3">
                    {analysis.agent_synthesis.technical_weight !== undefined && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Technical Weight</span>
                        <span className="font-semibold">{(analysis.agent_synthesis.technical_weight * 100).toFixed(0)}%</span>
                      </div>
                    )}
                    {analysis.agent_synthesis.news_weight !== undefined && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">News Weight</span>
                        <span className="font-semibold">{(analysis.agent_synthesis.news_weight * 100).toFixed(0)}%</span>
                      </div>
                    )}
                    {analysis.agent_synthesis.reflection_weight !== undefined && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Reflection Weight</span>
                        <span className="font-semibold">{(analysis.agent_synthesis.reflection_weight * 100).toFixed(0)}%</span>
                      </div>
                    )}
                  </div>
                  {analysis.agent_synthesis.agreement_summary && (
                    <div className="pt-3 border-t border-gray-300/50">
                      <p className="text-xs font-semibold text-gray-700 mb-1">Agreement Summary:</p>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {analysis.agent_synthesis.agreement_summary}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Agent Contributions */}
            {analysis.agent_synthesis && (
              analysis.agent_synthesis.technical_contribution ||
              analysis.agent_synthesis.news_contribution ||
              analysis.agent_synthesis.reflection_contribution
            ) && (
              <div className="space-y-1">
                <h3 className="text-sm font-medium tracking-wide">
                  Agent Contributions
                </h3>
                <div className="glass-section p-4 rounded-xl space-y-3">
                  {analysis.agent_synthesis.technical_contribution && (
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-1">Technical Analyst:</div>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {analysis.agent_synthesis.technical_contribution}
                      </p>
                    </div>
                  )}
                  {analysis.agent_synthesis.news_contribution && (
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-1">News Analyst:</div>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {analysis.agent_synthesis.news_contribution}
                      </p>
                    </div>
                  )}
                  {analysis.agent_synthesis.reflection_contribution && (
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-1">Reflection Analyst:</div>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {analysis.agent_synthesis.reflection_contribution}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Execution Plan */}
            {analysis.execution_plan && (
              <div className="space-y-1">
                <h3 className="text-sm font-medium tracking-wide">
                  Execution Plan
                </h3>
                <div className="glass-section p-4 rounded-xl">
                  {analysis.execution_plan.position_size && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Position Size</span>
                      <span className="text-sm font-semibold">{analysis.execution_plan.position_size}</span>
                    </div>
                  )}
                  {analysis.execution_plan.timeframe && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Timeframe</span>
                      <span className="text-sm font-semibold">{analysis.execution_plan.timeframe}</span>
                    </div>
                  )}
                  {analysis.execution_plan.risk_reward_ratio && (
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm">Risk/Reward Ratio</span>
                      <span className="text-sm font-semibold">{analysis.execution_plan.risk_reward_ratio}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {analysis.execution_plan.entry_price_target && (
                      <div className="glass-section p-3 rounded-lg bg-green-50/50">
                        <div className="text-xs text-gray-600 mb-1 text-center">Entry</div>
                        <div className="text-sm font-semibold text-green-600 text-center">
                          ${analysis.execution_plan.entry_price_target.toFixed(2)}
                        </div>
                      </div>
                    )}
                    {analysis.execution_plan.stop_loss && (
                      <div className="glass-section p-3 rounded-lg bg-red-50/50">
                        <div className="text-xs text-gray-600 mb-1 text-center">Stop Loss</div>
                        <div className="text-sm font-semibold text-red-600 text-center">
                          ${analysis.execution_plan.stop_loss.toFixed(2)}
                        </div>
                      </div>
                    )}
                    {analysis.execution_plan.take_profit && (
                      <div className="glass-section p-3 rounded-lg bg-blue-50/50">
                        <div className="text-xs text-gray-600 mb-1 text-center">Target</div>
                        <div className="text-sm font-semibold text-blue-600 text-center">
                          ${analysis.execution_plan.take_profit.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>

                  {analysis.execution_plan.entry_timing && (
                    <div className="pt-3 border-t border-gray-300/50">
                      <p className="text-xs font-semibold text-gray-700 mb-1">Entry Timing:</p>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {analysis.execution_plan.entry_timing}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Risk Management */}
            {analysis.risk_management && (
              <div className="space-y-1">
                <h3 className="text-sm font-medium tracking-wide">
                  Risk Management
                </h3>
                <div className="glass-section p-4 rounded-xl">
                  {analysis.risk_management.max_loss_per_trade && (
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm">Max Loss Per Trade</span>
                      <span className="text-sm font-semibold text-red-600">
                        {analysis.risk_management.max_loss_per_trade}
                      </span>
                    </div>
                  )}
                  {analysis.risk_management.primary_risk && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-700 mb-1">Primary Risk:</p>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {analysis.risk_management.primary_risk}
                      </p>
                    </div>
                  )}
                  {analysis.risk_management.secondary_risks && analysis.risk_management.secondary_risks.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-1">Secondary Risks:</p>
                      <ul className="space-y-1">
                        {analysis.risk_management.secondary_risks.map((risk, idx) => (
                          <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                            <span className="text-gray-500 mt-0.5">•</span>
                            <span className="leading-relaxed">{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Exit Conditions */}
            {analysis.risk_management?.exit_conditions && analysis.risk_management.exit_conditions.length > 0 && (
              <div className="space-y-1">
                <h3 className="text-sm font-medium tracking-wide">
                  Exit Conditions
                </h3>
                <div className="glass-section p-4 rounded-xl">
                  <ul className="space-y-2">
                    {analysis.risk_management.exit_conditions.map((condition, idx) => (
                      <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                        <span className="text-gray-500 mt-0.5">•</span>
                        <span className="leading-relaxed">{condition}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Monitoring Checklist */}
            {analysis.risk_management?.monitoring_checklist && analysis.risk_management.monitoring_checklist.length > 0 && (
              <div className="space-y-1">
                <h3 className="text-sm font-medium tracking-wide">
                  Monitoring Checklist
                </h3>
                <div className="glass-section p-4 rounded-xl">
                  <ul className="space-y-2">
                    {analysis.risk_management.monitoring_checklist.map((item, idx) => (
                      <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                        <span className="text-gray-500 mt-0.5">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Final Reasoning */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium tracking-wide">
                Final Stance
              </h3>
              <div className="glass-section p-4 rounded-xl">
                <p className="text-sm text-gray-800 leading-relaxed">{analysis.reasoning}</p>
              </div>
            </div>

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

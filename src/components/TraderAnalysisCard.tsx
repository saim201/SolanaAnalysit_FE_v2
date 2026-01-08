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
      title="Chief Trading Officer"
      functionalities="Final decision • 3-agent synthesis • Trade execution plan"
      lastUpdated={analysis.timestamp || timestamp}
      defaultExpanded={true}
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="space-y-4">

        {/* Decision Overview */}
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
            <div className="text-[10px] text-gray-500 mb-0.5">Market State</div>
            <div className="text-xs font-semibold text-gray-800">{analysis.market_condition}</div>
          </div>
          <div className="glass-section p-2 rounded-lg text-center">
            <div className="text-[10px] text-gray-500 mb-0.5">Confidence</div>
            <div className="text-sm font-bold">{(analysis.confidence.score * 100).toFixed(0)}%</div>
          </div>
        </div>

        {/* Confidence Reasoning */}
        <div className="glass-section p-3 rounded-lg bg-blue-50/30">
          <h3 className="text-xs font-semibold text-gray-800 mb-1.5">Confidence Reasoning</h3>
          <p className="text-[11px] text-gray-700 leading-relaxed">{analysis.confidence.reasoning}</p>
        </div>

        {/* Final Verdict */}
        <div className="glass-section p-3 rounded-lg border-l-4 border-blue-500">
          <h3 className="text-xs font-semibold text-gray-800 mb-2">Final Verdict</h3>
          <div className="space-y-2">
            <div>
              <div className="text-[10px] font-semibold text-gray-600 mb-0.5">Summary</div>
              <p className="text-[11px] text-gray-800 leading-relaxed">{analysis.final_verdict.summary}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              <div className="glass-section p-2 rounded">
                <div className="text-[10px] text-gray-500 mb-0.5">Technical Says</div>
                <p className="text-[11px] font-medium text-gray-800">{analysis.final_verdict.technical_says}</p>
              </div>
              <div className="glass-section p-2 rounded">
                <div className="text-[10px] text-gray-500 mb-0.5">Sentiment Says</div>
                <p className="text-[11px] font-medium text-gray-800">{analysis.final_verdict.sentiment_says}</p>
              </div>
              <div className="glass-section p-2 rounded">
                <div className="text-[10px] text-gray-500 mb-0.5">Reflection Says</div>
                <p className="text-[11px] font-medium text-gray-800">{analysis.final_verdict.reflection_says}</p>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <div className="text-[10px] font-semibold text-blue-700 mb-0.5">My Decision</div>
              <p className="text-[11px] text-gray-800 leading-relaxed font-medium">{analysis.final_verdict.my_decision}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* LEFT COLUMN */}
          <div className="space-y-4">

            {/* Trade Setup */}
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-gray-800">Trade Setup</h3>
              <div className="glass-section p-3 rounded-lg">
                <div className="mb-3">
                  <div className="text-[10px] text-gray-500 mb-1">Status</div>
                  <div className={`text-xs font-bold ${
                    analysis.trade_setup.status === 'READY_TO_ENTER' ? 'text-green-600' :
                    analysis.trade_setup.status === 'WAIT_FOR_SETUP' ? 'text-amber-600' :
                    analysis.trade_setup.status === 'EXIT_RECOMMENDED' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>{analysis.trade_setup.status.replace(/_/g, ' ')}</div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  {analysis.trade_setup.entry_price > 0 && (
                    <div className="glass-section p-2 rounded bg-green-50/50">
                      <div className="text-[9px] text-gray-500 mb-0.5">Entry</div>
                      <div className="text-xs font-bold text-green-700">${analysis.trade_setup.entry_price.toFixed(2)}</div>
                    </div>
                  )}
                  {analysis.trade_setup.stop_loss > 0 && (
                    <div className="glass-section p-2 rounded bg-red-50/50">
                      <div className="text-[9px] text-gray-500 mb-0.5">Stop Loss</div>
                      <div className="text-xs font-bold text-red-700">${analysis.trade_setup.stop_loss.toFixed(2)}</div>
                    </div>
                  )}
                  {analysis.trade_setup.take_profit > 0 && (
                    <div className="glass-section p-2 rounded bg-blue-50/50">
                      <div className="text-[9px] text-gray-500 mb-0.5">Target</div>
                      <div className="text-xs font-bold text-blue-700">${analysis.trade_setup.take_profit.toFixed(2)}</div>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 text-[11px]">
                  {analysis.trade_setup.risk_reward > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Risk/Reward</span>
                      <span className={`font-semibold ${
                        analysis.trade_setup.risk_reward >= 1.5 ? 'text-green-600' :
                        analysis.trade_setup.risk_reward >= 1.0 ? 'text-amber-600' :
                        'text-red-600'
                      }`}>{analysis.trade_setup.risk_reward.toFixed(2)}:1</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Position Size</span>
                    <span className="font-semibold text-gray-800">{analysis.trade_setup.position_size}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Timeframe</span>
                    <span className="font-semibold text-gray-800">{analysis.trade_setup.timeframe}</span>
                  </div>
                </div>

                {analysis.trade_setup.setup_explanation && (
                  <div className="pt-2 mt-2 border-t border-gray-200">
                    <p className="text-[11px] text-gray-700 leading-relaxed">{analysis.trade_setup.setup_explanation}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Plan */}
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-gray-800">Action Plan</h3>
              <div className="glass-section p-3 rounded-lg space-y-2">
                <div>
                  <div className="text-[10px] font-semibold text-green-700 mb-1">For New Traders</div>
                  <p className="text-[11px] text-gray-700 leading-relaxed">{analysis.action_plan.for_new_traders}</p>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="text-[10px] font-semibold text-blue-700 mb-1">For Current Holders</div>
                  <p className="text-[11px] text-gray-700 leading-relaxed">{analysis.action_plan.for_current_holders}</p>
                </div>
                {analysis.action_plan?.entry_conditions && analysis.action_plan.entry_conditions.length > 0 && (
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-[10px] font-semibold text-gray-700 mb-1">Entry Conditions</div>
                    <div className="space-y-0.5">
                      {analysis.action_plan.entry_conditions.map((cond, idx) => (
                        <div key={idx} className="text-[11px] text-gray-700 flex items-start gap-1">
                          <span className="text-green-500 mt-0.5">•</span>
                          <span className="flex-1">{cond}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {analysis.action_plan?.exit_conditions && analysis.action_plan.exit_conditions.length > 0 && (
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-[10px] font-semibold text-gray-700 mb-1">Exit Conditions</div>
                    <div className="space-y-0.5">
                      {analysis.action_plan.exit_conditions.map((cond, idx) => (
                        <div key={idx} className="text-[11px] text-gray-700 flex items-start gap-1">
                          <span className="text-red-500 mt-0.5">•</span>
                          <span className="flex-1">{cond}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">

            {/* What to Monitor */}
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-gray-800">What to Monitor</h3>
              <div className="glass-section p-3 rounded-lg space-y-2">
                {analysis.what_to_monitor?.critical_next_48h && analysis.what_to_monitor.critical_next_48h.length > 0 && (
                  <div>
                    <div className="text-[10px] font-semibold text-amber-700 mb-1">Critical Next 48h</div>
                    <div className="space-y-0.5">
                      {analysis.what_to_monitor.critical_next_48h.map((item, idx) => (
                        <div key={idx} className="text-[11px] text-gray-700 flex items-start gap-1">
                          <span className="text-amber-500 mt-0.5">•</span>
                          <span className="flex-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {analysis.what_to_monitor?.daily_checks && analysis.what_to_monitor.daily_checks.length > 0 && (
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-[10px] font-semibold text-blue-700 mb-1">Daily Checks</div>
                    <div className="space-y-0.5">
                      {analysis.what_to_monitor.daily_checks.map((item, idx) => (
                        <div key={idx} className="text-[11px] text-gray-700 flex items-start gap-1">
                          <span className="text-blue-500 mt-0.5">•</span>
                          <span className="flex-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {analysis.what_to_monitor?.exit_immediately_if && analysis.what_to_monitor.exit_immediately_if.length > 0 && (
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-[10px] font-semibold text-red-700 mb-1">Exit Immediately If</div>
                    <div className="space-y-0.5">
                      {analysis.what_to_monitor.exit_immediately_if.map((item, idx) => (
                        <div key={idx} className="text-[11px] text-gray-700 flex items-start gap-1">
                          <span className="text-red-500 mt-0.5">•</span>
                          <span className="flex-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-gray-800">Risk Assessment</h3>
              <div className="glass-section p-3 rounded-lg bg-red-50/30 space-y-2">
                <div>
                  <div className="text-[10px] font-semibold text-red-700 mb-1">Main Risk</div>
                  <p className="text-[11px] text-gray-700 leading-relaxed">{analysis.risk_assessment.main_risk}</p>
                </div>
                <div className="pt-2 border-t border-red-200">
                  <div className="text-[10px] font-semibold text-gray-700 mb-1">Why This Position Size</div>
                  <p className="text-[11px] text-gray-700 leading-relaxed">{analysis.risk_assessment.why_this_position_size}</p>
                </div>
                {analysis.risk_assessment?.what_kills_this_trade && analysis.risk_assessment.what_kills_this_trade.length > 0 && (
                  <div className="pt-2 border-t border-red-200">
                    <div className="text-[10px] font-semibold text-red-700 mb-1">What Kills This Trade</div>
                    <div className="space-y-0.5">
                      {analysis.risk_assessment.what_kills_this_trade.map((item, idx) => (
                        <div key={idx} className="text-[11px] text-gray-700 flex items-start gap-1">
                          <span className="text-red-500 mt-0.5">•</span>
                          <span className="flex-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Chain-of-Thought */}
        {analysis.thinking && (
          <CollapsibleSection title="Chain-of-thought reasoning">
            <div className="glass-section p-3 rounded-lg">
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

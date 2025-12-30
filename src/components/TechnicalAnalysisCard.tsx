import type { TechnicalAnalysis, TechnicalDataResponse } from '../types';
import CollapsibleCard from './CollapsibleCard';
import CollapsibleSection from './CollapsibleSection';

interface TechnicalAnalysisCardProps {
  analysis: TechnicalAnalysis;
  technicalData?: TechnicalDataResponse | null;
  isExpanded?: boolean;
  onToggle?: () => void;
  timestamp?: string;
}

export default function TechnicalAnalysisCard({ analysis, technicalData, isExpanded, onToggle, timestamp }: TechnicalAnalysisCardProps) {

  console.log("Technical analysis result: ", analysis)
  console.log("Technical data result: ", technicalData)

  const getIndicatorSignal = (name: string, value: number | undefined, currentPrice: number): { text: string; color: string } => {
    if (value === undefined || value === null) return { text: '─', color: 'text-gray-400' };

    switch (name) {
      case 'RSI':
        if (value > 70) return { text: 'Overbought', color: 'text-red-600' };
        if (value < 30) return { text: 'Oversold', color: 'text-green-600' };
        return { text: 'Neutral', color: 'text-gray-700' };

      case 'MACD Line': {
        const macdSignal = technicalData?.macd_signal || 0;
        if (value > macdSignal) return { text: 'Bullish', color: 'text-green-600' };
        if (value < macdSignal) return { text: 'Bearish', color: 'text-red-600' };
        return { text: 'Neutral', color: 'text-gray-700' };
      }

      case 'MACD Signal':
        return { text: 'Signal Line', color: 'text-gray-700' };

      case 'EMA20':
      case 'EMA50':
        if (currentPrice > value) return { text: 'Above', color: 'text-green-600' };
        if (currentPrice < value) return { text: 'Below', color: 'text-red-600' };
        return { text: 'At Level', color: 'text-gray-700' };

      case 'BB Upper':
        if (currentPrice >= value) return { text: 'Overbought', color: 'text-red-600' };
        return { text: 'Resistance', color: 'text-gray-700' };

      case 'BB Lower':
        if (currentPrice <= value) return { text: 'Oversold', color: 'text-green-600' };
        return { text: 'Support', color: 'text-gray-700' };

      case 'ATR':
        return { text: 'Volatility', color: 'text-gray-700' };

      case 'Volume Ratio':
        if (value > 1.5) return { text: 'High', color: 'text-green-600' };
        if (value < 0.7) return { text: 'Low', color: 'text-red-600' };
        return { text: 'Normal', color: 'text-gray-700' };

      case 'Support':
      case 'Resistance': {
        const distancePercent = ((currentPrice - value) / value) * 100;
        if (Math.abs(distancePercent) < 2) return { text: 'Near', color: 'text-amber-600' };
        return { text: `${distancePercent > 0 ? 'Above' : 'Below'}`, color: 'text-gray-700' };
      }

      default:
        return { text: '─', color: 'text-gray-700' };
    }
  };

  const indicatorsData = [
    { name: 'EMA20', value: technicalData?.ema20 },
    { name: 'EMA50', value: technicalData?.ema50 },
    { name: 'RSI', value: technicalData?.rsi },
    { name: 'MACD Line', value: technicalData?.macd_line },
    { name: 'MACD Signal', value: technicalData?.macd_signal },
    { name: 'BB Upper', value: technicalData?.bb_upper },
    { name: 'BB Lower', value: technicalData?.bb_lower },
    { name: 'ATR', value: technicalData?.atr },
    { name: 'Volume Ratio', value: technicalData?.volume_ratio },
    { name: 'Support', value: technicalData?.support1 },
    { name: 'Resistance', value: technicalData?.resistance1 },
  ];

  const currentPrice = technicalData?.currentPrice || 0;

  const renderThinking = () => {
    if (!analysis.thinking) return null;

    if (Array.isArray(analysis.thinking)) {
      return (
        <div className="space-y-2">
          {analysis.thinking.map((step, idx) => (
            <div key={idx} className="pb-2 mb-2 border-b border-gray-200 last:border-0 last:pb-0 last:mb-0">
              <div className="text-xs font-semibold text-gray-700 mb-1">Step {idx + 1}</div>
              <p className="text-xs text-gray-700 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      );
    }

    return (
      <pre className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
        {analysis.thinking}
      </pre>
    );
  };

  return (
    <CollapsibleCard
      title="Technical Analyst"
      functionalities="Price action • Indicators • Volume-driven"
      lastUpdated={analysis.timestamp || timestamp}
      defaultExpanded={false}
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">

          {/* LEFT COLUMN */}
          <div className="space-y-6">

            {/* Summary */}
            {analysis.summary && (
              <div className="space-y-1">
                <h3 className="text-sm font-semibold tracking-wide">Summary</h3>
                <div className="glass-section p-4 rounded-xl">
                  <p className="text-sm text-gray-800 leading-relaxed">{analysis.summary}</p>
                </div>
              </div>
            )}

            {/* Technical Indicators Table */}
            <div className="space-y-1">
              <h3 className="text-sm font-semibold tracking-wide">Technical Indicators</h3>
              <div className="glass-section rounded-xl overflow-hidden">
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-300/50">
                      <tr>
                        <th className="text-left py-2.5 px-3 text-gray-700 font-semibold">#</th>
                        <th className="text-left py-2.5 px-3 text-gray-700 font-semibold">Indicator</th>
                        <th className="text-right py-2.5 px-3 text-gray-700 font-semibold">Value</th>
                        <th className="text-right py-2.5 px-3 text-gray-700 font-semibold">Signal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {indicatorsData.map((indicator, index) => {
                        const signal = getIndicatorSignal(indicator.name, indicator.value, currentPrice);
                        return (
                          <tr key={indicator.name} className="border-b border-gray-200/40 last:border-0 hover:bg-gray-50 transition-colors duration-150">
                            <td className="py-2.5 px-3 text-gray-600">{index + 1}</td>
                            <td className="py-2.5 px-3 text-gray-800 font-medium">{indicator.name}</td>
                            <td className="py-2.5 px-3 text-right text-gray-900 font-medium">
                              {indicator.value !== undefined && indicator.value !== null
                                ? indicator.value.toFixed(2)
                                : '─'}
                            </td>
                            <td className={`py-2.5 px-3 text-right font-medium ${signal.color}`}>
                              {signal.text}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Analysis Breakdown */}
            {analysis.analysis && (
              <div className="space-y-1">
                <h3 className="text-sm font-semibold tracking-wide">Analysis Breakdown</h3>
                <div className="glass-section p-4 rounded-xl space-y-3">
                  <div>
                    <div className="text-xs font-semibold text-gray-900 mb-1.5">Trend</div>
                    <div className="text-xs text-gray-700 space-y-1">
                      <div><span className="text-gray-600">Direction:</span> {analysis.analysis.trend.direction}</div>
                      <div><span className="text-gray-600">Strength:</span> {analysis.analysis.trend.strength}</div>
                      <div className="mt-1.5 text-gray-700 leading-relaxed">{analysis.analysis.trend.detail}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-xs font-semibold text-gray-900 mb-1.5">Momentum</div>
                    <div className="text-xs text-gray-700 space-y-1">
                      <div><span className="text-gray-600">Direction:</span> {analysis.analysis.momentum.direction}</div>
                      <div><span className="text-gray-600">Strength:</span> {analysis.analysis.momentum.strength}</div>
                      <div className="mt-1.5 text-gray-700 leading-relaxed">{analysis.analysis.momentum.detail}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-xs font-semibold text-gray-900 mb-1.5">Volume</div>
                    <div className="text-xs text-gray-700 space-y-1">
                      <div><span className="text-gray-600">Quality:</span> {analysis.analysis.volume.quality}</div>
                      <div><span className="text-gray-600">Ratio:</span> {analysis.analysis.volume.ratio.toFixed(2)}x</div>
                      <div className="mt-1.5 text-gray-700 leading-relaxed">{analysis.analysis.volume.detail}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Confidence Reasoning */}
            {analysis.confidence_reasoning && (
              <div className="space-y-1">
                <h3 className="text-sm font-semibold tracking-wide">Confidence Analysis</h3>
                <div className="glass-section p-4 rounded-xl space-y-3">
                  {analysis.confidence_reasoning.supporting.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-green-700 mb-1.5">Supporting Factors</div>
                      <div className="space-y-0.5">
                        {analysis.confidence_reasoning.supporting.map((factor, idx) => (
                          <div key={idx} className="text-xs text-gray-700">• {factor}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.confidence_reasoning.concerns.length > 0 && (
                    <div className="pt-3 border-t border-gray-200">
                      <div className="text-xs font-semibold text-amber-700 mb-1.5">Concerns</div>
                      <div className="space-y-0.5">
                        {analysis.confidence_reasoning.concerns.map((concern, idx) => (
                          <div key={idx} className="text-xs text-gray-700">• {concern}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-xs font-semibold text-gray-900 mb-1.5">Overall Assessment</div>
                    <p className="text-xs text-gray-700 leading-relaxed">{analysis.confidence_reasoning.assessment}</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

            {/* Market Condition & Confidence */}
            <div className="space-y-1">
              <h3 className="text-sm font-semibold tracking-wide">Market State</h3>
              <div className="glass-section p-4 rounded-xl space-y-2">
                {analysis.market_condition && (
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <span className="text-sm text-gray-700">Condition</span>
                    <span className={`text-sm font-semibold ${
                      analysis.market_condition === 'TRENDING' ? 'text-blue-700' :
                      analysis.market_condition === 'RANGING' ? 'text-gray-700' :
                      analysis.market_condition === 'VOLATILE' ? 'text-red-700' :
                      'text-gray-600'
                    }`}>
                      {analysis.market_condition}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Confidence</span>
                  <span className="text-2xl font-bold text-gray-900">{(analysis.confidence * 100).toFixed(0)}%</span>
                </div>
                {(analysis.trade_setup?.timeframe || analysis.timeframe) && (
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-xs text-gray-600">Timeframe</span>
                    <span className="text-xs text-gray-900 font-medium">{analysis.trade_setup?.timeframe || analysis.timeframe}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Trade Setup */}
            {analysis.trade_setup && (
              <div className="space-y-1">
                <h3 className="text-sm font-semibold tracking-wide">Trade Setup</h3>
                <div className="glass-section p-4 rounded-xl space-y-2">
                  <div className="pb-2 border-b border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Viability</div>
                    <p className="text-xs text-gray-700 leading-relaxed">{analysis.trade_setup.viability}</p>
                  </div>

                  {analysis.trade_setup.entry && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-700">Entry Price</span>
                      <span className="text-sm font-bold text-green-700">${analysis.trade_setup.entry.toFixed(2)}</span>
                    </div>
                  )}
                  {analysis.trade_setup.stop_loss && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-700">Stop Loss</span>
                      <span className="text-sm font-bold text-red-700">${analysis.trade_setup.stop_loss.toFixed(2)}</span>
                    </div>
                  )}
                  {analysis.trade_setup.take_profit && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-700">Take Profit</span>
                      <span className="text-sm font-bold text-blue-700">${analysis.trade_setup.take_profit.toFixed(2)}</span>
                    </div>
                  )}

                  {analysis.trade_setup.risk_reward && (
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-xs text-gray-600">Risk/Reward</span>
                      <span className="text-xs text-gray-900 font-bold">{analysis.trade_setup.risk_reward}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Plan */}
            {analysis.action_plan && (
              <div className="space-y-1">
                <h3 className="text-sm font-semibold tracking-wide">Action Plan</h3>
                <div className="glass-section p-4 rounded-xl space-y-3">
                  <div>
                    <div className="text-xs font-semibold text-green-700 mb-1">Primary</div>
                    <p className="text-xs text-gray-700 leading-relaxed">{analysis.action_plan.primary}</p>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-xs font-semibold text-blue-700 mb-1">Alternative</div>
                    <p className="text-xs text-gray-700 leading-relaxed">{analysis.action_plan.alternative}</p>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-xs font-semibold text-amber-700 mb-1">If In Position</div>
                    <p className="text-xs text-gray-700 leading-relaxed">{analysis.action_plan.if_in_position}</p>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-xs font-semibold text-red-700 mb-1">Avoid</div>
                    <p className="text-xs text-gray-700 leading-relaxed">{analysis.action_plan.avoid}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Watch List */}
            {analysis.watch_list && (
              <div className="space-y-1">
                <h3 className="text-sm font-semibold tracking-wide">Watch List</h3>
                <div className="glass-section p-4 rounded-xl space-y-3">
                  {analysis.watch_list.next_24h && analysis.watch_list.next_24h.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-gray-900 mb-1.5">Next 24 Hours</div>
                      <div className="space-y-0.5">
                        {analysis.watch_list.next_24h.map((item, idx) => (
                          <div key={idx} className="text-xs text-gray-700">• {item}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.watch_list.next_48h && analysis.watch_list.next_48h.length > 0 && (
                    <div className="pt-3 border-t border-gray-200">
                      <div className="text-xs font-semibold text-gray-900 mb-1.5">Next 48 Hours</div>
                      <div className="space-y-0.5">
                        {analysis.watch_list.next_48h.map((item, idx) => (
                          <div key={idx} className="text-xs text-gray-700">• {item}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Invalidation Triggers */}
            {analysis.invalidation && analysis.invalidation.length > 0 && (
              <div className="space-y-1">
                <h3 className="text-sm font-semibold tracking-wide">Invalidation Triggers</h3>
                <div className="glass-section p-4 rounded-xl">
                  <div className="space-y-1">
                    {analysis.invalidation.map((trigger, idx) => (
                      <div key={idx} className="text-xs text-gray-700 flex items-start gap-1">
                        <span className="text-red-500">•</span>
                        <span className="flex-1">{trigger}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Chain-of-Thought */}
        {analysis.thinking && (
          <CollapsibleSection title="Chain-of-Thought Process">
            <div className="glass-section p-4 rounded-xl">
              {renderThinking()}
            </div>
          </CollapsibleSection>
        )}
      </div>
    </CollapsibleCard>
  );
}

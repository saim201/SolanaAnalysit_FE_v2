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

  const getIndicatorTooltip = (name: string): { title: string; description: string; calculation: string } => {
    switch (name) {
      case 'EMA20':
        return {
          title: 'EMA 20 (Exponential Moving Average)',
          description: 'Tracks short-term price trends by giving more weight to recent prices. Used to identify immediate support/resistance.',
          calculation: 'Calculation: 20-period exponential weighted moving average'
        };

      case 'EMA50':
        return {
          title: 'EMA 50 (Exponential Moving Average)',
          description: 'Tracks medium-term price trends. Price above EMA50 indicates bullish momentum, below indicates bearish.',
          calculation: 'Calculation: 50-period exponential weighted moving average'
        };

      case 'RSI':
        return {
          title: 'RSI (Relative Strength Index)',
          description: 'Momentum oscillator measuring speed and magnitude of price changes. Values above 70 indicate overbought, below 30 indicate oversold.',
          calculation: 'Calculation: 14-period gains/losses ratio (0-100 scale)'
        };

      case 'MACD Line':
        return {
          title: 'MACD Line',
          description: 'Trend-following momentum indicator showing the relationship between two moving averages. When above signal line, bullish; below, bearish.',
          calculation: 'Calculation: 12-period EMA minus 26-period EMA'
        };

      case 'MACD Signal':
        return {
          title: 'MACD Signal Line',
          description: 'The signal line for MACD crossovers. When MACD line crosses above, it generates a buy signal; below, a sell signal.',
          calculation: 'Calculation: 9-period EMA of MACD line'
        };

      case 'BB Upper':
        return {
          title: 'Bollinger Band Upper',
          description: 'Upper boundary representing overbought levels. Price touching or exceeding this level suggests potential reversal or consolidation.',
          calculation: 'Calculation: 20-period SMA + (2 × standard deviation)'
        };

      case 'BB Lower':
        return {
          title: 'Bollinger Band Lower',
          description: 'Lower boundary representing oversold levels. Price touching or falling below suggests potential bounce or reversal.',
          calculation: 'Calculation: 20-period SMA - (2 × standard deviation)'
        };

      case 'ATR':
        return {
          title: 'ATR (Average True Range)',
          description: 'Volatility indicator measuring the degree of price movement. Higher values indicate higher volatility and risk.',
          calculation: 'Calculation: 14-period average of true range values'
        };

      case 'Volume Ratio':
        return {
          title: 'Volume Ratio',
          description: 'Compares current volume to average volume. Values >1.5 indicate high activity, <0.7 indicate low activity.',
          calculation: 'Calculation: Current volume ÷ 20-period average volume'
        };

      case 'Support':
        return {
          title: 'Support Level',
          description: 'Price level where buying pressure typically prevents further decline.',
          calculation: 'Calculation: Based on EMA levels and price percentiles'
        };

      case 'Resistance':
        return {
          title: 'Resistance Level',
          description: 'Price level where selling pressure typically prevents further rise.',
          calculation: 'Calculation: Based on EMA levels and price percentiles'
        };

      default:
        return {
          title: name,
          description: 'Technical indicator',
          calculation: 'N/A'
        };
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

  const currentPrice = technicalData?.currentPrice || analysis.trade_setup.current_price || 0;

  return (
    <CollapsibleCard
      title="Technical Analyst"
      functionalities="Price action • Indicators • Volume-driven"
      lastUpdated={analysis.timestamp || timestamp}
      defaultExpanded={false}
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="space-y-3">

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
            <div className="text-[10px] text-gray-500 mb-0.5">Market State</div>
            <div className="text-xs font-semibold text-gray-800">{analysis.market_condition}</div>
          </div>
          <div className="glass-section p-2 rounded-lg text-center">
            <div className="text-[10px] text-gray-500 mb-0.5">Confidence</div>
            <div className="text-sm font-bold">{(analysis.confidence.score * 100).toFixed(0)}%</div>
          </div>
        </div>

        {/* Action Plan - Compact Grid */}
        <div className="glass-section p-2.5 rounded-lg">
          <h3 className="text-xs font-semibold tracking-wide text-gray-800 mb-2">Analyst Suggestion</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className=" p-2 rounded border-l-2 border-green-500">
              <div className="text-[10px] font-semibold text-green-700 mb-0.5">For Buyers</div>
              <p className="text-[11px] text-gray-700 leading-snug">{analysis.action_plan.for_buyers}</p>
            </div>
            <div className="p-2 rounded border-l-2 border-red-500">
              <div className="text-[10px] font-semibold text-red-700 mb-0.5">For Sellers</div>
              <p className="text-[11px] text-gray-700 leading-snug">{analysis.action_plan.for_sellers}</p>
            </div>
            <div className="p-2 rounded border-l-2 border-blue-500">
              <div className="text-[10px] font-semibold text-blue-700 mb-0.5">If Holding</div>
              <p className="text-[11px] text-gray-700 leading-snug">{analysis.action_plan.if_holding}</p>
            </div>
            <div className="p-2 rounded border-l-2 border-amber-500">
              <div className="text-[10px] font-semibold text-amber-700 mb-0.5">Avoid</div>
              <p className="text-[11px] text-gray-700 leading-snug">{analysis.action_plan.avoid}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

          {/* LEFT COLUMN */}
          <div className="space-y-3">

            {/* Technical Indicators Table */}
            <div className="space-y-1">
              <h3 className="text-sm font-semibold tracking-wide text-gray-800">Technical Indicators</h3>
              <div className="glass-section rounded-lg overflow-hidden">
                <div className="max-h-60 overflow-y-auto">
                  <table className="w-full text-[11px]">
                    <thead className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-300/50">
                      <tr>
                        <th className="text-left py-1.5 px-2 text-gray-700 font-semibold">#</th>
                        <th className="text-left py-1.5 px-2 text-gray-700 font-semibold">Indicator</th>
                        <th className="text-right py-1.5 px-2 text-gray-700 font-semibold">Value</th>
                        <th className="text-right py-1.5 px-2 text-gray-700 font-semibold">Signal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {indicatorsData.map((indicator, index) => {
                        const signal = getIndicatorSignal(indicator.name, indicator.value, currentPrice);
                        const tooltip = getIndicatorTooltip(indicator.name);
                        return (
                          <tr key={indicator.name} className="border-b border-gray-200/40 last:border-0 hover:bg-gray-50 transition-colors duration-150">
                            <td className="py-1.5 px-2 text-gray-600">{index + 1}</td>
                            <td className="py-1.5 px-2 text-gray-800 font-medium">
                              <div className="flex items-center gap-1">
                                <span>{indicator.name}</span>
                                <div className="group relative">
                                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <div className="invisible group-hover:visible absolute left-0 top-4 z-10 w-56 p-2 bg-gray-700 text-white text-[10px] rounded-lg shadow-lg">
                                    <div className="absolute -top-1 left-1 w-2 h-2 bg-gray-700 rotate-45"></div>
                                    <div className="font-semibold mb-1">{tooltip.title}</div>
                                    <div className="mb-1">{tooltip.description}</div>
                                    <div className="text-gray-300 text-[9px] italic">{tooltip.calculation}</div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-1.5 px-2 text-right text-gray-900 font-medium">
                              {indicator.value !== undefined && indicator.value !== null
                                ? indicator.value.toFixed(2)
                                : '─'}
                            </td>
                            <td className={`py-1.5 px-2 text-right font-medium ${signal.color}`}>
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
            <div className="space-y-1">
              <h3 className="text-sm font-semibold tracking-wide text-gray-800">Analysis Breakdown</h3>
              <div className="glass-section p-2.5 rounded-lg space-y-2">
                {analysis.analysis?.trend && (
                  <div>
                    <div className="text-[11px] font-semibold text-gray-900 mb-0.5 flex items-center gap-1.5">
                      <span>Trend</span>
                      <span className="text-[10px] font-normal text-gray-500">
                        {analysis.analysis.trend.direction} • {analysis.analysis.trend.strength}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-700 leading-relaxed">{analysis.analysis.trend.detail}</p>
                  </div>
                )}

                {analysis.analysis?.momentum && (
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-[11px] font-semibold text-gray-900 mb-0.5 flex items-center gap-1.5">
                      <span>Momentum</span>
                      <span className="text-[10px] font-normal text-gray-500">
                        {analysis.analysis.momentum.direction} • {analysis.analysis.momentum.strength}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-700 leading-relaxed">{analysis.analysis.momentum.detail}</p>
                  </div>
                )}

                {analysis.analysis?.volume && (
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-[11px] font-semibold text-gray-900 mb-0.5 flex items-center gap-1.5">
                      <span>Volume</span>
                      <span className="text-[10px] font-normal text-gray-500">
                        {analysis.analysis.volume.quality} • {analysis.analysis.volume.ratio.toFixed(2)}x
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-700 leading-relaxed">{analysis.analysis.volume.detail}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Trade Setup */}
            {/* <div className="space-y-1">
              <h3 className="text-xs font-semibold tracking-wide text-gray-800">Trade Setup</h3>
              <div className="glass-section p-2.5 rounded-lg space-y-1.5">
                <div className="pb-1.5 border-b border-gray-200">
                  <div className="text-[10px] text-gray-500 mb-0.5">Viability</div>
                  <p className={`text-[11px] font-semibold ${
                    analysis.trade_setup.viability === 'VALID' ? 'text-green-700' :
                    analysis.trade_setup.viability === 'INVALID' ? 'text-red-700' :
                    'text-amber-700'
                  }`}>{analysis.trade_setup.viability}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-gray-500">Current</span>
                    <div className="font-semibold text-gray-900">${analysis.trade_setup.current_price.toFixed(2)}</div>
                  </div>
                  {analysis.trade_setup.entry && (
                    <div>
                      <span className="text-gray-500">Entry</span>
                      <div className="font-semibold text-green-700">${analysis.trade_setup.entry.toFixed(2)}</div>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-500">Support</span>
                    <div className="font-semibold text-blue-700">${analysis.trade_setup.support.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Resistance</span>
                    <div className="font-semibold text-red-700">${analysis.trade_setup.resistance.toFixed(2)}</div>
                  </div>
                  {analysis.trade_setup.stop_loss && (
                    <div>
                      <span className="text-gray-500">Stop Loss</span>
                      <div className="font-semibold text-red-700">${analysis.trade_setup.stop_loss.toFixed(2)}</div>
                    </div>
                  )}
                  {analysis.trade_setup.take_profit && (
                    <div>
                      <span className="text-gray-500">Take Profit</span>
                      <div className="font-semibold text-green-700">${analysis.trade_setup.take_profit.toFixed(2)}</div>
                    </div>
                  )}
                </div>

                <div className="pt-1.5 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">Risk/Reward</span>
                  <span className={`text-xs font-bold ${
                    analysis.trade_setup.risk_reward >= 1.5 ? 'text-green-600' :
                    analysis.trade_setup.risk_reward >= 1.0 ? 'text-amber-600' :
                    'text-red-600'
                  }`}>{analysis.trade_setup.risk_reward.toFixed(2)}:1</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">Timeframe</span>
                  <span className="text-[11px] font-semibold text-gray-900">{analysis.trade_setup.timeframe}</span>
                </div>
              </div>
            </div> */}

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-3">

            {/* Look for */}
            <div className="space-y-1">
              <h3 className="text-sm font-semibold tracking-wide text-gray-800">Look for</h3>
              <div className="glass-section p-2.5 rounded-lg space-y-2">
                {analysis.watch_list?.bullish_signals && analysis.watch_list.bullish_signals.length > 0 && (
                  <div>
                    <div className="text-[11px] font-semibold text-green-700 mb-1">Bullish Signals</div>
                    <div className="space-y-0.5">
                      {analysis.watch_list.bullish_signals.map((signal, idx) => (
                        <div key={idx} className="text-[11px] text-gray-700 flex items-start gap-1">
                          <span className="text-green-500 mt-0.5">•</span>
                          <span className="flex-1">{signal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {analysis.watch_list?.bearish_signals && analysis.watch_list.bearish_signals.length > 0 && (
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-[11px] font-semibold text-red-700 mb-1">Bearish Signals</div>
                    <div className="space-y-0.5">
                      {analysis.watch_list.bearish_signals.map((signal, idx) => (
                        <div key={idx} className="text-[11px] text-gray-700 flex items-start gap-1">
                          <span className="text-red-500 mt-0.5">•</span>
                          <span className="flex-1">{signal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Invalidation Triggers */}
            {analysis.invalidation && analysis.invalidation.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <h3 className="text-sm font-semibold tracking-wide text-gray-800">Invalidation Triggers</h3>
                  <div className="group relative">
                    <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="invisible group-hover:visible absolute left-0 top-4 z-10 w-48 p-2 bg-gray-700 text-white text-[10px] rounded-lg shadow-lg">
                      <div className="absolute -top-1 left-1 w-2 h-2 bg-gray-700 rotate-45"></div>
                      Exit immediately if any trigger occurs
                    </div>
                  </div>
                </div>
                <div className="glass-section p-2.5 rounded-lg bg-red-50/50">
                  <div className="space-y-0.5">
                    {analysis.invalidation.map((trigger, idx) => (
                      <div key={idx} className="text-[11px] text-gray-700 flex items-start gap-1">
                        <span className="text-red-500 mt-0.5">•</span>
                        <span className="flex-1">{trigger}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Confidence Reasoning */}
            <div className="space-y-1">
              <h3 className="text-sm font-semibold tracking-wide text-gray-800">Confidence Reasoning</h3>
              <div className="glass-section p-2.5 rounded-lg space-y-2">
                <div>
                  <div className="text-[11px] font-semibold text-green-700 mb-0.5">Supporting</div>
                  <p className="text-[11px] text-gray-700 leading-relaxed">{analysis.confidence_reasoning.supporting}</p>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <div className="text-[11px] font-semibold text-amber-700 mb-0.5">Concerns</div>
                  <p className="text-[11px] text-gray-700 leading-relaxed">{analysis.confidence_reasoning.concerns}</p>
                </div>
              </div>
            </div>

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

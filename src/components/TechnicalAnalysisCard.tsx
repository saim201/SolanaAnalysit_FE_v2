import type { TechnicalAnalysis, TechnicalDataResponse } from '../types';
import CollapsibleCard from './CollapsibleCard';
// import ConfidenceBar from './ConfidenceBar';
import CollapsibleSection from './CollapsibleSection';

interface TechnicalAnalysisCardProps {
  analysis: TechnicalAnalysis;
  technicalData?: TechnicalDataResponse | null;
  isExpanded?: boolean;
  onToggle?: () => void;
  timestamp?: string;
}

export default function TechnicalAnalysisCard({ analysis, technicalData, isExpanded, onToggle, timestamp }: TechnicalAnalysisCardProps) {
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
      case 'EMA200':
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

      case 'Pivot':
        if (currentPrice > value) return { text: 'Bullish', color: 'text-green-600' };
        if (currentPrice < value) return { text: 'Bearish', color: 'text-red-600' };
        return { text: 'Neutral', color: 'text-gray-700' };

      default:
        return { text: '─', color: 'text-gray-700' };
    }
  };

  const indicatorsData = [
    { name: 'EMA20', value: technicalData?.ema20 },
    { name: 'EMA50', value: technicalData?.ema50 },
    { name: 'EMA200', value: technicalData?.ema200 },
    { name: 'RSI', value: technicalData?.rsi },
    { name: 'MACD Line', value: technicalData?.macd_line },
    { name: 'MACD Signal', value: technicalData?.macd_signal },
    { name: 'BB Upper', value: technicalData?.bb_upper },
    { name: 'BB Lower', value: technicalData?.bb_lower },
    { name: 'ATR', value: technicalData?.atr },
    { name: 'Volume Ratio', value: technicalData?.volume_ratio },
    { name: 'Support', value: technicalData?.support1 },
    { name: 'Resistance', value: technicalData?.resistance1 },
    { name: 'Pivot', value: technicalData?.pivot_weekly },
  ];

  const currentPrice = technicalData?.currentPrice || 0;


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

          <div className="space-y-6">

            {analysis.key_signals && analysis.key_signals.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900 tracking-wide">
                  Key Findings
                </h3>
                <div className="glass-section p-4 rounded-xl">
                  {analysis.key_signals.map((signal, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2"
                    >
                      <span className="text-gray-500 mt-0.5 text-xs">•</span>
                      <span className="text-sm text-gray-800 leading-relaxed flex-1">{signal}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Indicators Table */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900 tracking-wide">
                Indicators
              </h3>
              <div className="glass-section rounded-lg overflow-hidden">
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-300/50">
                      <tr>
                        <th className="text-left py-2 px-3 text-gray-700 font-semibold">#</th>
                        <th className="text-left py-2 px-3 text-gray-700 font-semibold">Name</th>
                        <th className="text-right py-2 px-3 text-gray-700 font-semibold">Value</th>
                        <th className="text-right py-2 px-3 text-gray-700 font-semibold">Signal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {indicatorsData.map((indicator, index) => {
                        const signal = getIndicatorSignal(indicator.name, indicator.value, currentPrice);
                        return (
                          <tr key={indicator.name} className="border-b border-gray-200/40 last:border-0 hover:bg-gray-100/60 transition-colors duration-150 ">
                            <td className="py-2 px-3 text-gray-600">{index + 1}</td>
                            <td className="py-2 px-3 text-gray-800 ">{indicator.name}</td>
                            <td className="py-2 px-3 text-right text-gray-900">
                              {indicator.value !== undefined && indicator.value !== null
                                ? indicator.value.toFixed(2)
                                : '─'}
                            </td>
                            <td className={`py-2 px-3 text-right ${signal.color}`}>
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
          </div>


          <div className="space-y-6">
            {/* <div className="glass-section p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-800">Confidence Level</span>
                <span className="text-lg text-gray-900">{(analysis.confidence * 100).toFixed(0)}%</span>
              </div>
            </div> */}

            {/* Confidence Breakdown */}
            {/* {analysis.confidence_breakdown && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                  Confidence Breakdown
                </h3>
                <div className="space-y-2 glass-section p-4 rounded-xl">
                  {Object.entries(analysis.confidence_breakdown).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm text-gray-800 capitalize ">
                        {key.replace(/_/g, ' ')}
                      </span>
                      <span className="text-sm text-gray-900">
                        {(value * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Summary */}
            <div className="space-y-2  border-gray-300/50">
              <h3 className="text-sm font-medium text-gray-900 tracking-wide">
                Analysis Summary
              </h3>
              <div className="glass-section p-4 rounded-xl">
                <p className="text-sm text-gray-800 leading-relaxed ">{analysis.reasoning}</p>
              </div>
            </div>

            {/* Suggestion */}
            <div className="space-y-2  border-gray-300/50">
              <h3 className="text-sm font-medium text-gray-900 tracking-wide">
                Suggestion
              </h3>
              <div className="glass-section p-4 rounded-xl">
                <p className="text-sm text-gray-800 leading-relaxed ">{analysis.recommendation_summary}</p>
              </div>
            </div>

            {/* {(analysis.entry_level || analysis.stop_loss || analysis.take_profit) && (
              <div className="grid grid-cols-3 gap-3">
                {analysis.entry_level && (
                  <div className="p-3 bg-white/60 rounded-xl border border-gray-200/40 backdrop-blur-sm shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-200">
                    <div className="text-xs text-gray-700 mb-1">Entry Point</div>
                    <div className="text-lg text-gray-900 font-semibold">${analysis.entry_level.toFixed(2)}</div>
                  </div>
                )}
                {analysis.stop_loss && (
                  <div className="p-3 bg-white/60 rounded-xl border border-gray-200/40 backdrop-blur-sm shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-200">
                    <div className="text-xs text-gray-700 mb-1">Stop Loss</div>
                    <div className="text-lg text-gray-900 font-semibold">${analysis.stop_loss.toFixed(2)}</div>
                  </div>
                )}
                {analysis.take_profit && (
                  <div className="p-3 bg-white/60 rounded-xl border border-gray-200/40 backdrop-blur-sm shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-200">
                    <div className="text-xs text-gray-700 mb-1">Exit</div>
                    <div className="text-lg text-gray-900 font-semibold">${analysis.take_profit.toFixed(2)}</div>
                  </div>
                )}
              </div>
            )} */}

          </div>
        </div>



        {/* Summary */}
        {/* <div className="space-y-3 pt-4 border-t border-gray-300/50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Analysis Summary
          </h3>
          <div className="glass-section p-4 rounded-xl">
            <p className="text-sm text-gray-800 leading-relaxed font-medium">{analysis.reasoning}</p>
          </div>
        </div> */}
        
        {/* chain-of-thought (Collapsible) */}
        {analysis.thinking && (
          <CollapsibleSection title="Chain-of-Thought process">
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

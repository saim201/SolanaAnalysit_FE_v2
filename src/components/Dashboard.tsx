import type { TradeAnalysisResponse, TickerResponse } from '../types';

interface MarketData {
  currentPrice: number;
  priceChange24h: number;
  ema20: number;
  ema50: number;
  support: number;
  resistance: number;
  volume: {
    current: number;
    average: number;
    status: 'LOW' | 'NORMAL' | 'HIGH';
  };
  trend: {
    daily: 'Bearish' | 'Bullish' | 'Neutral';
    fourHour: 'Bearish' | 'Bullish' | 'Neutral';
    adx: number;
    adxStatus: 'Weak' | 'Strong';
  };
  indicators: {
    rsi: number;
    macd: 'Bullish' | 'Bearish' | 'Neutral';
  };
  trackRecord: {
    wins: number;
    holds: number;
    losses: number;
    accuracy: number;
  };
}

interface TradingDashboardProps {
  analysis: TradeAnalysisResponse;
  marketData?: MarketData | null;
  tickerData?: TickerResponse | null;
}

export default function Dashboard({ analysis, marketData, tickerData }: TradingDashboardProps) {
  const { technical_analysis, trader_analysis } = analysis;

  const currentPrice = marketData?.currentPrice || 0;
  const priceChange24h = marketData?.priceChange24h || 0;

  const currentTime = new Date(tickerData?.timestamp || '').toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <div className="space-y-6">

      {/* Market Stats Header Section */}
      <div className="glass-card rounded-xl p-3 sm:p-4 md:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 mb-3 md:mb-4 border-b border-gray-200 gap-2">
          <div className="flex items-center gap-2">
            {/* <div className="w-2 h-2 bg-green-500 rounded-full"></div> */}
            <h2 className="text-sm sm:text-base font-semibold text-gray-900">SOL/USDT</h2>
          </div>
          <div className="text-xs text-gray-500">Updated at: {currentTime}</div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">

          {/* Current Price */}
          <div className="glass-card rounded-lg p-2 sm:p-3 col-span-2 sm:col-span-1">
            <div className="text-xs text-gray-500 uppercase mb-1.5 font-medium">Current Price</div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-0.5">${currentPrice.toFixed(2)}</div>
            <div className={`text-xs font-semibold ${priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <span className="text-xs font-normal text-gray-400">Last 24h: </span>{priceChange24h >= 0 ? '+' : ''}{priceChange24h.toFixed(1)}%
            </div>
          </div>
          <div className="glass-card rounded-lg p-2 sm:p-3">
            <div className="text-xs text-gray-500 uppercase mb-1.5 font-medium">Open</div>
            <div className="text-sm sm:text-lg font-bold text-gray-900">${tickerData ? tickerData.openPrice.toFixed(2) : '0.00'}</div>
          </div>
          <div className="glass-card rounded-lg p-2 sm:p-3">
            <div className="text-xs text-gray-500 uppercase mb-1.5 font-medium">High</div>
            <div className="text-sm sm:text-lg font-bold text-gray-900">${tickerData ? tickerData.highPrice.toFixed(2) : '0.00'}</div>
          </div>
          <div className="glass-card rounded-lg p-2 sm:p-3">
            <div className="text-xs text-gray-500 uppercase mb-1.5 font-medium">Low</div>
            <div className="text-sm sm:text-lg font-bold text-gray-900">${tickerData ? tickerData.lowPrice.toFixed(2) : '0.00'}</div>
          </div>
          <div className="glass-card rounded-lg p-2 sm:p-3">
            <div className="text-xs text-gray-500 uppercase mb-1.5 font-medium">Close</div>
            <div className="text-sm sm:text-lg font-bold text-gray-900">${tickerData ? tickerData.lastPrice.toFixed(2) : '0.00'}</div>
          </div>
          <div className="glass-card rounded-lg p-2 sm:p-3 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-xs text-gray-500 uppercase font-medium">Vol (SOL)</div>
              <div className="text-sm sm:text-lg font-bold text-gray-900">{tickerData ? (tickerData.volume / 1_000_000).toFixed(2) : '0.00'}M</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500 uppercase font-medium">Vol (USDT)</div>
              <div className="text-sm sm:text-lg font-bold text-gray-900">${tickerData ? (tickerData.quoteVolume / 1_000_000_000).toFixed(2) : '0.00'}B</div>
            </div>
          </div>
        </div>
      </div>


      {/* Trading Signal Summary */}
      <div className="glass-card rounded-xl p-3 sm:p-4 md:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 mb-3 md:mb-4 border-b border-gray-200 gap-2">
          <h3 className="text-sm sm:text-base font-bold text-gray-900">Technical analyst findings</h3>
          <div className="flex items-center gap-3">
            {/* <span className="text-xs sm:text-sm text-gray-600">Confidence: {(trader_analysis.confidence * 100).toFixed(0)}%</span> */}
          </div>
        </div>

        {/* Trade Setup or Analysis Summary */}
        {trader_analysis.execution_plan && trader_analysis.execution_plan.entry_price_target ? (
          <>
            <h4 className="text-xs font-bold text-gray-700 uppercase mb-3">Trade Setup</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
              <div className="glass-card rounded-lg p-2 sm:p-3">
                <div className="text-xs text-gray-500 mb-1">Entry</div>
                <div className="text-sm sm:text-lg font-bold text-gray-900">
                  ${trader_analysis.execution_plan.entry_price_target.toFixed(2)}
                </div>
              </div>
              <div className="glass-card rounded-lg p-2 sm:p-3">
                <div className="text-xs text-gray-500 mb-1">Stop Loss</div>
                <div className="text-sm sm:text-lg font-bold text-red-600">
                  {trader_analysis.execution_plan.stop_loss ? `$${trader_analysis.execution_plan.stop_loss.toFixed(2)}` : '──'}
                </div>
              </div>
              <div className="glass-card rounded-lg p-2 sm:p-3">
                <div className="text-xs text-gray-500 mb-1">Target</div>
                <div className="text-sm sm:text-lg font-bold text-green-600">
                  {trader_analysis.execution_plan.take_profit ? `$${trader_analysis.execution_plan.take_profit.toFixed(2)}` : '──'}
                </div>
              </div>
              <div className="glass-card rounded-lg p-2 sm:p-3">
                <div className="text-xs text-gray-500 mb-1">Risk/Reward</div>
                <div className="text-sm sm:text-lg font-bold text-gray-900">
                  {trader_analysis.execution_plan.risk_reward_ratio || '──'}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* <h4 className="text-xs font-bold text-gray-700 uppercase mb-3">What To Do</h4> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded border-l-2 border-green-500">
                <div className="text-[10px] font-semibold text-green-700 mb-1">For Buyers</div>
                <p className="text-[11px] text-gray-700 leading-snug">{technical_analysis.action_plan.for_buyers}</p>
              </div>
              <div className="p-2.5 rounded border-l-2 border-red-500">
                <div className="text-[10px] font-semibold text-red-700 mb-1">For Sellers</div>
                <p className="text-[11px] text-gray-700 leading-snug">{technical_analysis.action_plan.for_sellers}</p>
              </div>
              <div className="p-2.5 rounded border-l-2 border-blue-500">
                <div className="text-[10px] font-semibold text-blue-700 mb-1">If Holding</div>
                <p className="text-[11px] text-gray-700 leading-snug">{technical_analysis.action_plan.if_holding}</p>
              </div>
              <div className="p-2.5 rounded border-l-2 border-amber-500">
                <div className="text-[10px] font-semibold text-amber-700 mb-1">Avoid</div>
                <p className="text-[11px] text-gray-700 leading-snug">{technical_analysis.action_plan.avoid}</p>
              </div>
            </div>
          </>
        )}

        {/* Key Insight */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <div className="text-xs font-bold text-gray-900 mb-1">Key Insight</div>
              <div className="text-xs text-gray-700">
                {trader_analysis.reasoning || technical_analysis.confidence.interpretation || 'Analysing market conditions...'}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

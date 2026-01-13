import type { TechnicalDataResponse, TickerResponse } from '../types';

interface TradingDashboardProps {
  technicalData?: TechnicalDataResponse | null;
  tickerData?: TickerResponse | null;
  analysisCompletionTimestamp?: string | null;
  loading: boolean;
  onRunAnalysis: () => void;
}

export default function Dashboard({ technicalData, tickerData, analysisCompletionTimestamp, loading, onRunAnalysis }: TradingDashboardProps) {
  const getTimeSinceUpdate = () => {
    if (!analysisCompletionTimestamp) return '—';

    const now = new Date();
    const completionTime = new Date(analysisCompletionTimestamp);
    const diffMs = now.getTime() - completionTime.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);

    if (diffSecs < 10) {
      return 'just now';
    } else if (diffSecs < 60) {
      return `${diffSecs} seconds ago`;
    } else if (diffMins === 1) {
      return '1 minute ago';
    } else if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    }
  };

  const getStatusInfo = (): { status: string; color: string; animate: boolean } => {
    if (!analysisCompletionTimestamp) {
      return { status: 'Idle', color: 'bg-gray-400', animate: false };
    }

    const now = new Date();
    const completionTime = new Date(analysisCompletionTimestamp);
    const diffMs = now.getTime() - completionTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins <= 3) {
      return { status: 'Live', color: 'bg-green-500', animate: true };
    } else {
      return { status: 'Idle', color: 'bg-gray-400', animate: false };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="space-y-4">
      {/* Hero Section - Only show when status is Idle */}
      {statusInfo.status === 'Idle' && (
        <div className="glass-card rounded-xl p-8 sm:p-12 text-center">
          <p className="text-gray-600 text-sm mb-6 leading-relaxed max-w-3xl mx-auto">
            This system doesn't auto-analyse currently. Click the button below to run the analysis and get the latest results based on current market data.
          </p>
          <button
            onClick={onRunAnalysis}
            disabled={loading}
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 hover:bg-black text-white text-base font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analysing...</span>
              </>
            ) : (
              <>
                <span className='cursor-pointer'>Run Analysis </span>
              </>
            )}
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Last analysis completed {getTimeSinceUpdate()}
          </p>
        </div>
      )}

      {/* Status Bar */}
      <div className="glass-card rounded-xl p-5">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
          {/* Status */}
          <div className="flex items-center justify-center gap-2 flex-1 w-full sm:w-auto">
            <span className="text-sm text-gray-600">Status:</span>
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 ${statusInfo.color} rounded-full ${statusInfo.animate ? 'animate-pulse' : ''}`}></div>
              <span className="font-semibold text-gray-900">{statusInfo.status}</span>
            </div>
          </div>

          <div className="hidden sm:block w-px h-6 bg-gray-300 mx-6"></div>

          {/* Last Updated */}
          <div className="flex items-center justify-center gap-2 flex-1 w-full sm:w-auto">
            <span className="text-sm text-gray-600">Last Updated:</span>
            <span className="font-semibold text-gray-900">
              {getTimeSinceUpdate()}
            </span>
          </div>

          <div className="hidden sm:block w-px h-6 bg-gray-300 mx-6"></div>

          {/* SOL/USDT */}
          <div className="flex items-center justify-center gap-2 flex-1 w-full sm:w-auto">
            <span className="text-sm text-gray-600">SOL/USDT:</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-gray-900">
                ${tickerData?.lastPrice?.toFixed(2) || technicalData?.currentPrice?.toFixed(2) || '—'}
              </span>
              {tickerData?.priceChangePercent !== undefined ? (
                <span className={`text-xs font-semibold ${tickerData.priceChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {tickerData.priceChangePercent >= 0 ? '+' : ''}{tickerData.priceChangePercent.toFixed(1)}% (24h)
                </span>
              ) : technicalData?.priceChange24h !== undefined ? (
                <span className={`text-xs font-semibold ${technicalData.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {technicalData.priceChange24h >= 0 ? '+' : ''}{technicalData.priceChange24h.toFixed(1)}%
                </span>
              ) : null}
            </div>
          </div>

          <div className="hidden sm:block w-px h-6 bg-gray-300 mx-6"></div>

          {/* 24h Volume */}
          <div className="flex items-center justify-center gap-2 flex-1 w-full sm:w-auto">
            <span className="text-sm text-gray-600">24h Volume:</span>
            <span className="font-bold text-gray-900">
              {tickerData?.quoteVolume
                ? `$${(tickerData.quoteVolume / 1_000_000_000).toFixed(2)}B`
                : technicalData?.volume_current
                ? `$${(technicalData.volume_current * 1000).toFixed(2)}B`
                : '—'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

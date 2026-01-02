import { useState, useEffect } from 'react';
import type { TradeAnalysisResponse, TechnicalDataResponse, TickerResponse } from './types';
import { api } from './services/api';
import TechnicalAnalysisCard from './components/TechnicalAnalysisCard';
import SentimentAnalysisCard from './components/SentimentAnalysisCard';
import ReflectionAnalysisCard from './components/ReflectionAnalysisCard';
import TraderAnalysisCard from './components/TraderAnalysisCard';
import HistoricalPredictions from './components/HistoricalPredictions';
import ProjectHighlightsModal from './components/ProjectHighlightsModal';
import Dashboard from './components/Dashboard';
import LoadingScreen from './components/LoadingScreen';
import AnalysisProgressModal from './components/AnalysisProgressModal';
import ReactGA from 'react-ga4';

interface ProgressStep {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'completed' | 'error' | 'warning';
  message?: string;
}

function App() {
  const [analysis, setAnalysis] = useState<TradeAnalysisResponse | null>(null);
  const [technicalData, setTechnicalData] = useState<TechnicalDataResponse | null>(null);
  const [tickerData, setTickerData] = useState<TickerResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [progressSteps, setProgressSteps] = useState<ProgressStep[]>([
    { id: 'refresh_data', label: 'Fetching Real-Time Market Data', status: 'pending' },
    { id: 'technical_agent', label: 'Technical Agent', status: 'pending' },
    { id: 'sentiment_agent', label: 'Sentiment Agent', status: 'pending' },
    { id: 'reflection_agent', label: 'Reflection Agent', status: 'pending' },
    { id: 'trader_agent', label: 'Trader Agent', status: 'pending' },
    { id: 'complete', label: 'Finalising Results', status: 'pending' },
  ]);

  const handleCardToggle = (cardName: string) => {
    const isExpanding = openCard !== cardName;

    if (isExpanding) {
      ReactGA.event({
        category: 'Card Interaction',
        action: 'Card Expanded',
        label: cardName
      });
    }

    setOpenCard(openCard === cardName ? null : cardName);
  };

  const handleProjectModalOpen = () => {
    ReactGA.event({
      category: 'Modal Interaction',
      action: 'Project Info Opened',
      label: 'Project Highlights Modal'
    });
    setShowProjectModal(true);
  };

  const handleProjectModalClose = () => {
    ReactGA.event({
      category: 'Modal Interaction',
      action: 'Project Info Closed',
      label: 'Project Highlights Modal'
    });
    setShowProjectModal(false);
  };

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname, title: 'TradingMate Dashboard' });

    const fetchLatestAnalysis = async () => {
      setInitialLoading(true);
      try {
        const [latestAnalysis, techData, ticker] = await Promise.all([
          api.getLatestAnalysis(),
          api.getTechnicalData(),
          api.getTicker()
        ]);

        setAnalysis(latestAnalysis);
        setTechnicalData(techData);
        setTickerData(ticker);
      } catch {
        console.log('No previous analysis found, start fresh');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchLatestAnalysis();
  }, []);



  const handleAnalyse = async () => {
    ReactGA.event({
      category: 'User Interaction',
      action: 'Run Analysis',
      label: 'Analysis Button Clicked'
    });

    setLoading(true);
    setError(null);
    setShowProgressModal(true);

    setProgressSteps([
      { id: 'refresh_data', label: 'Fetching Real-Time Market Data', status: 'pending' },
      { id: 'technical_agent', label: 'Technical Agent', status: 'pending' },
      { id: 'sentiment_agent', label: 'Sentiment Agent', status: 'pending' },
      { id: 'reflection_agent', label: 'Reflection Agent', status: 'pending' },
      { id: 'trader_agent', label: 'Trader Agent', status: 'pending' },
      { id: 'complete', label: 'Finalising Results', status: 'pending' },
    ]);

    try {
      const analysisData = await api.streamAnalysis((step, status, message) => {
        setProgressSteps(prevSteps =>
          prevSteps.map(s => {
            if (s.id === step) {
              return {
                ...s,
                status: status as ProgressStep['status'],
                message: message
              };
            }
            return s;
          })
        );
      });

      setAnalysis(analysisData);

      const [techData, ticker] = await Promise.all([
        api.getTechnicalData(),
        api.getTicker()
      ]);

      setTechnicalData(techData);
      setTickerData(ticker);

      ReactGA.event({
        category: 'Analysis',
        action: 'Analysis Completed',
        label: 'Success'
      });

      setTimeout(() => {
        setShowProgressModal(false);
        setShowSuccessAlert(true);
        // Auto-hide alert after 7 seconds
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 7000);
      }, 1500);



    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analysis');
      setProgressSteps(prevSteps =>
        prevSteps.map(s =>
          s.status === 'running' ? { ...s, status: 'error' as const, message: 'Failed' } : s
        )
      );

      ReactGA.event({
        category: 'Analysis',
        action: 'Analysis Failed',
        label: err instanceof Error ? err.message : 'Unknown Error'
      });

      setTimeout(() => {
        setShowProgressModal(false);
      }, 3000);

    } finally {
      setLoading(false);
    }
  };

  // console.log("Analysts Data: ", analysis)
  // console.log("technical Data: ", technicalData)
  // console.log("ticker Data: ", tickerData)


  const getMarketData = () => {
    if (!technicalData) {
      return null;
    }
    let volumeStatus: 'LOW' | 'NORMAL' | 'HIGH' = 'NORMAL';
    if (technicalData.volume_ratio < 0.7) volumeStatus = 'LOW';
    else if (technicalData.volume_ratio > 1.5) volumeStatus = 'HIGH';
    let macdStatus: 'Bullish' | 'Bearish' | 'Neutral' = 'Neutral';
    if (technicalData.macd_line > technicalData.macd_signal) macdStatus = 'Bullish';
    else if (technicalData.macd_line < technicalData.macd_signal) macdStatus = 'Bearish';

    return {
      currentPrice: technicalData.currentPrice,
      priceChange24h: technicalData.priceChange24h,
      ema50: technicalData.ema50,
      ema20: technicalData.ema20,
      support: technicalData.support,
      resistance: technicalData.resistance,
      volume: {
        current: technicalData.volume_ratio,
        average: technicalData.volume_average,
        status: volumeStatus
      },
      trend: {
        daily: 'Neutral' as const,
        fourHour: 'Neutral' as const,
        adx: 0,
        adxStatus: 'Weak' as const
      },
      indicators: {
        rsi: technicalData.rsi,
        macd: macdStatus
      },
      trackRecord: {
        wins: 0,
        holds: 0,
        losses: 0,
        accuracy: 0
      }
    };
  }




  if (initialLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen">
      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down w-[90%] sm:w-auto max-w-lg">
          <div className="bg-green-50/95 border border-green-200/80 rounded-xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg backdrop-blur-md flex items-center gap-2 sm:gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm sm:text-base text-green-800 font-semibold">Analysis Completed Successfully!</p>
              <p className="text-green-700 text-xs sm:text-sm">All agents have finished processing the latest market data.</p>
            </div>
            <button
              onClick={() => setShowSuccessAlert(false)}
              className="flex-shrink-0 text-green-600 hover:text-green-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="glass-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                TradingMate
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 font-medium">An autonomous and smart multi-analyst system</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleProjectModalOpen}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/60 hover:bg-white/80 text-gray-800 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 sm:gap-2 border border-gray-200/60 shadow-sm backdrop-blur-sm"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="hidden sm:inline">Project Info</span>
                <span className="sm:hidden">Info</span>
              </button>
              <button
                onClick={handleAnalyse}
                disabled={loading}
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 sm:gap-2"
              >
                {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="hidden sm:inline">Analysing...</span>
                  <span className="sm:hidden">Analysing...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="hidden sm:inline">Run Analysis</span>
                  <span className="sm:hidden">Analyze</span>
                </>
              )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* System Banner */}
      {/* <SystemBanner /> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50/80 border border-red-200/60 rounded-xl text-red-700 backdrop-blur-sm shadow-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {analysis && (
          <>
            {/* Trading Dashboard - Overview */}
            <div className="mb-6 sm:mb-8">
              <Dashboard analysis={analysis} marketData={getMarketData()} tickerData={tickerData} />
            </div>

            {/* Agent Analysis Cards */}
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">Detailed Analysis</h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Expand each card to view full reasoning, complete data breakdown, and chain-of-thought process of each specialised analyst
              </p>
            </div>

            <div className='mb-6 sm:mb-8'>
              <TechnicalAnalysisCard
                analysis={analysis.technical_analysis}
                technicalData={technicalData}
                isExpanded={openCard === 'technical'}
                onToggle={() => handleCardToggle('technical')}
                timestamp={analysis.timestamp}
              />
            </div>

            <div className='mb-6 sm:mb-8'>
              <SentimentAnalysisCard
                analysis={analysis.news_analysis}
                isExpanded={openCard === 'news'}
                onToggle={() => handleCardToggle('news')}
                timestamp={analysis.timestamp}
              />
            </div>

            <div className="mb-6 sm:mb-8">
              <ReflectionAnalysisCard
                analysis={analysis.reflection_analysis}
                isExpanded={openCard === 'reflection'}
                onToggle={() => handleCardToggle('reflection')}
                timestamp={analysis.timestamp}
              />
            </div>

            <div className="mb-6 sm:mb-8">
              <TraderAnalysisCard
                analysis={analysis.trader_analysis}
                isExpanded={openCard === 'trader'}
                onToggle={() => handleCardToggle('trader')}
              />
            </div>

            {/* Historical Predictions */}
            <div className="mb-6 sm:mb-8">
              <HistoricalPredictions
                isExpanded={openCard === 'historical'}
                onToggle={() => handleCardToggle('historical')}
              />
            </div>
          </>
        )}

        {!analysis && !loading && (
          <div className="text-center py-20">
            <div className="text-gray-600 text-lg mb-4 font-medium">No analysis data available</div>
            <button
              onClick={handleAnalyse}
              className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Run First Analysis
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="glass-header mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
          <p className="font-medium">Solana (SOL/USDT) Swing Trading Analyst </p>
        </div>
      </footer>

      {/* Project Highlights Modal */}
      <ProjectHighlightsModal
        isOpen={showProjectModal}
        onClose={handleProjectModalClose}
      />

      {/* Analysis Progress Modal */}
      <AnalysisProgressModal
        isOpen={showProgressModal}
        steps={progressSteps}
      />
    </div>
  );
}

export default App;

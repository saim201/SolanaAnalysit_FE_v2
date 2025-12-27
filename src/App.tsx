import { useState, useEffect } from 'react';
import type { TradeAnalysisResponse, TechnicalDataResponse, TickerResponse } from './types';
import { mockMarketDataDefaults } from './data/mockData';
import { api } from './services/api';
import TechnicalAnalysisCard from './components/TechnicalAnalysisCard';
import NewsAnalysisCard from './components/NewsAnalysisCard';
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
  const [progressSteps, setProgressSteps] = useState<ProgressStep[]>([
    { id: 'refresh_data', label: 'Fetching Real-Time Market Data', status: 'pending' },
    { id: 'technical_agent', label: 'Running Technical Analysis Agent', status: 'pending' },
    { id: 'news_agent', label: 'Running News Sentiment Agent', status: 'pending' },
    { id: 'reflection_agent', label: 'Running Reflection Agent', status: 'pending' },
    { id: 'trader_agent', label: 'Running Trader Decision Agent', status: 'pending' },
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
      { id: 'technical_agent', label: 'Running Technical Analysis Agent', status: 'pending' },
      { id: 'news_agent', label: 'Running News Sentiment Agent', status: 'pending' },
      { id: 'reflection_agent', label: 'Running Reflection Agent', status: 'pending' },
      { id: 'trader_agent', label: 'Running Trader Decision Agent', status: 'pending' },
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

      // Fetch additional data after analysis completes
      const [techData, ticker] = await Promise.all([
        api.getTechnicalData(),
        api.getTicker()
      ]);

      setTechnicalData(techData);
      setTickerData(ticker);

      // Track successful analysis completion
      ReactGA.event({
        category: 'Analysis',
        action: 'Analysis Completed',
        label: 'Success'
      });

      // Close modal after a brief delay to show completion
      setTimeout(() => {
        setShowProgressModal(false);
      }, 1500);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analysis');

      // Update progress steps to show error
      setProgressSteps(prevSteps =>
        prevSteps.map(s =>
          s.status === 'running' ? { ...s, status: 'error' as const, message: 'Failed' } : s
        )
      );

      // Track analysis failure
      ReactGA.event({
        category: 'Analysis',
        action: 'Analysis Failed',
        label: err instanceof Error ? err.message : 'Unknown Error'
      });

      // Close modal after showing error
      setTimeout(() => {
        setShowProgressModal(false);
      }, 3000);

    } finally {
      setLoading(false);
    }
  };

  console.log("Analysts Data: ", analysis)
  console.log("technical Data: ", technicalData)
  console.log("ticker Data: ", tickerData)


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
      ema200: technicalData.ema200,
      support: technicalData.support,
      resistance: technicalData.resistance,
      volume: {
        current: technicalData.volume_ratio,
        average: technicalData.volume_average,
        status: volumeStatus
      },
      trend: mockMarketDataDefaults.trend,
      indicators: {
        rsi: technicalData.rsi,
        macd: macdStatus
      },
      trackRecord: mockMarketDataDefaults.trackRecord
    };
  }




  if (initialLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                TradingMate
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-medium">A smart muiti-agent trading analyst</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleProjectModalOpen}
                className="px-4 py-2 bg-white/60 hover:bg-white/80 text-gray-800 font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 border border-gray-200/60 shadow-sm backdrop-blur-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Project Info
              </button>
              <button
                onClick={handleAnalyse}
                disabled={loading}
                className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analysing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Run Analysis
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50/80 border border-red-200/60 rounded-xl text-red-700 backdrop-blur-sm shadow-sm">
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
            <div className="mb-8">
              <Dashboard analysis={analysis} marketData={getMarketData()} tickerData={tickerData} />
            </div>

            {/* Agent Analysis Cards */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Detailed Agent Analysis</h2>
              <p className="text-sm text-gray-600">
                Expand each card to view full reasoning, complete data breakdown, and chain-of-thought process
              </p>
            </div>

            <div className='mb-8'>
              <TechnicalAnalysisCard
                analysis={analysis.technical_analysis}
                technicalData={technicalData}
                isExpanded={openCard === 'technical'}
                onToggle={() => handleCardToggle('technical')}
                timestamp={analysis.timestamp}
              />
            </div>

            <div className='mb-8'>
              <NewsAnalysisCard
                analysis={analysis.news_analysis}
                isExpanded={openCard === 'news'}
                onToggle={() => handleCardToggle('news')}
                timestamp={analysis.timestamp}
              />
            </div>

            <div className="mb-8">
              <ReflectionAnalysisCard
                analysis={analysis.reflection_analysis}
                isExpanded={openCard === 'reflection'}
                onToggle={() => handleCardToggle('reflection')}
                timestamp={analysis.timestamp}
              />
            </div>

            <div className="mb-8">
              <TraderAnalysisCard
                analysis={analysis.trader_analysis}
                isExpanded={openCard === 'trader'}
                onToggle={() => handleCardToggle('trader')}
              />
            </div>

            {/* Historical Predictions */}
            <div className="mb-8">
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

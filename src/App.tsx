import { useState, useEffect } from 'react';
import type { TradeAnalysisResponse, TechnicalDataResponse, TickerResponse } from './types';
import { api } from './services/api';
import AnalysisTabs from './components/AnalysisTabs';
import Dashboard from './components/Dashboard';
import ProjectHighlightsModal from './components/ProjectHighlightsModal';
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

    // Refresh ticker data every 30 seconds
    const tickerInterval = setInterval(async () => {
      try {
        const ticker = await api.getTicker();
        setTickerData(ticker);
      } catch (error) {
        console.error('Failed to refresh ticker:', error);
      }
    }, 30000);

    return () => clearInterval(tickerInterval);
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
        <div className="max-w-7xl mx-auto px-2 sm:px-3 md:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                TradingMate
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 font-medium">An autonomous and smart Analyst</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleProjectModalOpen}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/60 hover:bg-white/80 text-gray-800 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 sm:gap-2 border border-gray-200/60 shadow-sm backdrop-blur-sm cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="hidden sm:inline ">Project Info</span>
                <span className="sm:hidden">Info</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* System Banner */}
      {/* <SystemBanner /> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-3 md:px-4 py-4 sm:py-6 md:py-8">
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
            {/* Hero Section and Status Bar */}
            <div className="mb-6 sm:mb-8">
              <Dashboard
                analysis={analysis}
                technicalData={technicalData}
                tickerData={tickerData}
                loading={loading}
                onRunAnalysis={handleAnalyse}
              />
            </div>

            {/* Agent Analysis Tabs */}
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">Detailed Analysis</h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Switch between tabs to view full reasoning, complete data breakdown, and chain-of-thought reasoning of each specialised analyst.
              </p>
            </div>

            <AnalysisTabs analysis={analysis} technicalData={technicalData} />
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
        <div className="max-w-7xl mx-auto px-2 sm:px-3 md:px-4 text-center text-sm text-gray-600">
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

import { useState } from 'react';
import type { TradeAnalysisResponse, TechnicalDataResponse } from '../types';
import ReactGA from 'react-ga4';

// We'll import the existing Card components to reuse their content rendering
import TechnicalAnalysisCard from './TechnicalAnalysisCard';
import SentimentAnalysisCard from './SentimentAnalysisCard';
import ReflectionAnalysisCard from './ReflectionAnalysisCard';
import TraderAnalysisCard from './TraderAnalysisCard';
import HistoricalPredictions from './HistoricalPredictions';

interface AnalysisTabsProps {
  analysis: TradeAnalysisResponse;
  technicalData: TechnicalDataResponse | null;
}

type TabType = 'technical' | 'sentiment' | 'reflection' | 'trader' | 'historical';

export default function AnalysisTabs({ analysis, technicalData }: AnalysisTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('technical');

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);

    ReactGA.event({
      category: 'Tab Interaction',
      action: 'Tab Changed',
      label: tab
    });
  };

  const tabs = [
    { id: 'technical' as TabType, label: 'Technical', disabled: false },
    { id: 'sentiment' as TabType, label: 'Sentiment', disabled: false },
    { id: 'reflection' as TabType, label: 'Reflection', disabled: false },
    { id: 'trader' as TabType, label: 'Trader', disabled: false },
    { id: 'historical' as TabType, label: 'Historical', disabled: true },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="glass-card rounded-xl p-1 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && handleTabChange(tab.id)}
              disabled={tab.disabled}
              className={`
                flex-1 min-w-30 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer
                ${tab.disabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                  : activeTab === tab.id
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-white/60 text-gray-700 hover:bg-white/80'
                }
              `}
            >
              <div className="flex items-center justify-center gap-2">
                <span>{tab.label}</span>
                {tab.disabled && (
                  <span className="text-[10px] bg-gray-300 px-1.5 py-0.5 rounded">In development</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-100">
        {activeTab === 'technical' && (
          <TechnicalAnalysisCard
            analysis={analysis.technical_analysis}
            technicalData={technicalData}
            isExpanded={true}
            onToggle={undefined}
            timestamp={analysis.timestamp}
          />
        )}

        {activeTab === 'sentiment' && (
          <SentimentAnalysisCard
            analysis={analysis.sentiment_analysis}
            isExpanded={true}
            onToggle={undefined}
            timestamp={analysis.timestamp}
          />
        )}

        {activeTab === 'reflection' && (
          <ReflectionAnalysisCard
            analysis={analysis.reflection_analysis}
            isExpanded={true}
            onToggle={undefined}
            timestamp={analysis.timestamp}
          />
        )}

        {activeTab === 'trader' && (
          <TraderAnalysisCard
            analysis={analysis.trader_analysis}
            isExpanded={true}
            onToggle={undefined}
            timestamp={analysis.timestamp}
          />
        )}

        {activeTab === 'historical' && (
          <HistoricalPredictions
            isExpanded={true}
            onToggle={undefined}
          />
        )}
      </div>
    </div>
  );
}

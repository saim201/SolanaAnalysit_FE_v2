import ReactGA from 'react-ga4';
import type { TradeAnalysisResponse } from '../types';


type RecommendationSignal = 'BUY' | 'SELL' | 'HOLD' | 'WAIT';
type AgentType = 'technical' | 'sentiment' | 'reflection' | 'trader';


export const trackPageView = (pageName: string = 'dashboard') => {
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname,
    title: `TradingMate - ${pageName}`,
  });
};


export const trackAnalysisStarted = () => {
  ReactGA.event('analysis_started', {
    event_category: 'analysis',
    event_label: 'user_initiated',
    timestamp: new Date().toISOString(),
  });
};

export const trackAnalysisCompleted = (analysis: TradeAnalysisResponse) => {
  const traderAnalysis = analysis.trader_analysis;
  const reflectionAnalysis = analysis.reflection_analysis;

  ReactGA.event('analysis_completed', {
    event_category: 'analysis',
    // Final recommendation from trader agent
    recommendation: traderAnalysis.recommendation_signal,
    confidence_score: traderAnalysis.confidence.score,
    market_condition: traderAnalysis.market_condition,
    // Agent alignment info
    alignment_score: reflectionAnalysis.agent_alignment.alignment_score,
    risk_level: reflectionAnalysis.calculated_metrics.risk_level,
    // Individual agent signals for comparison
    technical_signal: analysis.technical_analysis.recommendation_signal,
    sentiment_signal: analysis.sentiment_analysis.recommendation_signal,
    reflection_signal: reflectionAnalysis.recommendation_signal,
    trader_signal: traderAnalysis.recommendation_signal,
    // Are all agents aligned?
    agents_aligned: areAgentsAligned(analysis),
  });
};

export const trackAnalysisFailed = (errorMessage: string) => {
  ReactGA.event('analysis_failed', {
    event_category: 'analysis',
    error_message: errorMessage.substring(0, 100),
    timestamp: new Date().toISOString(),
  });
};



type ProgressStatus = 'started' | 'running' | 'completed' | 'error' | 'warning';

export const trackAgentProgress = (
  agentId: string,
  status: ProgressStatus,
  message?: string
) => {
  ReactGA.event('agent_progress', {
    event_category: 'analysis_pipeline',
    agent_id: agentId,
    status: status,
    message: message?.substring(0, 100),
  });
};



export const trackTabViewed = (
  tabId: AgentType | 'historical',
  analysis?: TradeAnalysisResponse
) => {
  const params: Record<string, string | number | undefined> = {
    event_category: 'navigation',
    tab_name: tabId,
  };

  // Add context about what the user is viewing
  if (analysis && tabId !== 'historical') {
    const agentAnalysis = getAgentAnalysis(analysis, tabId as AgentType);
    if (agentAnalysis) {
      params.recommendation_viewed = agentAnalysis.recommendation_signal;
      params.confidence_viewed = agentAnalysis.confidence.score;
    }
  }

  ReactGA.event('tab_viewed', params);
};



export const trackModalOpened = (modalName: string) => {
  ReactGA.event('modal_opened', {
    event_category: 'engagement',
    modal_name: modalName,
  });
};

export const trackModalClosed = (modalName: string) => {
  ReactGA.event('modal_closed', {
    event_category: 'engagement',
    modal_name: modalName,
  });
};



export const trackFirstAnalysisRun = () => {
  ReactGA.event('first_analysis_run', {
    event_category: 'engagement',
    event_label: 'new_user_action',
  });
};

export const trackSuccessAlertDismissed = (dismissType: 'manual' | 'auto') => {
  ReactGA.event('success_alert_dismissed', {
    event_category: 'engagement',
    dismiss_type: dismissType,
  });
};


export const trackRecommendationGenerated = (
  signal: RecommendationSignal,
  confidence: number,
  agentsAligned: boolean
) => {
  ReactGA.event('recommendation_generated', {
    event_category: 'trading_signals',
    signal: signal,
    confidence_score: confidence,
    confidence_tier: getConfidenceTier(confidence),
    agents_aligned: agentsAligned,
  });
};


const areAgentsAligned = (analysis: TradeAnalysisResponse): boolean => {
  const signals = [
    analysis.technical_analysis.recommendation_signal,
    analysis.sentiment_analysis.recommendation_signal,
    analysis.reflection_analysis.recommendation_signal,
  ];
  return signals.every(s => s === signals[0]);
};

const getConfidenceTier = (score: number): string => {
  if (score >= 0.7) return 'high';
  if (score >= 0.5) return 'moderate';
  return 'low';
};

const getAgentAnalysis = (analysis: TradeAnalysisResponse, agent: AgentType) => {
  switch (agent) {
    case 'technical':
      return analysis.technical_analysis;
    case 'sentiment':
      return analysis.sentiment_analysis;
    case 'reflection':
      return analysis.reflection_analysis;
    case 'trader':
      return analysis.trader_analysis;
  }
};



const analytics = {
  trackPageView,
  trackAnalysisStarted,
  trackAnalysisCompleted,
  trackAnalysisFailed,
  trackAgentProgress,
  trackTabViewed,
  trackModalOpened,
  trackModalClosed,
  trackFirstAnalysisRun,
  trackSuccessAlertDismissed,
  trackRecommendationGenerated,
};

export default analytics;

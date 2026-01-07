// TypeScript types for API responses

// ============================================================================
// TECHNICAL ANALYSIS
// ============================================================================
export interface Confidence {
  score: number;
  reasoning: string;
}

export interface TrendAnalysis {
  direction: string;
  strength: string;
  detail: string;
}

export interface MomentumAnalysis {
  direction: string;
  strength: string;
  detail: string;
}

export interface VolumeAnalysis {
  quality: string;
  ratio: number;
  detail: string;
}

export interface Analysis {
  trend: TrendAnalysis;
  momentum: MomentumAnalysis;
  volume: VolumeAnalysis;
}

export interface TradeSetup {
  viability: string;
  entry: number;
  stop_loss: number;
  take_profit: number;
  risk_reward: number;
  support: number;
  resistance: number;
  current_price: number;
  timeframe: string;
}

export interface ActionPlan {
  for_buyers: string;
  for_sellers: string;
  if_holding: string;
  avoid: string;
}

export interface WatchList {
  bullish_signals: string[];
  bearish_signals: string[];
}

export interface ConfidenceReasoning {
  supporting: string;
  concerns: string;
}

export interface TechnicalAnalysis {
  timestamp: string;
  recommendation_signal: "BUY" | "SELL" | "HOLD" | "WAIT";
  confidence: Confidence;
  market_condition: string;
  thinking: string;
  analysis: Analysis;
  trade_setup: TradeSetup;
  action_plan: ActionPlan;
  watch_list: WatchList;
  invalidation: string[];
  confidence_reasoning: ConfidenceReasoning;
}

// ============================================================================
// SENTIMENT ANALYSIS
// ============================================================================
export interface MarketFearGreed {
  score: number;
  classification: string;
  social?: number | null;
  whales?: number | null;
  trends?: number | null;
  sentiment: string;
  confidence: number;
  interpretation: string;
}

export interface NewsSentiment {
  sentiment: string;
  confidence: number;
}

export interface CombinedSentiment {
  sentiment: string;
  confidence: number;
}

export interface KeyEvent {
  title: string;
  type: string;
  impact: string;
  source: string;
  url: string;
  published_at: string;
}

export interface SentimentAnalysis {
  recommendation_signal: "BUY" | "SELL" | "HOLD" | "WAIT";
  market_condition: string;
  confidence: Confidence;
  timestamp: string;
  market_fear_greed: MarketFearGreed;
  news_sentiment: NewsSentiment;
  combined_sentiment: CombinedSentiment;
  positive_catalysts: number;
  negative_risks: number;
  key_events: KeyEvent[];
  risk_flags: string[];
  what_to_watch: string[];
  invalidation: string;
  suggested_timeframe: string;
  thinking: string;
}

// ============================================================================
// REFLECTION ANALYSIS
// ============================================================================
export interface AgentAlignment {
  technical_says: string;
  sentiment_says: string;
  alignment_score: number;
  synthesis: string;
}

export interface BlindSpots {
  technical_missed: string;
  sentiment_missed: string;
  critical_insight: string;
}

export interface Monitoring {
  watch_next_24h: string[];
  invalidation_triggers: string[];
}

export interface CalculatedMetrics {
  bayesian_confidence: number;
  risk_level: string;
  confidence_deviation: number;
}

export interface ReflectionAnalysis {
  recommendation_signal: "BUY" | "SELL" | "HOLD" | "WAIT";
  market_condition: string;
  confidence: Confidence;
  timestamp: string;
  agent_alignment: AgentAlignment;
  blind_spots: BlindSpots;
  primary_risk: string;
  monitoring: Monitoring;
  calculated_metrics: CalculatedMetrics;
  final_reasoning: string;
  thinking: string;
}

// ============================================================================
// TRADER ANALYSIS
// ============================================================================
export interface FinalVerdict {
  summary: string;
  technical_says: string;
  sentiment_says: string;
  reflection_says: string;
  my_decision: string;
}

export interface TradeSetupOutput {
  status: string;
  entry_price: number;
  stop_loss: number;
  take_profit: number;
  risk_reward: number;
  position_size: string;
  timeframe: string;
  setup_explanation: string;
}

export interface ActionPlanOutput {
  for_new_traders: string;
  for_current_holders: string;
  entry_conditions: string[];
  exit_conditions: string[];
}

export interface WhatToMonitor {
  critical_next_48h: string[];
  daily_checks: string[];
  exit_immediately_if: string[];
}

export interface RiskAssessment {
  main_risk: string;
  why_this_position_size: string;
  what_kills_this_trade: string[];
}

export interface TraderAnalysis {
  recommendation_signal: "BUY" | "SELL" | "HOLD" | "WAIT";
  market_condition: string;
  confidence: Confidence;
  timestamp: string;
  final_verdict: FinalVerdict;
  trade_setup: TradeSetupOutput;
  action_plan: ActionPlanOutput;
  what_to_monitor: WhatToMonitor;
  risk_assessment: RiskAssessment;
  thinking: string;
}

// ============================================================================
// COMBINED RESPONSE
// ============================================================================
export interface TradeAnalysisResponse {
  technical_analysis: TechnicalAnalysis;
  sentiment_analysis: SentimentAnalysis;
  reflection_analysis: ReflectionAnalysis;
  trader_analysis: TraderAnalysis;
  timestamp: string;
}

// ============================================================================
// MARKET DATA
// ============================================================================
export interface TechnicalDataResponse {
  currentPrice: number;
  priceChange24h: number;
  ema20: number;
  ema50: number;
  support: number;
  resistance: number;
  volume_current: number;
  volume_average: number;
  volume_ratio: number;
  rsi: number;
  macd_line: number;
  macd_signal: number;
  timestamp: string;
  bb_upper?: number;
  bb_lower?: number;
  atr?: number;
  support1?: number;
  resistance1?: number;
}

export interface TickerResponse {
  lastPrice: number;
  priceChangePercent: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  volume: number;
  quoteVolume: number;
  timestamp: string;
}

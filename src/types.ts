// TypeScript types for API responses

export interface TechnicalAnalysis {
  timestamp?: string;
  recommendation: "BUY" | "SELL" | "HOLD" | "WAIT";
  confidence: number;
  market_condition?: "TRENDING" | "RANGING" | "VOLATILE" | "QUIET";

  // New v2 fields
  summary?: string;
  thinking?: Array<string> | string;  // Array in v2, string in old format
  analysis?: {
    trend: {
      direction: string;
      strength: string;
      detail: string;
    };
    momentum: {
      direction: string;
      strength: string;
      detail: string;
    };
    volume: {
      quality: string;
      ratio: number;
      detail: string;
    };
  };
  trade_setup?: {
    viability: string;
    entry: number | null;
    stop_loss: number | null;
    take_profit: number | null;
    risk_reward: string;
    timeframe: string;
  };
  action_plan?: {
    primary: string;
    alternative: string;
    if_in_position: string;
    avoid: string;
  };
  watch_list?: {
    next_24h: string[];
    next_48h: string[];
  };
  invalidation?: string[];
  confidence_reasoning?: {
    supporting: string[];
    concerns: string[];
    assessment: string;
  };

  // Legacy fields (for backward compatibility)
  confidence_breakdown?: {
    trend_strength?: { score: number; reasoning: string; };
    momentum_quality?: { score: number; reasoning: string; };
    volume_conviction?: { score: number; reasoning: string; };
    risk_reward_setup?: { score: number; reasoning: string; };
    final_adjusted?: { score: number; reasoning: string; };
  };
  timeframe?: string | null;
  key_signals?: string[];
  entry_level?: number | null;
  stop_loss?: number | null;
  take_profit?: number | null;
  recommendation_summary?: string;
  indicators_analysis?: {
    primary_indicators_used: string[];
    selection_reasoning: string;
  };
  btc_correlation_impact?: {
    level: string;
    reasoning: string;
  };
  reasoning?: string;
}


export interface NewsAnalysis {
  timestamp?: string;
  overall_sentiment: number;
  sentiment_label: string;
  confidence: number;
  all_recent_news?: Array<{
    title: string;
    published_at: string;
    url: string;
    source: string;
  }>;
  key_events: Array<{
    title: string;
    published_at: string;
    url?: string;
    type: string;
    source_credibility: string;
    news_age_hours: number;
    impact: string;
    reasoning: string;
  }>;
  event_summary: {
    actionable_catalysts: number;
    hype_noise: number;
    critical_risks: number;
  };
  risk_flags: string[];
  stance: string;
  suggested_timeframe: string;
  recommendation_summary: string;
  what_to_watch: string[];
  invalidation: string;
  thinking?: string;
}

export interface ReflectionAnalysis {
  timestamp?: string;
  recommendation: "BUY" | "SELL" | "HOLD";
  confidence: number;
  agreement_analysis: {
    alignment_status: string;
    alignment_score: number;
    explanation: string;
  };
  blind_spots: {
    technical_missed: string[];
    news_missed: string[];
  };
  risk_assessment: {
    primary_risk: string;
    risk_level: string;
    risk_score: number;
  };
  monitoring: {
    watch_next_24h: string[];
    invalidation_trigger: string;
  };
  confidence_calculation: {
    starting_confidence: number;
    alignment_bonus: number;
    risk_penalty: number;
    confidence: number;
    reasoning: string;
  };
  reasoning: string;
  thinking?: string;
}

export interface AgentSynthesis {
  technical_weight: number;
  news_weight: number;
  reflection_weight: number;
  weighted_confidence: number;
  agreement_summary: string;
  technical_contribution: string;
  news_contribution: string;
  reflection_contribution: string;
}

export interface ExecutionPlan {
  entry_timing: string;
  position_size: string;
  entry_price_target: number | null;
  stop_loss: number | null;
  take_profit: number | null;
  timeframe: string;
  risk_reward_ratio: string;
}

export interface RiskManagement {
  max_loss_per_trade: string;
  primary_risk: string;
  secondary_risks: string[];
  exit_conditions: string[];
  monitoring_checklist: string[];
}

export interface TraderAnalysis {
  timestamp: string,
  decision: "BUY" | "SELL" | "HOLD";
  confidence: number;
  reasoning: string;
  agent_synthesis: AgentSynthesis;
  execution_plan: ExecutionPlan;
  risk_management: RiskManagement;
  thinking?: string;
}

export interface TradeAnalysisResponse {
  technical_analysis: TechnicalAnalysis;
  news_analysis: NewsAnalysis;
  reflection_analysis: ReflectionAnalysis;
  trader_analysis: TraderAnalysis;
  timestamp: string;
}

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


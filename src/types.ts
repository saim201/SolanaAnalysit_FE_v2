// TypeScript types for API responses

export interface TechnicalAnalysis {
  timestamp?: string;
  recommendation: "BUY" | "SELL" | "HOLD" | "WAIT";
  confidence: {
    analysis_confidence: number;
    setup_quality: number;
    interpretation: string;
  };
  market_condition: "TRENDING" | "RANGING" | "VOLATILE" | "QUIET";
  summary: string;
  thinking?: string;

  analysis: {
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

  trade_setup: {
    viability: string;
    entry: number | null;
    stop_loss: number | null;
    take_profit: number | null;
    risk_reward: number;
    support: number;
    resistance: number;
    current_price: number;
    timeframe: string;
  };

  action_plan: {
    for_buyers: string;
    for_sellers: string;
    if_holding: string;
    avoid: string;
  };

  watch_list: {
    bullish_signals: string[];
    bearish_signals: string[];
  };

  invalidation: string[];

  confidence_reasoning: {
    supporting: string;
    concerns: string;
  };
}


// New SentimentAnalysis interface (combines CFGI + News)
export interface SentimentAnalysis {
  timestamp?: string;
  signal: string;  // BULLISH, BEARISH, NEUTRAL, etc.
  confidence: number;

  market_fear_greed: {
    score: number;
    classification: string;  // Extreme Fear, Fear, Neutral, Greed, Extreme Greed
    social?: number;
    whales?: number;
    trends?: number;
    interpretation: string;
  };

  news_sentiment: {
    score: number;
    label: string;
    catalysts_count: number;
    risks_count: number;
  };

  key_events: Array<{
    title: string;
    published_at: string;
    url?: string;
    type: string;
    impact: string;  // BULLISH, BEARISH, NEUTRAL
    source: string;
    reasoning?: string;
  }>;

  risk_flags: string[];
  summary: string;
  what_to_watch: string[];
  invalidation: string;
  suggested_timeframe: string;
  thinking?: string;
}

// Backward compatibility: NewsAnalysis now points to SentimentAnalysis
export type NewsAnalysis = SentimentAnalysis;

export interface ReflectionAnalysis {
  timestamp?: string;
  recommendation: "BUY" | "SELL" | "HOLD" | "WAIT";
  confidence: {
    analysis_confidence: number;
    final_confidence: number;
    interpretation: string;
  };
  agreement_analysis: {
    synthesis: string;
  };
  blind_spots: {
    technical_missed: string[];
    sentiment_missed: string[];
    critical_insight: string;
  };
  risk_assessment: {
    primary_risk: string;
  };
  monitoring: {
    watch_next_24h: string[];
    invalidation_triggers: string[];
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
  news_analysis: SentimentAnalysis;  // API still uses 'news_analysis' but contains SentimentAnalysis data
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


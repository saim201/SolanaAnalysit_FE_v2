import type { TradeAnalysisResponse } from '../types';

// Mock market data for dashboard (hardcoded values for missing data)
export const mockMarketDataDefaults = {
  trend: {
    daily: 'Bearish' as const,
    fourHour: 'Neutral' as const,
    adx: 18.5,
    adxStatus: 'Weak' as const
  },
  trackRecord: {
    wins: 7,
    holds: 2,
    losses: 1,
    accuracy: 70
  }
};

export const mockMarketData = {
  currentPrice: 132.67,
  priceChange24h: 2.3,
  ema50: 138.20,
  ema200: 142.90,
  support: 128.50,
  resistance: 138.20,
  volume: {
    current: 0.32,
    average: 2.4,
    status: 'LOW' as const
  },
  trend: mockMarketDataDefaults.trend,
  indicators: {
    rsi: 48.2,
    macd: 'Neutral' as const
  },
  trackRecord: mockMarketDataDefaults.trackRecord
};

// Dummy /api/sol/analyse
export const mockTradeAnalysis: TradeAnalysisResponse = {
  technical_analysis: {
    recommendation: "BUY",
    confidence: 0.72,
    timeframe: "3-7 days",
    key_signals: [
      "Strong bullish momentum with RSI at 68 (not overbought)",
      "Price breaking above EMA50 resistance at $145.20",
      "Volume surge of 1.8x average (institutional interest)",
      "MACD crossover indicating upward trend continuation",
      "Support level holding strong at $142.50"
    ],
    entry_level: 145.50,
    stop_loss: 142.00,
    take_profit: 155.00,
    reasoning: "Technical indicators suggest a strong bullish setup. The price has successfully broken above the key EMA50 resistance level with significant volume confirmation. RSI is in a healthy range (68), indicating room for further upside. The MACD crossover and strong support at $142.50 provide additional confidence. Risk/reward ratio is favorable at approximately 1:3.2.",
    confidence_breakdown: {
      trend_strength: 0.75,
      momentum_confirmation: 0.80,
      volume_quality: 0.85,
      risk_reward: 0.60,
      final_adjusted: 0.72
    },
    recommendation_summary: 'HOLD CASH. The current Solana market is untradeable due to critically low volume (61,354 trades vs 3.4M average) and complete lack of directional momentum. Buy pressure has collapsed to 35.5%, signaling zero conviction. Do NOT attempt to trade until: (1) Daily volume returns to >3M trades, (2) Buy pressure recovers above 50%, (3) Price shows clear directional movement above or below key support/resistance levels. Potential downside risk is significant with current market structure.',
    watch_list: {
      confirmation_signals: ["Daily volume returns to >3M trades", "Buy pressure recovers above 50%", "Price breaks and holds above $136.48 or below $128.87 on strong volume"],
      invalidation_signals: ["Continued low volume (<1M daily trades)", "Buy pressure remains below 40%", "Price continues to chop in narrow range"],
      key_levels_24_48h:  ["$136.48 - Potential resistance", "$128.87 - Potential support", "$125.92 - Lower support level"],
      time_based_triggers : ["24 hours: Monitor volume and buy pressure", "48 hours: If no clear directional move, remain in cash"],
    },
    thinking: `STEP 1: TREND IDENTIFICATION
SOL trading at $145.67, up 2.3% in the last 24h. Price structure shows higher highs and higher lows over the past 7 days, indicating a clear uptrend. EMA20 ($143.20) is above EMA50 ($141.80), which is above EMA200 ($138.50) - bullish alignment confirmed.

STEP 2: MOMENTUM ASSESSMENT
RSI(14) at 68 - strong but not overbought, suggesting continued upward momentum. MACD line crossed above signal line 2 days ago with increasing histogram bars. Stochastic RSI at 72, indicating strong buying pressure.

STEP 3: VOLUME VALIDATION
24h volume at 1.8x the 20-day average - exceptional volume surge suggests institutional interest. Volume profile shows accumulation pattern over the past 3 days.

STEP 4: RISK/REWARD SETUP
Entry: $145.50 (current price + small buffer)
Stop Loss: $142.00 (below key support and EMA50)
Take Profit: $155.00 (resistance level from previous high)
Risk/Reward: 1:3.2 (excellent)

STEP 5: CONFLICTING SIGNALS CHECK
Bull case: Strong trend, volume, momentum all aligned
Bear case: Minor - RSI approaching overbought territory, but still has room

STEP 6: FINAL DECISION
All technical factors align for a BUY recommendation with high confidence (0.72).`
  },


  news_analysis: {
  overall_sentiment: 0.62,
  sentiment_label: "NEUTRAL-BULLISH",
  confidence: 0.65,
  all_recent_news: [
    {
      title: 'Ondo Finance Tokenized Stocks on Solana', 
      published_at: '2025-12-15T15:49:41', 
      url: 'https://www.coindesk.com/business/2025/12/15/ondo-finance-to-offer-tokenized-u-s-stocks-etfs-on-solana-early-next-year', 
      source: 'CoinDesk'
    }, 
    {
      title: 'CME Group Solana Futures', 
      published_at: '2025-12-15T16:07:00', 
      url: 'https://www.coindesk.com/markets/2025/12/15/cme-group-expands-crypto-derivatives-with-spot-quoted-xrp-and-solana-futures', 
      source: 'CoinDesk'

    }
  ],
  key_events: [
    {
      title: 'Ondo Finance Tokenized Stocks on Solana',
      published_at: '2025-12-15T15:49:41', 
      url: 'https://www.coindesk.com/business/2025/12/15/ondo-finance-to-offer-tokenized-u-s-stocks-etfs-on-solana-early-next-year', 
      type: 'PARTNERSHIP',
      source_credibility: 'REPUTABLE', 
      news_age_hours: 12, 
      impact: 'BULLISH', 
      reasoning: "Expanding Solana's real-world asset tokenization capabilities"
    }, 
    {
      title: 'CME Group Solana Futures', 
      published_at: '2025-12-15T16:07:00', 
      url: 'https://www.coindesk.com/markets/2025/12/15/cme-group-expands-crypto-derivatives-with-spot-quoted-xrp-and-solana-futures', 
      type: 'PARTNERSHIP', 
      source_credibility: 'REPUTABLE', 
      news_age_hours: 12, 
      impact: 'BULLISH', 
      reasoning: 'Institutional derivatives product increases SOL legitimacy'
    },
    {
      title: 'Solana Liquidity Challenges', 
      published_at: '2025-12-10T05:03:08', 
      url: 'https://decrypt.co/351743/solana-liquidity-plummets-bear-level-500m-liquidation-overhang', 
      type: 'ECOSYSTEM', 
      source_credibility: 'REPUTABLE', 
      news_age_hours: 120, 
      impact: 'BEARISH', 
      reasoning: 'Declining Total Value Locked and memecoin demand weakness'
    },
  
  ],
  event_summary: {
    actionable_catalysts: 2,
    hype_noise: 1,
    critical_risks: 1
  },
  risk_flags: [
    'Declining Total Value Locked', 'Liquidity challenges in ecosystem'
  ],
  stance: "News is cautiously bullish. Visa partnership is a strong positive catalyst, but recent network issues create some concern. Overall, news SUPPORTS taking long positions but with reduced position size due to reliability questions.",
  suggested_timeframe: "3-5 days",
  recommendation_summary: "News presents a cautiously bullish 0.62 sentiment. CME futures and Ondo Finance partnerships provide strong institutional validation, offsetting recent liquidity concerns. Traders should maintain positions but with reduced size, watching for network stability and further institutional adoption signals.",
  what_to_watch: [
    'Ondo Finance tokenization launch details', 
    'CME Solana futures trading volume', 
    'Total Value Locked trend'
  ],
  invalidation: "Sustained decline in TVL below current levels OR failure to generate meaningful institutional product adoption.",
  thinking: `PHASE 1: IDENTIFY KEY EVENTS\n\nKey Events:\n1. PARTNERSHIP: Ondo Finance offering tokenized U.S. stocks/ETFs on Solana\n- Potential ecosystem expansion\n- Credible source (CoinDesk)\n- Actionable catalyst\n\n2. PARTNERSHIP: CME Group expanding crypto derivatives with Solana futures\n- Institutional validation\n- Reputable source (CoinDesk)\n- Strong positive signal for SOL\n\n3. ECOSYSTEM: Solana experiencing liquidity challenges\n- Total Value Locked (TVL) sliding\n- Memecoin demand fading\n- Potential bearish indicator\n\n4. REGULATORY: Figure Technology filing for "second IPO" on Solana\n- Potential onchain equity issuance\n- Interesting development for blockchain integration\n\n5. SECURITY: Potential network reliability concerns\n- Liquidity plummeting to "bear level territory"\n- $500M liquidation overhang mentioned\n\nPHASE 2: SOURCE CREDIBILITY\n- All key events from reputable sources (CoinDesk, CoinTelegraph, Decrypt)\n- Multiple sources reporting similar themes increases confidence\n\nPHASE 3: RISKS\nRed Flags:\n- Sliding TVL\n- Liquidity challenges\n- Potential network stability issues\n\nPHASE 4: SENTIMENT\n- Mixed signals\n- Institutional interest (CME, Ondo Finance) is positive\n- Network challenges create caution\n- Confidence moderately bullish but tempered`
  },





  reflection_analysis: {
    recommendation: "HOLD",
    confidence: 0.57,
    agreement_analysis: {
      alignment_status: "PARTIAL",
      alignment_score: 0.75,
      explanation: "Technical and news both show bullish potential, but with significant reservations."
    },
    blind_spots: {
      technical_missed: [
        "Network reliability risks",
        "Potential security vulnerabilities"
      ],
      news_missed: [
        "Strong momentum signals",
        "Institutional volume interest"
      ]
    },
    risk_assessment: {
      primary_risk: "Network infrastructure concerns could rapidly undermine bullish momentum",
      risk_level: "MEDIUM",
      risk_score: 0.55
    },
    monitoring: {
      watch_next_24h: [
        "Visa partnership implementation details",
        "Network performance metrics",
        "Volume confirmation above 1.5x average"
      ],
      invalidation_trigger: "Sustained network performance issues or partnership delay"
    },
    confidence_calculation: {
      starting_confidence: 0.65,
      alignment_bonus: 0.10,
      risk_penalty: -0.07,
      confidence: 0.68,
      reasoning: "While both technical and news analyses show bullish potential, network reliability concerns create significant uncertainty. Recommend holding with reduced position size and closely monitoring network stability and partnership developments."
    },
    reasoning: "Technical momentum and institutional catalysts (CME, Ondo Finance) create a compelling bullish setup. However, ecosystem liquidity challenges require caution. Key success factors: volume sustains, TVL stabilizes, institutional products gain adoption.",
    thinking: `PHASE 1: DO THEY AGREE OR CONFLICT?
- Technical says: BUY with 72% confidence
- News says: NEUTRAL-BULLISH with 62% confidence
- Agreement: PARTIAL

Alignment score: 0.65 (Partial alignment - both somewhat positive but with reservations)

PHASE 2: WHAT DID TECHNICAL MISS?
- Network slowdown risk not captured in technical analysis
- Visa partnership as a fundamental catalyst
- Security concerns that could impact price movement

PHASE 3: WHAT DID NEWS MISS?
- EMA50 resistance breakthrough not acknowledged
- Volume surge indicating institutional interest
- Strong momentum signals from MACD crossover

PHASE 4: WHAT'S THE PRIMARY RISK?
Primary Risk: Network reliability and potential technical infrastructure issues that could undermine the bullish setup.

Risk level: MEDIUM
The network stability concerns create a significant overhang on the potential price movement, introducing uncertainty into the bullish thesis.

PHASE 5: FINAL DECISION
Starting confidence: 0.62 (lower of the two)
Alignment bonus: +0.10
Risk penalty: -0.15
Final calculated confidence: 0.57

Final recommendation will be a cautious BUY with reduced position sizing and strict monitoring.`
  },




  
  trader_analysis: {
    decision: "BUY",
    confidence: 0.68,
    reasoning: "Technical breakout + institutional catalysts (CME, Ondo Finance) create compelling bullish case with 0.68 weighted confidence. Weak volume concern from Reflection is managed via 50% position sizing. Entry at $145.50 offers 1.8:1 R/R with clear invalidation at $142.",
    agent_synthesis: {
      technical_weight: 0.50,
      news_weight: 0.35,
      reflection_weight: 0.15,
      weighted_confidence: 0.68,
      agreement_summary: "Technical (BUY, 0.72) and News (BULLISH, 0.65) strongly align on bullish direction due to chart breakout above EMA50 and major institutional partnerships (CME futures, Ondo tokenization). Reflection (HOLD, 0.57) provides valuable caution, flagging weak volume and network reliability risks that Technical/News underweighted. The core disagreement is risk tolerance: Tech/News see opportunity, Reflection sees insufficient conviction. Weighted analysis (0.68) favors the bullish case but incorporates Reflection's risk management via reduced position size.",
      technical_contribution: "Provides clear entry/stop/target levels with strong chart setup (EMA50 breakout, MACD positive). Most reliable for TIMING the trade. Trust level: HIGH - signals are clear and actionable.",
      news_contribution: "Identifies genuine institutional catalysts (not hype) - CME and Ondo partnerships are material positives. Balances with liquidity concerns. Trust level: MEDIUM-HIGH - sources credible but slightly dated.",
      reflection_contribution: "Critical blind spot detection: caught weak volume issue that Technical mentioned but didn't emphasize enough. Risk assessment is valid and prevents overconfidence. Trust level: MEDIUM - sometimes overly cautious but provides necessary balance."
    },
    execution_plan: {
      entry_timing: "Enter within next 2-4 hours if price dips to $142-145 (EMA20 support zone). If price stays above $146, wait for either: (1) volume surge above 1.5x to confirm rally, OR (2) pullback to support. Do NOT chase at current price - patience is key.",
      position_size: "50%",
      entry_price_target: 145.50,
      stop_loss: 142.00,
      take_profit: 155.00,
      timeframe: "3-5 days",
      risk_reward_ratio: "1.8:1"
    },
    risk_management: {
      max_loss_per_trade: "2%",
      primary_risk: "Weak volume means rally lacks institutional conviction and could reverse sharply on any negative catalyst",
      secondary_risks: [
        "Network reliability concerns from ecosystem liquidity challenges",
        "Price near resistance - technically extended",
        "Declining TVL suggests ecosystem weakness"
      ],
      exit_conditions: [
        "IMMEDIATE EXIT: Break and close below $142 (invalidates setup)",
        "24H EXIT: Volume stays below 1.0x for 48 hours straight (no conviction)",
        "PROFIT TAKE: Hit $155 target OR 5 days passed with no momentum"
      ],
      monitoring_checklist: [
        "Volume MUST surge above 1.5x within 48h to validate bullish thesis",
        "Price MUST hold $145 (EMA20) on any pullback",
        "Watch for CME/Ondo partnership implementation news",
        "Monitor Solana network status for any stability issues",
        "Track TVL trend - needs to stabilize or reverse"
      ]
    },
    thinking:`PHASE 1: CONSENSUS CHECK
- Technical says: BUY (confidence: 0.72)
- News says: NEUTRAL-BULLISH (confidence: 0.65)
- Reflection says: HOLD (confidence: 0.57)

This represents a MODERATE CONSENSUS. Technical and News both lean bullish, while Reflection introduces caution about weak volume and network reliability. The disagreement centers on whether current market conditions support an aggressive entry.

PHASE 2: WEIGHTED CONFIDENCE CALCULATION
(0.50 × 0.72) + (0.35 × 0.65) + (0.15 × 0.57)
= 0.36 + 0.2275 + 0.0855
= 0.668 (rounded to 0.68)

The weighted confidence of 0.68 suggests a moderately strong bullish case, but with significant risk management requirements.

PHASE 3: ANALYST CONTRIBUTIONS

A) TECHNICAL ANALYST:
- Strongest signal: Volume surge and EMA50 breakout
- Provided clear entry ($145.50), stop ($142.00), target ($155.00)
- Missed discussing network reliability risks
- Trust Level: HIGH - signals are precise and actionable

B) NEWS ANALYST:
- Real catalysts: CME futures, Ondo Finance partnership
- Risk flags: Declining Total Value Locked
- News sources seem credible
- Supports technical setup by highlighting institutional interest
- Trust Level: MEDIUM-HIGH

C) REFLECTION ANALYST:
- Identified blind spots: Network infrastructure concerns
- Risk assessment flags potential rapid momentum reversal
- Caught volume and network reliability issues
- Trust Level: MEDIUM - provides necessary counterbalance

PHASE 4: RESOLVE CONFLICTS & DECIDE DIRECTION
Technical and News provide strong bullish evidence. Reflection's caution is valid but not a dealbreaker. Weighted confidence of 0.68 justifies a BUY decision with reduced position sizing to manage risk.

PHASE 5: EXECUTION PLAN
- Enter within 2-4 hours if price dips to $182-184
- Position Size: 50% (moderate confidence)
- Entry Price Target: $184.00
- Stop Loss: $176.00
- Take Profit: $198.00
- Timeframe: 3-5 days
- Risk/Reward Ratio: 1.75:1`
  },
  timestamp: new Date().toISOString()
};




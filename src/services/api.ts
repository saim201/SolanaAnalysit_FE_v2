import type { TradeAnalysisResponse, TechnicalDataResponse, TickerResponse } from '../types';
import { API_CONFIG } from '../config';
import { mockTradeAnalysis, mockMarketData } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const convertMockToTechnicalData = (): TechnicalDataResponse => {
  const macdStatus = mockMarketData.indicators.macd as 'Bullish' | 'Bearish' | 'Neutral';
  const macdLine = macdStatus === 'Bullish' ? 0.5 :
                   macdStatus === 'Bearish' ? -0.5 : 0;
  const macdSignal = 0;

  return {
    currentPrice: mockMarketData.currentPrice,
    priceChange24h: mockMarketData.priceChange24h,
    ema50: mockMarketData.ema50,
    ema200: mockMarketData.ema200,
    support: mockMarketData.support,
    resistance: mockMarketData.resistance,
    volume_current: mockMarketData.volume.current,
    volume_average: mockMarketData.volume.average,
    volume_ratio: mockMarketData.volume.current,
    rsi: mockMarketData.indicators.rsi,
    macd_line: macdLine,
    macd_signal: macdSignal,
    timestamp: new Date().toISOString(),
    ema20: 0,
    bb_upper: 0,
    bb_lower: 0,
    atr: 0,
    support1: 0,
    resistance1: 0,
    pivot_weekly: 0,
  };
};




export const api = {
  async getLatestAnalysis(): Promise<TradeAnalysisResponse> {
    console.log('Fetching latest analysis from DB');
    try {
      const response = await fetch(`${API_BASE_URL}/api/sol/latest`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch latest analysis: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Latest analysis error:', error);
      throw error;
    }
  },

  async getTradeAnalysis(): Promise<TradeAnalysisResponse> {
    if (!API_CONFIG.USE_REAL_ANALYSIS_API) {
      console.log('Using MOCK data for analysis');
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      return mockTradeAnalysis;
    }

    console.log('Using REAL API for analysis');
    try {
      const response = await fetch(`${API_BASE_URL}/api/sol/analyse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Trade analysis error:', error);
      throw error;
    }
  },



  async getTechnicalData(): Promise<TechnicalDataResponse> {
    if (!API_CONFIG.USE_REAL_TECHNICAL_DATA_API) {
      console.log(' Using MOCK data for technical data');
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      return convertMockToTechnicalData();
    }

    console.log(' Using REAL API for technical data');
    try {
      const response = await fetch(`${API_BASE_URL}/api/sol/technical_data`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Technical data fetch failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Technical data error:', error);
      throw error;
    }
  },

  async getTicker(): Promise<TickerResponse> {
    console.log(' Using REAL API for ticker data');
    try {
      const response = await fetch(`${API_BASE_URL}/api/sol/ticker`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Ticker data fetch failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ticker data error:', error);
      throw error;
    }
  },
};


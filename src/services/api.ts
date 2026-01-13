import type { TradeAnalysisResponse, TechnicalDataResponse, TickerResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';




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
    console.log('Fetching trade analysis from API');
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
    console.log('Fetching technical data from API');
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
    console.log('Fetching ticker data from API');
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

  
  /**
   * Run analysis with real-time progress updates (PostgreSQL-backed, Lambda compatible)
   * @param onProgress Callback for progress updates
   * @returns Promise that resolves with final analysis result
   */
  async streamAnalysis(
    onProgress: (step: string, status: string, message: string) => void
  ): Promise<TradeAnalysisResponse> {
    // Generate a unique job ID for this analysis run
    const job_id = `job_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Start polling for progress immediately
    const seenSteps = new Set<string>();
    let pollCount = 0;
    const maxPolls = 600; // 10 minutes with 1s intervals
    let consecutiveErrors = 0;
    const maxConsecutiveErrors = 5; // Stop after 5 consecutive errors

    const pollProgress = async (): Promise<TradeAnalysisResponse> => {
      return new Promise((resolve, reject) => {
        const pollInterval = setInterval(async () => {
          pollCount++;

          if (pollCount > maxPolls) {
            clearInterval(pollInterval);
            reject(new Error('Analysis timeout - exceeded maximum wait time'));
            return;
          }

          try {
            const progressResponse = await fetch(
              `${API_BASE_URL}/api/sol/analyse/progress/${job_id}`,
              {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
              }
            );

            if (!progressResponse.ok) {
              consecutiveErrors++;
              if (consecutiveErrors >= maxConsecutiveErrors) {
                clearInterval(pollInterval);
                reject(new Error('Backend connection failed - please check if server is running'));
                return;
              }
              // Continue polling for a few attempts (progress might not exist yet)
              return;
            }

            // Reset error counter on successful response
            consecutiveErrors = 0;

            const data = await progressResponse.json();

            // Process new progress events
            if (data.progress && Array.isArray(data.progress)) {
              for (const event of data.progress) {
                const eventKey = `${event.step}-${event.status}`;
                if (!seenSteps.has(eventKey)) {
                  seenSteps.add(eventKey);
                  onProgress(event.step, event.status, event.message);
                }
              }
            }

            // Check if complete
            if (data.status === 'completed') {
              clearInterval(pollInterval);
              // Get the final result from /latest endpoint
              const finalResult = await this.getLatestAnalysis();
              resolve(finalResult);
            } else if (data.status === 'error') {
              clearInterval(pollInterval);
              reject(new Error('Analysis failed on backend'));
            }
          } catch (error) {
            console.error('Polling error:', error);
            consecutiveErrors++;
            if (consecutiveErrors >= maxConsecutiveErrors) {
              clearInterval(pollInterval);
              reject(new Error('Backend connection lost - please check if server is running'));
            }
          }
        }, 1000); // Poll every second
      });
    };

    // Start both the analysis call and progress polling
    const [, result] = await Promise.all([
      // Start the analysis (this will take 20-30 seconds)
      fetch(`${API_BASE_URL}/api/sol/analyse?job_id=${job_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error('Failed to start analysis - server returned error');
        }
        return response.json();
      }),
      // Poll for progress updates
      pollProgress()
    ]);

    return result;
  },
};


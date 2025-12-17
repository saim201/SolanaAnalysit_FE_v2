export const API_CONFIG = {
  // Set to false to use mock data instead of real API calls
  USE_REAL_ANALYSIS_API: true,
  USE_REAL_TECHNICAL_DATA_API: true,
  
  USE_ALL_MOCK: false,  // Override: use all mock data
  USE_ALL_REAL: false,  // Override: use all real APIs
};


if (API_CONFIG.USE_ALL_MOCK) {
  API_CONFIG.USE_REAL_ANALYSIS_API = false;
  API_CONFIG.USE_REAL_TECHNICAL_DATA_API = false;
}

if (API_CONFIG.USE_ALL_REAL) {
  API_CONFIG.USE_REAL_ANALYSIS_API = true;
  API_CONFIG.USE_REAL_TECHNICAL_DATA_API = true;
}

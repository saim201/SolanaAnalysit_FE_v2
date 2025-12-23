const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        {/* Animated Spinner */}
        <div className="relative inline-flex items-center justify-center mb-8">
          {/* Outer ring */}
          <div className="absolute w-24 h-24 border-4 border-gray-200 rounded-full"></div>
          {/* Spinning ring */}
          <div className="w-24 h-24 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
          {/* Inner pulsing dot */}
          <div className="absolute w-3 h-3 bg-gray-900 rounded-full animate-pulse"></div>
        </div>

        {/* Loading text */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">
            Loading Trading Analysis
          </h2>
          <p className="text-gray-600 font-medium">
            Fetching last analysis result...
          </p>

          {/* Animated dots */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>

        {/* Optional: Progress steps */}
        <div className="mt-8 space-y-2 text-sm text-gray-500">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Connecting to server</span>
          </div>
          <div className="flex items-center justify-center gap-2 animate-pulse">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading analysis data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

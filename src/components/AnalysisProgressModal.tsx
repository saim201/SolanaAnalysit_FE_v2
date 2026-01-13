interface ProgressStep {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'completed' | 'error' | 'warning';
  message?: string;
}

interface AnalysisProgressModalProps {
  isOpen: boolean;
  steps: ProgressStep[];
}

const AnalysisProgressModal = ({ isOpen, steps }: AnalysisProgressModalProps) => {
  if (!isOpen) return null;

  const getStatusIcon = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'running':
        return (
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
        );
    }
  };

  const getStatusColor = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'running':
        return 'text-blue-600 font-semibold';
      case 'error':
        return 'text-red-600';
      case 'warning':
        return 'text-amber-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/20 backdrop-blur-sm p-4">
      <div className="glass-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center mb-4">
            {/* Outer ring */}
            <div className="absolute w-16 h-16 border-4 border-gray-200 rounded-full"></div>
            {/* Spinning ring */}
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            {/* Inner pulsing dot */}
            <div className="absolute w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Running Analysis
          </h2>
          <p className="text-sm text-gray-600">
            This may take ~2 mints. Please wait while our AI analysts analyse the current market thoroughly.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                step.status === 'running'
                  ? 'glass-section border-2 border-blue-300/60 shadow-md'
                  : step.status === 'completed'
                  ? 'glass-section border border-green-300/50'
                  : step.status === 'error'
                  ? 'glass-section border border-red-300/50'
                  : step.status === 'warning'
                  ? 'glass-section border border-amber-300/50'
                  : 'glass-section border border-gray-200/40'
              }`}
            >
              {/* Status Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {getStatusIcon(step.status)}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`text-sm font-semibold ${getStatusColor(step.status)}`}>
                    {step.label}
                  </h3>
                  {step.status === 'running' && (
                    <span className="text-xs text-blue-600 font-medium">In Progress...</span>
                  )}
                  {step.status === 'completed' && (
                    <span className="text-xs text-green-600 font-medium">✓ Done</span>
                  )}
                </div>
                {step.message && (
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        {/* <div className="mt-6 glass-section p-4 rounded-xl border border-gray-200/40">
          <div className="flex justify-between text-xs font-medium text-gray-700 mb-2">
            <span>Overall Progress</span>
            <span>
              {steps.filter(s => s.status === 'completed').length} / {steps.length} completed
            </span>
          </div>
          <div className="w-full h-2.5 bg-gray-200/60 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out shadow-sm"
              style={{
                width: `${(steps.filter(s => s.status === 'completed').length / steps.length) * 100}%`
              }}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AnalysisProgressModal;

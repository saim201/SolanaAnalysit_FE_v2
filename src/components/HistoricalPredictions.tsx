import CollapsibleCard from './CollapsibleCard';

interface HistoricalPrediction {
  id: string;
  date: string;
  decision: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  predictedPrice?: number;
  actualPrice?: number;
  accuracy?: 'correct' | 'incorrect' | 'pending';
  profitLoss?: number;
}

interface HistoricalPredictionsProps {
  isExpanded?: boolean;
  onToggle?: () => void;
}

const mockHistoricalData: HistoricalPrediction[] = [
  {
    id: '1',
    date: '2025-01-15',
    decision: 'BUY',
    confidence: 0.75,
    predictedPrice: 145.50,
    actualPrice: 152.30,
    accuracy: 'correct',
    profitLoss: 4.67
  },
  {
    id: '2',
    date: '2025-01-12',
    decision: 'HOLD',
    confidence: 0.45,
    predictedPrice: undefined,
    actualPrice: 142.10,
    accuracy: 'correct',
    profitLoss: 0
  },
  {
    id: '3',
    date: '2025-01-10',
    decision: 'BUY',
    confidence: 0.68,
    predictedPrice: 138.20,
    actualPrice: 135.80,
    accuracy: 'incorrect',
    profitLoss: -1.74
  },
  {
    id: '4',
    date: '2025-01-08',
    decision: 'SELL',
    confidence: 0.72,
    predictedPrice: 140.00,
    actualPrice: 132.50,
    accuracy: 'correct',
    profitLoss: 5.36
  },
  {
    id: '5',
    date: '2025-01-05',
    decision: 'BUY',
    confidence: 0.65,
    predictedPrice: 135.00,
    actualPrice: 141.20,
    accuracy: 'correct',
    profitLoss: 4.59
  },
  {
    id: '6',
    date: '2025-01-03',
    decision: 'HOLD',
    confidence: 0.52,
    predictedPrice: undefined,
    actualPrice: 138.90,
    accuracy: 'correct',
    profitLoss: 0
  },
];

export default function HistoricalPredictions({ isExpanded }: HistoricalPredictionsProps) {
  const getDecisionColor = (decision: string) => {
    if (decision === 'BUY') return 'text-green-700 bg-green-50 border-green-200';
    if (decision === 'SELL') return 'text-red-700 bg-red-50 border-red-200';
    return 'text-amber-700 bg-amber-50 border-amber-200';
  };

  const getAccuracyColor = (accuracy?: string) => {
    if (accuracy === 'correct') return 'text-green-700';
    if (accuracy === 'incorrect') return 'text-red-700';
    return 'text-gray-600';
  };

  const totalPredictions = mockHistoricalData.length;
  const correctPredictions = mockHistoricalData.filter(p => p.accuracy === 'correct').length;
  const totalProfitLoss = mockHistoricalData.reduce((sum, p) => sum + (p.profitLoss || 0), 0);

  return (
    <CollapsibleCard
      title="Historical Predictions"
      defaultExpanded={false}
      isExpanded={isExpanded}
      onToggle={undefined}
      badge={
        <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          IN DEVELOPMENT
        </span>
      }
    >
      <div className="space-y-6">

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 glass-section p-4 rounded-xl">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{totalPredictions}</div>
          <div className="text-xs text-gray-700 font-semibold">Total Predictions</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">{correctPredictions}</div>
          <div className="text-xs text-gray-700 font-semibold">Correct</div>
        </div>
        <div className="text-center">
          <div className={`text-lg font-bold ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalProfitLoss >= 0 ? '+' : ''}{totalProfitLoss.toFixed(2)}%
          </div>
          <div className="text-xs text-gray-700 font-semibold">Total P/L</div>
        </div>
      </div>

      {/* Predictions List */}
      <div className="space-y-3">
        {mockHistoricalData.map((prediction) => (
          <div
            key={prediction.id}
            className="group p-4 glass-section rounded-lg hover:bg-white/50 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className={`px-3 py-1 rounded-lg border text-sm font-semibold ${getDecisionColor(prediction.decision)}`}>
                  {prediction.decision}
                </div>
                <div className="text-sm text-gray-700 font-medium">
                  {new Date(prediction.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                {prediction.predictedPrice && (
                  <div className="text-sm text-gray-700 font-medium">
                    Predicted: <span className="text-gray-900 font-semibold">${prediction.predictedPrice.toFixed(2)}</span>
                  </div>
                )}
                {prediction.actualPrice && (
                  <div className="text-sm text-gray-700 font-medium">
                    Actual: <span className="text-gray-900 font-semibold">${prediction.actualPrice.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-gray-700 mb-1 font-semibold">Confidence</div>
                  <div className="text-sm font-bold text-gray-900">
                    {(prediction.confidence * 100).toFixed(0)}%
                  </div>
                </div>
                {prediction.accuracy && (
                  <div className="text-right">
                    <div className="text-xs text-gray-700 mb-1 font-semibold">Result</div>
                    <div className={`text-sm font-semibold ${getAccuracyColor(prediction.accuracy)}`}>
                      <span className="capitalize">{prediction.accuracy}</span>
                    </div>
                  </div>
                )}
                {prediction.profitLoss !== undefined && prediction.profitLoss !== 0 && (
                  <div className="text-right">
                    <div className="text-xs text-gray-700 mb-1 font-semibold">P/L</div>
                    <div className={`text-sm font-semibold ${prediction.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {prediction.profitLoss >= 0 ? '+' : ''}{prediction.profitLoss.toFixed(2)}%
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </CollapsibleCard>
  );
}


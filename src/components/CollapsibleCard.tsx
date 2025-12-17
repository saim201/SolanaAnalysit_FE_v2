import { useState, useEffect } from 'react';

interface CollapsibleCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  defaultExpanded?: boolean;
  badge?: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
  cardId?: string;
  functionalities?: string;
  lastUpdated?: string;
  iconBgColor?: string;
  iconTextColor?: string;
  iconText?: string;
}

export default function CollapsibleCard({
  title,
  icon,
  children,
  className = '',
  defaultExpanded = false,
  badge,
  isExpanded: controlledExpanded,
  onToggle,
  functionalities,
  lastUpdated,
  iconBgColor = 'bg-blue-100',
  iconTextColor = 'text-blue-700',
  iconText
}: CollapsibleCardProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isControlled = controlledExpanded !== undefined;
  const isExpanded = isControlled ? controlledExpanded : internalExpanded;

  useEffect(() => {
    if (!isControlled) {
      setInternalExpanded(defaultExpanded);
    }
  }, [defaultExpanded, isControlled]);

  const handleToggle = () => {
    if (onToggle === undefined) {
      return; // Don't toggle if onToggle is explicitly undefined (disabled state)
    }
    if (onToggle) {
      onToggle();
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${className}`}>
      <button
        onClick={handleToggle}
        disabled={onToggle === undefined}
        className={`w-full p-5 flex items-center justify-between transition-all duration-200 ${
          onToggle === undefined
            ? 'cursor-not-allowed opacity-60'
            : 'cursor-pointer hover:bg-white/40'
        }`}
      >
        <div className="flex items-center gap-4">
          {iconText && (
            <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
              <span className={`text-lg font-bold ${iconTextColor}`}>{iconText}</span>
            </div>
          )}
          {!iconText && icon && <div className="text-lg text-gray-700">{icon}</div>}
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              {badge && <div className="ml-2">{badge}</div>}
            </div>
            {functionalities && (
              <p className="text-sm text-gray-600 mt-0.5">{functionalities}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {lastUpdated && (
            <span className="text-xs text-gray-500">
              Updated at: {formatDate(lastUpdated)}
            </span>
          )}
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${
        isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 pb-6 pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}


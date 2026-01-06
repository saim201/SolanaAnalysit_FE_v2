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

  // If onToggle is undefined, we're in tab mode - show simplified header
  if (onToggle === undefined) {
    return (
      <div className={`glass-card rounded-xl overflow-hidden ${className}`}>
        <div className="p-3 sm:p-4 md:p-5 pb-3">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">{title}</h2>
            {lastUpdated && (
              <span className="text-xs text-gray-500">
                Updated: {formatDate(lastUpdated)}
              </span>
            )}
          </div>
        </div>
        <div className="px-3 sm:px-4 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-0">
          {children}
        </div>
      </div>
    );
  }

  // Regular collapsible card mode
  return (
    <div className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${className}`}>
      <button
        onClick={handleToggle}
        className="w-full p-3 sm:p-4 md:p-5 flex items-center justify-between transition-all duration-200 cursor-pointer hover:bg-white/40"
      >
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
          {iconText && (
            <div className={`w-10 h-10 sm:w-12 sm:h-12 ${iconBgColor} rounded-lg flex items-center justify-center shrink-0`}>
              <span className={`text-base sm:text-lg font-bold ${iconTextColor}`}>{iconText}</span>
            </div>
          )}
          {!iconText && icon && <div className="text-base sm:text-lg text-gray-700 shrink-0">{icon}</div>}
          <div className="text-left min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">{title}</h2>
              {badge && <div className="ml-1 sm:ml-2">{badge}</div>}
            </div>
            {functionalities && (
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5 truncate sm:whitespace-normal">{functionalities}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0 ml-2">
          {lastUpdated && (
            <span className="text-xs text-gray-500 hidden lg:block">
              Updated at: {formatDate(lastUpdated)}
            </span>
          )}
          <svg
            className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
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
        <div className="px-3 sm:px-4 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}


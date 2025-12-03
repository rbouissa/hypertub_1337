import React from 'react';
import { Clock } from 'lucide-react';

interface TimeIntervalSelectorProps {
  selectedInterval: string;
  onIntervalChange: (interval: string) => void;
  isDark: boolean;
}

const intervals = [
  { id: 'last6h', label: 'Last 6H' },
  { id: 'last12h', label: 'Last 12H' },
  { id: 'last24h', label: 'Last 24H' },
  { id: 'last48h', label: 'Last 48H' },
  { id: 'last7d', label: 'Last 7D' }
];

const TimeIntervalSelector: React.FC<TimeIntervalSelectorProps> = ({ 
  selectedInterval, 
  onIntervalChange, 
  isDark 
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Clock size={18} className={isDark ? 'text-orange-400' : 'text-black'} />
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Time Interval</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {intervals.map((interval) => (
          <button
            key={interval.id}
            onClick={() => onIntervalChange(interval.id)}
            className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
              selectedInterval === interval.id
                ? isDark
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'bg-black text-white shadow-lg shadow-black/25'
                : isDark
                ? 'bg-white/10 text-white hover:bg-orange-500/20 hover:text-orange-400'
                : 'bg-black/5 text-black hover:bg-black/10'
            }`}
          >
            {interval.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeIntervalSelector;
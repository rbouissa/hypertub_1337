import React from 'react';

interface DataPoint {
  time: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  title: string;
  unit: string;
  isDark: boolean;
}

const LineChart: React.FC<LineChartProps> = ({ data, title, unit, isDark }) => {
  if (data.length === 0) return null;

  const values = data.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;
  
  const width = 600;
  const height = 300;
  const padding = 40;
  
  const points = data.map((point, index) => {
    const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((point.value - minValue) / range) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  const gradientId = `gradient-${title.replace(/\s+/g, '-')}`;

  return (
    <div className={`p-6 rounded-xl transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
        : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
    } shadow-lg hover:shadow-xl`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
          {title}
        </h3>
        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {unit}
        </span>
      </div>
      
      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-64">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isDark ? '#f97316' : '#ea580c'} stopOpacity="0.3" />
              <stop offset="100%" stopColor={isDark ? '#f97316' : '#ea580c'} stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[...Array(5)].map((_, i) => (
            <line
              key={i}
              x1={padding}
              y1={padding + (i * (height - 2 * padding)) / 4}
              x2={width - padding}
              y2={padding + (i * (height - 2 * padding)) / 4}
              stroke={isDark ? '#374151' : '#e5e7eb'}
              strokeWidth="1"
              opacity="0.5"
            />
          ))}
          
          {/* Area under curve */}
          <path
            d={`M ${padding},${height - padding} L ${points} L ${width - padding},${height - padding} Z`}
            fill={`url(#${gradientId})`}
          />
          
          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke={isDark ? '#f97316' : '#ea580c'}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
            style={{ 
              filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))',
              strokeDasharray: '5,5',
              animation: 'dash 2s linear infinite'
            }}
          />
          
          {/* Data points */}
          {data.map((point, index) => {
            const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
            const y = height - padding - ((point.value - minValue) / range) * (height - 2 * padding);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill={isDark ? '#f97316' : '#ea580c'}
                className="hover:r-6 transition-all duration-200"
                style={{ filter: 'drop-shadow(0 0 4px rgba(249, 115, 22, 0.8))' }}
              />
            );
          })}
        </svg>
      </div>
      
      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -10;
          }
        }
      `}</style>
    </div>
  );
};

export default LineChart;
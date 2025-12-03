import React, { useEffect, useState } from 'react';

interface GaugeChartProps {
  value: number;
  min: number;
  max: number;
  title: string;
  unit: string;
  isDark: boolean;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, min, max, title, unit, isDark }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = Math.max(0, Math.min(100, ((animatedValue - min) / (max - min)) * 100));
  const rotation = -90 + (percentage * 1.8); // 180 degrees range
  
  const getQualityColor = () => {
    if (title.includes('PM')) {
      if (animatedValue <= 35) return isDark ? '#10b981' : '#22c55e'; // Good - green
      if (animatedValue <= 75) return isDark ? '#f59e0b' : '#eab308'; // Moderate - yellow
      if (animatedValue <= 115) return isDark ? '#f97316' : '#ea580c'; // Unhealthy for sensitive - orange
      return isDark ? '#ef4444' : '#dc2626'; // Unhealthy - red
    }
    return isDark ? '#f97316' : '#ea580c'; // Default orange
  };

  return (
    <div className={`relative p-6 rounded-xl transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
        : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
    } shadow-lg hover:shadow-xl`}>
      <div className="text-center mb-4">
        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>{title}</h3>
      </div>
      
      <div className="relative w-48 h-24 mx-auto mb-4">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 20 80 A 80 80 0 0 1 180 80"
            fill="none"
            stroke={isDark ? '#374151' : '#e5e7eb'}
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Progress arc */}
          <path
            d="M 20 80 A 80 80 0 0 1 180 80"
            fill="none"
            stroke={getQualityColor()}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(percentage * 251.3) / 100} 251.3`}
            className="transition-all duration-1000 ease-out"
            style={{ filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))' }}
          />
          
          {/* Needle */}
          <g transform={`translate(100, 80)`}>
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-60"
              stroke={getQualityColor()}
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${rotation})`}
              className="transition-all duration-1000 ease-out"
              style={{ filter: 'drop-shadow(0 0 4px rgba(0, 0, 0, 0.3))' }}
            />
            <circle
              cx="0"
              cy="0"
              r="4"
              fill={getQualityColor()}
              className="transition-all duration-1000"
            />
          </g>
        </svg>
      </div>
      
      <div className="text-center">
        <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-1`}>
          {animatedValue.toFixed(1)}
        </div>
        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {unit}
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
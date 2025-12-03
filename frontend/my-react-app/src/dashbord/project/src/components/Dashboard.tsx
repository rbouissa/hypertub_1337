import React, { useState, useEffect } from 'react';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';
import GaugeChart from './GaugeChart';
import LineChart from './LineChart';
import { fetchHistoricalData, fetchLatestData, SensorReading, LatestData } from '../services/mockApi';

interface DashboardProps {
  location: string;
  sensor: string;
  interval: string;
  isDark: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ location, sensor, interval, isDark }) => {
  const [historicalData, setHistoricalData] = useState<SensorReading[]>([]);
  const [latestData, setLatestData] = useState<LatestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isOnline, setIsOnline] = useState(true);

  const sensorLabels: { [key: string]: string } = {
    pm1: 'PM1.0',
    pm25: 'PM2.5',
    // pm10: 'PM10',
    relativehumidity: 'Relative Humidity',
    temperature: 'Temperature',
    um03: 'UM03'
  };

  const sensorUnits: { [key: string]: string } = {
    pm1: 'μg/m³',
    pm25: 'μg/m³',
    // pm10: 'μg/m³',
    relativehumidity: '%',
    temperature: '°C',
    um03: 'ppm'
  };

  const getSensorRange = (sensor: string) => {
    switch (sensor) {
      case 'pm1': return { min: 0, max: 100 };
      case 'pm25': return { min: 0, max: 150 };
      // case 'pm10': return { min: 0, max: 200 };
      case 'relativehumidity': return { min: 0, max: 100 };
      case 'temperature': return { min: -10, max: 50 };
      case 'um03': return { min: 0, max: 2 };
      default: return { min: 0, max: 100 };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [historical, latest] = await Promise.all([
          fetchHistoricalData(location, sensor, interval),
          fetchLatestData(location)
        ]);
        
        setHistoricalData(historical);
        setLatestData(latest);
        setLastUpdate(new Date());
        setIsOnline(true);
      } catch (error) {
        console.error('Failed to load data:', error);
        setIsOnline(false);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [location, sensor, interval]);

  const getCurrentValue = () => {
    if (!latestData) return 0;
    return latestData[sensor as keyof LatestData] as number || 0;
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const [historical, latest] = await Promise.all([
        fetchHistoricalData(location, sensor, interval),
        fetchLatestData(location)
      ]);
      
      setHistoricalData(historical);
      setLatestData(latest);
      setLastUpdate(new Date());
      setIsOnline(true);
    } catch (error) {
      console.error('Failed to refresh data:', error);
      setIsOnline(false);
    } finally {
      setLoading(false);
    }
  };

  const range = getSensorRange(sensor);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            {sensorLabels[sensor]} Dashboard
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {location.charAt(0).toUpperCase() + location.slice(1).replace('-', ' ')}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            isOnline 
              ? isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
              : isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
          }`}>
            {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
            <span className="text-sm font-medium">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isDark
                ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 disabled:opacity-50'
                : 'bg-black/10 text-black hover:bg-black/20 disabled:opacity-50'
            }`}
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl ${
        isDark 
          ? 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700'
          : 'bg-gradient-to-r from-gray-50 to-white border border-gray-200'
      }`}>
        <div className="text-center">
          <div className={`text-2xl font-bold ${isDark ? 'text-orange-400' : 'text-black'}`}>
            {getCurrentValue().toFixed(1)}
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Current Value
          </div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${isDark ? 'text-orange-400' : 'text-black'}`}>
            {historicalData.length > 0 ? Math.max(...historicalData.map(d => d.value)).toFixed(1) : '0'}
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Peak Value
          </div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${isDark ? 'text-orange-400' : 'text-black'}`}>
            {lastUpdate.toLocaleTimeString()}
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Last Update
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Gauge Chart for PM sensors */}
        {(sensor === 'pm25' || sensor === 'pm1') && (
          <div className="flex justify-center">
            <GaugeChart
              value={getCurrentValue()}
              min={range.min}
              max={range.max}
              title={sensorLabels[sensor]}
              unit={sensorUnits[sensor]}
              isDark={isDark}
            />
          </div>
        )}

        {/* Line Chart */}
        <div className={sensor === 'pm25' || sensor === 'pm10' ? '' : 'xl:col-span-2'}>
          <LineChart
            data={historicalData}
            title={`${sensorLabels[sensor]} Trend`}
            unit={sensorUnits[sensor]}
            isDark={isDark}
          />
        </div>
      </div>

      {/* Additional Gauges for other sensors when viewing PM sensors */}
      {(sensor === 'pm25' || sensor === 'pm10') && latestData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(latestData)
            .filter(([key]) => key !== sensor && key !== 'timestamp')
            .map(([key, value]) => (
              <GaugeChart
                key={key}
                value={value as number}
                min={getSensorRange(key).min}
                max={getSensorRange(key).max}
                title={sensorLabels[key]}
                unit={sensorUnits[key]}
                isDark={isDark}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
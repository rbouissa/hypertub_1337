import React from 'react';
import { Activity } from 'lucide-react';

interface SensorSelectorProps {
  availableSensors: string[];
  selectedSensor: string;
  onSensorChange: (sensor: string) => void;
  isDark: boolean;
}

const sensorLabels: { [key: string]: string } = {
  pm1: 'PM1',
  pm25: 'PM2.5',
  // pm10: 'PM10',
  relativehumidity: 'Humidity',
  temperature: 'Temperature',
  um03: 'UM03'
};

const SensorSelector: React.FC<SensorSelectorProps> = ({ 
  availableSensors, 
  selectedSensor, 
  onSensorChange, 
  isDark 
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Activity size={18} className={isDark ? 'text-orange-400' : 'text-black'} />
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Sensor</h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {availableSensors.map((sensor) => (
          <button
            key={sensor}
            onClick={() => onSensorChange(sensor)}
            className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
              selectedSensor === sensor
                ? isDark
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'bg-black text-white shadow-lg shadow-black/25'
                : isDark
                ? 'bg-white/10 text-white hover:bg-orange-500/20 hover:text-orange-400'
                : 'bg-black/5 text-black hover:bg-black/10'
            }`}
          >
            {sensorLabels[sensor] || sensor}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SensorSelector;
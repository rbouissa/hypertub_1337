import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationSelectorProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  isDark: boolean;
}

const locations = [
  { id: 'marrakech', name: 'Marrakech', sensors: ['pm1', 'pm25', 'pm10', 'relativehumidity', 'temperature', 'um03'] },
  { id: 'um6p-pergola', name: 'UM6P Pergola', sensors: ['pm1', 'pm25', 'relativehumidity', 'temperature', 'um03'] }
];

const LocationSelector: React.FC<LocationSelectorProps> = ({ selectedLocation, onLocationChange, isDark }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <MapPin size={18} className={isDark ? 'text-orange-400' : 'text-black'} />
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Location</h3>
      </div>
      <div className="flex gap-3">
        {locations.map((location) => (
          <button
            key={location.id}
            onClick={() => onLocationChange(location.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              selectedLocation === location.id
                ? isDark
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'bg-black text-white shadow-lg shadow-black/25'
                : isDark
                ? 'bg-white/10 text-white hover:bg-orange-500/20 hover:text-orange-400'
                : 'bg-black/5 text-black hover:bg-black/10'
            }`}
          >
            {location.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocationSelector;
export { locations };
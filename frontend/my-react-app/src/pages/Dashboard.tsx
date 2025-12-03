

//this onr is improved and gettig a good map in a cadre and customize time range

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Thermometer, 
  Droplets, 
  Wind, 
  Activity,
  RefreshCw,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  BarChart3,
  Zap,
  Eye,
  LineChart as LineChartIcon,
  X,
  Info,
  Lightbulb,
  Shield,
  Heart,
  Home
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents ,Tooltip as LeafletTooltip} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface AirGradientData {
  locationId: number;
  locationName: string;
  latitude: number;
  longitude: number;
  pm01: number;
  pm02: number;
  pm10: number;
  pm01_corrected: number;
  pm02_corrected: number;
  pm10_corrected: number;
  pm003Count: number;
  atmp: number;
  rhum: number;
  rco2: number | null;
  atmp_corrected: number;
  rhum_corrected: number;
  rco2_corrected: number | null;
  tvoc: number | null;
  wifi: number;
  timestamp: string;
  serialno: string;
  model: string;
  firmwareVersion: string;
  tvocIndex: number | null;
  noxIndex: number | null;
  datapoints?: number;
}

interface LocationData {
  [locationId: string]: AirGradientData;
}

const locations = [
  { 
    id: 'marrakech', 
    name: 'Marrakech', 
    coordinates: [31.66098, -8.02787] as [number, number],
    sensors: ['pm01_corrected', 'pm02_corrected', 'pm10_corrected', 'rhum_corrected', 'atmp_corrected', 'rco2_corrected', 'tvoc', 'noxIndex'] 
  },
  { 
    id: 'pergola_um6p', 
    name: 'Ben Guerir (UM6P Campus - Pergola)', 
    coordinates: [32.2193, -7.9311] as [number, number],
    sensors: ['pm01_corrected', 'pm02_corrected', 'pm10_corrected', 'rhum_corrected', 'atmp_corrected', 'rco2_corrected', 'tvoc', 'noxIndex'] 
  },
];

const sensorConfig = {
  pm01_corrected: { name: 'PM1', unit: 'µg/m³', icon: Wind, color: '#FF6600', description: 'Particulate Matter 1.0', maxValue: 100 },
  pm02_corrected: { name: 'PM2.5', unit: 'µg/m³', icon: Wind, color: '#FF8533', description: 'Particulate Matter 2.5', maxValue: 100 },
  pm10_corrected: { name: 'PM10', unit: 'µg/m³', icon: Wind, color: '#FFB366', description: 'Particulate Matter 10', maxValue: 200 },
  rhum_corrected: { name: 'Humidity', unit: '%', icon: Droplets, color: '#3B82F6', description: 'Relative Humidity', maxValue: 100 },
  atmp_corrected: { name: 'Temperature', unit: '°C', icon: Thermometer, color: '#EF4444', description: 'Air Temperature', maxValue: 50 },
  rco2_corrected: { name: 'CO2', unit: 'ppm', icon: Activity, color: '#10B981', description: 'Carbon Dioxide', maxValue: 2000 },
  tvoc: { name: 'TVOC', unit: 'index', icon: Zap, color: '#8B5CF6', description: 'Total Volatile Organic Compounds', maxValue: 500 },
  noxIndex: { name: 'NOX', unit: 'index', icon: Eye, color: '#F59E0B', description: 'Nitrogen Oxides Index', maxValue: 500 }
};

const timeRanges = [
  { id: 'last24h', name: 'Today', period: 'last24h' },
  { id: 'last48h', name: 'Yesterday', period: 'last48h' },
  { id: 'last7d', name: 'This Week', period: 'last7d' },
  { id: 'last30d', name: 'This Month', period: 'last30d' }
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Educational content about air quality
const airQualityInfo = {
  pm: {
    title: "Particulate Matter (PM)",
    description: "Tiny particles in the air that can affect your health",
    details: [
      "PM1: Ultra-fine particles (< 1 micrometer) - can penetrate deep into lungs",
      "PM2.5: Fine particles (< 2.5 micrometers) - most harmful to health",
      "PM10: Coarse particles (< 10 micrometers) - can irritate eyes and throat"
    ],
    sources: ["Vehicle exhaust", "Industrial emissions", "Dust storms", "Cooking and heating"],
    healthEffects: ["Respiratory problems", "Heart disease", "Reduced lung function", "Premature death"]
  },
  gases: {
    title: "Air Quality Gases",
    description: "Chemical compounds that affect air quality and health",
    details: [
      "CO₂: Carbon dioxide - indicator of ventilation quality",
      "TVOC: Total Volatile Organic Compounds - from paints, cleaners, etc.",
      "NOX: Nitrogen oxides - mainly from vehicle emissions"
    ],
    sources: ["Vehicle emissions", "Industrial processes", "Building materials", "Household products"],
    healthEffects: ["Headaches", "Eye irritation", "Respiratory issues", "Reduced concentration"]
  },
  comfort: {
    title: "Comfort Parameters",
    description: "Environmental factors that affect comfort and wellbeing",
    details: [
      "Temperature: Optimal range is 18-24°C for comfort",
      "Humidity: Ideal range is 30-60% for health and comfort"
    ],
    sources: ["Weather conditions", "Heating/cooling systems", "Natural climate"],
    healthEffects: ["Discomfort", "Dry skin/eyes", "Mold growth", "Poor sleep quality"]
  }
};

const Dropdown: React.FC<{
  label: string;
  icon: React.ElementType;
  options: Array<{ id: string; name: string }>;
  selected: string;
  onSelect: (value: string) => void;
}> = ({ label, icon: Icon, options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.id === selected);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((s) => !s)}
        className="w-full flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-left shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon className="h-4 w-4 text-orange-600" />
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
            <div className="font-medium text-gray-900 dark:text-white">{selectedOption?.name}</div>
          </div>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50">
          {options.map((option, idx) => (
            <button
              key={option.id}
              onClick={() => {
                onSelect(option.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                selected === option.id ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600' : 'text-gray-900 dark:text-white'
              } ${idx === 0 ? 'rounded-t-lg' : ''} ${idx === options.length - 1 ? 'rounded-b-lg' : ''}`}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const MeasurementDropdown: React.FC<{
  label: string;
  sensors: string[];
  selected: string;
  onSelect: (value: string) => void;
}> = ({ label, sensors, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedSensorConfig = sensorConfig[selected as keyof typeof sensorConfig];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((s) => !s)}
        className="w-full flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-left shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center space-x-3">
          {selectedSensorConfig?.icon && (
            <selectedSensorConfig.icon 
              className="h-5 w-5" 
              style={{ color: selectedSensorConfig.color }} 
            />
          )}
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
            <div className="font-medium text-gray-900 dark:text-white">{selectedSensorConfig?.name}</div>
          </div>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50">
          {sensors.map((sensor, idx) => {
            const config = sensorConfig[sensor as keyof typeof sensorConfig];
            const IconComponent = config?.icon;
            return (
              <button
                key={sensor}
                onClick={() => {
                  onSelect(sensor);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3 ${
                  selected === sensor ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600' : 'text-gray-900 dark:text-white'
                } ${idx === 0 ? 'rounded-t-lg' : ''} ${idx === sensors.length - 1 ? 'rounded-b-lg' : ''}`}
              >
                {IconComponent && (
                  <IconComponent 
                    className="h-5 w-5" 
                    style={{ color: config?.color }} 
                  />
                )}
                <div>
                  <div className="font-medium">{config?.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{config?.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const GaugeIndicator: React.FC<{ 
  value: number; 
  max: number; 
  sensorType: string; 
  color: string 
}> = ({ value, max, sensorType, color }) => {
  const percentage = Math.min((value / max) * 100, 100);
  const rotation = (percentage / 100) * 180 - 90;

  const getQualityLevel = (val: number, sensor: string) => {
    if (sensor === 'pm02_corrected') {
      if (val <= 12) return { level: 'Good', color: '#10B981' };
      if (val <= 35) return { level: 'Moderate', color: '#F59E0B' };
      if (val <= 55) return { level: 'Unhealthy for Sensitive', color: '#EF4444' };
      return { level: 'Unhealthy', color: '#DC2626' };
    } else if (sensor === 'pm10_corrected') {
      if (val <= 54) return { level: 'Good', color: '#10B981' };
      if (val <= 154) return { level: 'Moderate', color: '#F59E0B' };
      if (val <= 254) return { level: 'Unhealthy for Sensitive', color: '#EF4444' };
      return { level: 'Unhealthy', color: '#DC2626' };
    } else if (sensor === 'pm01_corrected') {
      if (val <= 12) return { level: 'Good', color: '#10B981' };
      if (val <= 35.4) return { level: 'Moderate', color: '#F59E0B' };
      if (val <= 55.4) return { level: 'Unhealthy for Sensitive', color: '#EF4444' };
      return { level: 'Unhealthy', color: '#DC2626' };
    } else if (sensor === 'rhum_corrected') {
      if (val >= 30 && val <= 60) return { level: 'Good', color: '#10B981' };
      if ((val >= 20 && val < 30) || (val > 60 && val <= 70)) return { level: 'Moderate', color: '#F59E0B' };
      if ((val >= 10 && val < 20) || (val > 70 && val <= 80)) return { level: 'Unhealthy for Sensitive', color: '#EF4444' };
      return { level: 'Unhealthy', color: '#DC2626' };
    } else if (sensor === 'atmp_corrected') {
      if (val >= 18 && val <= 24) return { level: 'Good', color: '#10B981' };
      if ((val >= 15 && val < 18) || (val > 24 && val <= 27)) return { level: 'Moderate', color: '#F59E0B' };
      if ((val >= 12 && val < 15) || (val > 27 && val <= 30)) return { level: 'Unhealthy for Sensitive', color: '#EF4444' };
      return { level: 'Unhealthy', color: '#DC2626' };
    } else if (sensor === 'rco2_corrected') {
      if (val <= 400) return { level: 'Good', color: '#10B981' };
      if (val <= 1000) return { level: 'Moderate', color: '#F59E0B' };
      if (val <= 5000) return { level: 'Unhealthy for Sensitive', color: '#EF4444' };
      return { level: 'Unhealthy', color: '#DC2626' };
    }
    return { level: 'Unknown', color: '#6B7280' };
  };

  const getHealthAdvice = (sensor: string, level: string) => {
    if (sensor.startsWith("pm")) {
      if (level === "Good") {
        return "Air quality is clean — safe to be outside and exercise normally.";
      } else if (level === "Moderate") {
        return "Acceptable air quality. Sensitive groups (asthma, elderly, kids) should limit prolonged outdoor activity.";
      } else if (level === "Unhealthy for Sensitive") {
        return "Air quality may cause health effects for sensitive groups. Consider wearing an N95 mask outdoors.";
      } else if (level === "Unhealthy") {
        return "Everyone may experience health effects. Limit outdoor exposure and wear protection if needed.";
      }
    } else if (sensor === "rhum_corrected") {
      return "Relative humidity outside the comfort range can cause discomfort or affect respiratory health.";
    } else if (sensor === "atmp_corrected") {
      return "Temperature outside the comfort range may affect wellbeing and productivity.";
    } else if (sensor === "rco2_corrected") {
      return "High CO₂ can reduce concentration and cause fatigue. Ventilation is recommended.";
    }
    return "";
  };

  const quality = getQualityLevel(value, sensorType);

  return (
    <div className="w-full">
      <div className="relative w-48 h-32 mx-auto">
        <svg className="w-full h-full" viewBox="0 0 200 120">
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-200 dark:text-gray-700"
          />
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={quality.color}
            strokeWidth="8"
            strokeDasharray={`${percentage * 2.51} 251`}
            className="transition-all duration-1000"
          />
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="30"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${rotation} 100 100)`}
            className="transition-transform duration-1000"
          />
          <circle cx="100" cy="100" r="6" fill={color} />
          <text x="100" y="90" textAnchor="middle" className="text-lg font-bold fill-current">
            {value.toFixed(1)}
          </text>
          <text x="100" y="110" textAnchor="middle" className="text-xs fill-current opacity-70">
            {sensorConfig[sensorType.toLowerCase() as keyof typeof sensorConfig]?.unit}
          </text>
        </svg>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div 
            className="px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: quality.color }}
          >
            {quality.level}
          </div>
        </div>
      </div>
      
      <div className="w-full text-center mt-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-3 shadow-inner">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {getHealthAdvice(sensorType, quality.level)}
          </p>
        </div>
      </div>
    </div>
  );
};

// Custom marker component for map
const createCustomIcon = (color: string, isSelected: boolean = false) => {
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: ${isSelected ? '24px' : '20px'};
        height: ${isSelected ? '24px' : '20px'};
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: white;
        font-weight: bold;
        transform: translate(-50%, -50%);
      ">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        </svg>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [isSelected ? 24 : 20, isSelected ? 24 : 20],
    iconAnchor: [isSelected ? 12 : 10, isSelected ? 12 : 10],
  });
};

// Map click handler component
const MapClickHandler: React.FC<{ onLocationSelect: (locationId: string) => void }> = ({ onLocationSelect }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      // Find closest location
      let closestLocation = locations[0];
      let minDistance = Infinity;
      
      locations.forEach(location => {
        const distance = Math.sqrt(
          Math.pow(lat - location.coordinates[0], 2) + 
          Math.pow(lng - location.coordinates[1], 2)
        );
        if (distance < minDistance) {
          minDistance = distance;
          closestLocation = location;
        }
      });
      
      onLocationSelect(closestLocation.id);
    }
  });
  
  return null;
};

// Air Quality Education Component
const AirQualityEducation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pm');

  const tabs = [
    { id: 'pm', name: 'Particles', icon: Wind, data: airQualityInfo.pm },
    { id: 'gases', name: 'Gases', icon: Activity, data: airQualityInfo.gases },
    { id: 'comfort', name: 'Comfort', icon: Home, data: airQualityInfo.comfort }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Lightbulb className="h-6 w-6 text-orange-600" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Understanding Air Quality
        </h3>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-600 text-orange-600 shadow'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {tabs.map((tab) => (
          activeTab === tab.id && (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {tab.data.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {tab.data.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <Info className="h-4 w-4 mr-2 text-blue-500" />
                    What it includes:
                  </h5>
                  <ul className="space-y-1">
                    {tab.data.details.map((detail, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                        <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-green-500" />
                    Common sources:
                  </h5>
                  <ul className="space-y-1 mb-4">
                    {tab.data.sources.map((source, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        {source}
                      </li>
                    ))}
                  </ul>

                  <h5 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-red-500" />
                    Health effects:
                  </h5>
                  <ul className="space-y-1">
                    {tab.data.healthEffects.map((effect, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        {effect}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
    </div>
  );
};

// Dashboard Modal Component
const DashboardModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}> = ({ isOpen, onClose, selectedLocation, setSelectedLocation }) => {
  const [selectedSensor, setSelectedSensor] = useState('pm02_corrected');
  const [selectedTimeRange, setSelectedTimeRange] = useState('last48h');
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [latestData, setLatestData] = useState<AirGradientData | null>(null);
  const [allLocationsData, setAllLocationsData] = useState<LocationData>({});
  const [historicalData, setHistoricalData] = useState<AirGradientData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [useCustomRange, setUseCustomRange] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const currentLocation = locations.find(loc => loc.id === selectedLocation);
  const availableSensors = currentLocation?.sensors || [];
  
  const molecularWeights: Record<string, number> = {
    rco2_corrected: 44,
    tvoc: 92,
    noxIndex: 46,
  };

  function ppmToUgM3(ppm: number, mw: number) {
    return ppm * mw / 24.45;
  }

  const radarData = React.useMemo(() => {
    if (!locations.length) return [];

    const gasSensors = ['pm01_corrected', 'pm02_corrected', 'pm10_corrected', 'rco2_corrected', 'tvoc', 'noxIndex'];

    return gasSensors.map((sensorKey) => {
      const config = sensorConfig[sensorKey as keyof typeof sensorConfig];
      const dataPoint: any = { 
        sensor: config.name,
        sensorKey: sensorKey
      };

      locations.forEach((location) => {
        let value = allLocationsData[location.id]?.[sensorKey as keyof AirGradientData] as number | null;

        if (value === null || value === undefined) {
          dataPoint[location.name] = 0;
          dataPoint.color = 'grey';
          return;
        }

        if (molecularWeights[sensorKey]) {
          value = ppmToUgM3(value, molecularWeights[sensorKey]);
        }

        const maxValue = config.maxValue || value || 100;
        const percentage = Math.min((value / maxValue) * 100, 100);

        dataPoint[location.name] = percentage;

        if (percentage <= 50) dataPoint.color = 'green';
        else if (percentage <= 75) dataPoint.color = 'yellow';
        else dataPoint.color = 'red';
      });

      return dataPoint;
    });
  }, [allLocationsData]);

  const fetchAllLocationsData = async () => {
    const promises = locations.map(async (location) => {
      try {
        const response = await fetch(`${API_BASE_URL}/${location.id}/air_latest/`, {
          headers: { 
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          return { locationId: location.id, data };
        }
      } catch (error) {
        console.error(`Error fetching data for ${location.id}:`, error);
      }
      return { locationId: location.id, data: null };
    });

    const results = await Promise.all(promises);
    const newAllLocationsData: LocationData = {};
    
    results.forEach(({ locationId, data }) => {
      if (data) {
        newAllLocationsData[locationId] = data;
      }
    });

    setAllLocationsData(newAllLocationsData);
  };

  const fetchLatestData = async (location: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/${location}/air_latest/`, {
        headers: { 
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setLatestData(data);
      setLastUpdated(new Date());
      
      await fetchAllLocationsData();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(`Failed to fetch latest data: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };
  // const isValidDateRange = useCustomRange ? (startDate && endDate && startDate <= endDate) : true;

  const fetchHistoricalData = async (location: string, period: string, customStart?: string, customEnd?: string) => {
  setLoading(true);
  setError(null);
  
  try {
    let url = '';
    
    if (customStart && customEnd) {
      // Use custom date range
      url = `${API_BASE_URL}/sensor-data/${location}/?start_date=${customStart}&end_date=${customEnd}`;
    } else {
      // Use predefined period
      url = `${API_BASE_URL}/${location}/airgradient/${period}/`;
    }
    
    const response = await fetch(url, {
      headers: { 
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    setHistoricalData(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    setError(`Failed to fetch historical data: ${errorMessage}`);
  } finally {
    setLoading(false);
  }
};

  const handleRefresh = () => {
  fetchLatestData(selectedLocation);
  
  if (useCustomRange && startDate && endDate) {
    fetchHistoricalData(selectedLocation, '', startDate, endDate);
  } else {
    fetchHistoricalData(selectedLocation, selectedTimeRange);
  }
};


  // useEffect(() => {
  //   if (isOpen && selectedLocation) {
  //     fetchLatestData(selectedLocation);
  //     fetchHistoricalData(selectedLocation, selectedTimeRange);
  //   }
  // }, [isOpen, selectedLocation, selectedTimeRange]);
  useEffect(() => {
  if (isOpen && selectedLocation) {
    fetchLatestData(selectedLocation);
    
    if (useCustomRange && startDate && endDate) {
      fetchHistoricalData(selectedLocation, '', startDate, endDate);
    } else {
      fetchHistoricalData(selectedLocation, selectedTimeRange);
    }
  }
}, [isOpen, selectedLocation, selectedTimeRange, useCustomRange, startDate, endDate]);

  const currentSensorConfig = sensorConfig[selectedSensor as keyof typeof sensorConfig];
  const currentValue = latestData?.[selectedSensor as keyof AirGradientData] as number || 0;

  const getBarColor = (value: number, sensor: string) => {
    if (sensor === 'pm02_corrected') {
      if (value <= 12) return '#10B981';
      if (value <= 35) return '#F59E0B';
      if (value <= 55) return '#EF4444';
      return '#DC2626';
    } else if (sensor === 'pm10_corrected') {
      if (value <= 54) return '#10B981';
      if (value <= 154) return '#F59E0B';
      if (value <= 254) return '#EF4444';
      return '#DC2626';
    } else if (sensor === 'pm01_corrected') {
      if (value <= 12) return '#10B981';
      if (value <= 35.4) return '#F59E0B';
      if (value <= 55.4) return '#EF4444';
      return '#DC2626';
    }
    return currentSensorConfig?.color || '#FF6600';
  };

  const chartData = React.useMemo(() => {
    if (!historicalData || historicalData.length === 0) {
      return [];
    }

    return historicalData.map(point => {
      const date = new Date(point.timestamp);
      const value = point[selectedSensor as keyof AirGradientData] as number || 0;
      return {
        time: date.toLocaleString('en-US', { 
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        fullTime: date.toLocaleString(),
        value: value,
      };
    });
  }, [historicalData, selectedSensor]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
style={{ zIndex: 9999 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border dark:border-gray-700 w-full max-w-7xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b dark:border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Air Quality Dashboard - {currentLocation?.name}
            </h2>
            {lastUpdated && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

    <div className="p-6">
  {/* Controls */}
  <div className="grid md:grid-cols-3 gap-6 mb-8">
    {/* Location Dropdown */}
    <Dropdown
      label="Location"
      icon={MapPin}
      options={locations.map((loc) => ({ id: loc.id, name: loc.name }))}
      selected={selectedLocation}
      onSelect={setSelectedLocation}
    />
    
    {/* Time Range Selection */}
    <div className="space-y-3">
      <Dropdown
        label="Time Range"
        icon={Calendar}
        options={[
          ...timeRanges.map((range) => ({ id: range.period, name: range.name })),
          { id: 'custom', name: '📅 Custom Range' }
        ]}
        selected={useCustomRange ? 'custom' : selectedTimeRange}
        onSelect={(value) => {
          if (value === 'custom') {
            setUseCustomRange(true);
          } else {
            setUseCustomRange(false);
            setSelectedTimeRange(value);
          }
        }}
      />
      
      {/* Custom Date Inputs - Appears below dropdown */}
      {useCustomRange && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 ml-1">
                From
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-colors"
                max={endDate || new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 ml-1">
                To
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-colors"
                min={startDate || undefined}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          
          {/* Validation message */}
          {(!startDate || !endDate) && (
            <div className="flex items-center space-x-2 text-xs text-amber-600 dark:text-amber-400 ml-1">
              <AlertTriangle className="h-3 w-3" />
              <span>Please select both dates</span>
            </div>
          )}
          
          {startDate && endDate && startDate > endDate && (
            <div className="flex items-center space-x-2 text-xs text-red-600 dark:text-red-400 ml-1">
              <AlertTriangle className="h-3 w-3" />
              <span>Start date must be before end date</span>
            </div>
          )}
          
          {startDate && endDate && startDate <= endDate && (
            <div className="flex items-center space-x-2 text-xs text-green-600 dark:text-green-400 ml-1">
              <CheckCircle className="h-3 w-3" />
              <span>
                {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))} days selected
              </span>
            </div>
          )}
        </div>
      )}
    </div>
    
    {/* Measurement Dropdown */}
    <MeasurementDropdown
      label="Measurement"
      sensors={availableSensors}
      selected={selectedSensor}
      onSelect={setSelectedSensor}
    />
  </div>

  {/* Rest of your content continues here... */}

            

          {/* Current Values */}
          {latestData && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Current Air Quality Values
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                {availableSensors.map((sensor) => {
                  const config = sensorConfig[sensor as keyof typeof sensorConfig];
                  const value = latestData[sensor as keyof AirGradientData] as number;
                  const IconComponent = config?.icon;

                  return (
                    <motion.div
                      key={sensor}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedSensor === sensor ? "ring-2 ring-orange-600 bg-orange-50 dark:bg-orange-900/20" : ""
                      }`}
                      onClick={() => setSelectedSensor(sensor)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        {IconComponent && (
                          <IconComponent className="h-4 w-4" style={{ color: config?.color }} />
                        )}
                        <div className="text-[10px] text-gray-500 dark:text-gray-400">
                          {config?.unit}
                        </div>
                      </div>

                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {value !== null && value !== undefined ? value.toFixed(1) : "--"}
                      </div>

                      <div className="text-xs text-gray-600 dark:text-gray-300 mt-1 text-center">
                        {config?.name}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Gauge and Radar Chart */}
          {latestData && (selectedSensor === 'pm02_corrected' || selectedSensor === 'pm10_corrected' || selectedSensor === 'pm01_corrected') && (
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 flex flex-col items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                  {currentSensorConfig?.description} Level
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-4">
                  Current reading at <span className="font-semibold">{currentLocation?.name}</span>
                </p>

                <GaugeIndicator
                  value={currentValue}
                  max={selectedSensor === 'pm02_corrected' ? 100 : 200}
                  sensorType={selectedSensor}
                  color={currentSensorConfig?.color || '#FF6600'}
                />
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                  Multi-Parameter Comparison
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-4 text-sm">
                  Normalized values across all locations (0-100% scale)
                </p>
                
                {radarData.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis 
                          dataKey="sensor" 
                          tick={(props: any) => {
                            const { x, y, payload } = props;
                            const sensorName = payload.value;
                            const row = payload.payload || {};
                            const sensorKey = row.sensorKey || "";
                            const locationNames = Object.keys(row).filter(
                              (k) => k !== "sensor" && k !== "sensorKey"
                            );

                            let value: number | null = null;
                            if (locationNames.length > 0) {
                              const firstLocation = locationNames[0];
                              value = typeof row[firstLocation] === "number" ? row[firstLocation] : null;
                            }

                            const color = value !== null ? getBarColor(value, sensorKey) : "#9CA3AF";

                            return (
                              <text
                                x={x}
                                y={y}
                                textAnchor="middle"
                                fill={color}
                                fontSize={10}
                                fontWeight="bold"
                              >
                                {sensorName}
                              </text>
                            );
                          }}
                        />

                        <PolarRadiusAxis 
                          angle={90} 
                          domain={[0, 100]} 
                          className="text-gray-600 dark:text-gray-300"
                          tick={{ fontSize: 8 }}
                          tickFormatter={(value) => `${value}%`}
                        />

                        {locations.map((location, index) => (
                          <Radar
                            key={location.id}
                            name={location.name.length > 15 ? location.name.substring(0, 15) + '...' : location.name}
                            dataKey={location.name}
                            stroke={index === 0 ? '#FF6600' : '#3B82F6'}
                            fill={index === 0 ? '#FF6600' : '#3B82F6'}
                            fillOpacity={0.15}
                            strokeWidth={2}
                          />
                        ))}
                         
                        <Legend />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white'
                          }}

                          formatter={(value: any, name: string) => [
                            `${value.toFixed(1)}%`, 
                            name
                          ]}

                          labelFormatter={(label) => `${label}`}
                        />

                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-2"></div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Loading radar data...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main Chart */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {currentSensorConfig?.description} - {currentLocation?.name}
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <TrendingUp className="h-4 w-4" />
                  <span>{timeRanges.find(r => r.period === selectedTimeRange)?.name}</span>
                </div>
                <div className="flex bg-gray-100 dark:bg-gray-600 rounded-lg p-1">
                  <button
                    onClick={() => setChartType('line')}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm transition-colors ${
                      chartType === 'line' 
                        ? 'bg-white dark:bg-gray-500 text-gray-900 dark:text-white shadow' 
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                  <LineChartIcon className="h-4 w-4" />
                    <span>Line</span>
                  </button>
                  <button
                    onClick={() => setChartType('bar')}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm transition-colors ${
                      chartType === 'bar' 
                        ? 'bg-white dark:bg-gray-500 text-gray-900 dark:text-white shadow' 
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Bar</span>
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
              </div>
            ) : (
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'line' ? (
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis 
                        dataKey="time" 
                        className="text-gray-600 dark:text-gray-300"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        className="text-gray-600 dark:text-gray-300"
                        tick={{ fontSize: 12 }}
                        label={{ 
                          value: currentSensorConfig?.unit || '', 
                          angle: -90, 
                          position: 'insideLeft' 
                        }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          border: 'none',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={currentSensorConfig?.color || '#FF6600'}
                        strokeWidth={3}
                        dot={{ fill: currentSensorConfig?.color || '#FF6600', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: currentSensorConfig?.color || '#FF6600', strokeWidth: 2 }}
                      />
                    </LineChart>
                  ) : (
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis 
                        dataKey="time" 
                        className="text-gray-600 dark:text-gray-300"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        className="text-gray-600 dark:text-gray-300"
                        tick={{ fontSize: 12 }}
                        label={{ 
                          value: currentSensorConfig?.unit || '', 
                          angle: -90, 
                          position: 'insideLeft' 
                        }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          border: 'none',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      />
                      <Bar 
                        dataKey="value" 
                        fill={currentSensorConfig?.color || '#FF6600'}
                        shape={(props: any) => {
                          const color = getBarColor(props.payload.value, selectedSensor);
                          return <rect {...props} fill={color} />;
                        }}
                      />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Dashboard: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('marrakech');
  const [showDashboard, setShowDashboard] = useState(false);
  const [allLocationsData, setAllLocationsData] = useState<LocationData>({});
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchAllLocationsData = async () => {
    setLoading(true);
    const promises = locations.map(async (location) => {
      try {
        const response = await fetch(`${API_BASE_URL}/${location.id}/air_latest/`, {
          headers: { 
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          return { locationId: location.id, data };
        }
      } catch (error) {
        console.error(`Error fetching data for ${location.id}:`, error);
      }
      return { locationId: location.id, data: null };
    });

    const results = await Promise.all(promises);
    const newAllLocationsData: LocationData = {};
    
    results.forEach(({ locationId, data }) => {
      if (data) {
        newAllLocationsData[locationId] = data;
      }
    });

    setAllLocationsData(newAllLocationsData);
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => {
    fetchAllLocationsData();
    
    // Auto-refresh every hour
    const interval = setInterval(fetchAllLocationsData, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getLocationAQI = (locationId: string) => {
    const data = allLocationsData[locationId];
    if (!data) return { level: 'Unknown', color: '#9CA3AF' };

    const pm25 = data.pm02_corrected || 0;
    if (pm25 <= 12) return { level: 'Good', color: '#10B981' };
    if (pm25 <= 35) return { level: 'Moderate', color: '#F59E0B' };
    if (pm25 <= 55) return { level: 'Unhealthy for Sensitive', color: '#EF4444' };
    return { level: 'Unhealthy', color: '#DC2626' };
  };

  const handleLocationClick = (locationId: string) => {
    setSelectedLocation(locationId);
    setShowDashboard(true);
  };

  const handleMapClick = (locationId: string) => {
    setSelectedLocation(locationId);
    setShowDashboard(true);
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      {/* <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Air Quality Monitoring Network
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Real-time air quality data from monitoring stations across Morocco
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {lastUpdated && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </div>
              )}
              <button
                onClick={fetchAllLocationsData}
                disabled={loading}
                className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div> */}

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="grid lg:grid-cols-3 gap-8">
    {/* Map Section */}
    <div className="lg:col-span-2">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 overflow-hidden">
        
        {/* Map container with relative positioning */}
        <div className="h-[40rem] relative z-0">
          <MapContainer
            center={[33.0, -5.9]}
            zoom={7}
            style={{ height: '100%', width: '100%' }}
            className="rounded-b-xl z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <TileLayer
  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  attribution="Tiles &copy; Esri &mdash; Source: Esri, Earthstar Geographics"
/> */}
{/* <TileLayer
  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
  subdomains={['a', 'b', 'c', 'd']}
/> */}
{/* <TileLayer
  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
  subdomains={['a', 'b', 'c', 'd']}
/> */}



            {locations.map((location) => {
              const aqi = getLocationAQI(location.id);
              const data = allLocationsData[location.id];
              
              return (
                <Marker
                  key={location.id}
                  position={location.coordinates}
                  icon={createCustomIcon(aqi.color, selectedLocation === location.id)}
                  eventHandlers={{
                    click: () => handleLocationClick(location.id)
                  }}
                >
                  <LeafletTooltip direction="top" offset={[0, -10]} opacity={0.9}>
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-bold text-gray-900 mb-2">{location.name}</h3>
                       {data ? (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">PM2.5:</span>
                            <span className="font-medium">
                              {data.pm02_corrected !== null && data.pm02_corrected !== undefined 
                                ? `${data.pm02_corrected.toFixed(1)} µg/m³` 
                                : '--'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">PM10:</span>
                            <span className="font-medium">
                              {data.pm10_corrected !== null && data.pm10_corrected !== undefined 
                                ? `${data.pm10_corrected.toFixed(1)} µg/m³` 
                                : '--'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Temperature:</span>
                            <span className="font-medium">{data.atmp_corrected?.toFixed(1) || '--'} °C</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Humidity:</span>
                            <span className="font-medium">{data.rhum_corrected?.toFixed(1) || '--'} %</span>
                          </div>
                          <div 
                            className="px-2 py-1 rounded text-xs font-medium text-white text-center mt-2"
                            style={{ backgroundColor: aqi.color }}
                          >
                            Air Quality: {aqi.level}
                          </div>
                          {/* <button
                            onClick={() => handleLocationClick(location.id)}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors mt-2"
                          >
                            View Details
                          </button> */}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="text-gray-500 text-sm text-center py-4">
                            Loading data...
                          </div>
                          <button
                            onClick={() => {
                              fetchAllLocationsData();
                              handleLocationClick(location.id);
                            }}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Retry & View Details
                          </button>
                        </div>
                      )}
                    </div>
                  </LeafletTooltip>
                  
                  
                </Marker>
              );
            })}
          </MapContainer>

          {/* Overlay text inside the map */}
        {/* Legend Box */}
<div className="absolute bottom-4 left-4 bg-gray-800 bg-opacity-90 text-white rounded-lg p-3 shadow-md z-10">
  <h3 className="text-sm font-semibold mb-2">LQI (DE)</h3>
  <div className="flex flex-col space-y-1 text-xs">
    {/* <div className="flex items-center space-x-2">
      <div className="w-1.5 h-5 bg-red-900"></div>
      <span>Very Poor</span>
    </div> */}
    <div className="flex items-center space-x-2">
      <div className="w-1.5 h-5 bg-red-500"></div>
      <span>unhealthy</span>
    </div>
    <div className="flex items-center space-x-2">
      <div className="w-1.5 h-5 bg-yellow-400"></div>
      <span>Moderate</span>
    </div>
    <div className="flex items-center space-x-2">
      <div className="w-1.5 h-5 bg-green-500"></div>
      <span>Good</span>
    </div>
    {/* <div className="flex items-center space-x-2">
      <div className="w-1.5 h-5 bg-blue-500"></div>
      <span>Very Good</span>
    </div> */}
  </div>
</div>

        </div>
      </div>

      {/* Location Cards */}
     <div className="grid md:grid-cols-2 gap-4 mt-6">
  {locations.map((location) => {
    const aqi = getLocationAQI(location.id);
    const data = allLocationsData[location.id];

    return (
      <motion.div
        key={location.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-4 cursor-pointer transition-all duration-300"
        onClick={() => handleLocationClick(location.id)}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
         <div className="flex items-center space-x-3">
  <MapPin className="h-5 w-5 text-orange-600" />
  <h3
    className="font-bold text-gray-900 dark:text-white text-base leading-tight text-center break-words"
    style={{
      maxWidth: '180px',   // keeps all names in same visual width
      minHeight: '44px',   // ensures all cards stay aligned
      lineHeight: '1.2',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {location.name}
  </h3>
</div>


          <div
            className="px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: aqi.color }}
          >
            {aqi.level}
          </div>
        </div>

        {/* Data section */}
        {data ? (
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white leading-tight min-w-[80px]">
                {data.pm02_corrected?.toFixed(1) || '--'}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                PM2.5 µg/m³
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white leading-tight min-w-[80px]">
                {data.atmp_corrected?.toFixed(1) || '--'}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                Temperature °C
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No data available
          </div>
        )}

        {/* Button */}
        {/* <button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          View Dashboard
        </button> */}
      </motion.div>
    );
  })}
</div>


    </div>
  {/* </div>
</div> */}

          {/* Education Section */}
          <div className="space-y-6">
            <AirQualityEducation />
            
            {/* Quick Stats */}
            {/* <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 text-orange-600 mr-2" />
                Network Status
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Active Stations:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {Object.keys(allLocationsData).length} / {locations.length}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Data Coverage:</span>
                  <span className="font-bold text-green-600">
                    {Math.round((Object.keys(allLocationsData).length / locations.length) * 100)}%
                  </span>
                </div>
                
                {lastUpdated && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Last Update:</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      {lastUpdated.toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t dark:border-gray-700">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Real-time monitoring active</span>
                </div>
              </div>
            </div> */}

            {/* Health Tips */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Heart className="h-5 w-5 text-red-500 mr-2" />
                Health Tips
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Check air quality before outdoor activities, especially exercise
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Keep windows closed during high pollution periods
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Consider wearing masks when PM2.5 levels are high
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Use air purifiers indoors during poor air quality days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Modal */}
      <AnimatePresence>
        {showDashboard && (
          <DashboardModal
            isOpen={showDashboard}
            onClose={() => setShowDashboard(false)}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        )}
      </AnimatePresence>
    </div>
  );
};



























//this one is improved and gettig a good map in a cadre



// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   MapPin, 
//   Thermometer, 
//   Droplets, 
//   Wind, 
//   Activity,
//   RefreshCw,
//   Calendar,
//   TrendingUp,
//   AlertTriangle,
//   CheckCircle,
//   ChevronDown,
//   BarChart3,
//   Zap,
//   Eye,
//   LineChart as LineChartIcon,
//   X,
//   Info,
//   Lightbulb,
//   Shield,
//   Heart,
//   Home
// } from 'lucide-react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   RadarChart,
//   Radar,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Legend
// } from 'recharts';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents ,Tooltip as LeafletTooltip} from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Fix for default markers in react-leaflet
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// interface AirGradientData {
//   locationId: number;
//   locationName: string;
//   latitude: number;
//   longitude: number;
//   pm01: number;
//   pm02: number;
//   pm10: number;
//   pm01_corrected: number;
//   pm02_corrected: number;
//   pm10_corrected: number;
//   pm003Count: number;
//   atmp: number;
//   rhum: number;
//   rco2: number | null;
//   atmp_corrected: number;
//   rhum_corrected: number;
//   rco2_corrected: number | null;
//   tvoc: number | null;
//   wifi: number;
//   timestamp: string;
//   serialno: string;
//   model: string;
//   firmwareVersion: string;
//   tvocIndex: number | null;
//   noxIndex: number | null;
//   datapoints?: number;
// }

// interface LocationData {
//   [locationId: string]: AirGradientData;
// }

// const locations = [
//   { 
//     id: 'marrakech', 
//     name: 'Marrakech', 
//     coordinates: [31.66098, -8.02787] as [number, number],
//     sensors: ['pm01_corrected', 'pm02_corrected', 'pm10_corrected', 'rhum_corrected', 'atmp_corrected', 'rco2_corrected', 'tvoc', 'noxIndex'] 
//   },
//   { 
//     id: 'pergola_um6p', 
//     name: 'Ben Guerir (UM6P Campus - Pergola)', 
//     coordinates: [32.2193, -7.9311] as [number, number],
//     sensors: ['pm01_corrected', 'pm02_corrected', 'pm10_corrected', 'rhum_corrected', 'atmp_corrected', 'rco2_corrected', 'tvoc', 'noxIndex'] 
//   },
// ];

// const sensorConfig = {
//   pm01_corrected: { name: 'PM1', unit: 'µg/m³', icon: Wind, color: '#FF6600', description: 'Particulate Matter 1.0', maxValue: 100 },
//   pm02_corrected: { name: 'PM2.5', unit: 'µg/m³', icon: Wind, color: '#FF8533', description: 'Particulate Matter 2.5', maxValue: 100 },
//   pm10_corrected: { name: 'PM10', unit: 'µg/m³', icon: Wind, color: '#FFB366', description: 'Particulate Matter 10', maxValue: 200 },
//   rhum_corrected: { name: 'Humidity', unit: '%', icon: Droplets, color: '#3B82F6', description: 'Relative Humidity', maxValue: 100 },
//   atmp_corrected: { name: 'Temperature', unit: '°C', icon: Thermometer, color: '#EF4444', description: 'Air Temperature', maxValue: 50 },
//   rco2_corrected: { name: 'CO2', unit: 'ppm', icon: Activity, color: '#10B981', description: 'Carbon Dioxide', maxValue: 2000 },
//   tvoc: { name: 'TVOC', unit: 'index', icon: Zap, color: '#8B5CF6', description: 'Total Volatile Organic Compounds', maxValue: 500 },
//   noxIndex: { name: 'NOX', unit: 'index', icon: Eye, color: '#F59E0B', description: 'Nitrogen Oxides Index', maxValue: 500 }
// };

// const timeRanges = [
//   { id: 'last24h', name: 'Today', period: 'last24h' },
//   { id: 'last48h', name: 'Yesterday', period: 'last48h' },
//   { id: 'last7d', name: 'This Week', period: 'last7d' },
//   { id: 'last30d', name: 'This Month', period: 'last30d' }
// ];

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // Educational content about air quality
// const airQualityInfo = {
//   pm: {
//     title: "Particulate Matter (PM)",
//     description: "Tiny particles in the air that can affect your health",
//     details: [
//       "PM1: Ultra-fine particles (< 1 micrometer) - can penetrate deep into lungs",
//       "PM2.5: Fine particles (< 2.5 micrometers) - most harmful to health",
//       "PM10: Coarse particles (< 10 micrometers) - can irritate eyes and throat"
//     ],
//     sources: ["Vehicle exhaust", "Industrial emissions", "Dust storms", "Cooking and heating"],
//     healthEffects: ["Respiratory problems", "Heart disease", "Reduced lung function", "Premature death"]
//   },
//   gases: {
//     title: "Air Quality Gases",
//     description: "Chemical compounds that affect air quality and health",
//     details: [
//       "CO₂: Carbon dioxide - indicator of ventilation quality",
//       "TVOC: Total Volatile Organic Compounds - from paints, cleaners, etc.",
//       "NOX: Nitrogen oxides - mainly from vehicle emissions"
//     ],
//     sources: ["Vehicle emissions", "Industrial processes", "Building materials", "Household products"],
//     healthEffects: ["Headaches", "Eye irritation", "Respiratory issues", "Reduced concentration"]
//   },
//   comfort: {
//     title: "Comfort Parameters",
//     description: "Environmental factors that affect comfort and wellbeing",
//     details: [
//       "Temperature: Optimal range is 18-24°C for comfort",
//       "Humidity: Ideal range is 30-60% for health and comfort"
//     ],
//     sources: ["Weather conditions", "Heating/cooling systems", "Natural climate"],
//     healthEffects: ["Discomfort", "Dry skin/eyes", "Mold growth", "Poor sleep quality"]
//   }
// };

// const Dropdown: React.FC<{
//   label: string;
//   icon: React.ElementType;
//   options: Array<{ id: string; name: string }>;
//   selected: string;
//   onSelect: (value: string) => void;
// }> = ({ label, icon: Icon, options, selected, onSelect }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const selectedOption = options.find((o) => o.id === selected);

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen((s) => !s)}
//         className="w-full flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-left shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//       >
//         <div className="flex items-center space-x-3">
//           <Icon className="h-4 w-4 text-orange-600" />
//           <div>
//             <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
//             <div className="font-medium text-gray-900 dark:text-white">{selectedOption?.name}</div>
//           </div>
//         </div>
//         <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       {isOpen && (
//         <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50">
//           {options.map((option, idx) => (
//             <button
//               key={option.id}
//               onClick={() => {
//                 onSelect(option.id);
//                 setIsOpen(false);
//               }}
//               className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
//                 selected === option.id ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600' : 'text-gray-900 dark:text-white'
//               } ${idx === 0 ? 'rounded-t-lg' : ''} ${idx === options.length - 1 ? 'rounded-b-lg' : ''}`}
//             >
//               {option.name}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const MeasurementDropdown: React.FC<{
//   label: string;
//   sensors: string[];
//   selected: string;
//   onSelect: (value: string) => void;
// }> = ({ label, sensors, selected, onSelect }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const selectedSensorConfig = sensorConfig[selected as keyof typeof sensorConfig];

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen((s) => !s)}
//         className="w-full flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-left shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//       >
//         <div className="flex items-center space-x-3">
//           {selectedSensorConfig?.icon && (
//             <selectedSensorConfig.icon 
//               className="h-5 w-5" 
//               style={{ color: selectedSensorConfig.color }} 
//             />
//           )}
//           <div>
//             <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
//             <div className="font-medium text-gray-900 dark:text-white">{selectedSensorConfig?.name}</div>
//           </div>
//         </div>
//         <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       {isOpen && (
//         <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50">
//           {sensors.map((sensor, idx) => {
//             const config = sensorConfig[sensor as keyof typeof sensorConfig];
//             const IconComponent = config?.icon;
//             return (
//               <button
//                 key={sensor}
//                 onClick={() => {
//                   onSelect(sensor);
//                   setIsOpen(false);
//                 }}
//                 className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3 ${
//                   selected === sensor ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600' : 'text-gray-900 dark:text-white'
//                 } ${idx === 0 ? 'rounded-t-lg' : ''} ${idx === sensors.length - 1 ? 'rounded-b-lg' : ''}`}
//               >
//                 {IconComponent && (
//                   <IconComponent 
//                     className="h-5 w-5" 
//                     style={{ color: config?.color }} 
//                   />
//                 )}
//                 <div>
//                   <div className="font-medium">{config?.name}</div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">{config?.description}</div>
//                 </div>
//               </button>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// const GaugeIndicator: React.FC<{ 
//   value: number; 
//   max: number; 
//   sensorType: string; 
//   color: string 
// }> = ({ value, max, sensorType, color }) => {
//   const percentage = Math.min((value / max) * 100, 100);
//   const rotation = (percentage / 100) * 180 - 90;

//   const getQualityLevel = (val: number, sensor: string) => {
//     if (sensor === 'pm02_corrected') {
//       if (val <= 12) return { level: 'Good', color: '#10B981' };
//       if (val <= 35) return { level: 'Moderate', color: '#F59E0B' };
//       if (val <= 55) return { level: 'Unhealthy for Sensitive', color: '#EF4444' };
//       return { level: 'Unhealthy', color: '#DC2626' };
//     } else if (sensor === 'pm10_corrected') {
//       if (val <= 54) return { level: 'Good', color: '#10B981' };
//       if (val <= 154) return { level: 'Moderate', color: '#F59E0B' };
//       if (val <= 254) return { level: 'Unhealthy for Sensitive', color: '#EF4444' };
//       return { level: 'Unhealthy', color: '#DC2626' };
//     } else if (sensor === 'pm01_corrected') {
//       if (val <= 12) return { level: 'Good', color: '#10B981' };
//       if (val <= 35.4) return { level: 'Moderate', color: '#F59E0B' };
//       if (val <= 55.4) return { level: 'Unhealthy for Sensitive', color: '#EF4444' };
//       return { level: 'Unhealthy', color: '#DC2626' };
//     } else if (sensor === 'rhum_corrected') {
//       if (val >= 30 && val <= 60) return { level: 'Good', color: '#10B981' };
//       if ((val >= 20 && val < 30) || (val > 60 && val <= 70)) return { level: 'Moderate', color: '#F59E0B' };
//       if ((val >= 10 && val < 20) || (val > 70 && val <= 80)) return { level: 'Unhealthy for Sensitive', color: '#EF4444' };
//       return { level: 'Unhealthy', color: '#DC2626' };
//     } else if (sensor === 'atmp_corrected') {
//       if (val >= 18 && val <= 24) return { level: 'Good', color: '#10B981' };
//       if ((val >= 15 && val < 18) || (val > 24 && val <= 27)) return { level: 'Moderate', color: '#F59E0B' };
//       if ((val >= 12 && val < 15) || (val > 27 && val <= 30)) return { level: 'Unhealthy for Sensitive', color: '#EF4444' };
//       return { level: 'Unhealthy', color: '#DC2626' };
//     } else if (sensor === 'rco2_corrected') {
//       if (val <= 400) return { level: 'Good', color: '#10B981' };
//       if (val <= 1000) return { level: 'Moderate', color: '#F59E0B' };
//       if (val <= 5000) return { level: 'Unhealthy for Sensitive', color: '#EF4444' };
//       return { level: 'Unhealthy', color: '#DC2626' };
//     }
//     return { level: 'Unknown', color: '#6B7280' };
//   };

//   const getHealthAdvice = (sensor: string, level: string) => {
//     if (sensor.startsWith("pm")) {
//       if (level === "Good") {
//         return "Air quality is clean — safe to be outside and exercise normally.";
//       } else if (level === "Moderate") {
//         return "Acceptable air quality. Sensitive groups (asthma, elderly, kids) should limit prolonged outdoor activity.";
//       } else if (level === "Unhealthy for Sensitive") {
//         return "Air quality may cause health effects for sensitive groups. Consider wearing an N95 mask outdoors.";
//       } else if (level === "Unhealthy") {
//         return "Everyone may experience health effects. Limit outdoor exposure and wear protection if needed.";
//       }
//     } else if (sensor === "rhum_corrected") {
//       return "Relative humidity outside the comfort range can cause discomfort or affect respiratory health.";
//     } else if (sensor === "atmp_corrected") {
//       return "Temperature outside the comfort range may affect wellbeing and productivity.";
//     } else if (sensor === "rco2_corrected") {
//       return "High CO₂ can reduce concentration and cause fatigue. Ventilation is recommended.";
//     }
//     return "";
//   };

//   const quality = getQualityLevel(value, sensorType);

//   return (
//     <div className="w-full">
//       <div className="relative w-48 h-32 mx-auto">
//         <svg className="w-full h-full" viewBox="0 0 200 120">
//           <path
//             d="M 20 100 A 80 80 0 0 1 180 100"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="8"
//             className="text-gray-200 dark:text-gray-700"
//           />
//           <path
//             d="M 20 100 A 80 80 0 0 1 180 100"
//             fill="none"
//             stroke={quality.color}
//             strokeWidth="8"
//             strokeDasharray={`${percentage * 2.51} 251`}
//             className="transition-all duration-1000"
//           />
//           <line
//             x1="100"
//             y1="100"
//             x2="100"
//             y2="30"
//             stroke={color}
//             strokeWidth="3"
//             strokeLinecap="round"
//             transform={`rotate(${rotation} 100 100)`}
//             className="transition-transform duration-1000"
//           />
//           <circle cx="100" cy="100" r="6" fill={color} />
//           <text x="100" y="90" textAnchor="middle" className="text-lg font-bold fill-current">
//             {value.toFixed(1)}
//           </text>
//           <text x="100" y="110" textAnchor="middle" className="text-xs fill-current opacity-70">
//             {sensorConfig[sensorType.toLowerCase() as keyof typeof sensorConfig]?.unit}
//           </text>
//         </svg>
//         <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
//           <div 
//             className="px-3 py-1 rounded-full text-xs font-medium text-white"
//             style={{ backgroundColor: quality.color }}
//           >
//             {quality.level}
//           </div>
//         </div>
//       </div>
      
//       <div className="w-full text-center mt-4">
//         <div className="bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-3 shadow-inner">
//           <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
//             {getHealthAdvice(sensorType, quality.level)}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Custom marker component for map
// const createCustomIcon = (color: string, isSelected: boolean = false) => {
//   return L.divIcon({
//     html: `
//       <div style="
//         background-color: ${color};
//         width: ${isSelected ? '24px' : '20px'};
//         height: ${isSelected ? '24px' : '20px'};
//         border-radius: 50%;
//         border: 3px solid white;
//         box-shadow: 0 2px 8px rgba(0,0,0,0.3);
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         font-size: 10px;
//         color: white;
//         font-weight: bold;
//         transform: translate(-50%, -50%);
//       ">
//         <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
//         </svg>
//       </div>
//     `,
//     className: 'custom-marker',
//     iconSize: [isSelected ? 24 : 20, isSelected ? 24 : 20],
//     iconAnchor: [isSelected ? 12 : 10, isSelected ? 12 : 10],
//   });
// };

// // Map click handler component
// const MapClickHandler: React.FC<{ onLocationSelect: (locationId: string) => void }> = ({ onLocationSelect }) => {
//   useMapEvents({
//     click: (e) => {
//       const { lat, lng } = e.latlng;
//       // Find closest location
//       let closestLocation = locations[0];
//       let minDistance = Infinity;
      
//       locations.forEach(location => {
//         const distance = Math.sqrt(
//           Math.pow(lat - location.coordinates[0], 2) + 
//           Math.pow(lng - location.coordinates[1], 2)
//         );
//         if (distance < minDistance) {
//           minDistance = distance;
//           closestLocation = location;
//         }
//       });
      
//       onLocationSelect(closestLocation.id);
//     }
//   });
  
//   return null;
// };

// // Air Quality Education Component
// const AirQualityEducation: React.FC = () => {
//   const [activeTab, setActiveTab] = useState('pm');

//   const tabs = [
//     { id: 'pm', name: 'Particles', icon: Wind, data: airQualityInfo.pm },
//     { id: 'gases', name: 'Gases', icon: Activity, data: airQualityInfo.gases },
//     { id: 'comfort', name: 'Comfort', icon: Home, data: airQualityInfo.comfort }
//   ];

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 p-6">
//       <div className="flex items-center space-x-2 mb-6">
//         <Lightbulb className="h-6 w-6 text-orange-600" />
//         <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//           Understanding Air Quality
//         </h3>
//       </div>

//       {/* Tab Navigation */}
//       <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//               activeTab === tab.id
//                 ? 'bg-white dark:bg-gray-600 text-orange-600 shadow'
//                 : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
//             }`}
//           >
//             <tab.icon className="h-4 w-4" />
//             <span>{tab.name}</span>
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <AnimatePresence mode="wait">
//         {tabs.map((tab) => (
//           activeTab === tab.id && (
//             <motion.div
//               key={tab.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-4"
//             >
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                   {tab.data.title}
//                 </h4>
//                 <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
//                   {tab.data.description}
//                 </p>
//               </div>

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <h5 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
//                     <Info className="h-4 w-4 mr-2 text-blue-500" />
//                     What it includes:
//                   </h5>
//                   <ul className="space-y-1">
//                     {tab.data.details.map((detail, index) => (
//                       <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
//                         <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
//                         {detail}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div>
//                   <h5 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
//                     <Shield className="h-4 w-4 mr-2 text-green-500" />
//                     Common sources:
//                   </h5>
//                   <ul className="space-y-1 mb-4">
//                     {tab.data.sources.map((source, index) => (
//                       <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
//                         <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
//                         {source}
//                       </li>
//                     ))}
//                   </ul>

//                   <h5 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
//                     <Heart className="h-4 w-4 mr-2 text-red-500" />
//                     Health effects:
//                   </h5>
//                   <ul className="space-y-1">
//                     {tab.data.healthEffects.map((effect, index) => (
//                       <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
//                         <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
//                         {effect}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </motion.div>
//           )
//         ))}
//       </AnimatePresence>
//     </div>
//   );
// };

// // Dashboard Modal Component
// const DashboardModal: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
//   selectedLocation: string;
//   setSelectedLocation: (location: string) => void;
// }> = ({ isOpen, onClose, selectedLocation, setSelectedLocation }) => {
//   const [selectedSensor, setSelectedSensor] = useState('pm02_corrected');
//   const [selectedTimeRange, setSelectedTimeRange] = useState('last48h');
//   const [chartType, setChartType] = useState<'line' | 'bar'>('line');
//   const [latestData, setLatestData] = useState<AirGradientData | null>(null);
//   const [allLocationsData, setAllLocationsData] = useState<LocationData>({});
//   const [historicalData, setHistoricalData] = useState<AirGradientData[] | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const currentLocation = locations.find(loc => loc.id === selectedLocation);
//   const availableSensors = currentLocation?.sensors || [];
  
//   const molecularWeights: Record<string, number> = {
//     rco2_corrected: 44,
//     tvoc: 92,
//     noxIndex: 46,
//   };

//   function ppmToUgM3(ppm: number, mw: number) {
//     return ppm * mw / 24.45;
//   }

//   const radarData = React.useMemo(() => {
//     if (!locations.length) return [];

//     const gasSensors = ['pm01_corrected', 'pm02_corrected', 'pm10_corrected', 'rco2_corrected', 'tvoc', 'noxIndex'];

//     return gasSensors.map((sensorKey) => {
//       const config = sensorConfig[sensorKey as keyof typeof sensorConfig];
//       const dataPoint: any = { 
//         sensor: config.name,
//         sensorKey: sensorKey
//       };

//       locations.forEach((location) => {
//         let value = allLocationsData[location.id]?.[sensorKey as keyof AirGradientData] as number | null;

//         if (value === null || value === undefined) {
//           dataPoint[location.name] = 0;
//           dataPoint.color = 'grey';
//           return;
//         }

//         if (molecularWeights[sensorKey]) {
//           value = ppmToUgM3(value, molecularWeights[sensorKey]);
//         }

//         const maxValue = config.maxValue || value || 100;
//         const percentage = Math.min((value / maxValue) * 100, 100);

//         dataPoint[location.name] = percentage;

//         if (percentage <= 50) dataPoint.color = 'green';
//         else if (percentage <= 75) dataPoint.color = 'yellow';
//         else dataPoint.color = 'red';
//       });

//       return dataPoint;
//     });
//   }, [allLocationsData]);

//   const fetchAllLocationsData = async () => {
//     const promises = locations.map(async (location) => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/${location.id}/air_latest/`, {
//           headers: { 
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//           }
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           return { locationId: location.id, data };
//         }
//       } catch (error) {
//         console.error(`Error fetching data for ${location.id}:`, error);
//       }
//       return { locationId: location.id, data: null };
//     });

//     const results = await Promise.all(promises);
//     const newAllLocationsData: LocationData = {};
    
//     results.forEach(({ locationId, data }) => {
//       if (data) {
//         newAllLocationsData[locationId] = data;
//       }
//     });

//     setAllLocationsData(newAllLocationsData);
//   };

//   const fetchLatestData = async (location: string) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch(`${API_BASE_URL}/${location}/air_latest/`, {
//         headers: { 
//           Accept: 'application/json',
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setLatestData(data);
//       setLastUpdated(new Date());
      
//       await fetchAllLocationsData();
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
//       setError(`Failed to fetch latest data: ${errorMessage}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchHistoricalData = async (location: string, period: string) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch(`${API_BASE_URL}/${location}/airgradient/${period}/`, {
//         headers: { 
//           Accept: 'application/json',
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setHistoricalData(data);
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
//       setError(`Failed to fetch historical data: ${errorMessage}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = () => {
//     fetchLatestData(selectedLocation);
//     fetchHistoricalData(selectedLocation, selectedTimeRange);
//   };

//   useEffect(() => {
//     if (isOpen && selectedLocation) {
//       fetchLatestData(selectedLocation);
//       fetchHistoricalData(selectedLocation, selectedTimeRange);
//     }
//   }, [isOpen, selectedLocation, selectedTimeRange]);

//   const currentSensorConfig = sensorConfig[selectedSensor as keyof typeof sensorConfig];
//   const currentValue = latestData?.[selectedSensor as keyof AirGradientData] as number || 0;

//   const getBarColor = (value: number, sensor: string) => {
//     if (sensor === 'pm02_corrected') {
//       if (value <= 12) return '#10B981';
//       if (value <= 35) return '#F59E0B';
//       if (value <= 55) return '#EF4444';
//       return '#DC2626';
//     } else if (sensor === 'pm10_corrected') {
//       if (value <= 54) return '#10B981';
//       if (value <= 154) return '#F59E0B';
//       if (value <= 254) return '#EF4444';
//       return '#DC2626';
//     } else if (sensor === 'pm01_corrected') {
//       if (value <= 12) return '#10B981';
//       if (value <= 35.4) return '#F59E0B';
//       if (value <= 55.4) return '#EF4444';
//       return '#DC2626';
//     }
//     return currentSensorConfig?.color || '#FF6600';
//   };

//   const chartData = React.useMemo(() => {
//     if (!historicalData || historicalData.length === 0) {
//       return [];
//     }

//     return historicalData.map(point => {
//       const date = new Date(point.timestamp);
//       const value = point[selectedSensor as keyof AirGradientData] as number || 0;
//       return {
//         time: date.toLocaleString('en-US', { 
//           month: '2-digit',
//           day: '2-digit',
//           hour: '2-digit',
//           minute: '2-digit'
//         }),
//         fullTime: date.toLocaleString(),
//         value: value,
//       };
//     });
//   }, [historicalData, selectedSensor]);

//   if (!isOpen) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
// style={{ zIndex: 9999 }}
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//         className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border dark:border-gray-700 w-full max-w-7xl max-h-[90vh] overflow-y-auto"
//       >
//         {/* Header */}
//         <div className="p-6 border-b dark:border-gray-700 flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//               Air Quality Dashboard - {currentLocation?.name}
//             </h2>
//             {lastUpdated && (
//               <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                 Last updated: {lastUpdated.toLocaleTimeString()}
//               </p>
//             )}
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={handleRefresh}
//               disabled={loading}
//               className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//             >
//               <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
//               <span>Refresh</span>
//             </button>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//             >
//               <X className="h-5 w-5 text-gray-500" />
//             </button>
//           </div>
//         </div>

//         <div className="p-6">
//           {/* Controls */}
//           <div className="grid md:grid-cols-3 gap-6 mb-8">
//             <Dropdown
//               label="Location"
//               icon={MapPin}
//               options={locations.map((loc) => ({ id: loc.id, name: loc.name }))}
//               selected={selectedLocation}
//               onSelect={setSelectedLocation}
//             />
//             <Dropdown
//               label="Time Range"
//               icon={Calendar}
//               options={timeRanges.map((range) => ({ id: range.period, name: range.name }))}
//               selected={selectedTimeRange}
//               onSelect={setSelectedTimeRange}
//             />
//             <MeasurementDropdown
//               label="Measurement"
//               sensors={availableSensors}
//               selected={selectedSensor}
//               onSelect={setSelectedSensor}
//             />
//           </div>

//           {/* Current Values */}
//           {latestData && (
//             <div className="mb-8">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                 Current Air Quality Values
//               </h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
//                 {availableSensors.map((sensor) => {
//                   const config = sensorConfig[sensor as keyof typeof sensorConfig];
//                   const value = latestData[sensor as keyof AirGradientData] as number;
//                   const IconComponent = config?.icon;

//                   return (
//                     <motion.div
//                       key={sensor}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
//                         selectedSensor === sensor ? "ring-2 ring-orange-600 bg-orange-50 dark:bg-orange-900/20" : ""
//                       }`}
//                       onClick={() => setSelectedSensor(sensor)}
//                     >
//                       <div className="flex items-center justify-between mb-1">
//                         {IconComponent && (
//                           <IconComponent className="h-4 w-4" style={{ color: config?.color }} />
//                         )}
//                         <div className="text-[10px] text-gray-500 dark:text-gray-400">
//                           {config?.unit}
//                         </div>
//                       </div>

//                       <div className="text-lg font-semibold text-gray-900 dark:text-white">
//                         {value !== null && value !== undefined ? value.toFixed(1) : "--"}
//                       </div>

//                       <div className="text-xs text-gray-600 dark:text-gray-300 mt-1 text-center">
//                         {config?.name}
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* Gauge and Radar Chart */}
//           {latestData && (selectedSensor === 'pm02_corrected' || selectedSensor === 'pm10_corrected' || selectedSensor === 'pm01_corrected') && (
//             <div className="grid lg:grid-cols-2 gap-8 mb-8">
//               <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 flex flex-col items-center">
//                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
//                   {currentSensorConfig?.description} Level
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-4">
//                   Current reading at <span className="font-semibold">{currentLocation?.name}</span>
//                 </p>

//                 <GaugeIndicator
//                   value={currentValue}
//                   max={selectedSensor === 'pm02_corrected' ? 100 : 200}
//                   sensorType={selectedSensor}
//                   color={currentSensorConfig?.color || '#FF6600'}
//                 />
//               </div>

//               <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
//                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
//                   Multi-Parameter Comparison
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400 text-center mb-4 text-sm">
//                   Normalized values across all locations (0-100% scale)
//                 </p>
                
//                 {radarData.length > 0 ? (
//                   <div className="h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <RadarChart data={radarData}>
//                         <PolarGrid />
//                         <PolarAngleAxis 
//                           dataKey="sensor" 
//                           tick={(props: any) => {
//                             const { x, y, payload } = props;
//                             const sensorName = payload.value;
//                             const row = payload.payload || {};
//                             const sensorKey = row.sensorKey || "";
//                             const locationNames = Object.keys(row).filter(
//                               (k) => k !== "sensor" && k !== "sensorKey"
//                             );

//                             let value: number | null = null;
//                             if (locationNames.length > 0) {
//                               const firstLocation = locationNames[0];
//                               value = typeof row[firstLocation] === "number" ? row[firstLocation] : null;
//                             }

//                             const color = value !== null ? getBarColor(value, sensorKey) : "#9CA3AF";

//                             return (
//                               <text
//                                 x={x}
//                                 y={y}
//                                 textAnchor="middle"
//                                 fill={color}
//                                 fontSize={10}
//                                 fontWeight="bold"
//                               >
//                                 {sensorName}
//                               </text>
//                             );
//                           }}
//                         />
//                         <PolarRadiusAxis 
//                           angle={90} 
//                           domain={[0, 100]} 
//                           className="text-gray-600 dark:text-gray-300"
//                           tick={{ fontSize: 8 }}
//                           tickFormatter={(value) => `${value}%`}
//                         />
//                         {locations.map((location, index) => (
//                           <Radar
//                             key={location.id}
//                             name={location.name.length > 15 ? location.name.substring(0, 15) + '...' : location.name}
//                             dataKey={location.name}
//                             stroke={index === 0 ? '#FF6600' : '#3B82F6'}
//                             fill={index === 0 ? '#FF6600' : '#3B82F6'}
//                             fillOpacity={0.15}
//                             strokeWidth={2}
//                           />
//                         ))}
//                         <Legend />
//                         <Tooltip 
//                           contentStyle={{
//                             backgroundColor: 'rgba(0, 0, 0, 0.8)',
//                             border: 'none',
//                             borderRadius: '8px',
//                             color: 'white'
//                           }}
//                           formatter={(value: any, name: string) => [
//                             `${value.toFixed(1)}%`, 
//                             name
//                           ]}
//                           labelFormatter={(label) => `${label}`}
//                         />
//                       </RadarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 ) : (
//                   <div className="h-64 flex items-center justify-center">
//                     <div className="text-center">
//                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-2"></div>
//                       <p className="text-gray-600 dark:text-gray-400 text-sm">Loading radar data...</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Main Chart */}
//           <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                 {currentSensorConfig?.description} - {currentLocation?.name}
//               </h3>
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
//                   <TrendingUp className="h-4 w-4" />
//                   <span>{timeRanges.find(r => r.period === selectedTimeRange)?.name}</span>
//                 </div>
//                 <div className="flex bg-gray-100 dark:bg-gray-600 rounded-lg p-1">
//                   <button
//                     onClick={() => setChartType('line')}
//                     className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm transition-colors ${
//                       chartType === 'line' 
//                         ? 'bg-white dark:bg-gray-500 text-gray-900 dark:text-white shadow' 
//                         : 'text-gray-600 dark:text-gray-300'
//                     }`}
//                   >
//                     <LineChartIcon className="h-4 w-4" />
//                     <span>Line</span>
//                   </button>
//                   <button
//                     onClick={() => setChartType('bar')}
//                     className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm transition-colors ${
//                       chartType === 'bar' 
//                         ? 'bg-white dark:bg-gray-500 text-gray-900 dark:text-white shadow' 
//                         : 'text-gray-600 dark:text-gray-300'
//                     }`}
//                   >
//                     <BarChart3 className="h-4 w-4" />
//                     <span>Bar</span>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {error && (
//               <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
//                 <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
//               </div>
//             )}

//             {loading ? (
//               <div className="h-96 flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
//               </div>
//             ) : (
//               <div className="h-96">
//                 <ResponsiveContainer width="100%" height="100%">
//                   {chartType === 'line' ? (
//                     <LineChart data={chartData}>
//                       <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
//                       <XAxis 
//                         dataKey="time" 
//                         className="text-gray-600 dark:text-gray-300"
//                         tick={{ fontSize: 12 }}
//                       />
//                       <YAxis 
//                         className="text-gray-600 dark:text-gray-300"
//                         tick={{ fontSize: 12 }}
//                         label={{ 
//                           value: currentSensorConfig?.unit || '', 
//                           angle: -90, 
//                           position: 'insideLeft' 
//                         }}
//                       />
//                       <Tooltip 
//                         contentStyle={{
//                           backgroundColor: 'rgba(0, 0, 0, 0.8)',
//                           border: 'none',
//                           borderRadius: '8px',
//                           color: 'white'
//                         }}
//                       />
//                       <Line
//                         type="monotone"
//                         dataKey="value"
//                         stroke={currentSensorConfig?.color || '#FF6600'}
//                         strokeWidth={3}
//                         dot={{ fill: currentSensorConfig?.color || '#FF6600', strokeWidth: 2, r: 4 }}
//                         activeDot={{ r: 6, stroke: currentSensorConfig?.color || '#FF6600', strokeWidth: 2 }}
//                       />
//                     </LineChart>
//                   ) : (
//                     <BarChart data={chartData}>
//                       <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
//                       <XAxis 
//                         dataKey="time" 
//                         className="text-gray-600 dark:text-gray-300"
//                         tick={{ fontSize: 12 }}
//                       />
//                       <YAxis 
//                         className="text-gray-600 dark:text-gray-300"
//                         tick={{ fontSize: 12 }}
//                         label={{ 
//                           value: currentSensorConfig?.unit || '', 
//                           angle: -90, 
//                           position: 'insideLeft' 
//                         }}
//                       />
//                       <Tooltip 
//                         contentStyle={{
//                           backgroundColor: 'rgba(0, 0, 0, 0.8)',
//                           border: 'none',
//                           borderRadius: '8px',
//                           color: 'white'
//                         }}
//                       />
//                       <Bar 
//                         dataKey="value" 
//                         fill={currentSensorConfig?.color || '#FF6600'}
//                         shape={(props: any) => {
//                           const color = getBarColor(props.payload.value, selectedSensor);
//                           return <rect {...props} fill={color} />;
//                         }}
//                       />
//                     </BarChart>
//                   )}
//                 </ResponsiveContainer>
//               </div>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export const Dashboard: React.FC = () => {
//   const [selectedLocation, setSelectedLocation] = useState('marrakech');
//   const [showDashboard, setShowDashboard] = useState(false);
//   const [allLocationsData, setAllLocationsData] = useState<LocationData>({});
//   const [loading, setLoading] = useState(false);
//   const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//   const fetchAllLocationsData = async () => {
//     setLoading(true);
//     const promises = locations.map(async (location) => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/${location.id}/air_latest/`, {
//           headers: { 
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//           }
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           return { locationId: location.id, data };
//         }
//       } catch (error) {
//         console.error(`Error fetching data for ${location.id}:`, error);
//       }
//       return { locationId: location.id, data: null };
//     });

//     const results = await Promise.all(promises);
//     const newAllLocationsData: LocationData = {};
    
//     results.forEach(({ locationId, data }) => {
//       if (data) {
//         newAllLocationsData[locationId] = data;
//       }
//     });

//     setAllLocationsData(newAllLocationsData);
//     setLastUpdated(new Date());
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchAllLocationsData();
    
//     // Auto-refresh every hour
//     const interval = setInterval(fetchAllLocationsData, 60 * 60 * 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const getLocationAQI = (locationId: string) => {
//     const data = allLocationsData[locationId];
//     if (!data) return { level: 'Unknown', color: '#9CA3AF' };

//     const pm25 = data.pm02_corrected || 0;
//     if (pm25 <= 12) return { level: 'Good', color: '#10B981' };
//     if (pm25 <= 35) return { level: 'Moderate', color: '#F59E0B' };
//     if (pm25 <= 55) return { level: 'Unhealthy for Sensitive', color: '#EF4444' };
//     return { level: 'Unhealthy', color: '#DC2626' };
//   };

//   const handleLocationClick = (locationId: string) => {
//     setSelectedLocation(locationId);
//     setShowDashboard(true);
//   };

//   const handleMapClick = (locationId: string) => {
//     setSelectedLocation(locationId);
//     setShowDashboard(true);
//   };

//   return (
//     <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//       {/* Header */}
//       {/* <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//                 Air Quality Monitoring Network
//               </h1>
//               <p className="text-gray-600 dark:text-gray-300 mt-1">
//                 Real-time air quality data from monitoring stations across Morocco
//               </p>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               {lastUpdated && (
//                 <div className="text-sm text-gray-500 dark:text-gray-400">
//                   Last updated: {lastUpdated.toLocaleTimeString()}
//                 </div>
//               )}
//               <button
//                 onClick={fetchAllLocationsData}
//                 disabled={loading}
//                 className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//               >
//                 <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
//                 <span>Refresh</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div> */}

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Map Section */}
//           <div className="lg:col-span-2">
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 overflow-hidden">
//               <div className="p-6 border-b dark:border-gray-700">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                       Monitoring Stations
//                     </h2>
//                     <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
//                       Click on a station to view detailed air quality data
//                     </p>
//                   </div>
//                   <div className="flex items-center space-x-4 text-xs">
//                     <div className="flex items-center space-x-2">
//                       <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                       <span className="text-gray-600 dark:text-gray-300">Good</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
//                       <span className="text-gray-600 dark:text-gray-300">Moderate</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                       <span className="text-gray-600 dark:text-gray-300">Unhealthy</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="h-96 relative z-0">
//   <MapContainer
//     center={[31.9, -8.0]}
//     zoom={8}
//     style={{ height: '100%', width: '100%' }}
//     className="rounded-b-xl z-0"
//   >
//                   <TileLayer
//   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// />

// {locations.map((location) => {
//                     const aqi = getLocationAQI(location.id);
//                     const data = allLocationsData[location.id];
                    
//                     return (
//                      <Marker
//   key={location.id}
//   position={location.coordinates}
//   icon={createCustomIcon(aqi.color, selectedLocation === location.id)}
//   eventHandlers={{
//     click: () => handleLocationClick(location.id)
//   }}
// >
//   {/* Tooltip shows on hover */}
//   <LeafletTooltip direction="top" offset={[0, -10]} opacity={0.9}>
//     <div className="text-center">
//       <div className="font-bold text-sm mb-1">{location.name}</div>
//       {data ? (
//         <div className="text-xs space-y-1">
//           <div>PM2.5: <span className="font-semibold">{data.pm02_corrected?.toFixed(1) || '--'} µg/m³</span></div>
//           <div>Temp: <span className="font-semibold">{data.atmp_corrected?.toFixed(1) || '--'} °C</span></div>
//           <div 
//             className="px-2 py-0.5 rounded text-white text-xs font-medium mt-1 inline-block"
//             style={{ backgroundColor: aqi.color }}
//           >
//             {aqi.level}
//           </div>
//         </div>
//       ) : (
//         <div className="text-xs text-gray-500">Loading...</div>
//       )}
//     </div>
//   </LeafletTooltip>
  
//   {/* Popup shows on click */}
//   <Popup>
//     <div className="p-2 min-w-[200px]">
//       <h3 className="font-bold text-gray-900 mb-2">{location.name}</h3>
//       {data ? (
//         <div className="space-y-2">
//           <div className="flex justify-between">
//             <span className="text-gray-600">PM2.5:</span>
//             <span className="font-medium">
//               {data.pm02_corrected !== null && data.pm02_corrected !== undefined 
//                 ? `${data.pm02_corrected.toFixed(1)} µg/m³` 
//                 : '--'}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">PM10:</span>
//             <span className="font-medium">
//               {data.pm10_corrected !== null && data.pm10_corrected !== undefined 
//                 ? `${data.pm10_corrected.toFixed(1)} µg/m³` 
//                 : '--'}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Temperature:</span>
//             <span className="font-medium">{data.atmp_corrected?.toFixed(1) || '--'} °C</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Humidity:</span>
//             <span className="font-medium">{data.rhum_corrected?.toFixed(1) || '--'} %</span>
//           </div>
//           <div 
//             className="px-2 py-1 rounded text-xs font-medium text-white text-center mt-2"
//             style={{ backgroundColor: aqi.color }}
//           >
//             Air Quality: {aqi.level}
//           </div>
//           <button
//             onClick={() => handleLocationClick(location.id)}
//             className="w-full bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors mt-2"
//           >
//             View Details
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-2">
//           <div className="text-gray-500 text-sm text-center py-4">
//             Loading data...
//           </div>
//           <button
//             onClick={() => {
//               fetchAllLocationsData();
//               handleLocationClick(location.id);
//             }}
//             className="w-full bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
//           >
//             Retry & View Details
//           </button>
//         </div>
//       )}
//     </div>
//   </Popup>
// </Marker>
//                     );
//                   })}
//                 </MapContainer>
//               </div>
//             </div>

//             {/* Location Cards */}
//             <div className="grid md:grid-cols-2 gap-4 mt-6">
//               {locations.map((location) => {
//                 const aqi = getLocationAQI(location.id);
//                 const data = allLocationsData[location.id];
                
//                 return (
//                   <motion.div
//                     key={location.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
//                     onClick={() => handleLocationClick(location.id)}
//                   >
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center space-x-3">
//                         <MapPin className="h-5 w-5 text-orange-600" />
//                         <h3 className="font-bold text-gray-900 dark:text-white">{location.name}</h3>
//                       </div>
//                       <div 
//                         className="px-3 py-1 rounded-full text-xs font-medium text-white"
//                         style={{ backgroundColor: aqi.color }}
//                       >
//                         {aqi.level}
//                       </div>
//                     </div>
                    
//                     {data ? (
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="text-center">
//                           <div className="text-2xl font-bold text-gray-900 dark:text-white">
//                             {data.pm02_corrected?.toFixed(1) || '--'}
//                           </div>
//                           <div className="text-xs text-gray-600 dark:text-gray-300">PM2.5 µg/m³</div>
//                         </div>
//                         <div className="text-center">
//                           <div className="text-2xl font-bold text-gray-900 dark:text-white">
//                             {data.atmp_corrected?.toFixed(1) || '--'}
//                           </div>
//                           <div className="text-xs text-gray-600 dark:text-gray-300">Temperature °C</div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="text-center text-gray-500 dark:text-gray-400">
//                         No data available
//                       </div>
//                     )}
                    
//                     <button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
//                       View Dashboard
//                     </button>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Education Section */}
//           <div className="space-y-6">
//             <AirQualityEducation />
            
//             {/* Quick Stats */}
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 p-6">
//               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
//                 <BarChart3 className="h-5 w-5 text-orange-600 mr-2" />
//                 Network Status
//               </h3>
              
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600 dark:text-gray-300">Active Stations:</span>
//                   <span className="font-bold text-gray-900 dark:text-white">
//                     {Object.keys(allLocationsData).length} / {locations.length}
//                   </span>
//                 </div>
                
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600 dark:text-gray-300">Data Coverage:</span>
//                   <span className="font-bold text-green-600">
//                     {Math.round((Object.keys(allLocationsData).length / locations.length) * 100)}%
//                   </span>
//                 </div>
                
//                 {lastUpdated && (
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600 dark:text-gray-300">Last Update:</span>
//                     <span className="font-medium text-gray-900 dark:text-white text-sm">
//                       {lastUpdated.toLocaleTimeString()}
//                     </span>
//                   </div>
//                 )}
//               </div>
              
//               <div className="mt-4 pt-4 border-t dark:border-gray-700">
//                 <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
//                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                   <span>Real-time monitoring active</span>
//                 </div>
//               </div>
//             </div>

//             {/* Health Tips */}
//             <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
//               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
//                 <Heart className="h-5 w-5 text-red-500 mr-2" />
//                 Health Tips
//               </h3>
              
//               <div className="space-y-3">
//                 <div className="flex items-start space-x-3">
//                   <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
//                   <p className="text-sm text-gray-700 dark:text-gray-300">
//                     Check air quality before outdoor activities, especially exercise
//                   </p>
//                 </div>
//                 <div className="flex items-start space-x-3">
//                   <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
//                   <p className="text-sm text-gray-700 dark:text-gray-300">
//                     Keep windows closed during high pollution periods
//                   </p>
//                 </div>
//                 <div className="flex items-start space-x-3">
//                   <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
//                   <p className="text-sm text-gray-700 dark:text-gray-300">
//                     Consider wearing masks when PM2.5 levels are high
//                   </p>
//                 </div>
//                 <div className="flex items-start space-x-3">
//                   <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
//                   <p className="text-sm text-gray-700 dark:text-gray-300">
//                     Use air purifiers indoors during poor air quality days
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Dashboard Modal */}
//       <AnimatePresence>
//         {showDashboard && (
//           <DashboardModal
//             isOpen={showDashboard}
//             onClose={() => setShowDashboard(false)}
//             selectedLocation={selectedLocation}
//             setSelectedLocation={setSelectedLocation}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

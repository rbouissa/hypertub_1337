import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
import LocationSelector, { locations } from './components/LocationSelector';
import SensorSelector from './components/SensorSelector';
import TimeIntervalSelector from './components/TimeIntervalSelector';
import Dashboard from './components/Dashboard';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });
  
  const [selectedLocation, setSelectedLocation] = useState('marrakech');
  const [selectedSensor, setSelectedSensor] = useState('pm25');
  const [selectedInterval, setSelectedInterval] = useState('last24h');

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    // Reset sensor if current sensor is not available in new location
    const newLocationData = locations.find(loc => loc.id === location);
    if (newLocationData && !newLocationData.sensors.includes(selectedSensor)) {
      setSelectedSensor(newLocationData.sensors[0]);
    }
  };

  const getAvailableSensors = () => {
    const locationData = locations.find(loc => loc.id === selectedLocation);
    return locationData ? locationData.sensors : [];
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-orange-50'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        isDark 
          ? 'bg-black/20 border-gray-800' 
          : 'bg-white/20 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                isDark ? 'bg-orange-500/20' : 'bg-black/10'
              }`}>
                <Activity 
                  size={28} 
                  className={isDark ? 'text-orange-400' : 'text-black'} 
                />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-black'
                }`}>
                  Air Quality Monitor
                </h1>
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Real-time environmental monitoring
                </p>
              </div>
            </div>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls */}
        <div className={`mb-8 p-6 rounded-xl backdrop-blur-sm transition-all duration-300 ${
          isDark 
            ? 'bg-white/5 border border-gray-700' 
            : 'bg-white/50 border border-gray-200'
        } shadow-lg`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <LocationSelector
              selectedLocation={selectedLocation}
              onLocationChange={handleLocationChange}
              isDark={isDark}
            />
            <SensorSelector
              availableSensors={getAvailableSensors()}
              selectedSensor={selectedSensor}
              onSensorChange={setSelectedSensor}
              isDark={isDark}
            />
            <TimeIntervalSelector
              selectedInterval={selectedInterval}
              onIntervalChange={setSelectedInterval}
              isDark={isDark}
            />
          </div>
        </div>

        {/* Dashboard */}
        <Dashboard
          location={selectedLocation}
          sensor={selectedSensor}
          interval={selectedInterval}
          isDark={isDark}
        />
      </main>

      {/* Footer */}
      <footer className={`mt-16 border-t transition-all duration-300 ${
        isDark ? 'border-gray-800 bg-black/20' : 'border-gray-200 bg-white/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2025 Air Quality Monitor. Data updates every hour.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
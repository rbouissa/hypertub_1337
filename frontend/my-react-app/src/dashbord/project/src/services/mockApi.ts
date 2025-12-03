export interface SensorReading {
  time: string;
  value: number;
}

export interface LatestData {
  pm1: number;
  pm25: number;
  pm10?: number;
  relativehumidity: number;
  temperature: number;
  um03: number;
  timestamp: string;
}

// Mock data generator
const generateMockData = (hours: number, baseValue: number, variance: number): SensorReading[] => {
  const data: SensorReading[] = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - (i * 60 * 60 * 1000));
    const randomVariance = (Math.random() - 0.5) * variance;
    const value = Math.max(0, baseValue + randomVariance);
    
    data.push({
      time: time.toISOString(),
      value: parseFloat(value.toFixed(1))
    });
  }
  
  return data;
};

const getHoursFromInterval = (interval: string): number => {
  switch (interval) {
    case 'last6h': return 6;
    case 'last12h': return 12;
    case 'last24h': return 24;
    case 'last48h': return 48;
    case 'last7d': return 168; // 7 days * 24 hours
    default: return 24;
  }
};

// Mock API functions
export const fetchHistoricalData = async (
  location: string,
  sensor: string,
  period: string
): Promise<SensorReading[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const hours = getHoursFromInterval(period);
  
  // Mock sensor data with different characteristics
  const sensorConfigs = {
    pm1: { base: 15, variance: 10 },
    pm25: { base: 25, variance: 15 },
    pm10: { base: 45, variance: 20 },
    relativehumidity: { base: 60, variance: 20 },
    temperature: { base: 22, variance: 8 },
    um03: { base: 0.8, variance: 0.3 }
  };
  
  const config = sensorConfigs[sensor as keyof typeof sensorConfigs] || { base: 10, variance: 5 };
  
  // Location-based modifiers
  if (location === 'marrakech') {
    config.base *= 1.2; // Slightly higher values for urban area
  }
  
  return generateMockData(hours, config.base, config.variance);
};

export const fetchLatestData = async (location: string): Promise<LatestData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const baseData: LatestData = {
    pm1: parseFloat((10 + Math.random() * 20).toFixed(1)),
    pm25: parseFloat((20 + Math.random() * 30).toFixed(1)),
    relativehumidity: parseFloat((40 + Math.random() * 40).toFixed(1)),
    temperature: parseFloat((18 + Math.random() * 16).toFixed(1)),
    um03: parseFloat((0.5 + Math.random() * 0.6).toFixed(2)),
    timestamp: new Date().toISOString()
  };
  
  // Add PM10 for Marrakech
  if (location === 'marrakech') {
    baseData.pm10 = parseFloat((30 + Math.random() * 40).toFixed(1));
  }
  
  return baseData;
};

// Simulated real-time updates
export const subscribeToUpdates = (
  callback: (data: LatestData) => void,
  location: string
): (() => void) => {
  const interval = setInterval(() => {
    fetchLatestData(location).then(callback);
  }, 3600000); // Update every hour (3600000 ms)
  
  // Return unsubscribe function
  return () => clearInterval(interval);
};














// this one for my real api backend


// export interface SensorReading {
//   time: string;
//   value: number;
// }

// export interface LatestData {
//   pm1: number;
//   pm25: number;
//   pm10?: number;
//   relativehumidity: number;
//   temperature: number;
//   um03: number;
//   timestamp: string;
// }

// const API_BASE = "http://localhost:8000/api";

// // --- Historical / Yearly / Range Data ---
// export const fetchHistoricalData = async (
//   location: string,
//   sensor: string,
//   period: string
// ): Promise<SensorReading[]> => {
//   const res = await fetch(`${API_BASE}/${location}/${sensor}/${period}/`, {
//     headers: { Accept: "application/json" },
//   });

//   if (!res.ok) {
//     throw new Error(`Failed to fetch historical data: ${res.status} ${res.statusText}`);
//   }

//   const rawData = await res.json();

//   // Map backend format → simplified format
//   return rawData.map((item: any) => ({
//     time: item.period?.datetimeFrom?.utc || "",
//     value: item.value,
//   }));
// };

// // --- Latest Data ---
// export const fetchLatestData = async (location: string): Promise<LatestData> => {
//   const res = await fetch(`${API_BASE}/${location}/latest/`, {
//     headers: { Accept: "application/json" },
//   });

//   if (!res.ok) {
//     throw new Error(`Failed to fetch latest data: ${res.status} ${res.statusText}`);
//   }

//   const rawData = await res.json();

//   // Map backend format → LatestData interface
//   const mappedData: LatestData = {
//     pm1: rawData.pm1?.value || 0,
//     pm25: rawData.pm25?.value || 0,
//     relativehumidity: rawData.relativehumidity?.value || 0,
//     temperature: rawData.temperature?.value || 0,
//     um03: rawData.um03?.value || 0,
//     timestamp: rawData.timestamp || new Date().toISOString(),
//   };

//   // Add pm10 if present
//   if (rawData.pm10) {
//     mappedData.pm10 = rawData.pm10.value;
//   }

//   return mappedData;
// };

// // --- Real-time Updates ---
// export const subscribeToUpdates = (
//   callback: (data: LatestData) => void,
//   location: string
// ): (() => void) => {
//   const interval = setInterval(async () => {
//     try {
//       const latest = await fetchLatestData(location);
//       callback(latest);
//     } catch (err) {
//       console.error("Error fetching latest data:", err);
//     }
//   }, 3600000); // Every hour

//   return () => clearInterval(interval);
// };

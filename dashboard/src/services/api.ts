
import { toast } from 'sonner';

const API_BASE_URL = 'http://localhost:3000';

export interface SensorReading {
  id: number;
  moisture: number;
  moistureStatus: 'good' | 'warning' | 'critical';
  temperatureC: number;
  temperatureF: number;
  temperatureStatus: 'good' | 'warning' | 'critical';
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  timestamp: string;
}

export const fetchLatestReading = async (): Promise<SensorReading> => {
  try {
    const response = await fetch(`${API_BASE_URL}/readings`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch sensor data:', error);
    toast.error('Failed to fetch sensor data. Please try again.');
    throw error;
  }
};

// Mock data for charts since we don't have historical endpoint
export const getMockHistoricalData = (type: 'moisture' | 'temperature') => {
  const days = 7;
  let baseValue = type === 'moisture' ? 65 : 24;
  
  return Array.from({ length: days }, (_, i) => {
    // Add some random variation to create realistic looking data
    const randomVariation = (Math.random() - 0.5) * (type === 'moisture' ? 10 : 4);
    // Add a slight curve to the data
    const curveEffect = Math.sin((i / days) * Math.PI) * (type === 'moisture' ? 5 : 2);
    
    const value = baseValue + randomVariation + curveEffect;
    
    return {
      day: `Day ${i + 1}`,
      value: parseFloat(value.toFixed(1))
    };
  });
};

// Mock weather forecast data with the correct type for 'condition'
export const getMockWeatherForecast = () => {
  return [
    { day: 'Today', temp: 28, condition: 'sunny' as const },
    { day: 'Tomorrow', temp: 26, condition: 'partly_cloudy' as const },
    { day: 'Wed', temp: 27, condition: 'sunny' as const }
  ];
};

// Mock AI recommendations based on sensor values
export const getAIRecommendations = (reading: SensorReading) => {
  const recommendations = [];
  
  // Moisture recommendation
  if (reading.moisture < 30) {
    recommendations.push({
      type: 'moisture',
      priority: 'high',
      message: 'Increase Watering',
      details: 'Soil is too dry. Consider watering soon to prevent stress.'
    });
  } else if (reading.moisture > 70) {
    recommendations.push({
      type: 'moisture',
      priority: 'medium',
      message: 'Reduce Watering',
      details: 'Soil is quite wet. Hold off watering until moisture decreases.'
    });
  }
  
  // NPK recommendation
  if (reading.nitrogen < 30) {
    recommendations.push({
      type: 'nitrogen',
      priority: 'high',
      message: 'Apply Nitrogen',
      details: 'Nitrogen is depleting. Consider applying fertilizer.'
    });
  }
  
  // pH recommendation
  recommendations.push({
    type: 'ph',
    priority: 'low',
    message: 'Monitor pH Levels',
    details: 'pH readings in normal range. Continue monitoring.'
  });
  
  return recommendations;
};

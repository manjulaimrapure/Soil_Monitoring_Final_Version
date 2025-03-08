
import { useState, useEffect } from 'react';
import SensorReadings from '../components/SensorReadings.tsx';


import { Droplet, Thermometer, LeafyGreen, Gauge } from 'lucide-react';
import { toast } from 'sonner';
import { 
  fetchLatestReading, 
  getMockHistoricalData, 
  getMockWeatherForecast, 
  getAIRecommendations,
  type SensorReading
} from '@/services/api';
import SensorCard from '@/components/dashboard/SensorCard';
import ChartCard from '@/components/dashboard/ChartCard';
import RecommendationCard from '@/components/dashboard/RecommendationCard';
import WeatherCard from '@/components/dashboard/WeatherCard';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [sensorData, setSensorData] = useState<SensorReading | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  
  const moistureData = getMockHistoricalData('moisture');
  const temperatureData = getMockHistoricalData('temperature');
  const weatherForecast = getMockWeatherForecast();
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchLatestReading();
      setSensorData(data);
      setLastUpdated(new Date().toLocaleTimeString());
      toast.success('Sensor data updated successfully');
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
    
    // Set up polling every 30 seconds
    const interval = setInterval(fetchData, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };
  
  if (!sensorData && loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-t-2 border-b-2 border-primary rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Loading sensor data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <SensorReadings />

        <DashboardHeader 
          title="Soil Monitoring Dashboard" 
          lastUpdated={lastUpdated}
          onRefresh={fetchData}
          isLoading={loading}
        />
        
        {sensorData ? (
          <div className="space-y-6">
            {/* Sensor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SensorCard 
                title="Soil Moisture" 
                value={`${sensorData.moisture}%`}
                status={sensorData.moistureStatus}
                statusText={sensorData.moistureStatus.charAt(0).toUpperCase() + sensorData.moistureStatus.slice(1)}
                icon={<Droplet size={20} />} 
                colorClass="sensor-moisture"
                subtext={`Latest measurement: ${formatTimestamp(sensorData.timestamp)}`}
              />
              
              <SensorCard 
                title="Temperature" 
                value={`${sensorData.temperatureC}°C`} 
                status={sensorData.temperatureStatus}
                statusText={sensorData.temperatureStatus.charAt(0).toUpperCase() + sensorData.temperatureStatus.slice(1)}
                icon={<Thermometer size={20} />} 
                colorClass="sensor-temperature"
                subtext={`${sensorData.temperatureF}°F at ground level`}
              />
              
              <SensorCard 
                title="NPK Levels" 
                value="Good" 
                icon={<LeafyGreen size={20} />} 
                colorClass="sensor-npk"
                subtext={`N: ${sensorData.nitrogen}, P: ${sensorData.phosphorus}, K: ${sensorData.potassium}`}
              />
              
              <SensorCard 
                title="pH Level" 
                value={6.5} 
                icon={<Gauge size={20} />} 
                colorClass="sensor-ph"
                subtext="Last weekly measurement"
              />
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard 
                title="Soil Moisture Trends" 
                data={moistureData} 
                color="#3B82F6" 
                unit="%" 
              />
              
              <ChartCard 
                title="Temperature Trends" 
                data={temperatureData} 
                color="#F97316" 
                unit="°C" 
              />
            </div>
            
            {/* Additional Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecommendationCard 
                recommendations={sensorData ? getAIRecommendations(sensorData) : []}
              />
              
              <WeatherCard 
                forecast={weatherForecast}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 rounded-2xl glassmorphism">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">Could not load sensor data</p>


            <button 
              onClick={fetchData}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

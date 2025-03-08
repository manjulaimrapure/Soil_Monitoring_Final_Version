
import { Sun, Cloud, CloudRain } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeatherDay {
  day: string;
  temp: number;
  condition: 'sunny' | 'partly_cloudy' | 'rainy';
}

interface WeatherCardProps {
  forecast: WeatherDay[];
  className?: string;
}

const WeatherCard = ({
  forecast,
  className
}: WeatherCardProps) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-6 h-6 text-amber-500" />;
      case 'partly_cloudy': return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-6 h-6 text-blue-500" />;
      default: return <Sun className="w-6 h-6 text-amber-500" />;
    }
  };
  
  return (
    <div className={cn("glassmorphism rounded-2xl p-6 animate-scale-in", className)}>
      <h3 className="text-sm font-medium text-gray-500 mb-4">Weather Forecast</h3>
      
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="font-medium">{day.day}</div>
            <div className="flex items-center space-x-3">
              {getWeatherIcon(day.condition)}
              <div className="text-lg font-semibold">{day.temp}°C</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;


import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SensorCardProps {
  title: string;
  value: string | number;
  status?: 'good' | 'warning' | 'critical';
  statusText?: string;
  icon: ReactNode;
  colorClass: string;
  subtext?: string;
  className?: string;
}

const SensorCard = ({
  title,
  value,
  status = 'good',
  statusText,
  icon,
  colorClass,
  subtext,
  className
}: SensorCardProps) => {
  return (
    <div 
      className={cn(
        "glassmorphism rounded-2xl p-6 flex flex-col h-full animate-scale-in card-hover-effect",
        className
      )}
    >
      <div className="flex items-center mb-3">
        <div className={cn("p-2 rounded-full mr-3", `bg-${colorClass}/10 text-${colorClass}`)}>
          {icon}
        </div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      </div>
      
      <div className="flex flex-col flex-grow">
        <div className="flex items-baseline">
          <span className="text-3xl font-semibold">{value}</span>
          {statusText && (
            <div className="flex items-center ml-2">
              <span className={`status-indicator status-${status}`}></span>
              <span className="text-sm font-medium text-gray-500">{statusText}</span>
            </div>
          )}
        </div>
        
        {subtext && (
          <p className="text-xs text-gray-500 mt-1">{subtext}</p>
        )}
      </div>
    </div>
  );
};

export default SensorCard;

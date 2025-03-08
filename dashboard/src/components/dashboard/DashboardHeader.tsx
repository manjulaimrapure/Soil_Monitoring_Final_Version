
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  title: string;
  lastUpdated?: string;
  onRefresh?: () => void;
  className?: string;
  isLoading?: boolean;
}

const DashboardHeader = ({
  title,
  lastUpdated,
  onRefresh,
  className,
  isLoading = false
}: DashboardHeaderProps) => {
  return (
    <div className={cn("flex items-center justify-between mb-6", className)}>
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{title}</h1>
        {lastUpdated && (
          <p className="text-sm text-gray-500 mt-1">Last updated: {lastUpdated}</p>
        )}
      </div>
      
      {onRefresh && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh}
          disabled={isLoading}
          className={cn(
            "transition-all duration-300",
            isLoading && "animate-spin"
          )}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      )}
    </div>
  );
};

export default DashboardHeader;

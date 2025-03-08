
import { AlertCircle, Droplet, LeafyGreen, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Recommendation {
  type: 'moisture' | 'nitrogen' | 'ph' | string;
  priority: 'low' | 'medium' | 'high';
  message: string;
  details: string;
}

interface RecommendationCardProps {
  recommendations: Recommendation[];
  className?: string;
}

const RecommendationCard = ({
  recommendations,
  className
}: RecommendationCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-100 text-red-800';
      case 'medium': return 'bg-amber-50 border-amber-100 text-amber-800';
      case 'low': return 'bg-emerald-50 border-emerald-100 text-emerald-800';
      default: return 'bg-gray-50 border-gray-100 text-gray-800';
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'low': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'moisture': return <Droplet size={18} />;
      case 'nitrogen': return <LeafyGreen size={18} />;
      case 'ph': return <Gauge size={18} />;
      default: return <AlertCircle size={18} />;
    }
  };
  
  return (
    <div className={cn("glassmorphism rounded-2xl p-6 animate-scale-in", className)}>
      <h3 className="text-sm font-medium text-gray-500 mb-4">AI Recommendations</h3>
      
      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div 
            key={index} 
            className={cn(
              "p-4 rounded-xl border transition-all duration-300 animate-fade-in",
              getPriorityColor(rec.priority)
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center mb-2">
              <div className="mr-2 text-current">
                {getIcon(rec.type)}
              </div>
              <div className="font-medium">{rec.message}</div>
              <div className={cn("ml-auto text-xs px-2 py-1 rounded-full font-medium", getPriorityBadge(rec.priority))}>
                {rec.priority}
              </div>
            </div>
            <p className="text-sm opacity-80">{rec.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationCard;

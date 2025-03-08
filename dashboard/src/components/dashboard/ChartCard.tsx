
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  data: Array<{ day: string; value: number }>;
  color: string;
  unit: string;
  dataKey?: string;
  className?: string;
}

const ChartCard = ({
  title,
  data,
  color,
  unit,
  dataKey = 'value',
  className
}: ChartCardProps) => {
  return (
    <div className={cn("glassmorphism rounded-2xl p-6 animate-scale-in", className)}>
      <h3 className="text-sm font-medium text-gray-500 mb-4">{title}</h3>
      
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12 }} 
              tickMargin={8} 
              stroke="#a0aec0"
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickMargin={8} 
              stroke="#a0aec0"
              unit={unit}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: 'none',
                padding: '8px 12px',
                fontSize: '12px'
              }}
              formatter={(value: number) => [`${value}${unit}`, title.split(' ')[0]]}
              labelFormatter={(day) => day}
            />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={2}
              dot={{ r: 3, fill: color, strokeWidth: 2 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartCard;

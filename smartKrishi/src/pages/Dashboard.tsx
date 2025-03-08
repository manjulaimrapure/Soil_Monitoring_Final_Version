
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Thermometer, Sprout, Wind, CloudRain, Sun, Leaf, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mock data for soil moisture over time
const soilMoistureData = [
  { time: "Day 1", value: 65 },
  { time: "Day 2", value: 60 },
  { time: "Day 3", value: 68 },
  { time: "Day 4", value: 70 },
  { time: "Day 5", value: 63 },
  { time: "Day 6", value: 59 },
  { time: "Day 7", value: 64 },
];

// Mock data for temperature over time
const temperatureData = [
  { time: "Day 1", value: 24 },
  { time: "Day 2", value: 25 },
  { time: "Day 3", value: 23 },
  { time: "Day 4", value: 26 },
  { time: "Day 5", value: 27 },
  { time: "Day 6", value: 25 },
  { time: "Day 7", value: 24 },
];

const metrics = [
  {
    icon: Droplet,
    label: "Soil Moisture",
    value: "65%",
    status: "Optimal",
    color: "text-blue-500",
    bg: "bg-blue-50",
    description: "Current moisture level in top soil layer",
  },
  {
    icon: Thermometer,
    label: "Temperature",
    value: "24°C",
    status: "Normal",
    color: "text-orange-500",
    bg: "bg-orange-50",
    description: "Ambient temperature at soil level",
  },
  {
    icon: Sprout,
    label: "NPK Levels",
    value: "Good",
    status: "Balanced",
    color: "text-green-500",
    bg: "bg-green-50",
    description: "Nitrogen, Phosphorus, Potassium balance",
  },
  {
    icon: Wind,
    label: "pH Level",
    value: "6.5",
    status: "Ideal",
    color: "text-purple-500",
    bg: "bg-purple-50",
    description: "Soil acidity measurement",
  },
];

const weatherForecast = [
  { day: "Today", icon: Sun, temp: "28°C", condition: "Sunny" },
  { day: "Tomorrow", icon: CloudRain, temp: "24°C", condition: "Light Rain" },
  { day: "Wed", icon: Sun, temp: "27°C", condition: "Sunny" },
];

const recommendations = [
  {
    title: "Increase Watering",
    description: "Southern field moisture levels dropping below optimal",
    icon: Droplet,
    priority: "Medium",
  },
  {
    title: "Apply Nitrogen",
    description: "Western plots showing signs of nitrogen deficiency",
    icon: Leaf,
    priority: "High",
  },
  {
    title: "Monitor pH Levels",
    description: "pH trending upward in northeastern section",
    icon: BarChart2,
    priority: "Low",
  },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
      toast({
        title: "Dashboard Updated",
        description: "Latest soil data has been loaded",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-soil-800">Soil Monitoring Dashboard</h1>
        <Button 
          variant="outline" 
          onClick={() => {
            toast({
              title: "Data Refreshed",
              description: "Latest sensor data has been loaded",
            });
          }}
          className="text-soil-600 border-soil-300 hover:bg-soil-50"
        >
          Refresh Data
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className={cn("border-l-4", `border-l-${metric.color.split('-')[1]}-500`, "card-hover")}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", metric.bg)}>
                    <metric.icon className={cn("w-6 h-6", metric.color)} />
                  </div>
                  <h3 className="text-lg font-medium text-soil-700">{metric.label}</h3>
                  <p className="text-2xl font-bold text-soil-800">{metric.value}</p>
                  <p className={cn("text-sm", metric.color)}>{metric.status}</p>
                  <p className="text-xs text-soil-500">{metric.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-soil-800">Soil Moisture Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={soilMoistureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    name="Moisture %" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-soil-800">Temperature Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#f97316" 
                    name="Temperature °C" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-soil-800">AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, i) => (
                <div key={i} className="flex items-start space-x-4 p-4 rounded-lg bg-soil-50">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    rec.priority === "High" ? "bg-red-100" : rec.priority === "Medium" ? "bg-yellow-100" : "bg-green-100"
                  )}>
                    <rec.icon className={cn(
                      "w-5 h-5",
                      rec.priority === "High" ? "text-red-500" : rec.priority === "Medium" ? "text-yellow-500" : "text-green-500"
                    )} />
                  </div>
                  <div>
                    <h4 className="font-medium text-soil-800 flex items-center">
                      {rec.title}
                      <span className={cn(
                        "ml-2 text-xs px-2 py-0.5 rounded-full",
                        rec.priority === "High" ? "bg-red-100 text-red-700" : 
                        rec.priority === "Medium" ? "bg-yellow-100 text-yellow-700" : 
                        "bg-green-100 text-green-700"
                      )}>
                        {rec.priority}
                      </span>
                    </h4>
                    <p className="text-soil-600 text-sm">{rec.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-soil-800">Weather Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weatherForecast.map((day, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-soil-50">
                  <div className="font-medium text-soil-700">{day.day}</div>
                  <div className="flex items-center space-x-3">
                    <day.icon className="w-8 h-8 text-soil-600" />
                    <div>
                      <div className="font-bold text-soil-800">{day.temp}</div>
                      <div className="text-xs text-soil-500">{day.condition}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

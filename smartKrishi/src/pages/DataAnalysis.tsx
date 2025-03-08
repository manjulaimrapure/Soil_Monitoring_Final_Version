
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Filter, Calendar, Bell, Leaf, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const soilHealthData = [
  { name: "Jan", nitrogen: 65, phosphorus: 40, potassium: 55 },
  { name: "Feb", nitrogen: 60, phosphorus: 45, potassium: 60 },
  { name: "Mar", nitrogen: 70, phosphorus: 50, potassium: 65 },
  { name: "Apr", nitrogen: 75, phosphorus: 55, potassium: 70 },
  { name: "May", nitrogen: 68, phosphorus: 52, potassium: 68 },
  { name: "Jun", nitrogen: 65, phosphorus: 48, potassium: 62 },
];

const moistureData = [
  { name: "Week 1", value: 65 },
  { name: "Week 2", value: 60 },
  { name: "Week 3", value: 68 },
  { name: "Week 4", value: 58 },
  { name: "Week 5", value: 63 },
  { name: "Week 6", value: 70 },
];

const soilTypeData = [
  { name: "Clay", value: 30 },
  { name: "Silt", value: 45 },
  { name: "Sand", value: 25 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const recommendations = [
  {
    title: "Increase Nitrogen Application",
    description: "Soil analysis shows nitrogen levels below optimal range for corn growth stage",
    impact: "Medium",
    trend: "decreasing",
  },
  {
    title: "Adjust Irrigation Schedule",
    description: "Recent moisture trends indicate potential for water stress during midday hours",
    impact: "High",
    trend: "stable",
  },
  {
    title: "Monitor pH in North Fields",
    description: "pH levels trending towards acidity which may impact nutrient availability",
    impact: "Low",
    trend: "increasing",
  },
];

const DataAnalysis = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-soil-800">Data Analysis & Recommendations</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="text-soil-600">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" className="text-soil-600">
            <Calendar className="mr-2 h-4 w-4" /> Date Range
          </Button>
          <Button variant="outline" className="text-soil-600">
            <Download className="mr-2 h-4 w-4" /> Export Data
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-3 lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-soil-800">Soil Nutrient Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={soilHealthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="nitrogen" fill="#8884d8" name="Nitrogen" />
                  <Bar dataKey="phosphorus" fill="#82ca9d" name="Phosphorus" />
                  <Bar dataKey="potassium" fill="#ffc658" name="Potassium" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-soil-800">Soil Composition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={soilTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {soilTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-soil-800">Soil Moisture Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moistureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Moisture %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-soil-800">AI Recommendations</CardTitle>
            <Button variant="ghost" className="text-soil-600">
              <Bell className="h-4 w-4 mr-2" /> Notifications
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, i) => (
                <div key={i} className="p-4 rounded-lg bg-soil-50 flex items-start space-x-4">
                  <div>
                    <Leaf className={cn(
                      "w-6 h-6",
                      rec.impact === "High" ? "text-red-500" : 
                      rec.impact === "Medium" ? "text-yellow-500" : 
                      "text-green-500"
                    )} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-soil-800">{rec.title}</h4>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        rec.impact === "High" ? "bg-red-100 text-red-700" : 
                        rec.impact === "Medium" ? "bg-yellow-100 text-yellow-700" : 
                        "bg-green-100 text-green-700"
                      )}>
                        {rec.impact} Impact
                      </span>
                    </div>
                    <p className="text-soil-600 text-sm">{rec.description}</p>
                    <div className="flex items-center mt-1 text-xs">
                      <span className="text-soil-500 mr-1">Trend:</span>
                      {rec.trend === "increasing" ? (
                        <div className="flex items-center text-green-500">
                          <ArrowUpRight className="h-3 w-3 mr-1" /> Increasing
                        </div>
                      ) : rec.trend === "decreasing" ? (
                        <div className="flex items-center text-red-500">
                          <ArrowDownRight className="h-3 w-3 mr-1" /> Decreasing
                        </div>
                      ) : (
                        <div className="flex items-center text-yellow-500">
                          Stable
                        </div>
                      )}
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

export default DataAnalysis;

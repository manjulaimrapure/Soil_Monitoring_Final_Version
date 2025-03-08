
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wifi, WifiOff, Plus, MapPin, Battery, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const sensors = [
  {
    id: "SN001",
    name: "North Field Sensor 1",
    type: "Moisture & pH",
    status: "active",
    battery: 85,
    location: "North Field (43.812°N, 79.123°W)",
    lastUpdate: "10 minutes ago",
  },
  {
    id: "SN002",
    name: "East Field Sensor 1",
    type: "Temperature & NPK",
    status: "active",
    battery: 72,
    location: "East Field (43.814°N, 79.121°W)",
    lastUpdate: "25 minutes ago",
  },
  {
    id: "SN003",
    name: "South Field Sensor 1",
    type: "Complete (All Metrics)",
    status: "inactive",
    battery: 12,
    location: "South Field (43.810°N, 79.125°W)",
    lastUpdate: "3 hours ago",
  },
  {
    id: "SN004",
    name: "West Field Sensor 1",
    type: "Moisture & Temperature",
    status: "active",
    battery: 67,
    location: "West Field (43.811°N, 79.128°W)",
    lastUpdate: "42 minutes ago",
  },
];

const SensorManagement = () => {
  const { toast } = useToast();
  const [view, setView] = useState<"list" | "map">("list");
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-soil-800">Sensor Management</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className={cn("text-soil-600", view === "list" && "bg-soil-100")}
            onClick={() => setView("list")}
          >
            List View
          </Button>
          <Button 
            variant="outline" 
            className={cn("text-soil-600", view === "map" && "bg-soil-100")}
            onClick={() => setView("map")}
          >
            Map View
          </Button>
          <Button 
            onClick={() => {
              toast({
                title: "Feature Coming Soon",
                description: "Adding new sensors will be available in the next update",
              });
            }}
            className="bg-soil-600 hover:bg-soil-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Sensor
          </Button>
        </div>
      </div>
      
      {view === "list" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {sensors.map((sensor) => (
            <Card key={sensor.id} className="border-l-4 border-l-soil-500 overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {sensor.status === "active" ? (
                          <Wifi className="h-4 w-4 text-green-500" />
                        ) : (
                          <WifiOff className="h-4 w-4 text-red-500" />
                        )}
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          sensor.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        )}>
                          {sensor.status === "active" ? "Online" : "Offline"}
                        </span>
                        <span className="text-xs text-soil-500">ID: {sensor.id}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-soil-800">{sensor.name}</h3>
                      <p className="text-soil-600 text-sm">{sensor.type}</p>
                      
                      <div className="flex items-center mt-3 text-sm">
                        <MapPin className="h-4 w-4 text-soil-500 mr-1" />
                        <span className="text-soil-600">{sensor.location}</span>
                      </div>
                      
                      <div className="flex items-center mt-2 text-sm">
                        <Battery className="h-4 w-4 text-soil-500 mr-1" />
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              sensor.battery > 60 ? "bg-green-500" : sensor.battery > 30 ? "bg-yellow-500" : "bg-red-500"
                            )} 
                            style={{ width: `${sensor.battery}%` }} 
                          />
                        </div>
                        <span className="ml-2 text-soil-600">{sensor.battery}%</span>
                      </div>
                      
                      <p className="text-xs text-soil-500 mt-2">Last updated: {sensor.lastUpdate}</p>
                    </div>
                    
                    <Button variant="ghost" size="icon" className="text-soil-600">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <div className="bg-soil-50 p-2 flex justify-between">
                  <Button variant="ghost" size="sm" className="text-soil-600">Calibrate</Button>
                  <Button variant="ghost" size="sm" className="text-soil-600">View Data</Button>
                  <Button variant="ghost" size="sm" className="text-soil-600">Settings</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="h-[500px] flex items-center justify-center">
          <CardContent className="text-center">
            <MapPin className="h-12 w-12 text-soil-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-soil-700">Interactive Map Coming Soon</h3>
            <p className="text-soil-600 max-w-md">
              Our interactive map feature will let you visualize all your sensors on your fields and get real-time data with just a click.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SensorManagement;

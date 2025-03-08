
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MapPin, Droplet, Thermometer, Sprout, Edit, Trash2, Map, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const farms = [
  {
    id: "farm1",
    name: "Green Valley Farm",
    location: "43.812°N, 79.123°W",
    totalArea: "125 acres",
    fields: [
      {
        id: "field1",
        name: "North Field",
        area: "45 acres",
        crop: "Corn",
        soilType: "Clay Loam",
        health: "Good",
        moisture: 68,
        lastUpdated: "Today, 10:24 AM",
      },
      {
        id: "field2",
        name: "East Field",
        area: "30 acres",
        crop: "Soybeans",
        soilType: "Silt Loam",
        health: "Excellent",
        moisture: 72,
        lastUpdated: "Today, 10:30 AM",
      },
      {
        id: "field3",
        name: "South Field",
        area: "50 acres",
        crop: "Wheat",
        soilType: "Sandy Loam",
        health: "Fair",
        moisture: 45,
        lastUpdated: "Today, 10:15 AM",
      },
    ],
  },
  {
    id: "farm2",
    name: "Sunrise Acres",
    location: "43.825°N, 79.142°W",
    totalArea: "80 acres",
    fields: [
      {
        id: "field4",
        name: "West Field",
        area: "35 acres",
        crop: "Tomatoes",
        soilType: "Sandy Clay",
        health: "Good",
        moisture: 65,
        lastUpdated: "Today, 10:05 AM",
      },
      {
        id: "field5",
        name: "South Field",
        area: "45 acres",
        crop: "Peppers",
        soilType: "Loam",
        health: "Good",
        moisture: 62,
        lastUpdated: "Today, 09:50 AM",
      },
    ],
  },
];

const getHealthColor = (health: string) => {
  switch (health.toLowerCase()) {
    case "excellent":
      return "text-green-600";
    case "good":
      return "text-green-500";
    case "fair":
      return "text-yellow-500";
    case "poor":
      return "text-red-500";
    default:
      return "text-blue-500";
  }
};

const getMoistureColor = (moisture: number) => {
  if (moisture >= 70) return "text-green-600";
  if (moisture >= 60) return "text-green-500";
  if (moisture >= 50) return "text-yellow-500";
  return "text-red-500";
};

const FarmManagement = () => {
  const { toast } = useToast();
  const [expandedFarm, setExpandedFarm] = useState<string | null>("farm1");
  
  const toggleFarm = (farmId: string) => {
    setExpandedFarm(prev => prev === farmId ? null : farmId);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-soil-800">Farm Management</h1>
        <Button 
          onClick={() => {
            toast({
              title: "Feature Coming Soon",
              description: "Adding new farms will be available in the next update",
            });
          }}
          className="bg-soil-600 hover:bg-soil-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Farm
        </Button>
      </div>
      
      <div className="space-y-6">
        {farms.map((farm) => (
          <Card key={farm.id} className="shadow-sm overflow-hidden">
            <CardHeader 
              className={cn(
                "cursor-pointer hover:bg-soil-50", 
                expandedFarm === farm.id && "bg-soil-50"
              )}
              onClick={() => toggleFarm(farm.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-soil-800">{farm.name}</CardTitle>
                  <div className="flex items-center text-sm text-soil-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1 text-soil-500" />
                    {farm.location} • {farm.totalArea}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-soil-600">
                    <Map className="h-4 w-4 mr-1" /> View Map
                  </Button>
                  <Button variant="outline" size="sm" className="text-soil-600">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            {expandedFarm === farm.id && (
              <CardContent>
                <h3 className="text-lg font-medium text-soil-700 mb-4">Fields ({farm.fields.length})</h3>
                <div className="space-y-4">
                  {farm.fields.map((field) => (
                    <Card key={field.id} className="border-soil-200 overflow-hidden">
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-base font-medium text-soil-800 flex items-center">
                              {field.name}
                              <span className={cn("ml-2 text-sm", getHealthColor(field.health))}>
                                • {field.health}
                              </span>
                            </h4>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2 text-sm">
                              <div className="flex items-center">
                                <Sprout className="h-4 w-4 mr-2 text-soil-500" />
                                <span className="text-soil-700">Crop: <span className="font-medium">{field.crop}</span></span>
                              </div>
                              <div className="flex items-center">
                                <Droplet className={cn("h-4 w-4 mr-2", getMoistureColor(field.moisture))} />
                                <span className="text-soil-700">Moisture: <span className="font-medium">{field.moisture}%</span></span>
                              </div>
                              <div className="flex items-center">
                                <span className="h-4 w-4 mr-2 bg-soil-200 rounded-full" style={{ backgroundColor: field.soilType.includes("Sandy") ? "#e2c4a6" : field.soilType.includes("Clay") ? "#b36b6b" : "#c2a887" }} />
                                <span className="text-soil-700">Soil: <span className="font-medium">{field.soilType}</span></span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-soil-500" />
                                <span className="text-soil-700">Area: <span className="font-medium">{field.area}</span></span>
                              </div>
                            </div>
                            <p className="text-xs text-soil-500 mt-2">Last updated: {field.lastUpdated}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="text-soil-600">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-soil-600">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  <Button 
                    variant="outline" 
                    className="w-full border-dashed text-soil-600 hover:bg-soil-50"
                    onClick={() => {
                      toast({
                        title: "Feature Coming Soon",
                        description: "Adding new fields will be available in the next update",
                      });
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add New Field
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FarmManagement;

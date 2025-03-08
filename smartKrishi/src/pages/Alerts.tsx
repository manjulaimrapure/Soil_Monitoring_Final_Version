
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, AlertTriangle, Check, Settings, Eye, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const alerts = [
  {
    id: "alert1",
    title: "Low Soil Moisture",
    description: "North field section A3 is below 30% moisture level",
    severity: "high",
    timestamp: "Today, 10:24 AM",
    read: false,
  },
  {
    id: "alert2",
    title: "pH Level Alert",
    description: "East field pH levels rising above 7.2 (optimal range 6.0-7.0)",
    severity: "medium",
    timestamp: "Today, 08:15 AM",
    read: false,
  },
  {
    id: "alert3",
    title: "Temperature Warning",
    description: "Soil temperature dropping below 10°C in south field",
    severity: "medium",
    timestamp: "Yesterday, 9:30 PM",
    read: true,
  },
  {
    id: "alert4",
    title: "Nitrogen Deficiency",
    description: "West field showing signs of nitrogen deficiency",
    severity: "high",
    timestamp: "Yesterday, 5:42 PM",
    read: true,
  },
  {
    id: "alert5",
    title: "Sensor Offline",
    description: "Sensor SN003 in south field is offline for over 6 hours",
    severity: "low",
    timestamp: "Oct 15, 11:30 AM",
    read: true,
  },
];

const notificationSettings = [
  {
    id: "moisture",
    name: "Soil Moisture Alerts",
    description: "Get notified when moisture levels go outside optimal range",
    enabled: true,
  },
  {
    id: "nutrients",
    name: "Nutrient Level Alerts",
    description: "Receive alerts for NPK deficiencies or excesses",
    enabled: true,
  },
  {
    id: "temperature",
    name: "Temperature Warnings",
    description: "Alerts for extreme soil temperature conditions",
    enabled: false,
  },
  {
    id: "ph",
    name: "pH Level Notifications",
    description: "Get notified when pH levels become too acidic or alkaline",
    enabled: true,
  },
  {
    id: "sensors",
    name: "Sensor Status Alerts",
    description: "Notifications when sensors go offline or have low battery",
    enabled: true,
  },
];

const Alerts = () => {
  const { toast } = useToast();
  const [view, setView] = useState<"alerts" | "settings">("alerts");
  const [activeAlerts, setActiveAlerts] = useState(alerts);
  const [settings, setSettings] = useState(notificationSettings);
  
  const markAsRead = (id: string) => {
    setActiveAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
    toast({
      title: "Alert marked as read",
      description: "This alert will be moved to your archive after 30 days",
    });
  };
  
  const toggleSetting = (id: string) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
    toast({
      title: "Notification setting updated",
      description: "Your notification preferences have been saved",
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-soil-800">Alerts & Notifications</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className={cn("text-soil-600", view === "alerts" && "bg-soil-100")}
            onClick={() => setView("alerts")}
          >
            <Bell className="mr-2 h-4 w-4" /> Current Alerts
          </Button>
          <Button 
            variant="outline" 
            className={cn("text-soil-600", view === "settings" && "bg-soil-100")}
            onClick={() => setView("settings")}
          >
            <Settings className="mr-2 h-4 w-4" /> Notification Settings
          </Button>
        </div>
      </div>
      
      {view === "alerts" ? (
        <div className="space-y-4">
          {activeAlerts.length === 0 ? (
            <Card className="text-center p-8">
              <CardContent>
                <BellOff className="h-12 w-12 mx-auto text-soil-400 mb-4" />
                <h3 className="text-xl font-medium text-soil-700">No Active Alerts</h3>
                <p className="text-soil-600 max-w-md mx-auto">
                  You're all caught up! There are no active alerts for your fields right now.
                </p>
              </CardContent>
            </Card>
          ) : (
            activeAlerts.map((alert) => (
              <Card 
                key={alert.id} 
                className={cn(
                  "border-l-4 overflow-hidden",
                  alert.severity === "high" ? "border-l-red-500" : 
                  alert.severity === "medium" ? "border-l-yellow-500" : 
                  "border-l-blue-500",
                  !alert.read && "bg-soil-50"
                )}
              >
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center mt-0.5",
                          alert.severity === "high" ? "bg-red-100" :
                          alert.severity === "medium" ? "bg-yellow-100" :
                          "bg-blue-100"
                        )}>
                          <AlertTriangle className={cn(
                            "h-4 w-4",
                            alert.severity === "high" ? "text-red-500" :
                            alert.severity === "medium" ? "text-yellow-500" :
                            "text-blue-500"
                          )} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-soil-800">{alert.title}</h3>
                            {!alert.read && (
                              <span className="bg-soil-600 text-white text-xs px-2 py-0.5 rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-soil-600">{alert.description}</p>
                          <p className="text-xs text-soil-500 mt-1">{alert.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => markAsRead(alert.id)}
                          disabled={alert.read}
                          className="text-soil-600"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-soil-600">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-soil-800">Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {settings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-medium text-soil-800">{setting.name}</h4>
                    <p className="text-sm text-soil-600">{setting.description}</p>
                  </div>
                  <Switch 
                    checked={setting.enabled} 
                    onCheckedChange={() => toggleSetting(setting.id)} 
                    className="data-[state=checked]:bg-soil-600"
                  />
                </div>
              ))}
              
              <div className="pt-4 border-t border-soil-200">
                <h4 className="text-base font-medium text-soil-800 mb-3">Notification Methods</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-soil-600" />
                      <span className="text-soil-700">In-App Notifications</span>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-soil-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-soil-600" />
                      <span className="text-soil-700">SMS Notifications</span>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-soil-600" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Alerts;

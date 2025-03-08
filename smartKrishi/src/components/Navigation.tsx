
import { Link, useLocation } from "react-router-dom";
import { 
  Home,
  LayoutDashboard,
  MapPin,
  LineChart,
  Bell,
  Sprout,
  Users,
  BookOpen,
  Phone,
  LogIn,
  Droplet,
  Leaf
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/contexts/LanguageContext";

const navItems = [
  { to: "/", icon: Home, labelKey: "nav.home" },
  { to: "/dashboard", icon: LayoutDashboard, labelKey: "nav.dashboard" },
  { to: "/sensors", icon: MapPin, labelKey: "nav.sensors" },
  { to: "/analysis", icon: LineChart, labelKey: "nav.analysis" },
  { to: "/alerts", icon: Bell, labelKey: "nav.alerts" },
  { to: "/farm", icon: Sprout, labelKey: "nav.farm" },
  { to: "/users", icon: Users, labelKey: "nav.users" },
  { to: "/knowledge", icon: BookOpen, labelKey: "nav.knowledge" },
  { to: "/contact", icon: Phone, labelKey: "nav.contact" },
];

export function Navigation() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-soil-500 to-leaf-500 flex items-center justify-center">
          <Leaf className="h-6 w-6 text-white" />
        </div>
        <div className="font-bold text-xl text-soil-700">SoilSense</div>
      </div>
      
      <nav className="p-2 space-y-1 flex-1">
        {navItems.map(({ to, icon: Icon, labelKey }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200",
              "hover:bg-soil-50 text-soil-600 hover:text-soil-800",
              location.pathname === to 
                ? "bg-soil-100 text-soil-700 font-medium border-l-4 border-soil-500" 
                : ""
            )}
          >
            <Icon size={18} />
            <span>{t(labelKey)}</span>
          </Link>
        ))}
      </nav>
      
      <div className="p-4 mt-auto border-t border-soil-100">
        <Link to="/login" className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-soil-50 text-soil-600">
          <LogIn size={18} />
          <span>{t("nav.login")}</span>
        </Link>
      </div>
    </div>
  );
}
